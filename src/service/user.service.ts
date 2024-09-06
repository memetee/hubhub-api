import { Context } from "koa";
import { user } from "../types";
import connection from "../app/database";
import { APP_HOST, APP_PORT } from "../app/config";
class UserService {
  async create(ctx: Context) {
    const user = ctx.request.body as user;
    const name = user.name;
    const password = user.password;
    // 将user存储到数据库中
    const avatarUrl = `user/default/avatar`;
    const statement0 = `INSERT INTO user (name,password,avatarUrl) value (?,?,?);`;
    const result = await connection.execute(statement0, [
      name,
      password,
      avatarUrl,
    ]);
    return result[0];
  }

  async updateUserAvatarUrl(url: string, id: string) {
    const statement = `UPDATE user SET avatarUrl = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [url, id]);
    return result[0];
  }

  // 判断是否已存在用户名
  async getUserByName(name: string) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async getMomentListByUserId(userId: String, offset: String, size: String) {
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
      WHERE ? = m.userId
      ORDER BY createTime DESC
      LIMIT ?, ?;
    `;
    const result = await connection.execute(statement, [userId, offset, size]);
    return result[0];
  }

  async uploadUsername(userId: String, username: String) {
    const statement = `UPDATE user SET name = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [username, userId]);
    return result[0];
  }
}
export default new UserService();
