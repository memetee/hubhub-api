import { APP_HOST, APP_PORT } from "../app/config";
import connection from "../app/database";
class HomeInfoService {
  async getDynamicCount() {
    const statement = `SELECT COUNT(*) AS count FROM moment`;
    const result = await connection.execute(statement);
    return result[0];
  }
  async getUserCount() {
    const statement = `SELECT COUNT(*) AS count FROM user`;
    const result = await connection.execute(statement);
    return result[0];
  }
  async getTodayDynamicCount() {
    const statement = `SELECT COUNT(*) AS addDynamicCount
      FROM moment
      WHERE DATE(createdAt) = CURDATE();`
    const result = await connection.execute(statement);
    return result[0];
  }
  async getTodayUserCount() {
    const statement = `SELECT COUNT(*) AS addUserCount
      FROM user
      WHERE DATE(createdAt) = CURDATE();`
    const result = await connection.execute(statement);
    return result[0];
  }
}
export default new HomeInfoService();
