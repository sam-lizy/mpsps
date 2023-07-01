const connection = require("../app/database");
class CommentService {
  async create(id, momentId, content) {
    try {
      const statement = `INSERT INTO comment (user_id,moment_id,content) VALUES ( ?, ?, ?);`;
      const [result] = await connection.execute(statement, [
        id,
        momentId,
        content,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async reply(id, moment_id, content, comment_id) {
    try {
      const statement = `INSERT INTO comment (user_id,moment_id,content,comment_id) VALUES ( ?, ?, ?,?);`;
      const [result] = await connection.execute(statement, [
        id,
        moment_id,
        content,
        comment_id,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async update(comment_id, content) {
    const statement = `UPDATE comment SET content = ? WHERE comment_id = ?;`;
    const [result] = await connection.execute(statement, [content, comment_id]);
    return result;
  }
  async remove(comment_id) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [comment_id]);
    return result;
  }
  async getcomment(momentId) {
    try {
      const statement = `SELECT comment.id ,comment.content , comment.createAt,
        comment.comment_id ,JSON_OBJECT("id",users.id,"name",users.name,"avatar",avatar_url) AS user FROM comment LEFT JOIN users  ON comment.user_id = users.id WHERE moment_id = ?;;`;
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CommentService();
