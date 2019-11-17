const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Charge
// MsgLength   = 60
// Description = Control Charging setup configuration
// Version     = 3
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8( 'ControlChargeMode')  /* Choices ControlChargeModes
			Auto		  	 = 0,
			Manually On      = 1,
			Manually Off     = 2,
			Manually Limited = 3, */
	.uint8(  'ControlChargeAllowLimPowerStage')  	// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeAllowBypassLimPower') 	// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeAllowBypassComplete') 	// boolean 0 = Off , 1 = On
	.int16le('ControlChargeInitalBypassAmp',		{ formatter: (x) => {return x/1000;}})
	.int16le('ControlChargeFinalBypassAmp',			{ formatter: (x) => {return x/1000;}})
	.uint8(  'ControlChargeMonitorCellTempLo') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeMonitorCellTempHi') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeCellTempLo',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(  'ControlChargeCellTempHi',				{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(  'ControlChargeMonitorAmbientLo') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeMonitorAmbientHi') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeAmbientTempLo',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(  'ControlChargeAmbientTempHi',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8(  'ControlChargeMonitorSupplyHi') 		// boolean 0 = Off , 1 = On
	.int16le('ControlChargeSupplyVoltHi',			{ formatter: (x) => {return x/100;}})
	.int16le('ControlChargeSupplyVoltResume',		{ formatter: (x) => {return x/100;}})
	.uint8(  'ControlChargeMonitorCellVoltHi') 		// boolean 0 = Off , 1 = On
	.int16le('ControlChargeCellVoltHi',				{ formatter: (x) => {return x/1000;}})
	.int16le('ControlChargeCellVoltResume',			{ formatter: (x) => {return x/1000;}})
	.int16le('ControlChargeCellVoltLimPower',		{ formatter: (x) => {return x/1000;}})
	.uint8(  'ControlChargeMonitorShuntVoltHi') 	// boolean 0 = Off , 1 = On
	.int16le('ControlChargeShuntVoltHi',			{ formatter: (x) => {return x/100;}})
	.int16le('ControlChargeShuntVoltResume',		{ formatter: (x) => {return x/100;}})
	.int16le('ControlChargeShuntVoltLimPower',		{ formatter: (x) => {return x/100;}})
	.uint8(  'ControlChargeMonitorShuntSocHi') 		// boolean 0 = Off , 1 = On
	.uint8(  'ControlChargeShuntSocHi', 			{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint8(  'ControlChargeShuntSocResume', 		{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint32le('ControlChargeStopInterval',			{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlChargeStartInterval',			{ formatter: (x) => {return x/1000;}}) // seconds
	.uint8(  'ControlChargeSetupVers')
	.floatle('ControlChargeBypassSessionLo',		{ formatter: (x) => {return x/1000;}})	// Ah
	.uint8(  'ControlChargeAllowBypassSession') 	// boolean 0 = Off , 1 = On

module.exports = function(msg)
{
	return status.parse(msg);
}
