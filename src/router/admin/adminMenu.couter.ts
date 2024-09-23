import Router from "koa-router";
import { verifyAuth } from "../../middleware/auth.middleware";
import TaskInfo from "../../controller/admin/task.controller";
const { createTask, getTaskList, updateTask } = TaskInfo;
const adminMenu = new Router({ prefix: "/task" });

// 创建任务
adminMenu.post("/create", verifyAuth, createTask);

// 获取任务列表
adminMenu.get("/list", verifyAuth, getTaskList);

// 更新任务
adminMenu.post("/update", verifyAuth, updateTask);


export default adminMenu