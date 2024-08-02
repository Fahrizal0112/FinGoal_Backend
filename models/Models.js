require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        primaryKey:true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountType: {
        type: DataTypes.ENUM('Konservatif', 'Moderat', 'Agresif'),
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

});

const Question = sequelize.define ('Question', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    questionText:{
        type:DataTypes.STRING,
    },
});

const Answer = sequelize.define('Answer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    answerText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Questions',
            key: 'id',
        },
    },
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.matchpassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

sequelize.sync();

module.exports = {User, Question, Answer} ;
