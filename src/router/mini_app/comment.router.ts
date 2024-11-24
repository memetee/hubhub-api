import Router from "koa-router";
import { verifyAuth, verifyPermission } from "../../middleware/auth.middleware";
const commentRouter = new Router({ prefix: "/api/comment" });
import comment from "../../controller/mini_app/comment.controller";
const { list, create, reply, update, remove } = comment;
// 创建评论
commentRouter.post("/", verifyAuth, create);

// 获取评论列表
commentRouter.get("/:momentId", list);

// 回复评论
commentRouter.post("/:commentId/reply", verifyAuth, reply);

// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);

// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
export default commentRouter;
