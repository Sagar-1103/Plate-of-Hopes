import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    participants:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        }
    ]
}, { timestamps: true });

export const Room = mongoose.model("Room",roomSchema);
