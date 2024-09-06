import bodyParser from "koa-bodyparser";
import Koa from "koa";
import errorHandle from "../utils/error-handle";
import useRoutes from "../router";
import responseHandle from "../utils/response-handle";
const app: Koa = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin","*");
  ctx.set("Access-Control-Allow-Headers","Content-Type,Authorization");
  ctx.set("Access-Control-Allow-Methods","OPTIONS,GET,POST");
  //对OPTIONS类型的请求，直接返回成功状态即可，
  //因为它只是用于验证是否支持跨域
  if(ctx.method=="OPTIONS"){
    ctx.status=200;
    return;
  }
  //记得加上next()否则请求流程会中断
  await next();
})
useRoutes(app); // 注册所有路由
app.on("error", errorHandle);
app.on("response", responseHandle);
export default app;
