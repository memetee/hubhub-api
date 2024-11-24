import Router from "koa-router";
import { verifyAuth } from "../../middleware/auth.middleware";
import label from "../../controller/mini_app/label.controller";
import { verifyBody } from "../../middleware/verifyPayload.middleware";
import { verifyLabelExists } from "../../middleware/label.middleware";
const { create, list } = label;
const labelRouter = new Router({ prefix: "/api/label" });
// 新增标签
labelRouter.post("/", verifyAuth, verifyBody, verifyLabelExists, create);
labelRouter.get("/", verifyAuth, list);
export default labelRouter;
