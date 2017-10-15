module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// Category    = Aggregated telemetry
	// Object      = Slow
	// Description = Combined status - Slow
	// MsgLength   = 66
	// Version     = 2
	// Frequency   = 20 seconds
	// Support     = Current
	// Valid to    = SW 1.0.29
	this.parse_4032 = function(msg) 
	{
			
		var status = new Parser()
		.skip(8)
		.uint32le('SystemTime') 			// Epoch
		.uint8('IsProcessControl') 			// boolean 0 = Off , 1 = On
		.uint8('IsInitialStartup') 			// boolean 0 = Off , 1 = On
		.uint8('IgnoreWhenCellsOverdue') 	// boolean 0 = Off , 1 = On
		.uint8('IgnoreWhenShuntsOverdue') 	// boolean 0 = Off , 1 = On
		.uint8('MonitorDailySessionStats') 	// boolean 0 = Off , 1 = On		
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
		.floatle('ShuntAcculmAvgCharge',	{ formatter: (x) => {return x/1000;}}) // Ah
		.floatle('ShuntAcculmAvgDischg',	{ formatter: (x) => {return x/1000;}}) // Ah
		.floatle('ShuntAcculmAvgNett',		{ formatter: (x) => {return x/1000;}}) // Ah
		.uint8(  'hasShuntSocCountLo') 		// boolean 0 = Off , 1 = On
		.uint8(  'hasShuntSocCountHi') 		// boolean 0 = Off , 1 = On		
		.uint32le('QuickSessRecentTime') 	// EPOCH
		.int16le('QuickSessNumOfRecords')
		.int16le('QuickSessMaxNumOfRecords')
		.skip(8) // acculmNett ADC counter 
		.floatle('NomCapacityToEmpty',		{ formatter: (x) => {return x/1000;}}) // Ah
		
		return status.parse(msg);
	}
}