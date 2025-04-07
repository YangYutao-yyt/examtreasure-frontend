"use client"
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname } from "next/dist/client/components/navigation";
import AccessLayout from "@/access/AccessLayout";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
  * 全局初始化函数，有全局单次调用的代码，都可以写到这里
  */
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    // 获取用户信息
    const res = await getLoginUserUsingGet();
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      if (res.data) {
        const user: API.LoginUserVO = res.data as API.LoginUserVO;
        dispatch(setLoginUser(user));
      } else {
        // todo 测试代码，实际可删除
        // setTimeout(() => {
        //   const testUser = { userName: "测试登录", id: 1, userRole: ACCESS_ENUM.ADMIN };
        //   dispatch(setLoginUser(testUser));
        // }, 3000);
      }
    }

  }, []);
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return <>{children}</>;
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>
                  {children}
                </AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}