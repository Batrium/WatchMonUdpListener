const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Rapid
// Description = Combined status - Rapid
// MsgLength   = 48
// Version     = 1
// Frequency   = 300 mS
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.int16le('MinCellVolt',		{ formatter: (x) => {return x/1000;}})
	.int16le('MaxCellVolt',		{ formatter: (x) => {return x/1000;}})
	.uint8('MinCellVoltId')
	.uint8('MaxCellVoltId')
	.uint8('MinCellTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('MaxCellTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('MinCellTempId')
	.uint8('MaxCellTempId')
	.int16le('MinBypassAmp', 	{ formatter: (x) => {return x/1000;}})
	.int16le('MaxBypassAmp', 	{ formatter: (x) => {return x/1000;}})
	.uint8('MinBypassAmpId')
	.uint8('MaxBypassAmpId')
	.uint8('MinBypassTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('MaxBypassTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('MinBypassTempId',	{ formatter: (x) => {return x-40;}})
	.uint8('MaxBypassTempId',	{ formatter: (x) => {return x-40;}})
	.int16le('AvgCellVolt',   	{ formatter: (x) => {return x/1000;}})
	.uint8('AvgCellTemp',    	{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('NumOfCellsAboveInitialBypass')
	.uint8('NumOfCellsAboveFinalBypass')
	.uint8('NumOfCellsInBypass')
	.uint8('NumOfCellsOverdue')
	.uint8('NumOfCellsActive')
	.uint8('NumOfCellsInSystem')
	.uint8('CmuTxOpStatusId')
	.uint8('CmuRxOpStatusId')
	.uint8('CmuRxOpStatusUSN')
	.int16le('ShuntVoltage',	{ formatter: (x) => {return x/100;}})
	.floatle('ShuntCurrent',	{ formatter: (x) => {return x/1000;}})
	.uint8('ShuntRxAmpTicks')
	.uint8('ShuntTxAmpTicks')

module.exports = function(msg)
{
	return status.parse(msg);
}
