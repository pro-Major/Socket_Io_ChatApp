const express = require('express');
const router = express.Router();


const { userLogin } = require('../controllers/auth')
const {authValidation} = require('../validations/auth');
const validationError = require('../middleware/validationError')

router.post('/',authValidation,validationError,userLogin)

module.exports = router;
