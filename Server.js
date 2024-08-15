require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');
const authRoutes = require('./Routes/AuthRoutes');

const fingoal = express();

fingoal.use(express.json());
fingoal.use(cookieParser());

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequelize.authenticate()
    .then(() => console.log('PostgreSQL Connected!'))
    .catch(err => console.error('Error connecting to the database:', err));


sequelize.sync({ alter: true }) 
    .then(() => console.log('Models synchronized successfully'))
    .catch(err => console.error('Error syncing models:', err));

fingoal.use('/fingoal', authRoutes);

fingoal.listen(process.env.PORT, () => {
    console.log(`App Listening On http://0.0.0.0:${process.env.PORT}`);
});