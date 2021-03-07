// Watchmon UDP Listener for your Batrium BMS system
//
// Created by daromer aka DIY Tech and Repairs 
// http://diytechandrepairs.nu
// https://www.youtube.com/user/daromeresperyd
//
// MIT Licensed
// creating a udp server
var udp = require('dgram');
var mqtt = require('mqtt')
var server = udp.createSocket('udp4');
var Parser = require('binary-parser').Parser;
const Influx = require('influx');
var fs = require('fs');




//Loading configuration file. 
try {
	var config = JSON.parse(fs.readFileSync('config/config.json', "utf8"));
}
catch (e) {
	errorText('Could not load configuration file. Will therefore not send any data out. file missing is config/config.json. Perhaps copy the dist file?'); 
	errorText('Dont worry. I copied the file for you now :) But you have to edit and restart'); 
	if (!fs.existsSync('config')){
    		fs.mkdirSync('config');
	}	
	fs.copyFile('config.json_dist','config/config.json', (err) => {
		if (err) {
			console.log("No file copied");
		}
		});
	//console.error(e);
	var config = {'all':{'mqtt':{},'influx':{}}, 'hej': {}};
	process.exit(1);
}

//fs.copyFile('config/config.json','config.json', (err) => {
//if (err) {
//	console.log("No file to copy");
//}
//});


var debug = (config.config.debug) ? config.config.debug : false;
var debugMQTT = (config.config.debugmqtt) ? config.config.debugmqtt : false;;



//MQTT server  generally localhost
var mqtthost = (config.config.mqtthost) ? config.config.mqtthost : 'localhost';
var mqttenabled = (config.config.mqttenabled) ? config.config.mqttenabled : false;
var mqttusername = (config.config.mqttusername) ? config.config.mqttusername : '';
var mqttpassword = (config.config.mqttpassword) ? config.config.mqttpassword : '';
var influxhost = (config.config.influxhost) ? config.config.influxhost :'localhost';
var influxdatabase = (config.config.influxdatabase) ? config.config.influxdatabase :'localhost';
var influxusername = (config.config.influxusername) ? config.config.influxusername : '';
var influxpassword = (config.config.influxpassword) ? config.config.influxpassword : '';
var influxenabled = (config.config.influxenabled) ? config.config.influxenabled : false;


//Setup MQTT
options={
	clientId:"raspi",
	username:mqttusername,
	password:mqttpassword,
	clean:true};

var client  = mqtt.connect('mqtt://' + mqtthost, options)

client.on("error",function(error){
	console.log("Can't connect to MQTT server" + error);
	console.log(mqttenabled);
	if (mqttenabled) { process.exit(1); }
});

//console.log("connected flag  "+client.connected);


const influx = new Influx.InfluxDB({
  host: influxhost,
  database: influxdatabase,
  port: 8086,
  username: influxusername,
  password: influxpassword,
})

console.log('Influx host set to: ' + influxhost);

influx.ping(5000).then(hosts => {
  hosts.forEach(host => {
    if (host.online) {
      console.log(`${host.url.host} responded in ${host.rtt}ms running ${host.version})`)
    } else {
      console.log(`InfluxDB: ${host.url.host} is offline so quitting`)
      if (influxenabled) process.exit(1);
    }
  })
})




// Function to get payload data
// input data object
// output payload data in json form
const payloadParser = new Parser()
	.string('first', { encoding: 'utf8', length: 1 })
	.int16le('MessageId', { formatter: (x) => {return x.toString(16);}})
	.string('nd', { encoding: 'utf8', length: 1 })
	.int16le('SystemId')
	.int16le('hubId');
function getPayload(data) {
	 return payloadParser.parse(data);
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
	messageID = data.MessageId.substring(0,2); // So we remove last 2 letters. We dont generally store full message id in config
	// In config you can set the extra tags and or serie to use. If not set they all go to generic
	tg = { systemId: data.SystemId, messageId: data.MessageId, messageType: (config[messageID] && config[messageID].tag  ) ? config[messageID].tag: 'generic' };
	// IF its node based we need to add the node-tag to it as well
	(config[messageID] && config[messageID].tagID  ) ? tg['nodeID'] =  data[config[messageID].tagID]  : '';

	influx.writeMeasurement((config[messageID] && config[messageID].serie  ) ? config[messageID].serie : 'generic', [
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
		load = file.split("_")[1];
		messages[load.toLowerCase()] = require("./payload/" + file);
		infoText('Loaded file: ' + file);

	}
	catch (e) {
 		errorText('Could not load file: ' + file)
		console.error(e);
	}
});



// Time to process incomming data
var tag;
// Parse new messages incomming from Batrium 
server.on('message',function(msg,info){
	payload = getPayload(msg);
	//process.stdout.write("\x1b[34mData recieved from\x1b[0m " + payload.SystemId  + " \x1b[34mand message is:\x1b[0m " + payload.MessageId + " \r");
	messageID = payload.MessageId.substring(0,2);	// uggly but it just brings out the message id and removes the versiion
	if(payload.MessageId in messages) {
		// If error in message lets try/catch it so we dont rage quit
		try {
			obj = Object.assign(payload, messages[payload.MessageId](msg));
			if (debug) console.log(obj);	
			// check if the message id is present in the config. This dont care what version is there if file exist
			if (config[messageID] && config[messageID].mqtt || config.all.mqtt) sendMqtt(payload.SystemId,payload.MessageId,obj);
			if (config[messageID] && config[messageID].influx || config.all.influx) sendInflux(obj, tag);
		 	// Below is used if you use messageid and version in the configuration file	
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


