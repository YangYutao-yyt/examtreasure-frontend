import "./index.css"
import { Tag } from "antd";



//传递进来的参数
interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 */
const TagList = (props: Props) => {
  //默认为空
  const { tagList = [] } = props;
  return (
    <div className="tag-list">
      {/* 循环 */}
      {tagList.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
}

export default TagList;