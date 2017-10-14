module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// MsgLength   = 50;
	// Description = "System Discovery message"
	// Version     = 2;
	// Frequency   = 2 seconds
	this.parse_5732 = function(msg) 
	{
		var status = new Parser()
		.skip(8)
		.string('SystemCode', 	{ encoding: 'ascii', length: 8 })
		.int16le('SystemFirmwareVersion')
		.int16le('SystemHardwareVersion')
		.int32le('SystemTime') // Epoch
		.uint8('SystemOpStatus') // Choices
		.uint8('SystemAuthMode') // Choices
		.uint8('CriticalBatOkState')
		.uint8('ChargePowerRateState') // Choices
		.uint8('DischargePowerRateState') // Choices
		.uint8('HeatOnState') // boolean
		.uint8('CoolOnState') // boolean
		.int16le('MinCellVolt', { formatter: (x) => {return x/1000;}})
		.int16le('MaxCellVolt', { formatter: (x) => {return x/1000;}})
		.int16le('AvgCellVolt', { formatter: (x) => {return x/1000;}})
		.uint8('MinCellTemp', 	{ formatter: (x) => {return x-40;}})
		.uint8('NumOfCellsActive')
		.uint8('CmuRxOpStatusUSN')
		.uint8('CmuPollerMode') // Choices
		.uint8('ShuntSOC',	{ formatter: (x) => {return x/2-5;}}	)
		.int16le('ShuntVoltage',	{ formatter: (x) => {return x/100;}})
		.floatle('ShuntCurrent',{ formatter: (x) => {return x/1000;}})
		.uint8('ShuntStatus') // 0= timeout, 1= discharge, idle = 2, charge = 4
		.uint8('ShuntRxAmpTicks')

		return status.parse(msg);
	}
}
