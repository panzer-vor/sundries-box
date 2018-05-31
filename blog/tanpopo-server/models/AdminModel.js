var Sequelize = require('sequelize')
var sequelize = require('./ModelHeader')
var AdminModel = sequelize.define('admins',{
    id:{type:Sequelize.BIGINT,primaryKey:true},
    username:{type:Sequelize.STRING,unique:true},
    password:Sequelize.STRING,
    role:Sequelize.TEXT('tiny')
},{
    timestamps:false,
});

module.exports = AdminModel;