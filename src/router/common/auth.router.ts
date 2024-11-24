import Router from "koa-router";

import authController from "../../controller/common/auth.controller";
import { verifyLogin, verifyAuth } from "../../middleware/auth.middleware";

const { login, success } = authController;
const authRouter = new Router({prefix: '/api'});

// 登录
authRouter.post("/login", verifyLogin, login);

// 测试登录接口
authRouter.get("/isLogin", verifyAuth, success);
export default authRouter;
