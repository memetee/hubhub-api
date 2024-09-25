import app from "./app";
const { APP_PORT, APP_HOST } = require("./app/config");
require("./app/database");

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功,ip为${APP_HOST}, 端口为${APP_PORT}`);
});
