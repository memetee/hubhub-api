import { Context, Next } from "koa";
import types from "../../constants/index";
import homeInfoService from "../../service/admin_homeInfo.service";
import taskInfoService from "../../service/admin_adminTask-menu.service";
import { getLastDays } from "../../utils/utils";
class AdminHomeInfo {
  async getHomeInfo(ctx: Context, next: Next) {
    let result = {
      dynamicCount: 0,
      userCount: 0,
      addDynamicCount: 0,
      addUserCount: 0,
      pageViewCount: 0,
      pageViewInfo: [],
      messageInfo: [],
      taskList: [],
      addDynamicList: []
    };
    try {
      // 数量查询
      const dynamicCountResult = (await homeInfoService.getDynamicCount()) as [any];
      result.dynamicCount = dynamicCountResult[0].count;
      const toDayDynamicCountResult = (await homeInfoService.getTodayDynamicCount()) as [any];
      result.addDynamicCount = toDayDynamicCountResult[0].addDynamicCount;
      const userCountResult = (await homeInfoService.getUserCount()) as [any];
      result.userCount = userCountResult[0].count;
      const toDayUserCountResult = (await homeInfoService.getTodayUserCount()) as [any];
      result.addUserCount = toDayUserCountResult[0].addUserCount;

      // 七天新增动态
      const date = getLastDays(7)
      let addDynamicNumberList = [];
      for(let i = 0; i < 7; i++) {
        const number = await homeInfoService.getAddDynamicList(date[i]) as any
        addDynamicNumberList.push({
          date: date[i],
          count: number[0].count
        })
      }
      result.addDynamicList = addDynamicNumberList as any;

      // 七天新增访问统计
      const resultPageView = await homeInfoService.getPageView() as [];
      result.pageViewInfo = resultPageView;
      ctx.app.emit("response", types.GET_BANNER_LIST_SUCCESS, ctx, result);

      // 任务列表
      const taskList = await taskInfoService.getTaskList() as any;
      result.taskList = taskList;
    } catch (err) {
      let error = new Error(types.GET_BANNER_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new AdminHomeInfo();
