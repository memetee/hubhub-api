import { Next, Context } from "koa";
import commentService from "../service/comment.service";
import types from "../constants/index";
class CommentController {
  async create(ctx: Context, next: Next) {
    const { momentId, content } = (ctx.request as any).body;
    const { id } = ctx.user;
    try {
      await commentService.create(id, content, momentId);
      ctx.app.emit("response", types.CREATED_COMMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.CREATE_COMMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  // 回复评论
  async reply(ctx: Context, next: Next) {
    const { momentId, content } = (ctx.request as any).body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    try {
      await commentService.reply(id, content, momentId, commentId);
      ctx.app.emit("response", types.REPLY_COMMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.REPLY_COMMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
    await next();
  }

  async update(ctx: Context, next: Next) {
    const { content } = (ctx.request as any).body;
    const { commentId } = ctx.params;
    try {
      await commentService.update(content, commentId);
      ctx.app.emit("response", types.UPDATE_COMMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.UPDATE_COMMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async remove(ctx: Context, next: Next) {
    const { commentId } = ctx.params;
    try {
      await commentService.delete(commentId);
      ctx.app.emit("response", types.DELETE_COMMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.DELETE_COMMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async list(ctx: Context, next: Next) {
    const momentId = ctx.params.momentId;
    const offset = (ctx.query.offset || "0") as string;
    const size = (ctx.query.size || "10") as string;
    try {
      let result = (await commentService.list(momentId, offset, size)) as any;
      ctx.app.emit("response", types.GET_COMMENT_LIST_SUCCESS, ctx, result[0]);
    } catch (err) {
      let error = new Error(types.GET_MOMENT_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new CommentController();
