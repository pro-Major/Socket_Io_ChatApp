const express = require('express');
const router = express.Router();
const { addUser,addContact, addConversation } = require('../controllers/users')
const {userValidation} = require('../validations/user');
const validationError = require('../middleware/validationError');
router.post('/',userValidation,validationError,addUser);
router.post('/add',addContact);
router.post('/add-conversation',addConversation);

module.exports = router;
