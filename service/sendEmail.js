//To send Forget Password Emails 
const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT ,SMTP_EMAIL , SMTP_PASSWORD ,SMTP_FROM_EMAIL} = require("../utils/constant");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASSWORD
        }
      });
      const message = { 
          from : `${process.env.SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
          to: options.email,
          subject: options.subject,
          text: options.message
      }
    const data = await transporter.sendMail(message)
    return data;
      
}
module.exports = sendEmail;