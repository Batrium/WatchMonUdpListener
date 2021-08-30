const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Remote
// MsgLength   = 66
// Description = Control remote setup configuration
// Version     = 3
// Frequency   = 40 seconds
// Support     = Current
// Valid from  = SW 2.17.8
const status = new Parser()
	.skip(8)
	.int16le('ControlChargeTargetNormVolt')
	.int16le('ControlChargeTargetNormAmp')
	.int16le('ControlChargeTargetNormVA')
	.int16le('ControlChargeTargetLimpVolt')
	.int16le('ControlChargeTargetLimpAmp')
	.int16le('ControlChargeTargetLimpVA')
	.int16le('ControlChargeScale16volt')
	.int16le('ControlChargeScale16amp')
	.int16le('ControlChargeScale16va')
	.int16le('ControlDischargeTargetNormVolt')
	.int16le('ControlDischargeTargetNormAmp')
	.int16le('ControlDischargeTargetNormVA')
	.int16le('ControlDischargeTargetLimpVolt')
	.int16le('ControlDischargeTargetLimpAmp')
	.int16le('ControlDischargeTargetLimpVA')
	.int16le('ControlDischargeScale16volt')
	.int16le('ControlDischargeScale16amp')
	.int16le('ControlDischargeScale16va')
	.uint8('ControlRemoteSetupVers')
	.uint8('ControlRemoteTemplateNo')
	.int16le('ControlChargeRamp1Amp')
	.int16le('ControlChargeRamp2Amp')
	.int16le('ControlChargeRamp3Amp')
	.uint8('ControlChargeRamp1SoC',     { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlChargeRamp2SoC',     { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlChargeRamp3SoC',     { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlChargeLimpSoC',      { formatter: (x) => {return x/2-5;}})  // percent
	.int16le('ControlDischargeRamp1Amp')
	.int16le('ControlDischargeRamp2Amp')
	.int16le('ControlDischargeRamp3Amp')
	.uint8('ControlDischargeRamp1SoC',  { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlDischargeRamp2SoC',  { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlDischargeRamp3SoC',  { formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ControlDischargeLimpSoC',   { formatter: (x) => {return x/2-5;}})  // percent

module.exports = function(msg)
{
	return status.parse(msg);
}
