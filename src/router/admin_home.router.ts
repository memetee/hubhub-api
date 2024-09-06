import Router from "koa-router";

import { verifyAuth } from "../middleware/auth.middleware";
import admingHomeInfo from "../controller/admin_home.controller";
const { getHomeInfo } = admingHomeInfo;
const homeInfo = new Router({ prefix: "/adminHomeInfo" });

// 上传banner图片
homeInfo.get("/", verifyAuth, getHomeInfo);

export default homeInfo;
