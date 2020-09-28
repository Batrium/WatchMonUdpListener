const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Object      = Shunt
// MsgLength   = 76
// Description = Hardware shunt metrics
// Version     = 1
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('ShuntSocCycles')
	.uint32le('RecentTimeAcculmSave') 	// Epoch
	.uint32le('RecentTimeSocLoRecal') 	// Epoch
	.uint32le('RecentTimeSocHiRecal') 	// Epoch
	.uint32le('RecentTimeSocCountLo') 	// Epoch
	.uint32le('RecentTimeSocCountHi') 	// Epoch
	.uint8(  'hasShuntSocCountLo') 		// boolean 0 = Off , 1 = On
	.uint8(  'hasShuntSocCountHi') 		// boolean 0 = Off , 1 = On
	.int16le('EstDurationToFullmins')
	.int16le('EstDurationToEmptymins')
	.floatle('ShuntAcculmAvgCharge',	{ formatter: (x) => {return x/1000;}})	// Ah
	.floatle('ShuntAcculmAvgDischg',	{ formatter: (x) => {return x/1000;}})	// Ah
	.floatle('ShuntAcculmAvgNett',		{ formatter: (x) => {return x/1000;}})	// Ah
	.uint32le('ShuntSerialNo')
	.uint32le('ShuntManuCode')
	.int16le('ShuntPartNum')
	.int16le('ShuntVersCode')
	.string('ShuntPns1', 				{ encoding: 'utf8', length: 8 })
	.string('ShuntPns2', 				{ encoding: 'utf8', length: 8 })

module.exports = function(msg)
{
	return status.parse(msg);
}
