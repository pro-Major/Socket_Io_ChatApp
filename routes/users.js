const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/users')
const {userValidation} = require('../validations/user');
const validationError = require('../middleware/validationError')
router.post('/',userValidation,validationError,addUser)

module.exports = router;
