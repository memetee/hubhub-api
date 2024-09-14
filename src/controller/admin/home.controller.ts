import { Context, Next } from "koa";
import types from "../../constants/index";
import homeInfoService from "../../service/admin_homeInfo.service";
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

      const resultPageView = await homeInfoService.getPageView() as [];
      result.pageViewInfo = resultPageView;
      ctx.app.emit("response", types.GET_BANNER_LIST_SUCCESS, ctx, result);
    } catch (err) {
      let error = new Error(types.GET_BANNER_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}

export default new AdminHomeInfo();
