const router = require('koa-router')()
let Services = require('../services/services')
// router.prefix('/api')

router.get('/:name?/:method?',async (ctx,next)=>{
    let name = ctx.params.name || 'empty';
    let method = ctx.params.method || 'empty'

    try{
        let service = new Services[`${name}Service`]()
        await service[method](ctx)
    }catch(err){
        let service = new Services[`emptyService`]()
        await service['out'](ctx)
    }
    return
})

router.post('/:name?/:method?',async (ctx,next)=>{
    let name = ctx.params.name || 'empty';
    let method = ctx.params.method || 'empty'
    let service = new Services[`${name}Service`]()
    if(!Services[`${name}Service`]){
        service = new Services.emptyService()
    }
    await service[method](ctx)
    return


})

module.exports = router