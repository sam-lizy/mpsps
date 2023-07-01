const connection = require('../app/database')
class UserService{
    async create(user){
        const {name,password} = user
        const statement = `INSERT INTO users(name,password) VALUES(?,?);`
        const result = await connection.execute(statement,[name,password]) 
        return result[0]
    }
    async getUserByname(name){
        const statement = `SELECT * FROM users WHERE name = ? ;`
        const result = await connection.execute(statement,[name])
        return result[0]
    }
    async updateAvatar(user_id,avatar_url){
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ?; `
        const [result] = await connection.execute(statement,[avatar_url, user_id])
        return result
    }
}
module.exports = new UserService()