var express = require('express');
var router = express.Router();
var Account = require('../models/account.js');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 5', message: 'User Tables', user: req.user });
});


//get router
router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register',
    user: req.user
  });
});
//postage
router.post('/register', function(req,res,next) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        res.redirect('/error');
      }
      else {
        res.redirect('/login');
      }
  });
});

router.get('/login', function(req, res, next) {
  if (req.user) {
    res.redirect('/user');
  }
  res.render('login', {
    'title': 'Login',
    failureMessage: '',
    user: req.user
  });
});

router.post('/login', passport.authenticate('local',
 {
      successRedirect: '/users',
      failureRedirect: '/login',
      failureMessage: 'Invalid Login'

}));

//get Log out
router.get ('/logout', function(req,res,next) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
