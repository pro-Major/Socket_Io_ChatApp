const { body } = require("express-validator");
const models = require('../models');



exports.userValidation = [
  body("FirstName")
    .not()
    .isEmpty()
    .withMessage("first name is required")
    .isAlpha()
    .withMessage("first name must be Charater")
    .isLength({ max: 30 })
    .withMessage("First name can contain up to 30 characters"),

  body("LastName")
    .not()
    .isEmpty()
    .withMessage("last name is required")
    .isAlpha()
    .withMessage("Last name must be Charater")
    .isLength({ max: 30 })
    .withMessage("Last name can contain up to 30 characters"),

  body("Email")
    .exists()
    .withMessage("Email is Required")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Email is Required")
    .isLength({ min: 5, max: 50 })
    .withMessage('Email-id can contain up to 50 characters')
    .custom(async value => {
        if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value)) {
          return Promise.reject("Invalid email id");
        }
      })
    .custom(async (value) => {
      return await models.users
        .findOne({
          where: {
            email: value,
          },
        })
        .then((email) => {
          if (email) {
            return Promise.reject("Email Already Exists");
          }
        });
    }),
];
