import { APP_HOST, APP_PORT } from "../app/config";
import connection from "../app/database";
class UserService {
  async create(id: string, content: string) {
    const statement = "INSERT INTO `moment` (userId, content) VALUES (?,?);";
    const result = await connection.execute(statement, [id, content]);
    return result[0];
  }
  async detail(momentId: string) {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createdAt createTime,
        m.updatedAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl)) author,
        IFNULL(
          ( SELECT
            JSON_ARRAYAGG(l.name)
            FROM moment_label ml
            LEFT JOIN label l ON ml.labelId = l.id
            WHERE m.id = ml.momentId
          ), JSON_ARRAY()
        ) labels,
        IFNULL((SELECT JSON_ARRAYAGG( CONCAT('${APP_HOST}:${APP_PORT}/image',file.filename)) FROM file WHERE file.momentId = m.id), JSON_ARRAY()) images
      FROM moment m
      LEFT JOIN user u ON m.userId = u.id
      WHERE m.id = ?;
    `;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async list(offset: string, size: string) {
    const statement = `
      SELECT
          m.id id,
          m.content content,
          m.createdAt createTime,
          m.updatedAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl)) author,
          (SELECT COUNT(*) FROM comment c WHERE c.momentId = m.id AND c.commentId IS NULL) commentCount,
          IFNULL(
            ( SELECT
              JSON_ARRAYAGG(l.name)
              FROM moment_label ml
              LEFT JOIN label l ON ml.labelId = l.id
              WHERE m.id = ml.momentId
            ), JSON_ARRAY()
          ) labels,
          IFNULL((SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/image', file.filename)) FROM file WHERE file.momentId = m.id), JSON_ARRAY()) images
      FROM moment m
      LEFT JOIN user u ON m.userId = u.id
      ORDER BY createTime DESC 
      LIMIT ?, ?;
    `;
    const result = await connection.execute(statement, [offset, size]);
    return result;
  }
  async hotList(offset: string, size: string) {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createdAt createTime,
        m.updatedAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl)) author,
        (SELECT COUNT(*) FROM comment c WHERE c.momentId = m.id AND c.commentId IS NULL) commentCount,
        IFNULL(
            ( SELECT
                JSON_ARRAYAGG(l.name)
                FROM moment_label ml
                LEFT JOIN label l ON ml.labelId = l.id
                WHERE m.id = ml.momentId
            ), JSON_ARRAY()
        ) labels,
        IFNULL((SELECT JSON_ARRAYAGG( CONCAT('${APP_HOST}:${APP_PORT}/image',file.filename)) FROM file WHERE file.momentId = m.id), JSON_ARRAY()) images
      FROM moment m
      LEFT JOIN user u ON m.userId = u.id
      WHERE (SELECT COUNT(*) FROM comment c WHERE c.momentId = m.id) > 0
      ORDER BY commentCount DESC
      LIMIT 0, 10;
    `;
    const result = await connection.execute(statement, [offset, size]);
    return result;
  }
  async update(content: string, momentId: string) {
    const statement = "UPDATE moment SET content = ? WHERE id = ?;";
    const result = await connection.execute(statement, [content, momentId]);
    return result[0];
  }
  async remove(momentId: string) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async getMomentLabelById(momentId: string, labelId: string) {
    const statement =
      "SELECT * FROM MOMENT_LABEL WHERE momentId = ? AND labelId = ?;";
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }
  async createMomentLabel(momentId: string, labelId: string) {
    const statement =
      "INSERT INTO moment_label (momentId, labelId) values (?, ?);";
    const result = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }
  async saveMomentPictureInfo(
    mimetype: string,
    filename: string,
    size: string,
    userId: string,
    momentId: string
  ) {
    const statement = `INSERT INTO file (filename, mimetype, size, userId, momentId) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId,
    ]);
    return result[0];
  }
}
export default new UserService();
