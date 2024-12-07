import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    type: {
        type: String,
        enum: ["system", "booking", "reminder"], 
        required: true,
    },
    status: { 
        type: String, 
        enum: ["unread", "read"], 
        default: "unread" 
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)