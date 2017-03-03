var User = require('../models/users');
var Portofolio= require('../models/portofolios');
var Work= require('../models/works');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('client-sessions');
var multer = require('multer')
var portofolioRouter = express.Router();

portofolioRouter.use(bodyParser.json());

function requireLogin (req, res, next) {
  if (!req.user) {
    res.render('Pages/login');
  } else {
    next();
  }
};

portofolioRouter.get('/',requireLogin,function(req,res){

	res.render('Pages/createPortofolio');
});

portofolioRouter.post('/addWork',multer({ dest: './views'}).single('screenshot'),function(req,res){

	req.body.owner=req.session.user.username;
	if(req.file != undefined)
	{
		req.body.screenshot=req.file.filename;
	}
	Work.create(req.body,function(err,work){
		if(err) throw err;
	});
	var workMessage="Your work has been added successfully !";
	res.render('Pages/createPortofolio',{workMessage});
});

portofolioRouter.post('/create',multer({ dest: './views'}).single('profilePic'),function(req,res){

	Portofolio.find({owner:req.session.user.username},function(err,portofolios){
		if(err) throw err;
		var portofolioMessage="";
		if(portofolios.length!=0)
		{
			portofolioMessage="You already have a portfolio !";
			res.render('Pages/createPortofolio',{portofolioMessage});
		}
		else
		{
			req.body.owner=req.session.user.username;
			if(req.file != undefined)
			{
				req.body.profilePic=req.file.filename;
			}
			Work.find({owner:req.session.user.username},function(err,works){

			//var portofolioMessage="";
			if(err) throw err;
			if(works.length==0)
			{
				portofolioMessage="You have to add work first !";
			}
			else
			{
				req.body.work=works;
				Portofolio.create(req.body,function(err,Portofolio){
				if(err) throw err;
				});
				portofolioMessage="Your portfolio was successfully created !";
			}
			res.render('Pages/createPortofolio',{portofolioMessage});

			});
		}
		
	});

});


module.exports=portofolioRouter