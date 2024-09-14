import Router from "koa-router";

import { verifyAuth } from "../../middleware/auth.middleware";
import bannerController from "../../controller/common/banner.controller";
import { pictureHandler } from "../../middleware/file.middleware";
const { saveBannerPictureInfo, list, updateBannerPicture, deleteBannerPicture } = bannerController;
const bannerRouter = new Router({ prefix: "/banner" });

// 上传banner图片
bannerRouter.post("/", verifyAuth, pictureHandler, saveBannerPictureInfo);

// 更新某一张轮播图
bannerRouter.post("/update/:bannerId", verifyAuth, pictureHandler, updateBannerPicture);

// 删除某一张轮播图
bannerRouter.delete("/delete/:bannerId", verifyAuth, deleteBannerPicture);

// 获取轮播图列表
bannerRouter.get("/", list);

export default bannerRouter;
