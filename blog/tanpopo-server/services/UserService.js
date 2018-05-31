const AdminModel = require('../models/AdminModel')


class UserService{
    constructor(){

    }
    async login(ctx){
        let res = {
            Code:0,
            BackData:null
        }
        let admin = {
            username:ctx.request.body.username,
            password:ctx.request.body.password
        }
        let rs = await AdminModel.findOne({where:admin})
        if(rs!=null){
            res.BackData = {
                id:rs.id,
                username:rs.username,
                role:rs.role
            };
            res.Code = 1
            ctx.session.loginbean = res.BackData;
        }
        ctx.body = res
    }
    async allAdmin(ctx){
        let res = {
            Code:0,
            BackData:null
        }
        let page = ctx.request.body.page
        let rs = await AdminModel.findAndCountAll({where:{$not:{id:ctx.request.body.id}},attributes:['username','id','role'],offset: ~~(8*page), limit: 8})
        if(rs!=null){
            res.BackData = rs
            res.StrCode = ctx.request.body
            res.Code = 1
        }
        ctx.body = res
    }
    async add(ctx){
        let res = {
            Code:0,
            BackData:null
        }
        let admin = {
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            role:0,
        }
        await AdminModel.create(admin)
        let rs = await AdminModel.findOne({where:admin,attributes:['id']})
        if(rs!=null){
            res.BackData = rs
            res.Code = 1
        }
        ctx.body = res
    }
    async edit(ctx){
        let res = {
            Code:0,
            BackData:null
        }
        let admin = {
            id:ctx.request.body.id,
            username: ctx.request.body.username,
            password: ctx.request.body.password,
        }
        await AdminModel.update(admin,{where:{id:admin.id}})
        let rs = await AdminModel.findOne({where:admin,attributes:['id','username','role']})
        if(rs!=null){
            res.BackData = rs
            res.Code = 1
        }
        ctx.body = res
    }
    async delete(ctx){
        let res = {
            Code:0,
            BackData:null
        }
        const id = ctx.request.body.id
        let admin = {
            id:id,
        }
        let userRole = AdminModel.findOne({where:admin,attributes:['role']})
        if(userRole.role===1){
            res.BackData = '不能删除博主！'
            res.Code = -2
        }else {
            let rs = await AdminModel.destroy({'where':{'id':id}});
            if(rs!=null){
                res.BackData = rs
                res.Code = 1
            }
        }

        ctx.body = res

    }
}

exports.service = UserService;