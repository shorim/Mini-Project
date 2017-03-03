var User = require('../models/users');
var Portofolio=require('../models/portofolios');
var bodyParser = require('body-parser');
var express = require('express');
var homeRouter = express.Router();
homeRouter.use(bodyParser.json());

homeRouter.get('/',function(req,res){

	var totalPortofolios=0
	var portofolios=[];

	Portofolio.find({},function(err,portofoliosFound){

		if(err) throw err;
		totalPortofolios=portofoliosFound.length;
		portofolios=portofoliosFound;

			//set default variables
	var pageSize = 10,
		pageCount = Math.ceil(totalPortofolios/10),
		currentPage = 1,
		portofoliosArrays = [], 
		portofoliosList = [];

	//split list into groups
	while (portofolios.length > 0) {
	    portofoliosArrays.push(portofolios.splice(0, pageSize));
	}

	//set current page if specifed as get variable (eg: /?page=2)
	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
	}

	//show list of students from group
	portofoliosList = portofoliosArrays[+currentPage - 1];

	
	//render index.ejs view file
	res.render('Pages/home', {
		portofolios: portofoliosList,
		pageSize: pageSize,
		totalPortofolios: totalPortofolios,
		pageCount: pageCount,
		currentPage: currentPage
	});


	});

});

homeRouter.get('/logout', function(req, res) {

  req.session.reset();
  res.render('Pages/login');
});

module.exports = homeRouter;
