import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();


const transport = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS_GMAIL
    }
})


export { transport };