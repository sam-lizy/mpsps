const connection = require('../app/database')
class MomentService{
    async insert(id,title,content,type){
        const statement = `	INSERT INTO moment (user_id,title,content,type) VALUES (? ,? ,?,?);`
        const [result] = await connection.execute(statement,[id,title,content,type])
        return result
    }
    async getmomentById(id){
        const statement =`SELECT moment.id,JSON_OBJECT("id",users.id,"name",users.name,"avatar",avatar_url) user, moment.title,moment.type,moment.createAt,moment.updateAt,moment.content,
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8888/moment/images/",file.filename)) FROM file WHERE moment.id = file.moment_id) images 
        FROM moment  
        JOIN users ON moment.user_id = users.id WHERE moment.id = ?;`
        const result = await connection.execute(statement,[id])
        return result[0][0]
    }
    async getmomentList(offset,size){
        const statement = `SELECT moment.id,JSON_OBJECT("id",users.id,"name",users.name,"avatar",avatar_url) user, 
        moment.title,moment.createAt,moment.updateAt,moment.content,moment.type,(SELECT COUNT(*) FROM comment WHERE comment.moment_id = moment.id) AS countnum
        FROM moment  JOIN users 
        ON moment.user_id = users.id ORDER BY moment.id DESC LIMIT ?,? ;`
        const result = await connection.execute(statement,[offset,size])
        return result[0]
    }
    async getmomentListByType(offset,size,type){
        const statement = `SELECT moment.id,JSON_OBJECT("id",users.id,"name",users.name,"avatar",avatar_url) user, 
        moment.title,moment.createAt,moment.updateAt,moment.content,moment.type,(SELECT COUNT(*) FROM comment WHERE comment.moment_id = moment.id) AS countnum
        FROM moment  JOIN users 
        ON moment.user_id = users.id  Where moment.type = ? ORDER BY moment.id DESC LIMIT ?,? ;`
        const result = await connection.execute(statement,[type,offset,size])
        console.log(result[0])
        return result[0]
    }
    async getpersonalList(userId){
        const statement = `SELECT * FROM moment WHERE user_id = ?;`
        const result = await connection.execute(statement,[userId])
        return result[0]
    }
    async update(momentId,content){
        const statement = `UPDATE moment SET content = ? WHERE id = ? ;`
        const [result] = await connection.execute(statement,[content,momentId])
        return result
    }
    async remove(momentId){
        const statement = `DELETE FROM moment WHERE id = ? ;`
        const [result] = await connection.execute(statement,[momentId])
        return result 
    }
    async searchMoment(info){
        const statement = `SELECT id,title FROM moment WHERE content LIKE ?;`
        const result = await connection.execute(statement,[`%${info}%`])
        return result[0]
    }
    

}
module.exports = new MomentService()