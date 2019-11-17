const Parser = require('binary-parser').Parser;

// Category    = Telemetry
// Object      = CellNodeItem
// Description = Cell node - full details
// MsgLength   = 52
// Version     = 2
// Frequency   = 300 mS
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('ID')
	.uint8('USN')
	.int16le('MinCellVolt',			{ formatter: (x) => {return x/1000;}})
	.int16le('MaxCellVolt',			{ formatter: (x) => {return x/1000;}})
	.uint8('MinCellTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('BypassTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.int16le('BypassAmp', 			{ formatter: (x) => {return x/1000;}})
	.uint8('DataErrorCounter')
	.uint8('ResetCounter')
	.uint8('Status') /* Choices NodeStatuses
			None = 0,
			HighVolt = 1,
			HighTemp = 2,
			Ok = 3,
			Timeout = 4,
			LowVolt = 5,
			Disabled = 6,
			InBypass = 7,
			InitialBypass = 8,
			FinalBypass = 9,
			MissingSetup = 10,
			NoConfig = 11,
			CellOutLimits = 12, */
	.uint8('IsOverdue')				// boolean 0 = Off , 1 = On

	.int16le('LoCellVoltAlert',		{ formatter: (x) => {return x/1000;}})
	.int16le('HiCellVoltAlert',		{ formatter: (x) => {return x/1000;}})
	.int16le('BypassVoltLevel',		{ formatter: (x) => {return x/1000;}})
	.int16le('BypassAmpLimit',		{ formatter: (x) => {return x/1000;}})
	.uint8('BypassTempLimit',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('HiCellTempAlert',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('RawVoltCalOffset')
	.int16le('FwVers')
	.int16le('HwVers')
	.int16le('BootVers')
	.uint32le('SerialNo')
	.uint32le('BypassInitialDate') 	// Epoch
	.floatle('BypassSessionAh',		{ formatter: (x) => {return x/1000;}}) // Ah
	.uint8('RepeatCellV')

module.exports = function(msg)
{
	return status.parse(msg);
}
