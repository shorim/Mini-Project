var User = require('../models/users');
var Portofolio= require('../models/portofolios');
var Work= require('../models/works');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('client-sessions');
var myPortofolioRouter = express.Router();

myPortofolioRouter.use(bodyParser.json());

function requireLogin (req, res, next) {
  if (!req.user) {
    res.render('Pages/login');
  } else {
    next();
  }
};

myPortofolioRouter.get('/',requireLogin,function(req,res){

	Portofolio.find({owner:req.session.user.username},function(err,portofolioList){

		if(portofolioList.length!=0)
		{
			var portofolio=portofolioList[0];
			res.render('Pages/myPortofolio',{portofolio});
		}
		else
		{
			res.render('Pages/createPortofolio');
		}
	});
});


module.exports=myPortofolioRouter