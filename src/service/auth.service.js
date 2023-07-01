const connection = require("../app/database");
class AuthSerivce {
  async checkresource(type,id, user_id) {
    console.log(type,id,user_id)
    const statement = `SELECT * FROM ${type} WHERE user_id = ? AND id = ?;`;
    const [result] = await connection.execute(statement, [user_id, id]);
    return result.length > 0 ? true : false;
  }

}
module.exports = new AuthSerivce();
