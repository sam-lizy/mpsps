const { create, reply, update,remove,getcomment } = require("../service/comment.service");
class CommentControler {
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await create(id, momentId, content);
        ctx.body = result;
    }
    async reply(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } = ctx.user;
        const result = await reply(id, momentId, content, commentId);
        ctx.body = result;
    }
    async update(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await update(commentId, content);
        ctx.body = result
    }
    async remove(ctx,next){
        const {commentId} = ctx.params
        const result = await remove(commentId)
        ctx.body = result
    }
    async list(ctx,next){
        ctx.set("Access-Control-Allow-Origin", "*")
        const {momentId} = ctx.params
        const result = await getcomment(momentId)
        ctx.body = result
    }
}
module.exports = new CommentControler();
