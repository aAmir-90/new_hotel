import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const mongoURL = process.env.MONGODB_URL_LOCAL;  
// const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected Server')
});


db.on('error', (err)=>{
    console.log('error', err)
});

db.on('disconnected', ()=>{
    console.log('Disconnected Server')
});

export default db;