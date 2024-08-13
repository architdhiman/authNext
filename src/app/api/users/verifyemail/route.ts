import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
connect()
export async function POST(request:NextRequest)
{
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: "User not found with the provided token",status:"400"})
        }
        // console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        return NextResponse.json({success:"user is verified now with the token given",status:"200"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"verifyemail not working",status:"400"})
    }
}