import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    taste:{
        type: String,
        enum: ['spicy', 'sweet', 'sour'],
        require: true
    },
    price:{
        type: Number,
        require: true
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;