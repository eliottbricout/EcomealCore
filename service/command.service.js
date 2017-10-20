const mongodb = require('mongodb');
const md5 = require('md5');
const { command } = require('../service/bddCollection.service');

function get(id){
	return command.findOne( {_id : mongodb.ObjectID(id)} ).then(command => {
		if(!command) return Promise.reject(404);
		return Promise.resolve(command);
	},() => {
		return Promise.reject(400);
	});
}

function create({idUser,products}){
	return command.insert( {idUser : mongodb.ObjectID(id), products,type : "waiting"} ).then(command => {
		if(!command) return Promise.reject(404);
		return Promise.resolve(command);
	},() => {
		return Promise.reject(400);
	});
}

function ready(id){
	return changeType(id, "ready");
}

function validate(id){
	return changeType(id, "validate");
}

function cancel(id){
	return changeType(id, "cancel");
}

function changeType(id, type){
	return command.update({_id : mongodb.ObjectID(id)},{ "$set" :{type}}).then(command => {
		if(!command) return Promise.reject(404);
			return Promise.resolve(command);
		},() => {
			return Promise.reject(400);
		});	
}

module.exports = {
	get,
	create,
	ready,
	validate,
	cancel
};