const Router = require("koa-router");
const { create,avatarInfo } = require("../controller/user.controler");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const userRouter = new Router({
  prefix: "/users",
});
userRouter.post("/", verifyUser,handlePassword, create);
userRouter.get('/:user_id/avatar',avatarInfo)
module.exports = userRouter;
