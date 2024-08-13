import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import {NextRequest,NextResponse} from "next/server"
import { sendEmail } from "@/helpers/mailer"

connect()

export async function POST(request: NextRequest)
{
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({username,email,password:hashedPassword})
        const savedUser = await newUser.save()

        await sendEmail({email:email,emailType:"VERIFY",userId:newUser._id})

        return NextResponse.json({success:true,message:"user registered successfully",savedUser})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error})
    }
}
