// Port that Batrium listens too
var PORT = 18542;

//MQTT server  generally localhost
var mqtthost = 'localhost';
var influxhost = 'localhost';



// 
// Watchmon UDP Listener for your Batrium BMS system
//
// Created by daromer aka DIY Tech and Repairs 
// http://diytechandrepairs.nu
// https://www.youtube.com/user/daromeresperyd
//
//
// creating a udp server
var udp = require('dgram');
var server = udp.createSocket('udp4');
var Parser = require('binary-parser').Parser;

//Setup MQTT
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + mqtthost)

const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'batrium',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
        'host'
      ]
    }
  ]
})


// Function to get payload data
// input data object
// output payload data in json form
function getPayload(data) {
     var payload = new Parser()
         .string('first', { encoding: 'ascii', length: 1 })
         .int16le('MessageId', { formatter: (x) => {return x.toString(16);}})
         .string('nd', { encoding: 'ascii', length: 1 })
         .int16le('SystemId')
         .int16le('hubId')
	
	 return payload.parse(data);
}


// Function to handle and send out data to MQTT service
// It takes SystemId, MessageID and the data to send out. The data must be in Json format
function sendMqtt(SystemId,MessageId,data) {

	client.publish('Batrium/' + SystemId + '/' + MessageId , JSON.stringify(data));		
	if (debugMQTT) console.log('Data sent to MQTT: Batrium/' + SystemId + '/' + MessageId);
}


// Function to send data to influx database
// Input is the data in Json format and a tag to use in influx
function sendInflux(data, tag) {
	// In config you can set the extra tags and or serie to use. If not set they all go to generic
	tg = { systemId: data.SystemId, messageId: data.MessageId, messageType: (config[data.MessageId] && config[data.MessageId].tag  ) ? config[data.MessageId].tag: 'generic' };
	// IF its node based we need to add the node-tag to it as well
	(config[data.MessageId] && config[data.MessageId].tagID  ) ? tg['nodeID'] =  data[config[data.MessageId].tagID]  : '';
		
	influx.writeMeasurement((config[data.MessageId] && config[data.MessageId].serie  ) ? config[data.MessageId].serie: 'generic', [
  	{
	  tags: tg,
	  fields: data,
  	}
	], {
		precision: 's'
	}

	
	);
};

function errorText(string) {
	console.log('\x1b[31m%s\x1b[0m', string);
}
function infoText(string) {
	console.log('\x1b[32m%s\x1b[0m', string);
}
function runText(string) {
	console.log('\x1b[34m%s\x1b[0m', string);
}






// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});


var normalizedPath = require("path").join(__dirname, "payload");



console.log('Batrium logger started');

// Function to load in all parsers from the payload folder. Those not able to load will be discarded during startup. 
var messages = {};
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	try {

		require("./payload/" + file)();
		load = file.split("_")[1];
		messages[load.toLowerCase()] = 'parse_' + load.toLowerCase();
		infoText('Loaded file: ' + file);

	}
	catch (e) {
 		errorText('Could not load file: ' + file)
	}
});



// Time to process incomming data
debug = false;
debugMQTT = false;
var tag;
var fs = require('fs');

//Loading configuration file. 
try {
	var config = JSON.parse(fs.readFileSync('batrium_config.json', "utf8"));
}
catch (e) {
	errorText('Could not load configuration file. Will therefore not send any data out. file missing is batrium_config.json. Perhaps copy the dist file?'); 
	console.log(e);
	var config = {'all':{'mqtt':{},'influx':{}}, 'hej': {}};
}

server.on('message',function(msg,info){
	payload = getPayload(msg);
	process.stdout.write("\x1b[34mData recieved from\x1b[0m " + payload.SystemId  + " \x1b[34mand message is:\x1b[0m " + payload.MessageId + " \r");

	if(payload.MessageId in messages) {
		// If error in message lets try/catch it so we dont rage quit
		try {
		obj = Object.assign(payload, eval(messages[payload.MessageId])(msg)); 
		if (debug) console.log(obj);	
		if (config[payload.MessageId] && config[payload.MessageId].mqtt || config.all.mqtt) sendMqtt(payload.SystemId,payload.MessageId,obj);
		if (config[payload.MessageId] && config[payload.MessageId].influx || config.all.influx) sendInflux(obj, tag);
		} catch (e) {
			errorText('Couldnt get payload for ' + payload.MessageId + ' Size: %s',msg.length);
			console.log(e);
			//process.exit(1);  //Lets end the program if we find errors processing the data. for error searching
		}

	} else {
		//console.log('Message with message id %s does not exist', payload.MessageId);
	}

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Batrium logger Server is listening at port' + port);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});


// Extra debugging added
process.on('unhandledRejection', (reason, p) => {
	  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	    // application specific logging, throwing an error, or other logic here
});

server.bind(18542);


