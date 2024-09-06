import Router from "koa-router";

import authController from "../controller/auth.controller";
import { verifyLogin, verifyAuth } from "../middleware/auth.middleware";

const { login, success } = authController;
const authRouter = new Router();

// 登录
authRouter.post("/login", verifyLogin, login);

// 测试登录接口
authRouter.get("/isLogin", verifyAuth, success);
export default authRouter;
