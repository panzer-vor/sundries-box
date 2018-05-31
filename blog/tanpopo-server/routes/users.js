const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async (ctx,next)=>{

})

router.get('/index',async(ctx,next)=>{
    let loginbean = ctx.session.loginbean

    ctx.body = loginbean
})
module.exports = router
