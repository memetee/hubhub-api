import fs from "fs";
import dotenv from "dotenv";
import path from "path";
const readline = require('readline-sync');

// 动态选择加载的 .env 文件
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// 使用 dotenv 加载相应的 .env 文件
dotenv.config({ path: envFile });

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);

const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT
  ? parseInt(process.env.MYSQL_PORT)
  : undefined;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;

const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVATE_KEY,
  PUBLIC_KEY,
};
