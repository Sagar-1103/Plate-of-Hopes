import mongoose,{Schema} from "mongoose";

const chatNotificationSchema = new Schema ({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    roomId:{
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required:true
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    readStatus:{
        type: Boolean,
        default:false
    }
},{timestamps:true})

export const ChatNotification = mongoose.model("ChatNotification",chatNotificationSchema)