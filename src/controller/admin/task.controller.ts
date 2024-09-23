import { Context, Next } from "koa";
import adminMenuTaskService from "../../service/admin_adminTask-menu.service";
import types from '../../constants/index'
class TaskInfo {
  // 新增任务
  async createTask(ctx: Context, next: Next) {
    const { title, content, status } = (ctx.request as any).body;
    const { id } = ctx.user;
    await adminMenuTaskService.createTask(id, title, content, status)
    ctx.app.emit("response", types.SAVE_TASK_SUCCESS, ctx);
  }
  
  // 获取任务列表
  async getTaskList(ctx: Context, next: Next) {
    try {
      let result = await adminMenuTaskService.getTaskList() as [any];
      let resultData = result;
      ctx.app.emit("response", types.GET_TASK_LIST_SUCCESS, ctx, resultData);
    } catch(err) {
      let error = new Error(types.GET_TASK_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }

  // 更新任务状态
  async updateTask(ctx: Context, next: Next) {
    try {
      const { id, status } = (ctx.request as any).body;
      await adminMenuTaskService.updateTask(id, status);
      ctx.app.emit("response", types.SAVE_TASK_SUCCESS, ctx);
    } catch(err) {
      let error = new Error(types.SAVE_TASK_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new TaskInfo();