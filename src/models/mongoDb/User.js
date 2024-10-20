import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true,
    },
},  {timestamps:true});

UserSchema.set("toJSON",{
    transform(_doc, ret){
        delete ret.password
    }
})

const User = mongoose.model('User', UserSchema);
export default User;