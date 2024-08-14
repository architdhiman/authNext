import {connect} from "@/dbConfig/dbConfig"
import {NextRequest,NextResponse} from "next/server"
import { getTokenData } from "@/helpers/tokenData"
import User from "@/models/userModel"

connect()

export async function POST(req:NextRequest)
{
    try {        
       const userId = await getTokenData(req)
       const user = await User.findOne({_id:userId}).select("-password")
       return NextResponse.json({user,message:"user found",success:"true"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error getting token for me page",error})
    }

}