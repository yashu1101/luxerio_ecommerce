import dotenv from 'dotenv'
dotenv.config()
import { Resend } from 'resend';


export const ResendMail = async ({ to, message }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            from: 'Luxerio <onboarding@resend.dev>',
            to: [to],
            subject: 'Reset password',
            html: `<div >
           <p>Your password reset otp is:</p>
           <div style="padding: 10px; background-color: #0094ff; font-size: 1.3rem; font-weight: 500; text-align: center; letter-spacing: 3px;" >${message}</div>
           <div>It is valid for 10 minutes</div>
           
           </div>`
        })

        console.log("otp sent successfully.")

        if (error) console.log(error || "Otp not sent.")

    } catch (error) {
        console.log(error?.message || error)
    }
}






