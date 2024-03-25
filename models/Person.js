import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    if(!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword

        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);

export default Person;