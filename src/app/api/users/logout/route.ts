import {connect} from "@/dbConfig/dbConfig"
import {NextRequest,NextResponse} from "next/server"

connect()

export async function GET(req:NextRequest)
{
    try {
        const response = NextResponse.json({
            message:"Logged out successfully",
            status: 200
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error wile logout"})
    }
}