const connection = require('../app/database')
class CommendService{
    async addCommend(id,momentId){
        const statement = `INSERT INTO commend (user_id,moment_id) VALUES ( ?, ?);`
        const [result] = await connection.execute(statement,[id,momentId])
        return result
    }
    async getCommendList(momentId){
        const statement = `SELECT * FROM commend WHERE moment_id = ?`
        const [result] = await connection.execute(statement,[momentId])
        return result
    }
}
module.exports = new CommendService()