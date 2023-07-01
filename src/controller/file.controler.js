const { APP_PORT,APP_HOST } = require('../app/config')
const {createAvatar,createFile} = require('../service/file.service')
const { updateAvatar } = require('../service/user.service')
class FileControler {
    async saveAvatarInfo(ctx,next){
        console.log(ctx.req.file) 
        const {filename,mimetype,size} = ctx.req.file
        const {id} = ctx.user 
        const result = await createAvatar(filename,mimetype,size,id)
        const avatarurl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await updateAvatar(id,avatarurl)
        ctx.body = `上成`

    }
    async savePictureInfo(ctx,next){
        const files = ctx.req.files
        const {id} = ctx.user
        const {momentId} = ctx.query
        for (let file of files){
            const {filename,mimetype,size} = file
            await createFile(filename,mimetype,size,id,momentId)
        }
        ctx.body = `上传成功`
    }
}
module.exports = new FileControler()