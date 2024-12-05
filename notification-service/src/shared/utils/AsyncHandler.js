import { ApiResponse } from "./ApiResponse.js";

const asyncHandler = (fn)=>async(req,res,next)=>{
  try {
    await fn(req,res,next)
  } catch (error) {
    res.status(error.statusCode||500).json(new ApiResponse(error.statusCode||500,undefined,error.message))
    }
  }
  
  export { asyncHandler };