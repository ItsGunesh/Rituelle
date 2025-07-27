import { model } from "mongoose"
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import {ApiResponse} from "../utils/apiResponse.js"


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        console.log(user)
        const accessToken = user.generateAccessToken()
        console.log(accessToken)
        const refreshToken = user.generateRefreshToken()
        console.log(refreshToken)

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token" , error)
    }



}

const userRegister = asyncHandler(async (req, res) => {
    try {
        // res.status(200).
    //     json({
    //         message: "ok"
    //     })

    // console.log(req.body)

    const { username, email, password, fullName } = req.body
    console.log(email)

    // if(username === ""){
    //     throw new ApiError(400,"Username required");
    // }
    // if(email === ""){
    //     throw new ApiError(400,"Email required");
    // }
    // if(password === ""){
    //     throw new ApiError(400,"Password required");
    // }
    // if(fullName === ""){
    //     throw new ApiError(400,"FullName required");
    // }

    if (
        [fullName, email, username, password].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

    return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, accessToken, refreshToken },
        "User registered and logged in successfully"
      )
    );
    } catch (error) {
        console.log("Error while Sign in due to",error.message)
        res.status(400).json(
                new ApiResponse(400,error.message)
            )
    }
})


const userLogin = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is missing")
    }

    if (!password) {
        throw new ApiError(400, "Password is missing")
    }

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(404, "User doesnot exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' //study this
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
    } catch (error) {
        console.log("Error while logging in due to",error.message)
        res.status(400).json(
                new ApiResponse(400,error.message)
            )
    }
})

const logoutUser = asyncHandler(async(req, res) => {
    try {
        await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite:'none'
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
    } catch (error) {
        res.send(501).json(
            new ApiResponse(500,"Error while signout")
        )
    }
})

const getUser = asyncHandler(async(req,res)=>{
    try {
        const userId = req.query.userId
        console.log(userId)

        const user = await User.findById(`${userId}`)
        console.log(user)
        const username = user.username

        res.status(200).json(
            new ApiResponse(200,username,"Username fetched sucessfully")
        )
    } catch (error) {
        console.log("Error while fetching username - Backend",error)
    }
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


export {
    userRegister,
    userLogin,
    logoutUser,
    refreshAccessToken,
    getUser
}