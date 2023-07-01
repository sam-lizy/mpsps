const connection = require('../app/database')
class ChatService{
    async pubMessages(from_id,to_id,content){
        const statement = `INSERT INTO chat (from_id,to_id,content) VALUES ( ?, ?,?);`
        const [result] = await connection.execute(statement,[from_id,to_id,content])
        return result
    }
    async getMessages(user_id,friend_id){
        const statement = `SELECT chat.id,from_id,to_id,users.name AS name,createTime,avatar_url,content,users.id as user_id FROM chat RIGHT JOIN users ON chat.from_id = users.id 
        WHERE from_id = ? and to_id = ? or from_id = ? and to_id = ? ORDER BY chat.id DESC LIMIT 0,20`
        const [result] = await connection.execute(statement,[user_id,friend_id,friend_id,user_id])
        return result
    }
} 
module.exports = new ChatService()