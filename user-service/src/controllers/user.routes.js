import { AsyncHandler } from "../shared/utils/AsyncHandler.js"
import { ApiError } from "../shared/utils/ApiError.js";
import { ApiResponse } from "../shared/utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary,deleteFromCloudinary} from "../shared/utils/cloudinary.js"
import jwt from "jsonwebtoken";
import { Provider } from "../models/provider.model.js";
import {Consumer} from "../models/consumer.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const loggedUser = await User.findById(userId);
      const accessToken = loggedUser.generateAccessToken();
      const refreshToken = loggedUser.generateRefreshToken();
  
      loggedUser.refreshToken = refreshToken;
      await loggedUser.save({ validateBeforeSave: "false" });
      return { accessToken, refreshToken, loggedUser };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access tokens"
      );
    }
  };

const consumerSignup = AsyncHandler(async(req,res)=>{
    const {name,email,phone,address,password,ownerDetails} = req.body;
    
    if(!name && !email && !phone && !address && !password && !ownerDetails) {
        throw new ApiError(400,"All fields are required");
    }

    const files = await req?.files;
    const profileImage = await files?.profilePicture;
    const documents = await files?.documents;

    if(!profileImage){ 
        throw new ApiError(400,"Please upload the Profile Photo.");
    }
    if(!documents){ 
        throw new ApiError(400,"Please upload the Documents.");
    }
    
    const existingUser = await User.findOne({$or:[{email}]});
    if(existingUser){
        throw new ApiError(409,"User with email already exists");
    }

    const profilePhoto = await uploadOnCloudinary(profileImage?.[0]?.path);
    if(!profilePhoto){
        throw new ApiError(500,"Some error occured while uploading profilePhoto to server");
    }
    const profilePicture = {imageId:profilePhoto?.url,imageUrl:profilePhoto?.public_id};

    const docs = await Promise.all(
        documents.map(async (doc) => {
            const document = await uploadOnCloudinary(doc?.path);
            if (!document) {
                throw new ApiError(500, "Error occurred while uploading documents.");
            }
            return {
                documentName: document?.original_filename,
                documentUrl: document?.url,
                documentId: document?.public_id,
            };
        })
    );

    const user = await User.create({role:"Consumer",name,email,phone,address,password,ownerDetails,profilePicture,documents:docs});
    if (!user) {
        throw new ApiError(500,"Something went wrong while creating the user.");
    }
    const consumer = await Consumer.create({userId:user._id});
    if (!consumer) {
        throw new ApiError(500,"Something went wrong while creating the consumer.");
    }
    return res.status(200).json(new ApiResponse(200,user,"Consumer registered Successfully"));
});

const producerSignup = AsyncHandler(async(req,res)=>{
    const {name,email,phone,address,password,ownerDetails,pureVeg} = req.body;
    
    if(!name && !email && !phone && !address && !password && !ownerDetails && !pureVeg) {
        throw new ApiError(400,"All fields are required");
    }

    const files = await req?.files;
    const profileImage = await files?.profilePicture;
    const documents = await files?.documents;

    if(!profileImage){ 
        throw new ApiError(400,"Please upload the Profile Photo.");
    }
    if(!documents){ 
        throw new ApiError(400,"Please upload the Documents.");
    }
    
    const existingUser = await User.findOne({$or:[{email}]});
    if(existingUser){
        throw new ApiError(409,"User with email already exists");
    }

    const profilePhoto = await uploadOnCloudinary(profileImage?.[0]?.path);
    if(!profilePhoto){
        throw new ApiError(500,"Some error occured while uploading profilePhoto to server");
    }
    const profilePicture = {imageId:profilePhoto?.url,imageUrl:profilePhoto?.public_id};

    const docs = await Promise.all(
        documents.map(async (doc) => {
            const document = await uploadOnCloudinary(doc?.path);
            if (!document) {
                throw new ApiError(500, "Error occurred while uploading documents.");
            }
            return {
                documentName: document?.original_filename,
                documentUrl: document?.url,
                documentId: document?.public_id,
            };
        })
    );

    const user = await User.create({role:"Provider",name,email,phone,address,password,ownerDetails,profilePicture,documents:docs});
    if (!user) {
        throw new ApiError(500,"Something went wrong while creating the user.");
    }
    const provider = await Provider.create({userId:user._id,pureVeg});
    if (!provider) {
        throw new ApiError(500,"Something went wrong while creating the provider.");
    }
    return res.status(200).json(new ApiResponse(200,user,"Provider registered Successfully"));
});

const loginUser = AsyncHandler(async (req, res) => { 
    const {email, password } = req.body;
  
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
  
    const user = await User.findOne({
      $or: [{ email }],
    });
  
    if (!user) {
      throw new ApiError(404, "User doesnt exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken, loggedUser } =
      await generateAccessAndRefreshTokens(user._id);
    loggedUser.password = undefined;
    loggedUser.refreshToken = undefined;

    let response;
    if(loggedUser.role==="Consumer"){
        response = { user: loggedUser, accessToken, refreshToken }
    }
    else {
        const provider = await Provider.findOne({userId:loggedUser?._id});
        response = { user: loggedUser,karmaPoints:provider.karmaPoints,pureVeg:provider.pureVeg, accessToken, refreshToken }
    }
  
    const options = {
      httpOnly: true,
      secure: true
    };
  
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          response,
          "User logged in successfully"
        )
      );
});

export {consumerSignup,producerSignup,loginUser};