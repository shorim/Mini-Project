var User = require('../models/users');
var bodyParser = require('body-parser');
var express = require('express');
var registerRouter = express.Router();
registerRouter.use(bodyParser.json());

registerRouter.get('/',function(req,res){
	
	res.render('Pages/register');
});

registerRouter.post('/register', function(req, res) {

  User.find({username: req.body.username},function(err,result)
  {
    var response="";
    if(err) throw err;
    if(result.length!=0)
    {
      response="This username is already used! Please choose another one.";
    }
    else
    {
      User.create(req.body,function(err,user){
        if(err) throw err;
      });
      response="Registeration completed successfully!";
    }
    res.render('Pages/register',{response});
  });
});


module.exports = registerRouter;