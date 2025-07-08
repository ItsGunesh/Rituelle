import { model } from "mongoose"
import { ApiError } from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"

const userRegister = asyncHandler((req,res)=>{
    res.status(200).
    json({
        message:"ok"
    })

    const {username,email,password,fullName} = req.body
    console.log(email)

    if(username === ""){
        throw new ApiError(400,"Username required");
    }
    if(email === ""){
        throw new ApiError(400,"Email required");
    }
    if(password === ""){
        throw new ApiError(400,"Password required");
    }
    if(fullName === ""){
        throw new ApiError(400,"FullName required");
    }

    const existingUser = User.findOne({
        $or: [{username},{email}]
    })
    
    if(existingUser){
        throw new ApiError(409,"Username or email already exists")
    }

    const user = User.create({
        fullName,
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})



export {userRegister}