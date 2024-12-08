import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    role:{
        type: String,
        enum: ['Provider', 'Consumer'],
        required: true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        block:{
          type:String,
        },
        streetName:{
          type:String,
        },
        city:{
          type:String,
        },
        state:{
          type:String,
        },
        latitude:{
          type:Number,
        },
        longitude:{
          type:Number,
        }
    },
    verification_status:{
        type:Boolean,
        default:false,
    },
    profilePicture:{
        imageId:{
            type:String,
        },
        imageUrl:{
            type:String,
        }
    },
    documents:[
      {
        documentName:{
          type:String,
        },
        documentUrl:{
          type:String,
        },
        documentId:{
          type:String,
        }
      }
    ],
    password:{
        type:String,
        required:true,
    },
    refreshToken: {
      type: String,
    },
    ownerDetails:{
      name:{
          type:String,
      },
      phone:{
          type:String,
      },
      email:{
          type:String,
      }
  },
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };
  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };

export const User = mongoose.model("User",userSchema);

