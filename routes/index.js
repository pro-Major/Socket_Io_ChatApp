const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const user = require('./users') //User Route.
router.use('/user',user)


const auth = require('./auth') //Auth Route.
router.use('/auth',auth)




module.exports = router;
