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
            { Email: Email , IsEmailValidated : true }})
        if(!IsEmailVerified){
            return res.status(401).json({message : "Please Verify your email address."})
        }
        // const Hash = await bcrypt.hash(Password, 10)
        const userUniqueId = uniqid();
        const user = await models.users.create({
          UniqueId : userUniqueId,
          FirstName,
          LastName,
          Password,
          Email,
        });
        return user;
    } catch (error) {
        return error.json({ message: "Something went wrong"})``
    }
};



exports.addContact = async (req,res) => {
    try {
        // const userData = req.userData;
        const {userInfo} = req.body;
        const userData = await models.users.findOne({
            where: {
                [Op.or]: [{Email: userInfo}, {UniqueId: userInfo},{MobileNumber : userInfo}]
              }
        }
            );
        if(!userData){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'OK', data : userData.Email});

        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Internal Server Error',error});
    }
}
exports.addSingleConversation = async (req,res)=>{
    try {
        const { ReceiverData } = req.body;
        const createConversation = await models.conversation.create({GroupName})

        return res.status(201).json({message: 'created conversation successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error',error});
    }
}


const createConversation = (req, res) => {

}