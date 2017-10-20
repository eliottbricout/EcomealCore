const mongodb = require('mongodb');
const md5 = require('md5');
const { user } = require('../service/bddCollection.service');

function connection({ username, password }){
	password = md5(password);
	return user.findOne( {username,password} ).then(item => {
		if(!item) return Promise.reject(404);
		return Promise.resolve(item);
	},() => {
		return Promise.reject(400);
	});
}

function getProfil(id){
	return user.findOne( {_id : mongodb.ObjectID(id)} ).then(item => {
		if(!item) return Promise.reject(404);
		return Promise.resolve(item);
	},() => {
		return Promise.reject(400);
	});
}

function getProfilbyUsername(username){
	return user.findOne( {username} ).then(item => {
		if(!item) return Promise.reject(404);
		return Promise.resolve(item);
	},() => {
		return Promise.reject(400);
	});
}

function inscription({username, password}){
	password = md5(password);
	return getProfilbyUsername(username).then(code =>{
		return Promise.reject(403);
	},(code) => {
		if(code === 404) return user.insert({username,password});
		return Promise.reject(400);
	});
	
	
}

function setProfil({username, password}){
	return user.update({username},{ "$set" :{username,password}}).then(item => {
		if(!item) return Promise.reject(404);
			return Promise.resolve(item);
		},() => {
			return Promise.reject(400);
		});	
}

module.exports = {
	connection,
	inscription,
	getProfil,
	setProfil
};