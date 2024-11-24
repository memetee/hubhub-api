import Router from "koa-router";

import fileController from "../../controller/common/file.controller";
const { fileInfo } = fileController;
const authRouter = new Router({ prefix: "/api/image" });

// 获取图片
authRouter.get("/:filename", fileInfo);

export default authRouter;
