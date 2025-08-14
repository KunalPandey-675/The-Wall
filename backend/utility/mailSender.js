const nodemailer = require("nodemailer")
require("dotenv").config();

exports.sendEmail = async(email,title,body)=>{
   try{
      const transporter = nodemailer.createTransport({
         host:process.env.MAIL_HOST,
         auth :{
            user: process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
         }
      })

      const mailOptions = {
         from :"Kunal",
         to:`${email}`,
         subject : `${title}`,
         html:`<h1>${body}<h1/>`
      }

      const response = await transporter.sendMail(mailOptions);
      return response ;
   }
   catch(e){
      console.log("Error occured in sending the mail in mailsender utility folder");
   }
}
