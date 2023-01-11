import twilio from "twilio";
import dotenv from 'dotenv';

dotenv.config();


const cliente = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


export { cliente };