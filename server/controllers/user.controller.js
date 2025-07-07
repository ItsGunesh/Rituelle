import {asyncHandler} from "../utils/asyncHandler.js"

const userRegister = asyncHandler((req,res)=>{
    res.status(200).
    json({
        message:"ok"
    })

    const {username,email,password,fullName} = req.body
    console.log(email)
})



export {userRegister}