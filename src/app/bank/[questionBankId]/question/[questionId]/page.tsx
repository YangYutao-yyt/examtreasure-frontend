"use server";
import { Flex, Menu, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import Link from "next/link";
import "./index.css";
import QuestionCard from "@/components/QuestionCard";
import CollapsibleSideMenu from "@/components/CollapsibleSideMenu";



interface BankQuestionPageProps {
  params: {
    questionBankId: string;
    questionId: string; // 根据实际路由参数类型调整，通常URL参数为字符串
  };
}
/**
 * 题库题目详情页
 * @constructor
 */
export default async function BankQuestionPage({ params }: BankQuestionPageProps) {
  //获取路由参数
  const questionBankId = parseInt(params.questionBankId, 10);
  const questionId = parseInt(params.questionId, 10);

  // 获取题库详情
  let bank = undefined;
  let errorMessage = null;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      // 可以自行扩展为分页实现
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    errorMessage = "获取题目列表失败，" + (e as Error).message;
  }
  // 错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取题目详情
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    errorMessage = "获取题目详情失败，" + (e as Error).message;
  }
  // 错误处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }


  //题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id,
    };
  });



  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[question.id]} />
        </Sider>

        <Content className="page-content"
        >
          <QuestionCard question={question} errorMessage={errorMessage} />


        </Content>
      </Flex>
    </div>
  );
}
