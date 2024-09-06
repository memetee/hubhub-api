import Router from "koa-router";

import { verifyAuth } from "../middleware/auth.middleware";
import bannerController from "../controller/banner.controller";
import { pictureHandler } from "../middleware/file.middleware";
const { saveBannerPictureInfo, list } = bannerController;
const bannerRouter = new Router({ prefix: "/banner" });

// 上传banner图片
bannerRouter.post("/", verifyAuth, pictureHandler, saveBannerPictureInfo);
bannerRouter.get("/", list);

export default bannerRouter;
