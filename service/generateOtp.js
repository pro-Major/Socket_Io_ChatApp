const models = require("../models");
const moment = require("moment");

exports.generateOtp = async (Email) => {
    await models.userOtp.destroy({ where: { Email: Email} });

    const Otp = Math.floor(1000 + Math.random() * 9000);
    const createdTime = new Date();
    const expiryTime = moment.utc(createdTime).add(15, "m");
    await models.userOtp.create({ Email , Otp, createdTime, expiryTime, });
    return Otp;
}