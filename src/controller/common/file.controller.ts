import {
  GET_IMAGE_INFO_ERROR,
  IMAGE_IS_NULL,
} from "../../constants/error-types";
import fs from "fs";
import { Context, Next } from "koa";
import fileService from "../../service/file.service";
import { PICTURE_PATH } from "../../constants/file-path";
class File {
  async fileInfo(ctx: Context, next: Next) {
    let { filename } = ctx.params;
    try {
      filename = filename.split(".").shift();
      const fileInfo = (await fileService.getFileByFilename(filename)) as any;
      if (fileInfo[0]) {
        ctx.response.set("content-type", fileInfo[0].mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
      } else {
        let error = new Error(IMAGE_IS_NULL);
        ctx.app.emit("error", error, ctx);
      }
    } catch (err) {
      let error = new Error(GET_IMAGE_INFO_ERROR);
      ctx.app.emit("error", error, ctx);
    }
  }
}
export default new File();
