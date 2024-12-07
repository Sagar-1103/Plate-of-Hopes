import mongoose,{Schema} from "mongoose";

const foodPostSchema = new Schema({
    foodCategory:{
        type:String,
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
    location:{
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        }
    },
    status:{
        type:String,
        enum: ["Male", "Staged", "Other"],
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