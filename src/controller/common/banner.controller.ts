import { Context, Next } from "koa";
import bannerService from "../../service/banner.service";
import types from "../../constants/index";
class Banner {
  async list(ctx: Context, next: Next) {
    let result = [];
    try {
      result = (await bannerService.list()) as any;
      ctx.app.emit("response", types.GET_BANNER_LIST_SUCCESS, ctx, result[0]);
    } catch (err) {
      let error = new Error(types.GET_BANNER_LIST_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
  async saveBannerPictureInfo(ctx: Context, next: Next) {
    const files = (ctx.req as any).files;
    const { id } = ctx.user;
    try {
      for (let file of files) {
        let { filename, mimetype, size } = file;
        await bannerService.saveBannerPictureInfo(
          mimetype,
          filename,
          size,
          id,
          "banner"
        );
      }
      ctx.app.emit("response", types.UPLOAD_BANNER_PICTURE_SUCCESS, ctx);
    } catch (err) {
      const error = new Error(types.UPLOAD_MOMENT_PICTURE_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
  async updateBannerPicture(ctx: Context, next: Next) {
    const files = (ctx.req as any).files;
    const bannerId = ctx.params.bannerId;
    const { id } = ctx.user;
    try {
      for (let file of files) {
        let { filename, mimetype, size } = file;
        await bannerService.updateBannerPictureInfo(
          mimetype,
          filename,
          size,
          id,
          "banner",
          bannerId
        );
      }
      ctx.app.emit("response", types.UPLOAD_BANNER_PICTURE_SUCCESS, ctx);
    } catch (err) {
      const error = new Error(types.UPLOAD_MOMENT_PICTURE_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }

  async deleteBannerPicture(ctx: Context, next: Next) {
    const id = ctx.params.bannerId;
    try {
      await bannerService.deleteBanner(id);
      ctx.app.emit("response", types.DELETE_BANNER_PICTURE_SUCCESS, ctx);
    } catch (err) {
      const error = new Error(types.UPLOAD_MOMENT_PICTURE_ERROR);
      ctx.app.emit("error", error, ctx);
    }

  }
}

export default new Banner();
