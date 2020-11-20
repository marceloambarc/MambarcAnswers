const Sequelize = require('sequelize');
const connection = require('./database');

//Create table
const Question = connection.define('question',{
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    description : {
        type : Sequelize.TEXT,
        allowNull : false
    }
});

Question.sync({ force : false }).then(() => {/*console.log("Table created!")*/});

module.exports = Question;