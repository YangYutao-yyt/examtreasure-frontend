
"use client";
import { Avatar, Card, List, Typography, message } from "antd";
import "./index.css"
import Link from "next/link";
import Item from "antd/es/list/Item";
import TagList from "../TagList";

interface Props {
  questionList: API.QuestionVO[],
  errorMessage: String | null
}

/**
 * 题库列表组件
 */
const questionList = (props: Props) => {

  const { questionList = [] } = props;
  const { errorMessage } = props;
  if (errorMessage) {
    message.error(errorMessage)
  }


  return (
    <Card className="question-list">
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta title={
              <Link href={`/question/${item.id}`}>
                {item.title}
              </Link>
            } />
          </List.Item>
        )}
      />



    </Card>
  )

}
export default questionList;