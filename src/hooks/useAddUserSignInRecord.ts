import { useEffect, useState } from "react";
import { message } from "antd";
import { addUserSignInUsingPost } from "@/api/userController";

// 本地存储键名常量
const SIGNIN_STORAGE_KEY = 'signin_status';

/**
 * 添加用户刷题签到记录钩子（带本地存储校验）
 * @constructor
 */
const useAddUserSignInRecord = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // 获取当天日期字符串（格式YYYY-MM-DD）
  const getTodayString = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // 检查本地存储状态
  const checkSignInStatus = () => {
    if (typeof window === 'undefined') return false; // 服务端渲染保护
    const storedData = localStorage.getItem(SIGNIN_STORAGE_KEY);
    if (!storedData) return false;

    try {
      const { date } = JSON.parse(storedData);
      return date === getTodayString();
    } catch (e) {
      return false;
    }
  };

  // 更新本地存储状态
  const updateLocalStorage = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SIGNIN_STORAGE_KEY,
      JSON.stringify({
        date: getTodayString(),
        signed: true
      })
    );
  };

  const doFetch = async () => {
    // 如果当天已签到，直接返回
    if (checkSignInStatus()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await addUserSignInUsingPost({});
      updateLocalStorage();
      message.success("签到成功！");
    } catch (e) {
      let errorMessage = '签到失败';
      if (e instanceof Error) {
        errorMessage += ', ' + e.message;
      }
      message.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;