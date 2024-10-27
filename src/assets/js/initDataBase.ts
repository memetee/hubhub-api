import mysql from "mysql2/promise";
import * as fs from 'fs';
import * as path from 'path';
// 动态读取 SQL 文件
let sqlFilePath = path.join(__dirname, '../sql/hubhub-dev.sql');
if (process.env.NODE_ENV === 'uat') {
  sqlFilePath = path.join(__dirname, '../sql/hubhub-uat.sql');
} else if (process.env.NODE_ENV === 'prod') {
  sqlFilePath = path.join(__dirname, '../sql/hubhub-prod.sql');
}
const sql = fs.readFileSync(sqlFilePath, 'utf8');

import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
} from "../../app/config";

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  multipleStatements: true // 允许执行多个 SQL 语句
});

// 执行 SQL 脚本来创建数据库和表
async function initData() {
  try {
    await pool.query(sql); // 使用 query 执行 SQL
    console.log('创建数据库和表成功......');
  } catch (error) {
    console.error('创建数据库失败', error);
  } finally {
    pool.end(); // 关闭连接池
  }
}

// 测试连接池是否成功创建连接并初始化数据库
pool.getConnection()
  .then(() => {
    console.log("数据库连接成功");
    return initData(); // 执行数据库初始化脚本
  })
  .catch(err => {
    console.error("数据库连接失败", err);
  });