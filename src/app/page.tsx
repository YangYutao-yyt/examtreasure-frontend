"use server";

import Title from 'antd/es/typography/Title';
import './index.css'
import { Divider, Flex, message } from 'antd';
import Link from 'next/link';
import { listQuestionBankByPageUsingPost, listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';
import { listQuestionVoByPageUsingPost } from '@/api/questionController';
import QuestionBankList from '@/components/QuestionBankList';
import QuestionList from '@/components/QuestionList';

/**
 * 主页
 * @returns 
 */
//注意服务端渲染一定要叫上async
export default async function HomePage() {
  //获取数据，服务端比客户端更加方便，因为直接在服务端获取数据
  let questionBankList = [];
  let questionList = [];
  let questionBankErrorMessage = null;
  let questionErrorMessage = null;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      //按照时间排序
      sortField: "createTime",
      sortOrder: "desc",//降序
    });
    //不用像其他的判断res.data，只要没报异常，就是获取成功了1
    questionBankList = res.data.records ?? [];
  } catch (e) {
    questionBankErrorMessage = "获取题库列表失败，" + (e as Error).message;
  }
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      //按照时间排序
      sortField: "createTime",
      sortOrder: "desc",//降序
    });
    //不用像其他的判断res.data，只要没报异常，就是获取成功了1
    questionList = res.data.records ?? [];
  } catch (e) {
    questionErrorMessage = "获取题库列表失败，" + (e as Error).message;
  }

  return (
    <div id="homePage" className='max-width-content'>
      <Flex justify='space-between' align='center'>
        <Title level={3}>
          最新题库
        </Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <div>
        <QuestionBankList questionBankList={questionBankList} errorMessage={questionBankErrorMessage} />
      </div>
      <Divider />
      <Flex justify='space-between' align='center'>
        <Title level={3}>
          最新题目
        </Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <div>
        <QuestionList questionList={questionList} errorMessage={questionErrorMessage} />
      </div>
    </div>

  );
}
