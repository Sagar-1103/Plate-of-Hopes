import mongoose,{Schema} from "mongoose";

const providerSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    karmaPoints:{
        type:Number,
        default:0,
    },
    pureVeg:{
        type:Boolean,
        required:true,
    },
},{timestamps:true})

export const Provider = mongoose.model("Provider",providerSchema);
