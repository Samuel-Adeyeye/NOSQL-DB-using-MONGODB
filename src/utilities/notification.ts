import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendmail = async(from:string, to:string, subject:string, html:string)=>{
    try{
        const response = await transporter.sendMail({
            from: "samueladeyeye2012@gmail.com",
            to,
            subject: "Welcome",
            html
        })
    }catch(err){
        console.log(err)
    }
}

export const emailHtml = (email:string, password:string)=>{
    const mail = `<h3>Welcome to the Library Platform<h3><br>
    <h5>A new account has been created on your behalf and you have been issued a temporary password.<h5><br>
    <h5>Your current login information is now:</h5><br>
                    <p>Username: ${email}</p><br>
                    <p>Password : ${password}</p><br>
                    <p>(You will need to change your password when you login for the first time)</p><br>
                    <p>Thank You.</p>`

                    return mail
}