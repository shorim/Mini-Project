var User = require('../models/users');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('client-sessions');
var loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.get('/',function(req,res){
	
	res.render('Pages/login');
});

loginRouter.post('/login',function(req,res){

  User.find({username:req.body.username,password:req.body.password}, function(err,result)
  {		
  	var response="";
    if(err) throw err;
    if(result.length==0)
    {
      response="Wrong username or password !";
    }
    else
    {
      req.session.user = result[0];
      response="logged in successfully";
    }

    res.render('Pages/login',{response});

  });
});

module.exports = loginRouter;