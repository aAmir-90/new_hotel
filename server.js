import express from 'express';
const app = express();
import db from './db.js';
import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

import personRoutes from './routes/personRoutes.js';
app.use('/person', personRoutes);

import menuRoutes from './routes/menuRoutes.js'
app.use('/menu', menuRoutes);

app.get('/', (req, res)=>{
    res.send("Welcome in MongoDB Server of Hotel")
});

app.listen(PORT, ()=>{
    console.log("Listening on port: 5000")
});