const connection = require('../app/database')
class NotifyService{
    async getList(id){
        const statement = `SELECT users.name,users.id as replyid,notify.id,moment.id as momentid ,notify.createAt ,moment.title,notify.type FROM notify 
        LEFT JOIN  users ON notify.replyuser_id = users.id INNER JOIN moment  WHERE notify.masteruser_id = ? AND moment.id=notify.moment_id;`
        const result = await connection.execute(statement,[id])
        return result[0]
    }
    async addNotify(momentId,masterid,replyid,type){
        console.log(momentId,masterid,replyid,type)
        const statement = `INSERT INTO notify (moment_id,replyuser_id,masteruser_id,type) VALUES (?,?,?,?)`
        const result = await connection.execute(statement,[momentId,replyid,masterid,type])
        return result
    }
    async addChatList(from_id,to_id){
        try{
            const statement = `INSERT INTO chatlist (from_id,to_id,isReaded) VALUES (?,?,?)`
            const result = await connection.execute(statement,[from_id,to_id,false])
            return result
        }catch(error){
            console.log(error)
        }

    }
    async getChatList(id){
        try{
            const statement = `SELECT users.name,users.id ,users.avatar_url ,chatlist.createAt,chatlist.isReaded  FROM chatlist 
            LEFT JOIN  users ON chatlist.from_id = users.id WHERE chatlist.to_id = ?;`
            const result = await connection.execute(statement,[id])
            return result[0]
        }catch(error){
            console.log(error)
        }

    }
    async readedChatList(from_id,to_id){
        const statement = `UPDATE chatlist SET isReaded = TRUE WHERE from_id = ? AND to_id = ?;`
        console.log('--------------------')
        const result = await connection.execute(statement,[from_id,to_id])
        return result
    }
    async delNotify(id){
        const statement = `DELETE FROM notify WHERE id = ?;`
        const result = connection.execute(statement,[id])
        return result
    }
    async delAllByType(user_id,type){
        const statement = `DELETE FROM notify WHERE masteruser_id = ? AND type = ?;`
        const result = connection.execute(statement,[user_id,type])
        return result
    }
 
}
module.exports = new NotifyService()