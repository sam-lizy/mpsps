const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXIST,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  UNPERMISSION
} = require("../constants/err-types");
const { getUserByname } = require("../service/user.service");

const md5password = require("../utils/passwordHandler");
const {PUBLIC_KEY} = require('../app/config');
const { checkresource } = require('../service/auth.service');
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户是否存在
  const result = await getUserByname(name);
  const user = result[0];
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  }
  //判断密码一致性
  if (md5password(password) !== user.password) {
    const error = new Error(PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};
const verifyAuth = async (ctx,next)=>{
  //获取token
  const {authorization} = ctx.headers
  if(!authorization){
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit("error",error,ctx)
  }
  const token = authorization.replace("Bearer ","")
  try{
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    }) 
    console.log("验证授权")
    ctx.user = result
    await next()
  } catch (err){
    console.log(err)
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit("error",error,ctx)
  }
}
const verifyPermission =  async (ctx,next)=>{
    const [resoucekey] = Object.keys(ctx.params)
    const type = resoucekey.replace("Id","")
    const resouceId = ctx.params[resoucekey]
    const {id} = ctx.user
    const permisson = await checkresource(type,resouceId,id)
    if(!permisson){
      const error = new Error(UNPERMISSION)
      return ctx.app.emit("error",error,ctx)
    }
    await next()
  }

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
 