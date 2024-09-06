import { Context, Next } from "koa";
import types from "../constants/index";

export const verifyBody = async (ctx: Context, next: Next) => {
  let error = new Error(types.ARGUMENT_EXCEPTION);
  if (!ctx.request.body) {
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};
