const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Critical
// MsgLength   = 75
// Description = Control Critical setup configuration
// Version     = 3
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8( 'ControlCriticalMode')   /* Choices ControlCriticalModes
			Auto 			= 0,
			Manually On 	= 1,
			Manually Off  	= 2, */
	.uint8( 'ControlCriticalAutoRecovery')  			// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalIgnoreCellsOverdue') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorCellVoltLo') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorCellVoltHi') 		// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalCellVoltLo',				{ formatter: (x) => {return x/1000;}})
	.int16le('ControlCriticalCellVoltHi',				{ formatter: (x) => {return x/1000;}})
	.uint8( 'ControlCriticalMonitorCellTempLo') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorCellTempHi') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalCellTempLo',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8( 'ControlCriticalCellTempHi',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8( 'ControlCriticalMonitorSupplyLo') 			// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorSupplyHi') 			// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalSupplyVoltLo',				{ formatter: (x) => {return x/100;}})
	.int16le('ControlCriticalSupplyVoltHi',				{ formatter: (x) => {return x/100;}})
	.uint8( 'ControlCriticalMonitorAmbientLo') 			// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorAmbientHi') 			// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalAmbientTempLo',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8( 'ControlCriticalAmbientTempHi',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8( 'ControlCriticalMonitorShuntVoltLo') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorShuntVoltHi') 		// boolean 0 = Off , 1 = On
	.uint8( 'ControlCriticalMonitorShuntVoltLoIdle') 	// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalShuntVoltLo',				{ formatter: (x) => {return x/100;}})
	.int16le('ControlCriticalShuntVoltHi',				{ formatter: (x) => {return x/100;}})
	.int16le('ControlCriticalShuntVoltLoIdle',			{ formatter: (x) => {return x/100;}})
	.uint8(  'ControlCriticalMonitorShuntPeakCharge') 	// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalShuntPeakCharge',			{ formatter: (x) => {return x/100;}}) // amps
	.int16le('ControlCriticalShuntCrateCharge',			{ formatter: (x) => {return x/100;}}) // ratio
	.uint8(  'ControlCriticalMonitorShuntPeakDischg') 	// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalShuntPeakDischg',			{ formatter: (x) => {return x/100;}}) // amps
	.int16le('ControlCriticalShuntCrateDischg',			{ formatter: (x) => {return x/100;}}) // ratio
	.uint32le('ControlCriticalStopInterval',			{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlCriticalStartInterval',			{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlCriticalTimeoutManualOverride',	{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlCriticalPrechargeTimeInterval',	{ formatter: (x) => {return x/1000;}}) // seconds
	.uint8(  'ControlCriticalIgnoreShuntOverdue') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlCriticalIgnoreRemoteOverdue') 		// boolean 0 = Off , 1 = On
	.int16le('ControlCriticalRecoverSupplyGapVolt',		{ formatter: (x) => {return x/100;}})
	.int16le('ControlCriticalRecoverShuntChargeLimit',	{ formatter: (x) => {return x/100;}}) // amps
	.int16le('ControlCriticalRecoverShuntDischgLimit',	{ formatter: (x) => {return x/100;}}) // amps
	.uint8(  'ControlCriticalSetupVers')

module.exports = function(msg)
{
	return status.parse(msg);
}
