import { APP_HOST, APP_PORT } from "../app/config";
import connections from "../app/database";
class UserService {
  async create(id: string, content: string, momentId: string) {
    const statement =
      "INSERT INTO `comment` (content, momentId, userId) VALUES (?,?,?);";
    const result = await connections.execute(statement, [
      content,
      momentId,
      id,
    ]);
    return result[0];
  }
  async reply(
    id: string,
    content: string,
    momentId: string,
    commentId: string
  ) {
    const statement =
      "INSERT INTO `comment` (content, momentId, userId, commentId) VALUES (?,?,?,?);";
    const result = await connections.execute(statement, [
      content,
      momentId,
      id,
      commentId,
    ]);
    return result[0];
  }
  async update(content: string, commentId: string) {
    const statement = "UPDATE comment SET content = ? WHERE id = ?;";
    const result = await connections.execute(statement, [content, commentId]);
    return result[0];
  }
  async delete(commentId: string) {
    const statement = "DELETE FROM comment WHERE id = ?;";
    const result = await connections.execute(statement, [commentId]);
    return result[0];
  }
  async list(momentId: string, offset: string, size: string) {
    const statement = `
    SELECT IFNULL(JSON_ARRAYAGG(JSON_OBJECT(
      'id', c.id,
      'content', c.content,
      'commentId', c.commentId,
      'createTime', c.createdAt,
      'updateTime', c.updatedAt,
      'author', JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl)),
      'reply', (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
          'id', cr.id,
          'content', cr.content,
          'createTime', cr.createdAt,
          'updateTime', cr.updatedAt,
          'author', JSON_OBJECT('id', ur.id, 'name', ur.name, 'avatarUrl', ur.avatarUrl)
          ))
        FROM comment cr
        LEFT JOIN user ur ON cr.userId = ur.id
        WHERE c.id = cr.commentId
        ),
      'images', IFNULL((
        SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/image', file.filename))
        FROM file
        WHERE file.commentId = c.id), JSON_ARRAY()
        )
    )), JSON_ARRAY()) AS list,
    (SELECT COUNT(*) FROM comment WHERE momentId = ? AND commentId IS NULL) AS commentCount
    FROM (
      SELECT * FROM comment
      WHERE momentId = ? AND commentId IS NULL
      ORDER BY createdAt DESC
      LIMIT ?, ?  -- Adjust this for pagination
    ) c
    LEFT JOIN user u ON c.userId = u.id;
    `;
    const result = await connections.execute(statement, [
      momentId,
      momentId,
      offset,
      size,
    ]);
    return result[0];
  }
}
export default new UserService();
