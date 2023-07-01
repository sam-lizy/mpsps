const { getFileByname } = require("../service/file.service");
const fs = require('fs')
const {
  insert,
  getmomentById,
  getmomentList,
  update,
  remove,
  getpersonalList,
  searchMoment,
  getmomentListByType
} = require("../service/moment.service");
class MomentControler {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content, title,type } = ctx.request.body;
    const result = await insert(id, title, content,type);
    if (result) {
      ctx.body = "发表成功";
    }
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    //查询数据
    const result = await getmomentById(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    
    const result = await getmomentList(offset, size);
    ctx.body = result;
  }
  async listByType(ctx, next) {
    const { offset, size,type } = ctx.query;
    console.log(0)
    const result = await getmomentListByType(offset, size,type);
    ctx.body = result;
  }
  async personallist(ctx,next){
    const {userId} = ctx.params
    const result = await getpersonalList(userId)
    ctx.body = result
  }
  async updata(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await update(momentId,content)
    ctx.body = result
  }
  async remove(ctx,next){
    const {momentId} = ctx.params
    const result = await remove(momentId)
    ctx.body = result
  }
  async fileInfo(ctx,next){
    const {filename} = ctx.params
    const fileinfo = await getFileByname(filename)
    ctx.response.set("content-type",fileinfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }
  async search(ctx,next){
    const {searchinfo} = ctx.request.body
    console.log(searchinfo)
    const result = await searchMoment(searchinfo)
    ctx.body = result
  }
}
module.exports = new MomentControler();
