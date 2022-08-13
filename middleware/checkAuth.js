const jwt = require('jsonwebtoken');
const { JWT_SECRETKEY } = require('../utils/constant');

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token,JWT_SECRETKEY);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}