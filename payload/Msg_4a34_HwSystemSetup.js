const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = System
// MsgLength   = 74
// Description = System setup configuration
// Version     = 4
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.int16le('HwSystemSetupVers')
	.string('SystemCode', 	{ encoding: 'utf8', length: 8 })
	.string('SysName', 		{ encoding: 'utf8', length: 20 })
	.string('AssetCode', 	{ encoding: 'utf8', length: 20 })
	.uint8('AllowTechAuth') 		// boolean 0 = Off , 1 = On
	.uint8('AllowQuickSession') 	// boolean 0 = Off , 1 = On
	.uint32le('QuickSessionInterval', { formatter: (x) => {return x/1000;}})  // seconds
	.int16le('SystemPresetId')
	.int16le('SystemFirmwareVersion')
	.int16le('SystemHardwareVersion')
	.uint32le('SystemSerialNo')

module.exports = function(msg)
{
	return status.parse(msg);
}
