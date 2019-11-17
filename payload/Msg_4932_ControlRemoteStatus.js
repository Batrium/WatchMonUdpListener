const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Remote
// MsgLength   = 62
// Description = Control remote status
// Version     = 2
// Frequency   = 2 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('CanbusRxStatusTicks')
	.uint8('CanbusRxUnknownTicks')
	.uint8('CanbusTxCmdTicks')
	.uint8(  'RemoteChargeActualCelcius', 		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.int16le('RemoteChargeTargetVolt')
	.int16le('RemoteChargeTargetAmp')
	.int16le('RemoteChargeTargetVA')
	.int16le('RemoteChargeActualVolt')
	.int16le('RemoteChargeActualAmp')
	.int16le('RemoteChargeActualVA')
	.uint32le('RemoteChargeActualFlag1')
	.uint32le('RemoteChargeActualFlag2')
	.uint32le('RemoteChargeActualRxTime') // Epoch
	.skip(1)
	.uint8(  'RemoteDishargeActualCelcius', 	{ formatter: (x) => {return x-40;}}) // temperature ºC
	.int16le('RemoteDischargeTargetVolt')
	.int16le('RemoteDischargeTargetAmp')
	.int16le('RemoteDischargeTargetVA')
	.int16le('RemoteDischargeActualVolt')
	.int16le('RemoteDischargeActualAmp')
	.int16le('RemoteDischargeActualVA')
	.uint32le('RemoteDischargeActualFlag1')
	.uint32le('RemoteDischargeActualFlag2')
	.uint32le('RemoteDischargeActualRxTime') // Epoch

module.exports = function(msg)
{
	return status.parse(msg);
}
