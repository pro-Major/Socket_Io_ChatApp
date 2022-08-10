const models = require("../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const uniqid = require("uniqid");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
        const { FirstName, LastName, Password ,Email } = req.body;
        const Hash = await bcrypt.hash(Password, 10)
        console.log(Hash)
        const userUniqueId = uniqid.time();
        const user = await models.users.create({
          UniqueId : userUniqueId,
          FirstName,
          LastName,
          Password : Hash,
          Email,
        });
        return res.status(201).json({ message: "User Created.", data: user });
    } catch (error) {
        console.log(error);
    }

};
