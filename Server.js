const cookieParser = require('cookie-parser');
const express = require('express');
const fingoal = express();
const { Sequelize } = require('sequelize');
const authRoutes = require('./Routes/AuthRoutes');
require('dotenv').config()

fingoal.use(express.json());
fingoal.use(cookieParser());

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequelize.authenticate()
.then(() => console.log('PostgreSQL Connected!'))
.catch(err => console.error(err));

fingoal.use('/fingoal',authRoutes );

fingoal.listen(process.env.PORT, () => {
    console.log(`App Listening On http://localhost:${process.env.PORT}`)
})
