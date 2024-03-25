import express from 'express';
const app = express();
import db from './db.js';
import dotenv from 'dotenv';
dotenv.config();
import passport from './auth.js';

import bodyParser from 'body-parser';
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

const logRequest = (req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res)=>{
    res.send("Welcome in MongoDB Server of Hotel")
});

import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js'

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, ()=>{
    console.log("Listening on port: 5000")
});
