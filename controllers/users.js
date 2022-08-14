const models = require("../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const uniqid = require("uniqid");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
        const { FirstName, LastName, Password ,Email ,MobileNumber} = req.body;
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
          MobileNumber
        });
        return user;
    } catch (error) {
        return error.json({ message: "Something went wrong"})``
    }
};



exports.addContact = async (req,res) => {
    try {
        const senderData = req.userData;
        const {userInfo} = req.body;
        const receiverData = await models.users.findOne({
            where: {
                [Op.or]: [{Email: userInfo}, {UniqueId: userInfo},{MobileNumber : userInfo}]
              }
        }
            );
        if(!receiverData){
            return res.status(404).json({message: 'User not found'});
        }
        const checkConvo = await checkIfConversationExists(senderData,receiverData)
        if(checkConvo.status){
            return res.status(200).json({status : checkConvo.status , message: 'Conversation Found',ConversationId : checkConvo.ConversationId});
        }
        const createConv = await createConversation(senderData,receiverData);

        if(createConv.error === false){
            return res.status(201).json({message: createConv.message , data : req.userData.Email});
        }

        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Internal Server Error',error : error.message});
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


const createConversation = async  (sender,receiver,private=true) => {
    const t = await sequelize.transaction();
    try {
        const createConversation = await  models.conversation.create({ConversationName : sender.MobileNumber+'_'+receiver.MobileNumber , Private : private},{transaction : t});
        await models.group_members.create({ConversationId : createConversation.ConversationId , ContactId : sender.id  },{transaction : t})
        await models.group_members.create({ConversationId : createConversation.ConversationId , ContactId : receiver.ContactId  },{transaction : t})
        await t.commit();
        return {error : false , message : `Created`};
    } catch (error) {
        await t.rollback();
        return {error : true , message : error.message}
    }
}
const checkIfConversationExists = async (sender,receiver) => {
    const userExist = await sequelize.query(`
    select ConversationId from conversation as s 
    where s.Private = true and s.ConversationName = '${sender.MobileNumber+'_'+receiver.MobileNumber}' and 
    s.ConversationId in (
    select ConversationId from group_members 
    where ContactId = ${sender.id} or ContactId = ${receiver.ContactId} );
  `)
    if(userExist[0].length != 0){
        return {status : true, ConversationId : userExist[0][0].ConversationId};
    }else{
        return {status : false};
    }
}