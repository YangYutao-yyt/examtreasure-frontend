"use client";

import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import { TablePaginationConfig, message } from "antd";
import Link from "next/link";
import "./index.css";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";

interface Props {
  // 默认值（用于展示服务端渲染的数据）
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  // 默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
  errorMessage?: string | undefined;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC<Props> = (props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {}, errorMessage = undefined } = props;
  if (errorMessage) {
    message.error(errorMessage)
  }
  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  // 题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        //框里就默认有 defaultSearchParams，便于如果通过layouts里的搜索框搜索，跳转过来时框里会有默认值
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次请求
          if (init) {
            setInit(false);
            // 如果已有外层传来的默认数据，无需再次查询
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }

          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";
          //如果改变条件后的客户端请求
          //const { data, code } = await searchQuestionVoByPageUsingPost({
          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          // 更新状态
          setQuestionList(newData);
          setTotal(newTotal);

          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;