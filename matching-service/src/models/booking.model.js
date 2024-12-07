import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    postId:{
        type:Schema.Types.ObjectId,
        ref:"FoodPost",
        required:true,
    },
    status:{
        type:String,
        enum:[","],
        required:true,
    },
    bookingTime:{
        type:Date,
        required:true,
    },
    consumerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    notes:{
        type:String,
    }
},{timestamps:true})

export const Booking = mongoose.model("Booking",bookingSchema);