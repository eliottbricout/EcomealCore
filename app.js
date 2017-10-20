const express = require('express');
const app = express();

const command = require('./route/command');
const user = require('./route/user');
const product = require('./route/product');

app.use("/css", express.static(__dirname + '/resources/css'))
.use("/js", express.static(__dirname + '/resources/js'))

.use('/command', command)
.use('/user', user)
.use('/product', product)

.use(function(req, res, next){
	res.status(404);
});

app.listen(8080);
