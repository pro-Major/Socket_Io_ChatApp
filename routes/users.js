const express = require('express');
const router = express.Router();
const { addUser,addContact, addSingleConversation } = require('../controllers/users')
const {userValidation} = require('../validations/user');
const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');
router.post('/',userValidation,validationError,addUser);
router.post('/add',checkAuth,addContact);
router.post('/add-conversation',checkAuth,addSingleConversation);

module.exports = router;
