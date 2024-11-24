import Router from "koa-router";

import { verifyAuth } from "../../middleware/auth.middleware";
import admingHomeInfo from "../../controller/admin/home.controller";
const { getHomeInfo } = admingHomeInfo;
const homeInfo = new Router({ prefix: "/api/admin-home" });

// 管理后台获取首页
homeInfo.get("/", verifyAuth, getHomeInfo);

export default homeInfo;
