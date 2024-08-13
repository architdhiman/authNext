import {connect} from "@/dbConfig/dbConfig"
import {NextRequest,NextResponse} from "next/server"
import jwt  from "jsonwebtoken"
const TOKEN_SECRET= "chaiaurcode"

connect()

export const getTokenData = (req:NextRequest) =>{
    try {
        const token = req.cookies.get("token")?.value|| ""
        const decodedToken:any = jwt.verify(token, TOKEN_SECRET!)
        return decodedToken.id
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": error, message:"getTokenData failed from cookies"})
    }
}