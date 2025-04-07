import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/stores/index";
import ACCESS_ENUM from "@/access/accessEnum";
// 默认用户
const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: ACCESS_ENUM.NOT_LOGIN,
};
/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      //返回新的对象而不是原有的对象
      //原因：防止状态污染，全局状态管理要维护每一次状态的变更
      return {
        ...action.payload,
      };
    },
  },
});
// 修改状态
export const { setLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;