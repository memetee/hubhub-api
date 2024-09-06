import { Context } from "koa";
import { AlertContent } from "../types/alert-content";
const alertContent: AlertContent = {
  momentUpdate: {
    success: "动态更新成功~",
    error: "动态更新失败~",
  },
  momentDelete: {
    success: "动态删除成功~",
    error: "动态删除失败~",
  },
  momentCreate: {
    success: "动态创建成功~",
    error: "动态创建失败~",
  },
  commentUpdate: {
    success: "评论更新成功~",
    error: "评论更新失败~",
  },
  commentDelete: {
    success: "评论删除成功~",
    error: "评论删除失败~",
  },
  commentCreate: {
    success: "评论创建成功~",
    error: "评论创建失败~",
  },
  replayComment: {
    success: "回复评论成功~",
    error: "回复评论失败~",
  },
  labelCreate: {
    success: "标签创建成功~",
    error: "标签创建失败~",
  },
};

export function handleImpactRow(
  result: any,
  ctx: Context,
  type: keyof AlertContent
) {
  const responseObject = {
    status: 200,
    message: "success",
  };
  if ("affectedRows" in result) {
    if (result.affectedRows > 0) {
      ctx.body = {
        type: "success",
        status: 200,
        content: alertContent[type].success,
      };
    } else {
      ctx.body = {
        type: "error",
        status: 500,
        content: alertContent[type].error,
      };
    }
  } else {
    ctx.body = {
      content: alertContent[type].error,
    };
  }
  ctx.status = 200;
}
