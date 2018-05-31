var Sequelize = require('sequelize')
var sequelize = require('./ModelHeader')
var BlogModel = sequelize.define('blogs',{
    id:{type:Sequelize.BIGINT,primaryKey:true},
    article:Sequelize.STRING,
    title:Sequelize.STRING,
    time:Sequelize.DATE,
    avatar:Sequelize.STRING,
    keyword:Sequelize.STRING,
    music:Sequelize.STRING,
    info:Sequelize.STRING,
    sort:Sequelize.STRING,
},{
    timestamps:false,
});

module.exports = BlogModel;