import connection from "../app/database";
class labelService {
  // 创建标签
  async create(labelName: string) {
    const statement = "INSERT INTO `label` (name) VALUES (?);";
    const result = await connection.execute(statement, [labelName]);
    return result[0];
  }
  async getLabelNameByName(labelName: string) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const result = await connection.execute(statement, [labelName]);
    return result[0];
  }
  async list() {
    const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', l.name)) list FROM label l;`;
    const result = await connection.execute(statement);
    return result[0];
  }
}
export default new labelService();
