const mongodb = require('mongodb');
const paramMlab = require('../package.json').mongodb;
const uri = "mongodb://" + paramMlab.user + ":" + paramMlab.password + "@" + paramMlab.host + ":" + paramMlab.port + "/" + paramMlab.db;
var collection = { user : mockUser(),command : mockCommand(),product : mockProduct()};

mongodb.MongoClient.connect(uri).then(function(db){
	console.log("connexion à la base de donnée : OK");
    collection.user = db.collection('user');
	collection.command = db.collection('command');
    collection.product = db.collection('product');
},function(err){
	console.log("connexion à la base de donnée : KO");
	console.log(err);
});

function mockUser (){
	return {
		findOne : (item) => { return Promise.resolve(item)},
		insert : (item) => { return Promise.resolve(item)},
		update : (item) => { return Promise.resolve(item)}
	}
}

function mockCommand(){
	return {
		findOne : (item) => { return Promise.resolve(item)},
		insert : (item) => { return Promise.resolve(item)},
		update : (item) => { return Promise.resolve(item)}
	}
}

function mockProduct(){
	return {
		findOne : (item) => { return Promise.resolve(item)},
		insert : (item) => { return Promise.resolve(item)},
		update : (item) => { return Promise.resolve(item)}
	}
}

module.exports = collection;