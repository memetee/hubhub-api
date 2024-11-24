import Router from "koa-router";

import { verifyAuth } from "../../middleware/auth.middleware";
import bannerInfo from "../../controller/common/banner.controller";
const { list } = bannerInfo;
const homeInfo = new Router({ prefix: "/api/admin-banner" });

// 管理后台获取首页
homeInfo.get("/", verifyAuth, list);

export default homeInfo;
