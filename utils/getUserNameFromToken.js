const jwt = require('jsonwebtoken');
const models = require('../models');
const {JWT_SECRETKEY} = require('../utils/constant')
exports.getUserDataFromToken = async (token) =>{
    // token = await token.split(" ")[1];
    try {
        const decoded = await jwt.verify(token,JWT_SECRETKEY);
        return decoded;
    } catch (error) {
        return false;
    }
}