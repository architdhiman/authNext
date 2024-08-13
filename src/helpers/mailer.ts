import  bcryptjs  from 'bcryptjs';
import User from '@/models/userModel';
import nodemailer from 'nodemailer'
const DOMAIN = "http://localhost:3000"

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
      console.log("sendEmail has been called")
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType==="VERIFY")
        { 
          await User.findByIdAndUpdate(userId,{ $set: {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+36000000}})
        }
        else if(emailType==="RESET")
        {
          await User.findByIdAndUpdate(userId,{ $set: {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+36000000}})
        }

        var forgotPasswordHtml = `<p>CLick <a href ="${DOMAIN}/forgotpassword?token=${hashedToken}"> here </a> to ${emailType==="VERIFY" ?"verify your email" : "reset your password"}
            </p> or copy paste this url to your browser ${DOMAIN}/forgotpassword?token=${hashedToken}}`

        const verifyemailHtml = `<p>CLick <a href ="${DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType==="VERIFY" ?"verify your email" : "reset your password"}
            </p> or copy paste this url to your browser ${DOMAIN}/verifyemail?token=${hashedToken}}`

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "76fa852d461ee8",
            pass: "e720814846a73b"
          }
        });
          const mailOptions = {
            from: 'architowner@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "verify your email" : "Reset your password",
            html: `${emailType === "VERIFY" ? verifyemailHtml : forgotPasswordHtml} `,
          }
          const mailResponse = await transport.sendMail(mailOptions)
          // console.log(mailResponse)
          return mailResponse

    }catch(error)
    {
     
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
}