import { APP_HOST, APP_PORT } from "../app/config";
import connection from "../app/database";

class AuthService {
  async checkResource(resourceType: string, id: string, userId: string) {
    const statement = `SELECT * FROM ${resourceType} WHERE id = ? AND userId = ?;`;
    const result = await connection.execute(statement, [id, userId]);
    return result[0];
  }
  async getUserInfoById(userId: string) {
    const statement = `
    SELECT
      u.id id,
      u.name name,
      CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl) avatarUrl
    FROM user u WHERE id = ?;
    `;
    const result = await connection.execute(statement, [userId]);
    return result[0];
  }
}

export default new AuthService();
