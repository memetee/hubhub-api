import { APP_HOST, APP_PORT } from "../app/config";
import connection from "../app/database";
class BannerService {
  async saveBannerPictureInfo(
    mimetype: string,
    filename: string,
    size: string,
    userId: string,
    banner: string
  ) {
    const statement = `INSERT INTO file (filename, mimetype, size, userId, banner) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      banner,
    ]);
    return result[0];
  }
  async list(bannerType: string = "banner") {
    const statement = `SELECT
    JSON_ARRAYAGG(JSON_OBJECT(
    'id', file.id,
    'bannerUrl', CONCAT('${APP_HOST}:${APP_PORT}/image/',file.filename)
    )) list
    FROM file WHERE file.banner = 'banner';`;
    const result = await connection.execute(statement, [bannerType]);
    return result[0];
  }
}
export default new BannerService();
