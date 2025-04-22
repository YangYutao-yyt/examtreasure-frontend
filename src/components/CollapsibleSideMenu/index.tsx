import React, { useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps, Typography } from 'antd';
import './index.css';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';

const { Title } = Typography;

interface CollapsibleSideMenuProps {
  title: string;
  items: MenuProps["items"];
  selectedKey: string;
  questionBankId: string;
}

// 生成数字图标的函数
const NumberIcon = ({ number }: { number: number }) => (
  <div className="number-icon">
    <span>{number}</span>
  </div>
);

const CollapsibleSideMenu = ({
  title,
  items,
  selectedKey,
  questionBankId,
}: CollapsibleSideMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);

  // 转换菜单项格式
  const formattedItems = items?.map((item: any, index) => ({
    ...item,
    icon: <NumberIcon number={index + 1} />,
    label: (
      <Link href={`/bank/${questionBankId}/question/${item.key}`}>
        {item.label}
      </Link>
    )
  })) || [];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={240}
      collapsedWidth={64}
      theme="light"
      className="collapsible-side-menu"
    >
      <div className="menu-header">
        {!collapsed && (
          <Title level={4} className="menu-title" ellipsis={{ tooltip: title }}>
            {title}
          </Title>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-button"
        />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        inlineCollapsed={collapsed}
        items={formattedItems}
        className="question-menu"
      />
    </Sider>
  );
};

export default CollapsibleSideMenu;