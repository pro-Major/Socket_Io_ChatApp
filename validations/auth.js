const { body } = require("express-validator");
const models = require('../models');



exports.authValidation = [
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
      }),
    body("Password")
    .exists()
    .withMessage("Password is Required")
    .notEmpty()
    .withMessage("Password is Required")
    // .isLength({ min: 5, max: 20 })
    // .withMessage("Max Length of password must be less than 20 characters")
];

exports.registerUserValidation = [
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
]