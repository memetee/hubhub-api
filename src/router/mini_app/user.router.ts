import Router from "koa-router";

import UserController from "../../controller/common/user.controller";
const { create, avatarInfo, momentList, updateAvatar, updateUserInfo, visitLog, delVisitLog } = UserController;

import {
  handlePassword,
  verifyUser,
  uploadAvatar,
} from "../../middleware/user.middleware";
import { verifyAuth } from "../../middleware/auth.middleware";
import { avatarHandler } from "../../middleware/file.middleware";

const userRouter = new Router({ prefix: "/user" });
// 用户注册
userRouter.post("/", verifyUser, handlePassword, create);

// 获取用户头像
userRouter.get("/:userId/avatar", avatarInfo);

// 更新用户头像
userRouter.post(
  "/upload/avatar",
  verifyAuth,
  avatarHandler,
  uploadAvatar,
  updateAvatar
);

// 获取用户动态列表
userRouter.get("/moment", verifyAuth, momentList);

// 更新用户信息
userRouter.put("/update/userInfo", verifyAuth, updateUserInfo);

// 记录用户访问
userRouter.get('/visit-log', verifyAuth, visitLog)

// 删除超过七天的访问记录
userRouter.delete('/del-visit-log', verifyAuth, delVisitLog)
export default userRouter;
