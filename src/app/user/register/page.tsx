
"use client"
import { AppDispatch } from '@/stores';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
  Search,
} from '@ant-design/pro-components';
import Image from 'next/image';
import Link from 'next/link';
import { ProForm } from '@ant-design/pro-form/lib';
import { userRegisterUsingPost } from '@/api/userController';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

/**
 * 
 * 用户登录页面
 * @constructor
 */

const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();

  /**
   * 提交
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
        //前往登录页
        router.replace("/user/login");
        form.resetFields();
      }

    } catch (e) {
      let errorMessage = "注册失败";
      if (e instanceof Error) {
        errorMessage += ": " + e.message;
      }
      message.error(errorMessage);
    }
  }


  return (

    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.jpg" alt="考试宝" height={44} width={44} />
        }
        title="考试宝 - 用户注册"
        subTitle="最好的在线考试刷题平台"
        submitter={
          {
            searchConfig: {
              submitText: "注册",
            }
          }
        }
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
        <ProFormText.Password
          // 这里要和后端接口对应上
          name="checkPassword"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder={'请输入确认密码'}
          rules={[
            {
              required: true,
              message: '请输入确认密码！',
            },
          ]}
        />



        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end"
          }}
        >
          已有账号？
          <Link href={"/user/login"}>去登录</Link>

        </div>
      </LoginForm>
    </div>

  );
};

export default UserRegisterPage;