import Router from "koa-router";

import UserController from "../controller/user.controller";
const { create, avatarInfo, momentList, updateAvatar, updateUserInfo } =
  UserController;

import {
  handlePassword,
  verifyUser,
  uploadAvatar,
} from "../middleware/user.middleware";
import { verifyAuth } from "../middleware/auth.middleware";
import { avatarHandler } from "../middleware/file.middleware";

const userRouter = new Router({ prefix: "/user" });
// 用户注册
userRouter.post("/", verifyUser, handlePassword, create);

// 获取头像
userRouter.get("/:userId/avatar", avatarInfo);

// 更新头像
userRouter.post(
  "/upload/avatar",
  verifyAuth,
  avatarHandler,
  uploadAvatar,
  updateAvatar
);

// 获取我的动态列表
userRouter.get("/moment", verifyAuth, momentList);

// 更新user信息
userRouter.put("/update/userInfo", verifyAuth, updateUserInfo);

export default userRouter;
