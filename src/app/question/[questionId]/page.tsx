"use server";
import { message } from "antd";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";


interface QuestionPageProps {
  params: {
    questionId: string; // 根据实际路由参数类型调整，通常URL参数为字符串
  };
}
/**
 * 题目详情页
 * @constructor
 */
export default async function QuestionPage({ params }: QuestionPageProps) {
  const questionId = parseInt(params.questionId, 10);

  // 获取题目详情
  let question = undefined;
  let errorMessage = null;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    errorMessage = "获取题目列表失败，" + (e as Error).message;
  }
  // 错误处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="questionPage">
      <QuestionCard question={question} errorMessage={errorMessage} />
    </div>
  );
}
