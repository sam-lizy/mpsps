const userservice  = require('../service/user.service')
const fileService = require('../service/file.service')
const fs = require('fs')
class UserControler{
    async create(ctx,next){
       const user = ctx.request.body
       const result = await userservice.create(user)
       ctx.body = result
    }
    async avatarInfo(ctx,next){
        const {user_id} = ctx.params
        const avatarInfo = await fileService.getAvatarInfo(user_id)
        ctx.response.set("content-type",avatarInfo.mimetype)
        ctx.body = fs.ReadStream(`./uploads/avatar/${avatarInfo.filename}`)
    }
}

module.exports = new UserControler()