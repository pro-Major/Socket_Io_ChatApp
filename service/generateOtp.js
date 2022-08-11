const models = require("../models");
const moment = require("moment");

exports.generateOtp = async (Email) => {
    const UserData = await models.userOtp.findOne({where : { Email: Email }});
    if(UserData){  
        if(UserData.IsEmailValidated){
        return {success : false , message : "User Already Validated." };
        }
    }
    await models.userOtp.destroy({ where: { Email: Email} });
    const Otp = Math.floor(1000 + Math.random() * 9000);
    const createdTime = new Date();
    const expiryTime = moment.utc(createdTime).add(15, "m");
    await models.userOtp.create({ Email , Otp, CreatedTime :createdTime , ExpiryTime : expiryTime, });
    return {success : true , message : Otp}
}