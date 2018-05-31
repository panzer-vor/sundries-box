var Sequelize = require('sequelize');
const sequelize = new Sequelize('tanpopo','root','root',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize