"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ProLayout
} from '@ant-design/pro-components';
import {
  Dropdown,
  Input,
  theme,
} from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/dist/client/components/navigation';
import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';
import "./index.css";
import menus from '../../../config/menus';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import getAccessibleMenus from '@/access/menuAccess';


/**
 * 搜索框组件
 * @returns 
 */
const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};



//你给出的代码定义了一个名为 Props 的 TypeScript 接口，该接口包含一个 children 属性，
//其类型为 React.ReactNode。这在 React 组件里是很常见的做法，用于允许组件接收子元素。
interface Props {
  children: React.ReactNode;
}

//这里是组件的根入口，取名叫BasicLayout
export default function BasicLayout({ children }: Props) {
  //获取页面地址
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  return (
    <div
      id="basicLayout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {/* ProLayout 可以提供一个标准又不失灵活的中后台标准布局，同时提供一键切换布局形态、自动生成菜单等功能。 */}
      <ProLayout
        // 定义标题
        title="考试宝-在线考试刷题平台"
        //ProComponents内定义的api，顶部导航
        layout='top'
        //修改logo
        logo={
          <Image src="/assets/logo.jpg" height={32} width={32} alt='考试宝-在线考试刷题平台' />
        }
        //根据页面地址提供高亮
        location={{
          pathname,
        }}

        //头像区
        avatarProps={{
          src: loginUser.userAvatar || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: loginUser.userName || '七妮妮',
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        //操作区：可用于配置右侧的操作栏，比如搜索条、小按钮等。
        actionsRender={(props) => {
          if (props.isMobile) return [];
          //key 被用于 SearchInput 和 a 元素，因为它们被包含在一个数组中，作为 actionsRender 函数返回的列表项。
          //通过为它们设置唯一的 key，可以让 React 更高效地管理这些元素的渲染和更新，确保组件的行为符合预期。
          return [
            <SearchInput key="search" />,
            <a key="github" href="https://github.com/YangYutao-yyt/examtreasure-frontend" target="_blank">
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        // 标题渲染
        headerTitleRender={(logo, title, _) => {
          return (
            <a href="https://e.kaoshibao.com/" target="_blank">
              {logo}
              {title}
            </a>
          );
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        //底部栏的渲染
        footerRender={() => <GlobalFooter />}
        onMenuHeaderClick={(e) => console.log(e)}
        //定义有哪些菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        //定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          //target是MenuDataItem的属性，指向外链网站
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >

        {children}
      </ProLayout>


    </div>
  );
};