const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Discharge
// MsgLength   = 49
// Description = Control Discharge setup configuration
// Version     = 1
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8(   'ControlDischargeMode') /* Choices ControlDischgModes
			Auto		  	 = 0,
			Manually On      = 1,
			Manually Off     = 2,
			Manually Limited = 3, */
	.uint8(   'ControlDischargeAllowLimPowerStage')	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeMonitorCellTempLo') 	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeMonitorCellTempHi') 	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeCellTempLo',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(   'ControlDischargeCellTempHi',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(   'ControlDischargeMonitorAmbientLo') 	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeMonitorAmbientHi') 	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeAmbientTempLo',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(   'ControlDischargeAmbientTempHi',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(   'ControlDischargeMonitorSupplyLo') 	// boolean 0 = Off , 1 = On
	.int16le( 'ControlDischargeSupplyVoltLo',		{ formatter: (x) => {return x/100;}})
	.int16le( 'ControlDischargeSupplyVoltResume',	{ formatter: (x) => {return x/100;}})
	.uint8(   'ControlDischargeMonitorCellVoltLo') 	// boolean 0 = Off , 1 = On
	.int16le( 'ControlDischargeCellVoltLo',			{ formatter: (x) => {return x/1000;}})
	.int16le( 'ControlDischargeCellVoltResume',		{ formatter: (x) => {return x/1000;}})
	.int16le( 'ControlDischargeCellVoltLimPower',	{ formatter: (x) => {return x/1000;}})
	.uint8(   'ControlDischargeMonitorShuntVoltLo') // boolean 0 = Off , 1 = On
	.int16le( 'ControlDischargeShuntVoltLo',		{ formatter: (x) => {return x/100;}})
	.int16le( 'ControlDischargeShuntVoltResume',	{ formatter: (x) => {return x/100;}})
	.int16le( 'ControlDischargeShuntVoltLimPower',	{ formatter: (x) => {return x/100;}})
	.uint8(   'ControlDischargeMonitorShuntSocLo') 	// boolean 0 = Off , 1 = On
	.uint8(   'ControlDischargeShuntSocLo', 		{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint8(   'ControlDischargeShuntSocResume', 	{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint32le('ControlDischargeStopInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlDischargeStartInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint8(   'ControlDischargeSetupVers')

module.exports = function(msg)
{
	return status.parse(msg);
}
