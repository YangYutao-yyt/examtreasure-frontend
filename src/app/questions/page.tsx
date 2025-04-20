"use server";
import Title from "antd/es/typography/Title";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import "./index.css";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  //获取url的查询参数
  // 如果希望类型更安全可以这样写
  const searchText = typeof searchParams.q === "string" ? searchParams.q : undefined;
  let questionList = [];
  let total = 0;
  let errorMessage = undefined;

  try {
    const res = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    errorMessage = "获取题目列表失败，" + (e as Error).message;
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total} errorMessage={errorMessage} />
    </div>
  );
}
