const {getCommendList,addCommend} = require('../service/commend.service')
class CommendControl {
    async addCommend(ctx,next){
        const {id} = ctx.user
        const {momentId} = ctx.request.body
        const result = await addCommend(id,momentId)
        ctx.body = result
    }
    async getCommendList(ctx,next){
        const {momentId} = ctx.params
        const result = await getCommendList(momentId)
        ctx.body = result
    }
}
module.exports = new CommendControl(); 
