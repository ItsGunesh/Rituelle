import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    // console.log("Token:", token);
    try {
        // console.log("Into JWT middleware")
        // console.log(req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log("Token Middleware")
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
            
            // return res.send(311)
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log("Middleware user:", user)
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
            // return res.send(312)
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(310, error?.message || "Invalid access token")
        // return res.send(313)
    }
    
})