import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    mobile:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        require: true
    }
});

const Person = mongoose.model('Person', personSchema);

export default Person;