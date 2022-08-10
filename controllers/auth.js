const models = require("../models");
const jwt = require('jsonwebtoken'); 
const { JWT_SECRETKEY, JWT_EXPIRATIONTIME } = require("../utils/constant");

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
        { LastLogin: createdTime },
        {
          where: { id: decoded.id },
        }
      );

      return res.status(200).json({
        message: "The user has successfully logged in",
        Token ,
      });
    }

  } catch (error) {
    console.log(error);
  }
};
