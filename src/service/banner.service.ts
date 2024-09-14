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
  async updateBannerPictureInfo(
    mimetype: string,
    filename: string,
    size: string,
    userId: string,
    banner: string,
    id: number
  ) {
    const statement = `UPDATE file SET mimetype = ?, filename = ?, size = ?, userId = ?, banner = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      userId,
      banner,
      id
    ]);
    return result[0];
  }
  async deleteBanner(id: number) {
    const statement =  `DELETE FROM file WHERE id = ?;`
    const result = await connection.execute(statement, [id])
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
