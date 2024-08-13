import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import {NextRequest,NextResponse} from "next/server"
import jwt from "jsonwebtoken"
const TOKEN_SECRET= "chaiaurcode"
connect()

export async function POST(reqBody: NextRequest) {
    try {
        const reqbody = await reqBody.json();
        const { email, password } = reqbody;
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", status: 400 });
        }
        console.log("User exists");

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Password mismatch", status: 400 });
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Sign the token
        const token = jwt.sign(tokenPayload, TOKEN_SECRET, { expiresIn: '6d' });

        // Set the token in the cookie
        const response = NextResponse.json({ message: "Logged in successfully", success: true });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures cookies are sent only over HTTPS in production
            maxAge: 6 * 24 * 60 * 60, // 6 days in seconds
            path: "/", // Cookie available on everywhere
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error has occurred", error, status: 400 });
    }
}