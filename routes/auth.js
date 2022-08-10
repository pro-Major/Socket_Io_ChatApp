const express = require('express');
const router = express.Router();


const { userLogin ,userLogout} = require('../controllers/auth')
const {authValidation} = require('../validations/auth');
const validationError = require('../middleware/validationError')

router.post('/login',authValidation,validationError,userLogin)
router.delete('/logout',userLogout)

module.exports = router;
