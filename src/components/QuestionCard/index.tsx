"use client";
import { Card, message, Button } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
//import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
import "./index.css";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface Props {
  question: API.QuestionVO;
  errorMessage?: String | null;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;
  const { errorMessage } = props;
  if (errorMessage) {
    message.error(errorMessage)
  }
  //新增隐藏推荐答案的功能
  const [showAnswer, setShowAnswer] = useState(false);

  // 签到
  //useAddUserSignInRecord();

  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card
        title={
          <div className="answer-header">
            <span>推荐答案</span>
            <Button
              icon={showAnswer ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "隐藏答案" : "显示答案"}
            </Button>
          </div>
        }
      >
        {showAnswer && <MdViewer value={question.answer} />}
        {!showAnswer && (
          <div style={{ color: "#666", textAlign: "center", padding: 16 }}>
            点击上方按钮显示答案
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionCard;
