import {asyncHandler} from "../utils/asyncHandler.js"

const userRegister = asyncHandler((req,res)=>{
    res.status(200).
    json({
        message:"ok"
    })
})

export {userRegister}