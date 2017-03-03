var User = require('../models/users');
var Portofolio= require('../models/portofolios');
var Work= require('../models/works');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('client-sessions');
var multer = require('multer')
var addWorkRouter = express.Router();

addWorkRouter.use(bodyParser.json());

function requireLogin (req, res, next) {
  if (!req.user) {
    res.render('Pages/login');
  } else {
    next();
  }
};

addWorkRouter.get('/',requireLogin,function(req,res){

	res.render('Pages/addWork');
});


addWorkRouter.post('/addWork',multer({ dest: './views'}).single('screenshot'),function(req,res){

	req.body.owner=req.session.user.username;
	if(req.file!= undefined)
	{
		req.body.screenshot=req.file.filename;
	}
	Work.create(req.body,function(err,work){
		if(err) throw err;
		Portofolio.findOne({owner:req.body.owner},function(err,portofolio){
			if(err) throw err;
			portofolio.work.push(work);
			portofolio.save(function (err, portofolio){
				if(err) throw err;
				var workMessage="Your work was successfully added !"
				res.render('Pages/addWork',{workMessage});

			});
		});
	});
});



module.exports=addWorkRouter