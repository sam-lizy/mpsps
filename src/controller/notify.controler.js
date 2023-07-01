const {getList,addNotify,delNotify,addChatList,getChatList,readedChatList,delAllByType} = require('../service/notify.service')
class NotifyControler {
    async notifyList(ctx,next){
        const {id} = ctx.user
        const result = await getList(id)
        ctx.body = result
    }
    async addnotify(ctx,next){
        const {momentId,masterid,type} = ctx.request.body
        const replyid = ctx.user.id
        const result = await addNotify(momentId,masterid,replyid,type)
        ctx.body = result
    }
    async getChatList(ctx,next){
        const {id} = ctx.user
        const result = await getChatList(id)
        ctx.body = result
    }
    async addChatList(ctx,next){
        const from_id = ctx.user.id
        const {to_id} = ctx.params
        console.log('----------------------------------')
        const result = await addChatList(from_id,to_id)
        ctx.body = result
    }
    async readedChatList(ctx,next){
        const {from_id} = ctx.params
        const to_id = ctx.user.id
        const result = await readedChatList(from_id,to_id)
        ctx.body = result
    }
    async deletenotify(ctx,next){
        const {id} = ctx.params
        const result = await delNotify(id)
        ctx.body = result
    }
    async delAllByType(ctx,next){
        const {id} = ctx.user
        const {type} = ctx.query
        const result = await delAllByType(id,type)
        ctx.body = result
    }
} 
module.exports = new NotifyControler()