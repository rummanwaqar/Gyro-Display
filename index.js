// Gyro setup
var i2c = require('i2c');
var async = require('async');

var address = 0x69;
var gyro = new i2c(address, { device:'/dev/i2c-1', debug: false});

// Connect to I2C Device
function connectGyro(callback) {
    console.log('Connecting to device ...');
    
    // check if connection was successful
    gyro.readBytes(0x0F, 1, function(err, res) {
        if (err) callback('Could not read from device');
        if(res[0] == 0xD3) {
            console.log('Connected to gyroscope.');
            callback(null);
        } else {
            callback('Could not connect to device.');
        }
    });
}

// Setup Device
function setupGyro(callback) {
    // start gyro with all three channels
    gyro.writeBytes(0x20, [0x0F], function(err) {
        if (err) callback('Could not write to device');
        console.log('Device initialized.');
        callback(null);
    });
}

function readGyro() {
	var data = {};
	gyro.readBytes(0x28+0x80, 6, function(err, res) {
        if (err) return null;
        
        data = {x: res.readInt16LE(0),
        		y: res.readInt16LE(2),
        		z: res.readInt16LE(4)};
    });
    return JSON.stringify(data);
}

// server setup
var express = require('express');
var app = express()
			.use(express.favicon(__dirname + '/public/remotecontrol2.ico'))
			.use(express.logger('dev'))
			.use(express.static(__dirname + '/public'));

var server = require('http').createServer(app);

var clients = [];

// setup socket io
var socket = require('socket.io');
var io = socket.listen(server);
io.set('log level', 2);

io.sockets.on('connection', function(client) {
	console.log('Client connected...');
	clients.push(client);

	client.on('disconnect', function() {
		console.log('Client disconnected...');
		// remove client from list
		if(clients.indexOf(client) != -1) {
			clients.splice(clients.indexOf(client), 1);
		}
	});
});

server.listen(8000, function() {
	console.log('Server started on 8000.');
	async.waterfall([
	    connectGyro,
	    setupGyro,
	], function(err) {
	    if (err) console.log('[*] Error: ' + err);
	});
});

function broadcast(data) {
	clients.forEach(function (client) {
		client.emit('data', {data:data});
	});
}

setInterval(function() {
	broadcast(readGyro());
}, 100);

