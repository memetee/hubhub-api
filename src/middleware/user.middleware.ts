import { Context, Next } from "koa";
import { user } from "../types";
import types from "../constants/index";

import userService from "../service/user.service";
import fileService from "../service/file.service";
import md5Password from "../utils/password-handle";
import { APP_HOST, APP_PORT } from "../app/config";

export const verifyUser = async (ctx: Context, next: Next) => {
  console.log('进入用户校验');
  const { name, password } = ctx.request.body as user;
  // 判断密码/账号
  if (!name || !password) {
    const error = new Error(types.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await userService.getUserByName(name);
  if (Array.isArray(result) && result.length) {
    const error = new Error(types.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

export const uploadAvatar = async (ctx: Context, next: Next) => {
  const file = (ctx.req as any).file;
  const { mimetype, filename, size, originalname } = file;
  const { id } = ctx.user;
  let result = [];
  // 查询头像信息
  try {
    result = (await fileService.getAvatarInfoById(id)) as Array<any>;
  } catch (err) {
    let error = new Error(types.GET_AVATAR_INFO_SUCCESS);
    ctx.app.emit("error", error, ctx);
  }
  if (result[0]) {
    // 更新头像
    try {
      await fileService.updateAvatar(
        mimetype,
        filename,
        size,
        originalname,
        id
      );
      // 将头像信息更新到user表中
      const avatarUrl = `user/${id}/avatar`;
      await userService.updateUserAvatarUrl(avatarUrl, id);
      await next();
    } catch (err) {
      let error = new Error(types.UPDATE_AVATAR_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  } else {
    // 创建头像
    try {
      await fileService.createAvatar(
        mimetype,
        filename,
        size,
        originalname,
        id
      );
      // 将头像信息更新到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
      await userService.updateUserAvatarUrl(avatarUrl, id);
      await next();
    } catch (err) {
      let error = new Error(types.UPDATE_AVATAR_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
};

export const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body as user;
  let result = md5Password(password);
  (ctx.request.body as user).password = result;
  await next();
};
