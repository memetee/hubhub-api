import Koa from "koa";
import fs from "fs";
const useRoutes = (app: Koa) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.ts") return;
    else {
      import(`./${file}`).then((module) => {
        const router = module.default;
        app.use(router.routes());
        app.use(router.allowedMethods());
      });
    }
  });
};

export default useRoutes;
