import { Model, Schema } from "mongoose";
import mongoose ,{Document} from "mongoose";

interface Iuser extends Document{
    name: string;
    email: string;
    password: string;
    createdAt:string;
    isAdmin: boolean;
}

const userSchema=new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
        email:{
        type:String,
        required:true,
        trim:true,
        unique:true
        },
            password:{
            type:String,
            required:true,
            trim:true
            },
                isAdmin:{
                type: Boolean,
                default: false },

})
const Usermodel :Model<Iuser>=mongoose.model<Iuser>("User",userSchema)
export default Usermodel