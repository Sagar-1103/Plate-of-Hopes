import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    roomId:{
        type:Schema.Types.ObjectId,
        ref:"Room",
        required:true,
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    readStatus:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

export const Chat = mongoose.model("Chat",chatSchema);
