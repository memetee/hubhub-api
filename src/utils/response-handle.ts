import types from "../constants/index";
import { Context } from "koa";
const responseHandle = (type: string, ctx: Context, data: any) => {
  let status, message;
  status = 200;
  switch (type) {
    case types.CREATED_MOMENT_SUCCESS:
      message = "创建动态成功~";
      break;
    case types.GET_MOMENT_SUCCESS:
      message = "获取动态详情成功~";
      break;
    case types.GET_MOMENT_LIST_SUCCESS:
      message = "获取动态列表成功~";
      break;
    case types.UPDATE_MOMENT_SUCCESS:
      message = "更新动态成功~";
      break;
    case types.DELETE_MOMENT_SUCCESS:
      message = "删除动态成功~";
      break;
    case types.ADD_MOMENT_LABEL_SUCCESS:
      message = "新增动态标签成功~";
      break;

    // comment
    case types.CREATED_COMMENT_SUCCESS:
      message = "创建评论成功~";
      break;
    case types.REPLY_COMMENT_SUCCESS:
      message = "回复评论成功~";
      break;
    case types.UPDATE_COMMENT_SUCCESS:
      message = "更新评论成功~";
      break;
    case types.DELETE_COMMENT_SUCCESS:
      message = "删除评论成功~";
      break;
    case types.GET_COMMENT_LIST_SUCCESS:
      message = "获取评论列表成功~";
      break;

    // author
    case types.AUTHOR_SUCCESS:
      message = "登录成功~";
      break;

    // 注册
    case types.USER_REGISTRY_SUCCESS:
      message = "注册成功~";
      break;

    // 标签
    case types.CREATE_LABEL_SUCCESS:
      message = "创建标签成功~";
      break;

    // 上传
    case types.UPDATE_AVATAR_SUCCESS:
      message = "头像更新成功~";
      break;
    case types.UPLOAD_AVATAR_SUCCESS:
      message = "头像上传成功~";
      break;
    case types.UPLOAD_MOMENT_PICTURE_SUCCESS:
      message = "动态图片上传成功~";
      break;
    case types.UPLOAD_BANNER_PICTURE_SUCCESS:
      message = "轮播图更新成功~";
      break;
    case types.DELETE_BANNER_PICTURE_SUCCESS:
      message = "轮播图删除成功~";
      break;

    // 标签
    case types.GET_LABEL_SUCCESS:
      message = "获取标签列表成功~";
      break;

    // user
    case types.GET_USER_MOMENT_LIST_SUCCESS:
      message = "获取用户动态列表成功~";
      break;

    case types.UPDATE_USER_INFO_SUCCESS:
      message = "更新成功~";
      break;

    // 轮播图
    case types.GET_BANNER_LIST_SUCCESS:
      message = "获取轮播图列表成功~";
      break;

    // 上传
    case types.GET_AVATAR_INFO_SUCCESS:
      message = "获取头像信息成功~";
      break;

    // admin
    // 记录访问成功
    case types.VISIT_LOG:
      message = "记录用户访问成功~";
      break;
      
    // 删除超过七天的访问记录
    case types.DEL_VISIT_LOG:
      message = "删除记录成功~";
      break;

    // 保存任务成功
    case types.SAVE_TASK_SUCCESS:
      message = "保存任务成功~";
      break;

    // 获取任务列表成功
    case types.GET_TASK_LIST_SUCCESS:
      message = "获取任务列表成功~";
      break;

    default:
      status = 404;
      message = "not found~";
  }
  ctx.body = {
    status: 200,
    message,
    data,
  };
  ctx.status = status;
};
export default responseHandle;
