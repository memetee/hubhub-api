import { Next } from "koa";
import { Ctx } from "../types";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../app/config";
import types from "../constants/index";
import authService from "../service/auth.service";
class AuthController {
  async login(ctx: Ctx, next: Next) {
    let id = "";
    let name = "";
    if (ctx.user) {
      id = ctx.user.id;
      name = ctx.user.name;
    }
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    let userInfo = (await authService.getUserInfoById(id)) as any;
    let avatarUrl = userInfo[0].avatarUrl;
    let result = {
      id,
      name,
      avatarUrl,
      token,
    };
    ctx.app.emit("response", types.AUTHOR_SUCCESS, ctx, result);
  }

  // 验证登录
  async success(ctx: Ctx) {
    ctx.app.emit("response", types.AUTHOR_SUCCESS, ctx);
  }
}

export default new AuthController();
