"use client";
import { Avatar, Card, List, Typography, message } from "antd";
import "./index.css"
import Link from "next/link";

interface Props {
  questionBankList: API.QuestionBankVO[],
  errorMessage: String | null
}

/**
 * 题库列表组件
 */
const questionBankList = (props: Props) => {

  const { questionBankList = [] } = props;
  const { errorMessage } = props;
  if (errorMessage) {
    message.error(errorMessage)
  }

  const questionBankView = (questionBank: API.QuestionBankVO) => {
    return (
      <Card>
        {/* 添加链接 */}
        <Link href={`/bank/${questionBank.id}`}>
          <Card.Meta
            avatar={<Avatar src={questionBank.picture} />}
            title={questionBank.title}
            //由于有的描述长有的描述短，我们使用缩略图,只显示一行
            description={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
                {questionBank.description}
              </Typography.Paragraph>

            }
          />
        </Link>
      </Card>
    );
  }

  return (
    <div className="question-bank-list">
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
        }}
        dataSource={questionBankList}
        renderItem={item => (
          <List.Item>
            {questionBankView(item)}
          </List.Item>
        )}
      />

    </div>
  )

}
export default questionBankList;