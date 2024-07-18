require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  });

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.matchpassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

sequelize.sync();

module.exports = User;