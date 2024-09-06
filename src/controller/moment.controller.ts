import fs from "fs";
import { Context, Next } from "koa";
import { user } from "../types";
import momentService from "../service/moment.service";
import types from "../constants/index";
class Moment {
  async create(ctx: Context, next: Next) {
    const { id } = ctx.user as user;
    const content = (ctx.request.body as any).content;
    const labels = ctx.labels;
    // 插入数据库
    try {
      // 创建动态
      let result = (await momentService.create(id, content)) as any;

      // 关联动态标签
      const momentId = result.insertId;
      for (let value of labels) {
        try {
          let result = await momentService.getMomentLabelById(
            momentId,
            value.id
          );
          if ("length" in result && !result[0]) {
            await momentService.createMomentLabel(momentId, value.id);
          }
        } catch (err) {
          let error = new Error(types.ADD_MOMENT_LABEL_ERROR);
          ctx.app.emit("error", error, ctx);
          return;
        }
      }
      ctx.app.emit("response", types.CREATED_MOMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.CREATED_MOMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
    await next();
  }

  async detail(ctx: Context, next: Next) {
    const momentId = ctx.params.momentId;
    let result = [];
    try {
      result = (await momentService.detail(momentId)) as any;
      if (!result.length) {
        throw new Error('未查询到详情信息')
      }
      ctx.app.emit("response", types.GET_MOMENT_SUCCESS, ctx, result[0]);
    } catch (err) {
      let error = new Error(types.GET_MOMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async list(ctx: Context, next: Next) {
    const offset = (ctx.query.offset || "0") as string;
    const size = (ctx.query.size || "10") as string;
    let result = [];
    try {
      result = (await momentService.list(offset, size)) as any;
      ctx.app.emit("response", types.GET_MOMENT_LIST_SUCCESS, ctx, result[0]);
    } catch (err) {
      let error = new Error(types.GET_MOMENT_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }
  async hotList(ctx: Context, next: Next) {
    const offset = (ctx.query.offset || "0") as string;
    const size = (ctx.query.size || "10") as string;
    let result = [];
    try {
      result = (await momentService.hotList(offset, size)) as any;
      ctx.app.emit("response", types.GET_MOMENT_LIST_SUCCESS, ctx, result[0]);
    } catch (err) {
      let error = new Error(types.GET_MOMENT_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async update(ctx: Context, next: Next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body as any;
    try {
      await momentService.update(content, momentId);
      ctx.app.emit("response", types.UPDATE_MOMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.GET_MOMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async remove(ctx: Context, next: Next) {
    const { momentId } = ctx.params;

    // 插入数据库
    try {
      await momentService.remove(momentId);
      ctx.app.emit("response", types.DELETE_MOMENT_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.DELETE_MOMENT_ERROR);
      ctx.app.emit("error", error, ctx);
      return;
    }
  }

  async addLabel(ctx: Context, next: Next) {
    const labels = ctx.labels;
    const momentId = ctx.params.momentId;
    for (let value of labels) {
      try {
        let result = await momentService.getMomentLabelById(momentId, value.id);
        if ("length" in result && !result[0]) {
          await momentService.createMomentLabel(momentId, value.id);
        }
      } catch (err) {
        let error = new Error(types.ADD_MOMENT_LABEL_ERROR);
        ctx.app.emit("error", error, ctx);
        return;
      }
    }
    ctx.app.emit("response", types.ADD_MOMENT_LABEL_SUCCESS, ctx);
  }

  async saveMomentPictureInfo(ctx: Context, next: Next) {
    const files = (ctx.req as any).files;
    const { id } = ctx.user;
    const momentId = ctx.query.momentId as any;
    try {
      for (let file of files) {
        let { filename, mimetype, size, originalname } = file;
        await momentService.saveMomentPictureInfo(
          mimetype,
          filename,
          size,
          id,
          momentId
        );
      }
      ctx.app.emit("response", types.UPLOAD_MOMENT_PICTURE_SUCCESS, ctx);
    } catch (err) {
      const error = new Error(types.UPLOAD_MOMENT_PICTURE_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new Moment();
