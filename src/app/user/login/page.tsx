"use client"
import { AppDispatch } from '@/stores';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ProForm } from '@ant-design/pro-form/lib';
import { userLoginUsingPost } from '@/api/userController';
import { message } from 'antd';
import { setLoginUser } from '@/stores/loginUser';
import { useRouter } from 'next/navigation';

/**
 * 
 * 用户登录页面
 * @constructor
 */

const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 提交
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        //保存用户登录状态
        const user: API.LoginUserVO = res.data as API.LoginUserVO;
        dispatch(setLoginUser(user));
        router.replace("/");
        form.resetFields();
      }

    } catch (e) {
      let errorMessage = "登录失败";
      if (e instanceof Error) {
        errorMessage += ": " + e.message;
      }
      message.error(errorMessage);
    }
  }


  return (

    <div id="userLoginPage">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.jpg" alt="考试宝" height={44} width={44} />
        }
        title="考试宝 - 用户登录"
        subTitle="最好的在线考试刷题平台"
        onFinish={doSubmit}
      >
        <ProFormText
          // 这里要和后端接口对应上
          name="userAccount"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
          }}
          placeholder={'请输入用户账号'}
          rules={[
            {
              required: true,
              message: '请输入用户账号!',
            },
          ]}
        />
        <ProFormText.Password
          // 这里要和后端接口对应上
          name="userPassword"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />



        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end"
          }}
        >
          还没有账号？
          <Link href={"/user/register"}>去注册</Link>

        </div>
      </LoginForm>
    </div>

  );
};

export default UserLoginPage;