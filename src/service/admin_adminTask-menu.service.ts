import connection from "../app/database";
class HomeInfoService {
  // 创建任务
  async createTask(id:number, title: string, content: string, status: string) {
    const statement = `
      INSERT INTO task (userId, title, content, status) VALUES (?, ?, ?, ?);
    `
    const result = await connection.execute(statement, [id, title, content, status])
    return result[0]
  }
  // 更新任务
  async updateTask(id:number, status: string) {
    const statement = `
      UPDATE task SET status = ? WHERE id = ?;
    `
    const result = await connection.execute(statement, [status, id])
    return result[0]
  }

  // 获取任务列表
  async getTaskList() {
    const statement = `
      SELECT 
        task.id,
        task.title,
        task.content,
        task.createdAt AS createTime,
        task.status 
      FROM task 
      ORDER BY createdAt DESC;
    `
    const result = await connection.execute(statement);
    return result[0];
  }
}
export default new HomeInfoService();
