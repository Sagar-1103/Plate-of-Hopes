import mongoose,{Schema} from "mongoose";

const consumerSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

export const Consumer = mongoose.model("Consumer",consumerSchema);