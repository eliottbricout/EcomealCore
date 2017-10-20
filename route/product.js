var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var productService = require('../service/product.service');
var jsonParser = bodyParser.json();

router
	  .get('/:id', getProduct)
	  .post('/', jsonParser, createProduct)// jsonParser avec postman sinon voir avec urlencodedParser
	  .put('/add/', jsonParser, addQuantity)
	  .put('/remove/', jsonParser, removeQuantity);

function getProduct(req,res){
	return productService.get(req.param.id).then(product => {
		res.send(product);
	},(code) => {
		console.log(code);
		res.sendStatus(code);
	});
}

function createProduct(req,res){
	productService.create(req.body).then(user => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

function addQuantity(req,res){
	productService.addQuantity(req.body.id, req.body.nb).then(user => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

function removeQuantity(req,res){
	productService.removeQuantity(req.body.id, req.body.nb).then(user => {
		res.send(user);
	},(code) => {
		res.sendStatus(code);
	});
}

module.exports = router;