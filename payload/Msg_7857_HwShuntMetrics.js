module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// Category    = Hardware Metrics
	// Object      = Shunt
	// MsgLength   = 76
	// Description = Hardware shunt metrics
	// Version     = 1
	// Frequency   = 20 seconds
	// Support     = Current
	// Valid to    = SW 1.0.29
	this.parse_7857 = function(msg) 
	{
		var status = new Parser()
		.skip(8)
		.uint8('ShuntSocCycles')  
		.uint32le('RecentTimeAcculmSave') 	// Epoch
		.uint32le('RecentTimeSocLoRecal') 	// Epoch
		.uint32le('RecentTimeSocHiRecal') 	// Epoch
		.uint32le('RecentTimeSocCountLo') 	// Epoch
		.uint32le('RecentTimeSocCountHi') 	// Epoch
		.uint32le('hasShuntSocCountLo') 	// boolean 0 = Off , 1 = On
		.uint32le('hasShuntSocCountHi') 	// boolean 0 = Off , 1 = On
		.int16le('EstDurationToFullmins') 
		.int16le('EstDurationToEmptymins') 
		.floatle('ShuntAcculmAvgCharge',	{ formatter: (x) => {return x/1000;}})	// Ah
		.floatle('ShuntAcculmAvgDischg',	{ formatter: (x) => {return x/1000;}})	// Ah
		.floatle('ShuntAcculmAvgNett',		{ formatter: (x) => {return x/1000;}})	// Ah
		.uint32le('ShuntSerialNo') 
		.uint32le('ShuntManuCode') 
		.int16le('ShuntPartNum')
		.int16le('ShuntVersCode')
		.string('ShuntPns1', 				{ encoding: 'ascii', length: 8 })
		.string('ShuntPns2', 				{ encoding: 'ascii', length: 8 })
						
		return status.parse(msg);
	}
}