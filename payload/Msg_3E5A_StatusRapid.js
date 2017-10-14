module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// MsgLength   = 48;
	// Description = "Combined status - Rapid"
	// Version     = 1;
	// Frequency   = 300 mS
	this.parse_3E5A = function(msg) 
	{
			
		var status = new Parser()
		.skip(8)
		.int16le('MinCellVolt',		{ formatter: (x) => {return x/1000;}})
		.int16le('MaxCellVolt',		{ formatter: (x) => {return x/1000;}})
		.uint8('MinCellVoltId')
		.uint8('MaxCellVoltId')
		.uint8('MinCellTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('MaxCellTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('MinCellTempId')
		.uint8('MaxCellTempId')
		.int16le('MinBypassAmp', 	{ formatter: (x) => {return x/1000;}})
		.int16le('MaxBypassAmp', 	{ formatter: (x) => {return x/1000;}})
		.uint8('MinBypassAmpId')
		.uint8('MaxBypassAmpId')
		.uint8('MinBypassTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('MaxBypassTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('MinBypassTempId',	{ formatter: (x) => {return x-40;}})
		.uint8('MaxBypasstempId',	{ formatter: (x) => {return x-40;}})
		.int16le('AvgCellVolt',   	{ formatter: (x) => {return x/1000;}})
		.uint8('AvgCellTemp',    	{ formatter: (x) => {return x-40;}})
		.uint8('NumOfCellsAboveInitialBypass')
		.uint8('NumOfCellsAboveFinalBypass')
		.uint8('NumOfCellsInBypass')
		.uint8('NumOfCellsOverdue')
		.uint8('NumOfCellsActive')
		.uint8('NumOfCellsInSystem')
		.uint8('CmuTxOpStatusId')
		.uint8('CmuRxOpStatusId')
		.uint8('CmuRxOpStatusUSN')
		.uint8('ShuntOpStatus')     // Choices
		.int16le('ShuntVoltage',	{ formatter: (x) => {return x/100;}})
		.floatle('ShuntCurrent',	{ formatter: (x) => {return x/1000;}})
		.uint8('ShuntRxAmpTicks')
		.uint8('ShuntTxAmpTicks')

		return status.parse(msg);
	}
}
