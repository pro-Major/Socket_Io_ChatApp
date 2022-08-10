const models = require("../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const uniqid = require("uniqid");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
        const { FirstName, LastName, Password ,Email } = req.body;
        const IsEmailVerified = await models.userOtp.findOne({
            where : 
            { Email: Email , IsValidated : true }})
        if(!IsEmailVerified){
            return res.status(401).json({message : "Please Verify your email address."})
        }
        const Hash = await bcrypt.hash(Password, 10)
        const userUniqueId = uniqid();
        const user = await models.users.create({
          UniqueId : userUniqueId,
          FirstName,
          LastName,
          Password : Hash,
          Email,
        });
        return res.status(201).json({ message: "User Created.", data: user });
    } catch (error) {
        return error.json({ message: "Something went wrong"})``
    }
};



exports.addContact = async (req,res) => {
    try {
        // const userData = req.userData;
        const {Email,UniqueId,MobileNumber} = req.body;
        const userData = await models.users.findOne({
            where: {
                [Op.or]: [{Email: Email}, {UniqueId: UniqueId},{MobileNumber : MobileNumber}]
              }
        }
            );
        if(!userData){
            return res.status(404).json({message: 'User not found'});
        }

        

    } catch (error) {
        
    }
}
