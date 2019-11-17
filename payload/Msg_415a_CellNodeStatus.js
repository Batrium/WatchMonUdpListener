const Parser = require('binary-parser').Parser;

// Category    = Telemetry
// Object      = CellNodeItem
// Description = Cell node - array up to 16 nodes
// MsgLength   = variable
// Version     = 1
// Frequency   = 300 mS
// Support     = Current
// Valid to    = SW 1.0.29
const subParser = new Parser()
	.uint8('ID')
	.uint8('USN')
	.int16le('MinCellVolt',                 { formatter: (x) => {return x/1000;}})
	.int16le('MaxCellVolt',                 { formatter: (x) => {return x/1000;}})
	.uint8('MinCellTemp',                   { formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('BypassTemp',                    { formatter: (x) => {return x-40;}}) // temperature ºC
	.int16le('BypassAmp',                   { formatter: (x) => {return x/1000;}})
	.uint8('Status'); /* Choices NodeStatuses
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

const status = new Parser()
	.skip(8)
	.uint8('CmuRxOpStatusNodeID')
	.uint8('Records')
	.uint8('FirstNodeID')
	.uint8('LastNodeID')
	.array('nodes', {
		type : subParser,
		length : 'Records'
	});

module.exports = function(msg)
{
	return status.parse(msg);
}
