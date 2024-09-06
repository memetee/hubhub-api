import fs from "fs";
import { Context, Next } from "koa";
import userService from "../service/user.service";
import fileService from "../service/file.service";
import types from "../constants/index";
import { DEFAULT_USER_AVATAR } from "../constants/file-path";
class UserController {
  async create(ctx: Context, next: Next) {
    try {
      await userService.create(ctx);
      ctx.app.emit("response", types.USER_REGISTRY_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.USER_REGISTRY_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
  async avatarInfo(ctx: Context, next: Next) {
    const userId = ctx.params.userId;
    try {
      let result = (await fileService.getAvatarInfoById(userId)) as Array<any>;
      if (result[0]) {
        let avatarInfo = result[0];
        ctx.response.set("content-type", avatarInfo.mimetype);
        ctx.body = fs.createReadStream(
          `${types.AVATAR_PATH}/${avatarInfo.filename}`
        );
      } else {
        ctx.response.set("content-type", "image/png");
        ctx.body = fs.createReadStream(DEFAULT_USER_AVATAR);
      }
    } catch (err) {
      const error = new Error(types.GET_AVATAR_INFO_SUCCESS);
      ctx.app.emit("error", error, ctx);
    }
  }
  async momentList(ctx: Context, next: Next) {
    const { id } = ctx.user;
    const { offset, size } = ctx.query as any;
    try {
      let result = (await userService.getMomentListByUserId(
        id,
        offset,
        size
      )) as any;
      ctx.app.emit("response", types.GET_USER_MOMENT_LIST_SUCCESS, ctx, result);
    } catch (err) {
      const error = new Error(types.GET_USER_MOMENT_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
  async updateUserInfo(ctx: Context, next: Next) {
    const { id } = ctx.user;
    const { name } = (ctx.request as any).body;
    try {
      await userService.uploadUsername(id, name);
      ctx.app.emit("response", types.UPDATE_USER_INFO_SUCCESS, ctx);
    } catch (err) {
      let error = new Error(types.UPDATE_USER_INFO_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
  async updateAvatar(ctx: Context, next: Next) {
    ctx.app.emit("response", types.UPDATE_AVATAR_SUCCESS, ctx);
  }
}

export default new UserController();
