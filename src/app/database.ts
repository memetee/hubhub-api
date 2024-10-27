import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} from "./config";
import mysql from "mysql2";
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  multipleStatements: true
});

// 测试数据库是否链接成功
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("链接失败");
    } else {
      console.log("数据库链接成功");
    }
  });
});

export default connections.promise();
