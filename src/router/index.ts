import Koa from "koa";
import fs from "fs";
const useRoutes = (app: Koa) => {
  handleUseRouter(app, __dirname);
};


function handleUseRouter(app: Koa, patch: string) {
  console.log('开始注册路由');
  fs.readdirSync(patch).forEach((file) => {
    const newPath = patch + '/' + file;
    const stat = fs.statSync(newPath)
    if (file === "index.ts") return;
    else if (stat.isDirectory()){
      handleUseRouter(app, newPath)
    }else {
      import(newPath).then((module) => {
        const router = module.default;
        app.use(router.routes());
        app.use(router.allowedMethods());
      });
    }
  });
}



export default useRoutes;
