import mongoose,{Schema} from "mongoose";

const foodPostSchema = new Schema({
    foodCategory:{
        type:String,
        enum:["Veg","Non-Veg"],
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    shelfLife:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum: ["Float", "Stagged", "Freeze"],
    },
    images:[
        {
            imageId:{
                type:String,
            },
            imageUrl:{
                type:String,
            }
        }
    ],
    description:{
        type:String,
        required:true,
    },
    providerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
},{timestamps:true})

export const FoodPost = mongoose.model("FoodPost",foodPostSchema)