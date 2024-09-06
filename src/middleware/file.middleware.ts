import Multer from "koa-multer";
import { AVATAR_PATH, PICTURE_PATH } from "../constants/file-path";
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
const avatarHandler = avatarUpload.single("avatar");
const pictureUpload = Multer({
  dest: PICTURE_PATH,
});
const pictureHandler = pictureUpload.array("picture", 9);
export { avatarHandler, pictureHandler };
