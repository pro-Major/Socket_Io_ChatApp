const models = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRETKEY, JWT_EXPIRATIONTIME } = require("../utils/constant");
const sendEmail = require("../service/sendEmail");
const { generateOtp } = require("../service/generateOtp");
const moment = require("moment");

exports.userLogin = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    let checkUser = await models.users.findOne({
      where: { Email: Email },
    });
    if (!checkUser) {
      return res.status(401).json({ message: "Wrong Credentials" });
    }
    let userDetails = await checkUser.comparePassword(Password);
    if (userDetails) {
      let Token = jwt.sign(
        {
          id: checkUser.dataValues.id,
          email: checkUser.dataValues.Email,
          firstName: checkUser.dataValues.FirstName,
          lastName: checkUser.dataValues.LastName,
        },
        JWT_SECRETKEY,
        {
          expiresIn: JWT_EXPIRATIONTIME,
        }
      );
      const decoded = jwt.verify(Token, JWT_SECRETKEY);
      const createdTime = new Date(decoded.iat * 1000).toGMTString();
      await models.users.update(
        { LastLogin: createdTime, RememberToken: Token, Status: true },
        {
          where: { id: decoded.id },
        }
      );

      return res.status(200).json({
        message: "The user has successfully logged in",
        Token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userLogout = async (req, res, next) => {
  try {
    let token = await req.headers.authorization.split(" ")[1];
    await models.users.update({RememberToken : null},{ where: { RememberToken: token } });
    return res.status(204).json({ message: `Logout successfull.` });
  } catch (error) {return error}
};

//User Registration.
exports.userRegister = async (req,res)=>{
  try {
      const {Email} = req.body;
      const OTP = await generateOtp(Email);
      if(!OTP.success){
        return res.status(409).json({ message : OTP.message });
      }
      let Msg = {
        email : Email,
        subject : `Hi, ${Email} ${OTP} is the OTP for your VyncSafe Chat Registration.`,
        text : `Hey!
        Your One Time Password is ${OTP}, which is valid for 15 minutes.
        Thank you for your interest in VyncSafe Chat. We look forward to serving you real soon.
        
        In case of any technical difficulty do drop us a mail at admin@pixelsoftwares.com.
        
        Thanks!
        Team VyncSafe`
      }
      const mailSent = await sendEmail(Msg)
      if(mailSent){
        return res.status(201).json({ message : "Email sent successfully, Check Otp to register" });
      }else{
        return res.status(503).json({ message : "Failed to send email! Please try again later" });
      }
      
  } catch (error) {
      return res.status(400).json({ error: error });
  }

}


exports.userOtpValidate = async (req,res)=>{
  try {
    const { Email, Otp } = req.body;
    const User = await models.userOtp.findOne({ where: { Email: Email } })
    if (!User) {
        return res.status(404).json({
            message: "Email Not Found."
        })
    }
    if(User.IsValidated){
      return res.status(409).json({message : "User Already Validated."})
    }
    const isExpired = !moment().isBefore(User.ExpiryTime)
    if(isExpired){
      return res.status(410).json({message : "Otp Expired! Please Generate A New Otp."})
    }
    if(User.Otp == Otp){
      const validateUser = await models.userOtp.update({IsValidated: true},{where : {Email : Email}})
      if(validateUser){
        return res.status(202).json({message : "User Validated Successfully."})
      }else{
        return res.status(401).json({message : "Wrong Otp! Please Enter Valid Otp."})
        
      }
    }
  
  } catch (error) {
      return res.status(400).json({message : error.message})
  }

}
