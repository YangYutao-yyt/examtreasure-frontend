import React from "react";
import "./index.css";
/**
 * 全局底部栏组件
 *
 * @author YangYutao
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} 考试宝-在线考试刷题平台</div>
      <div>
        <a href="https://github.com/YangYutao-yyt/examtreasure-frontend" target="_blank">
          作者：YangYutao
        </a>
      </div>
    </div>
  );
}