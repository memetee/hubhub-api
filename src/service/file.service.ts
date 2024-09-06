import connection from "../app/database";
class FileService {
  async createAvatar(
    mimetype: string,
    filename: string,
    size: string,
    originalname: string,
    userId: string
  ) {
    const statement = `INSERT INTO avatar (filename, originalname, mimetype, size, userId) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      filename,
      originalname,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }

  async updateAvatar(
    mimetype: string,
    filename: string,
    size: string,
    originalname: string,
    userId: string
  ) {
    const statement = `UPDATE avatar SET filename = ?, originalname = ?, mimetype = ?, size = ? WHERE userId = ?`;
    const result = await connection.execute(statement, [
      filename,
      originalname,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }

  // 获取头像信息
  async getAvatarInfoById(userId: string) {
    const statement = `SELECT * FROM avatar WHERE userId = ?;`;
    const result = await connection.execute(statement, [userId]);
    return result[0];
  }

  // 获取图片信息
  async getFileByFilename(filename: string) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const result = await connection.execute(statement, [filename]);
    return result[0];
  }
}

export default new FileService();
