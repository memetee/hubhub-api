import jwt from "jsonwebtoken";
import { Next, Context } from "koa";
import { user } from "../types";
import userService from "../service/user.service";
import authService from "../service/auth.service";

import md5Password from "../utils/password-handle";
import { PUBLIC_KEY } from "../app/config";
import types from "../constants/index";

// 校验账号密码为空
export const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body as user;
  // 判断密码/账号空
  if (!name || !password) {
    const error = new Error(types.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户是否存在
  const result = await userService.getUserByName(name);
  if (!Array.isArray(result) || !result.length) {
    const error = new Error(types.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  let user = result[0];
  // 校验密码
  if ("password" in user && md5Password(password) !== user.password) {
    const err = new Error(types.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", err, ctx);
  }

  ctx.user = user as user;

  await next();
};

// 校验授权
export const verifyAuth = async (ctx: Context, next: Next) => {
  const authorization = ctx.header.authorization;
  const token = authorization?.replace("Bearer ", "") || "";
  if (!token) {
    const error = new Error(types.UN_AUTHORIZATION);
    ctx.app.emit("error", error, ctx);
    return;
  }
  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    await next();
  } catch (err) {
    const error = new Error(types.UN_AUTHORIZATION);
    ctx.app.emit("error", error, ctx);
    return;
  }
};

// 校验权限
export const verifyPermission = async (ctx: Context, next: Next) => {
  let userId = ctx.user.id;
  let [resourceType] = Object.keys(ctx.params);
  let id = ctx.params[resourceType];
  resourceType = resourceType.replace("Id", "");
  try {
    await authService.checkResource(resourceType, id, userId);
    await next();
  } catch (err) {
    let error = new Error(types.UN_PERMISSION);
    ctx.app.emit("error", error, ctx);
    return;
  }
};
