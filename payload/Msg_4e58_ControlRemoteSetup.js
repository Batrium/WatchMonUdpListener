const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Remote
// MsgLength   = 45
// Description = Control remote setup configuration
// Version     = 1
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
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

module.exports = function(msg)
{
	return status.parse(msg);
}
