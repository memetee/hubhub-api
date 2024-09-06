import { Context, Next } from "koa";
import types from "../constants/index";
import labelService from "../service/label.service";
class Label {
  async create(ctx: Context, next: Next) {
    ctx.app.emit("response", types.ADD_MOMENT_LABEL_SUCCESS, ctx);
  }
  async list(ctx: Context, next: Next) {
    try {
      const result = (await labelService.list()) as any;
      ctx.app.emit("response", types.GET_LABEL_SUCCESS, ctx, result[0]);
    } catch (err) {
      const error = new Error(types.GET_LABEL_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new Label();
