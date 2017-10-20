var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var commandService = require('../service/command.service');

router
	  .get('/:id', getCommand)
	  .post('/', jsonParser, createCommand)// jsonParser avec postman sinon voir avec urlencodedParser
	  .put('/ready/:id', ready)
	  .put('/validate/:id', validate)
	  .put('/cancel/:id', validate);

function getCommand(req,res){
	commandService.get(req.param.id).then(command => {
		res.send(command);
	},(code) => {
		res.status(code);
	});
}

function createCommand(req,res){
	commandService.create(req.query).then(command => {
		res.send(command);
	},(code) => {
		res.status(code);
	})
}

function ready(req,res){
	commandService.ready(req.param.id).then(() => {
		res.send(200);
	},(code) => {
		res.status(code);
	});
}

function validate(req,res){
	commandService.create(req.param.id).then(() => {
		res.send(200);
	},(code) => {
		res.status(code);
	})
}

function cancel(req,res){
	commandService.cancel(req.param.id).then(() => {
		res.send(200);
	},(code) => {
		res.status(code);
	})
}
module.exports = router;