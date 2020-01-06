const Parser = require('binary-parser').Parser;

// Category    = Aggregated
// Object      =
// Description = Combined status -
// MsgLength   =
// Version     =
// Frequency   = 20
// Support     =
// Valid to    = SW 1.0.

const status = new Parser()
	.skip(8)
	.uint32le('SystemTime') 			//
	.uint8('IsProcessControl') 			// boolean 0 = Off , 1 =
	.uint8('IsInitialStartup') 			// boolean 0 = Off , 1 =
	.uint8('IgnoreWhenCellsOverdue') 	// boolean 0 = Off , 1 =
	.uint8('IgnoreWhenShuntsOverdue') 	// boolean 0 = Off , 1 =
	.uint8('MonitorDailySessionStats') 	// boolean 0 = Off , 1 =
	.uint8('HwSystemSetupVers')
	.uint8('HwCellmonSetupVers')
	.uint8('HwShuntSetupVers')
	.uint8('HwExpansionSetupVers')
	.uint8('HwIntegrationSetupVers')
	.uint8('ControlCriticalSetupVers')
	.uint8('ControlChargeSetupVers')
	.uint8('ControlDischargeSetupVers')
	.uint8('ControlThermalSetupVers')
	.uint8('ControlRemoteSetupVers')
	.uint8('ControlSchedulerSetupVers')
	.int16le('EstDurationToFullmins')
	.int16le('EstDurationToEmptymins')
	.floatle('ShuntAcculmAvgCharge',	{ formatter: (x) => {return x/1000;}}) //
	.floatle('ShuntAcculmAvgDischg',	{ formatter: (x) => {return x/1000;}}) //
	.floatle('ShuntAcculmAvgNett',		{ formatter: (x) => {return x/1000;}}) //
	.uint8(  'hasShuntSocCountLo') 		// boolean 0 = Off , 1 =
	.uint8(  'hasShuntSocCountHi') 		// boolean 0 = Off , 1 = On
	.uint32le('QuickSessRecentTime') 	//
	.int16le('QuickSessNumOfRecords')
	.int16le('QuickSessMaxNumOfRecords')
	.skip(8) // acculmNett ADC
	.floatle('NomCapacityToEmpty',		{ formatter: (x) => {return x/1000;}}) //

module.exports = function(msg)
{
	return status.parse(msg);
}
