const models = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRETKEY, JWT_EXPIRATIONTIME } = require("../utils/constant");
const sendEmail = require("../service/sendEmail");
const { generateOtp } = require("../service/generateOtp");
const moment = require("moment");
const { addUser } = require("./users");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const { sequelize } = require("../models");
exports.userLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    let checkUser = await models.users.findOne({
      where: { Email: Email },
    });
    if (!checkUser) {
      return res.status(401).json({ message: "User not found" });
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
        message: "Login Successfull.",
        Token,
      });
    }else{
      return res.status(401).json({ message: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userLogout = async (req, res, next) => {
  try {
    let token = await req.headers.authorization.split(" ")[1];
    await models.users.update(
      { RememberToken: null },
      { where: { RememberToken: token } }
    );
    return res.status(204).json({ message: `Logout successfull.` });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong. Please try again later." });
  }
};

//User Registration.
exports.userRegister = async (req, res) => {
  try {
    const { FirstName, LastName, Password, Email } = req.body;

    const IsEmailVerified = await models.userOtp.findOne({
      where: { Email: Email, IsEmailValidated: true },
    });
    if (IsEmailVerified) {
      return res.status(401).json({ message: "You are already authenticated." });
    }

    //Temp Register User in Temp User Schema.
    const Hash = await bcrypt.hash(Password, 10);
    const userUniqueId = uniqid();
    const user = await models.tempUser.create({
      UniqueId: userUniqueId,
      FirstName,
      LastName,
      Password: Hash,
      Email,
    });

    //Generate OTP
    const OTP = await generateOtp(Email);
    if (!OTP.success) {
      return res.status(409).json({ message: OTP.message });
    }
    //Msg 
    let Msg = {
      email: Email,
      subject: `Hi, ${Email} ${OTP} is the OTP for your VyncSafe Chat Registration.`,
      text: `Hey!
        Your One Time Password is ${OTP}, which is valid for 15 minutes.
        Thank you for your interest in VyncSafe Chat. We look forward to serving you real soon.
        
        In case of any technical difficulty do drop us a mail at admin@pixelsoftwares.com.
        
        Thanks!
        Team VyncSafe`,
    };

    //Mail service 
    const mailSent = await sendEmail(Msg);
    if (mailSent) {
      return res
        .status(201)
        .json({ message: "Otp sent successfully to your email address. Please verify to complete the registration process." });
    } else {
      return res
        .status(503)
        .json({ message: "Failed to send email! Please try again later" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

exports.userOtpValidate = async (req, res) => {
  try {
    const { Email, Otp } = req.body;
    const User = await models.userOtp.findOne({ where: { Email: Email } });
    if (!User) {
      return res.status(404).json({
        message: "Email Not Found.",
      });
    }
    if (User.IsEmailValidated) {
      return res.status(409).json({ message: "User Already Validated." });
    }
    const isExpired = !moment().isBefore(User.ExpiryTime);
    if (isExpired) {
      return res
        .status(410)
        .json({ message: "Otp Expired! Please Generate A New Otp." });
    }
    if (User.Otp == Otp) {
      const t = await sequelize.transaction();
        try {
        await models.userOtp.update({ IsEmailValidated: true },{ where: { Email: Email } },{transaction : t});
        const userData = await models.tempUser.findOne({where : {Email}},{transaction : t});
        req.body = userData;
        const saveUser = await addUser(req,res,{transaction : t});
        await models.tempUser.destroy({where : {Email}},{transaction : t});
        await t.commit();
        return res.status(202).json({ message: "User Registration Successfull." ,UniqueId : saveUser.UniqueId });
      } catch (error) {
        await t.rollback();
      }

      // })
      
      // const saveUser = await addUser(req.body);
      

      } else {
        return res.status(401).json({ message: "Wrong Otp! Please Enter Valid Otp." });
      }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
