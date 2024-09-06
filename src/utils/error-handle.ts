import { RouterContext } from "koa-router";
import types from "../constants/index";
const errorHandle = (error: Error, ctx: RouterContext) => {
  let status, message;
  status = 422;
  switch (error.message) {
    // moment
    case types.CREATED_MOMENT_ERROR:
      message = "创建动态失败~";
      break;
    case types.GET_MOMENT_ERROR:
      message = "获取动态详情失败~";
      break;
    case types.GET_MOMENT_LIST_ERROR:
      message = "获取动态列表失败~";
      break;
    case types.UPDATE_MOMENT_ERROR:
      message = "更新动态失败~";
      break;
    case types.DELETE_MOMENT_ERROR:
      message = "删除动态失败~";
      break;
    case types.ADD_MOMENT_LABEL_ERROR:
      message = "新增动态标签失败~";
      break;

    // comment
    case types.CREATE_COMMENT_ERROR:
      message = "创建评论失败~";
      break;
    case types.REPLY_COMMENT_ERROR:
      message = "回复评论失败~";
      break;
    case types.UPDATE_COMMENT_ERROR:
      message = "更新评论失败~";
      break;
    case types.GET_COMMENT_LIST_ERROR:
      message = "获取评论列表失败~";
      break;
    case types.DELETE_COMMENT_ERROR:
      message = "删除评论失败~";
      break;

    // 标签
    case types.CREATE_LABEL_ERROR:
      message = "创建标签失败~";
      break;

    // 注册
    case types.USER_REGISTRY_ERROR:
      status = 500;
      message = "用户注册失败~";
      break;
    case types.UN_AUTHORIZATION:
      status = 401;
      message = "验证token失败~";
      break;

    // 上传
    case types.UPLOAD_AVATAR_ERROR:
      message = "头像上传失败~";
      break;
    case types.UPDATE_AVATAR_ERROR:
      message = "头像上传失败~";
      break;

    case types.GET_AVATAR_INFO_ERROR:
      message = 404;
      message = "获取头像信息失败~";
      break;
    case types.GET_IMAGE_INFO_ERROR:
      message = 404;
      message = "获取图片信息失败~";
      break;
    case types.UPLOAD_MOMENT_PICTURE_ERROR:
      message = 404;
      message = "动态图片上传失败~";
      break;
    case types.UPLOAD_BANNER_PICTURE_ERROR:
      message = 404;
      message = "轮播图上传失败~";
      break;

    // 轮播图
    case types.GET_BANNER_LIST_ERROR:
      message = 404;
      message = "获取轮播图列表失败~";
      break;

    // 标签
    case types.GET_LABEL_ERROR:
      message = "获取标签列表失败~";
      break;

    case types.IMAGE_IS_NULL:
      status = 404;
      message = "图片不存在~";
      break;

    // user
    case types.GET_USER_MOMENT_LIST_ERROR:
      message = "获取用户动态列表失败~";
      break;

    case types.UPDATE_USER_INFO_ERROR:
      message = "更新失败~";

    // 参数异常
    case types.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码为空~";
      break;
    case types.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在~";
      break;
    case types.USER_DOES_NOT_EXISTS:
      status = 404;
      message = "用户名不存在~";
      break;
    case types.PASSWORD_IS_INCORRECT:
      status = 401;
      message = "密码错误~";
      break;
    case types.ARGUMENT_EXCEPTION:
      status = 422;
      message = "参数异常~";
      break;
    case types.UN_PERMISSION:
      status = 401;
      message = "无权限~";
      break;

    default:
      status = 404;
      message = "not found~";
  }
  ctx.body = {
    status,
    message,
  };
  ctx.status = status;
};
export default errorHandle;
