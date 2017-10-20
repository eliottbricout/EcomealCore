var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var userService = require('../service/user.service');

router
	  .get('/connexion', connection)
	  .get('/profil/:id', getProfil)
	  .post('/profil/:id', jsonParser, setProfil) // jsonParser avec postman sinon voir avec urlencodedParser
	  .post('/inscription', jsonParser, inscription);

function connection(req,res){
	userService.connection(req.query).then((user) => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

function getProfil(req,res){
	userService.getProfil(req.param.id).then((user) => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

function setProfil(req,res){
	userService.setProfil(req.body).then((user) => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

function inscription(req,res){
	if(!req.body.password || !req.body.password2 || req.body.password !== req.body.password2){
		res.sendStatus(403);
	}
	userService.inscription(req.body).then((user) => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

module.exports = router;