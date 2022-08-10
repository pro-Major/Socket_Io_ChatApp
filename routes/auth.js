const express = require('express');
const router = express.Router();


const { userLogin ,userLogout,userRegister} = require('../controllers/auth')
const {authValidation,registerUserValidation} = require('../validations/auth');
const validationError = require('../middleware/validationError')

router.post('/login',authValidation,validationError,userLogin)
router.delete('/logout',userLogout)
router.post('/register',registerUserValidation,validationError,userRegister)
module.exports = router;
