const {getMessages,pubMessages} = require('../service/chat.service')
class ChatController{
    async getMessages(ctx,next){
        const {id}  = ctx.user
        const {friend_id} = ctx.query
        console.log(id,friend_id)
        const result = await getMessages(id,friend_id)
        ctx.body = result
    }
    async pubMessages(ctx,next){
        const from_id = ctx.user.id
        const {to_id} = ctx.query
        const {content} = ctx.request.body
        console.log(from_id,to_id,content)
        const result = await pubMessages(from_id,to_id,content)
        ctx.body = result
    }
}
module.exports = new ChatController() 