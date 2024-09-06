import Router from "koa-router";

const momentRouter = new Router({ prefix: "/moment" });

import { verifyAuth, verifyPermission } from "../middleware/auth.middleware";
import { verifyLabelExists } from "../middleware/label.middleware";
import moment from "../controller/moment.controller";
import { verifyBody } from "../middleware/verifyPayload.middleware";
import { pictureHandler } from "../middleware/file.middleware";
const {
  create,
  detail,
  list,
  hotList,
  update,
  remove,
  addLabel,
  saveMomentPictureInfo,
} = moment;

// 创建动态
momentRouter.post("/", verifyAuth, verifyBody, verifyLabelExists, create);

// 获取动态列表
momentRouter.get("/", verifyAuth, list);

// 获取热度列表
momentRouter.get("/hotList", verifyAuth, hotList);

// 获取动态详情
momentRouter.get("/:momentId", verifyAuth, detail);

// 修改动态
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermission,
  verifyBody,
  update
);

// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 添加标签
momentRouter.post(
  "/:momentId/label",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabel
);

// 图片上传
momentRouter.post("/upload", verifyAuth, pictureHandler, saveMomentPictureInfo);
export default momentRouter;
