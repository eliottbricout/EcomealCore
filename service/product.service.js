const mongodb = require('mongodb');
const md5 = require('md5');
const { product } = require('../service/bddCollection.service');

function get(id){
	console.log(product);
	return product.findOne( {_id : mongodb.ObjectID(id)} ).then(product => {
		if(!product) return Promise.reject(404);
		return Promise.resolve(product);
	},() => {
		return Promise.reject(400);
	});
}

function create({name, tags}){
	console.log(product);
	return product.insert({name, tags, quantity : 0}).then(product => {
			return Promise.resolve(product);
		},() => {
			return Promise.reject(400);
		});	
}

function addQuantity(id, nb){
	return product.update({_id : mongodb.ObjectID(id)},{ "$inc" :{quantity : nb}}).then(product => {
			if(!product) return Promise.reject(404);
			return Promise.resolve(product);
		},() => {
			return Promise.reject(400);
		});	
	}
	
function removeQuantity(id, nb){
	return get(id).then(product => {
		if(product.quantity - nb < 0) return Promise.reject(403);
		return addQuantity(id, -nb);
	});
}

module.exports = {
	get,
	create,
	addQuantity,
	removeQuantity
};