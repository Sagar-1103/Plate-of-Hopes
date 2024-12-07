import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    postId:{
        type:Schema.Types.ObjectId,
        ref:"FoodPost",
        required:true,
    },
    consumerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    producerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

export const Booking = mongoose.model("Booking",bookingSchema);