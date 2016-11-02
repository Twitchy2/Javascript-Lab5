//use express routing

var express = require('express');
var router = express.Router();


//link AccountSchema

var Account = require('../models/account');


/* GET home page. */
router.get('/', function(req, res, next) {
  Account.find(function(err, users) {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //load teams
      res.render('user', {
        title: 'Account Names',
         users: users,
         user: req.user
       });
    }
  })

});

module.exports = router;
