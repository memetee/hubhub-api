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
  async getDynamicList() {
    const statement = `
      SELECT 
        DATE(createdAt) AS date, 
        COUNT(*) AS count
      FROM moment
      WHERE createdAt >= NOW() - INTERVAL 7 DAY
      GROUP BY DATE(createdAt)
      ORDER BY date ASC;
    `
    const result = await connection.execute(statement);
    return result[0];
  }
  async getAddDynamicList(date: string) {
    const statement = `
      SELECT COUNT(*) as count
      FROM moment
      WHERE DATE(createdAt) = ?;
    `
    const result = await connection.execute(statement, [date]);
    return result[0];
  }
  async getPageView() {
    const statement = `
      SELECT
        DATE_FORMAT(log.createdAt, '%Y-%m-%d') as date, 
        SUM(CAST(log.count AS UNSIGNED)) as total_count 
      FROM visit_logs as log
      WHERE log.createdAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE_FORMAT(log.createdAt, '%Y-%m-%d')
      ORDER BY date;
    `
    const result = await connection.execute(statement);
    return result[0];
  }
}
export default new HomeInfoService();
