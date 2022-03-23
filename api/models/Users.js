import mongoose from 'mongoose';


const { Schema } = mongoose;

const userSchema = new Schema({
    name:  String, 
    surname: String,
    email:   String,
    password: String,
    age: Number,
});

export default mongoose.model('user', userSchema)