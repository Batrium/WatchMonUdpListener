const Parser = require('binary-parser').Parser;

// Category    = Telemetry
// Object      = Daily Session
// MsgLength   = 69
// Description = Daily session today in progress calc
// Version     = 2
// Frequency   = 20 seconds
// Support     = Current
// Valid from  = SW 1.0.30
const status = new Parser()
	.skip(8)
	.int16le('DailySessionMinCellVolt',		{ formatter: (x) => {return x/1000;}})
	.int16le('DailySessionMaxCellVolt',		{ formatter: (x) => {return x/1000;}})
	.int16le('DailySessionMinSupplyVolt',	{ formatter: (x) => {return x/100;}})
	.int16le('DailySessionMaxSupplyVolt',	{ formatter: (x) => {return x/100;}})
	.uint8('DailySessionMinReportTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('DailySessionMaxReportTemp',		{ formatter: (x) => {return x-40;}}) // temperature ºC
	.int16le('DailySessionMinShuntVolt',	{ formatter: (x) => {return x/100;}})
	.int16le('DailySessionMaxShuntVolt',	{ formatter: (x) => {return x/100;}})
	.uint8('DailySessionMinShuntSoc', 		{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint8('DailySessionMaxShuntSoc', 		{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint8('DailySessionThermalBandA',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandB',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandC',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandD',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandE',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandF',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandG',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionThermalBandH',		{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandA',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandB',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandC',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandD',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandE',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandF',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandG',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionSocBandH',			{ formatter: (x) => {return x/10;}}) // hours
	.int16le('DailySessionShuntPeakCharge',{ formatter: (x) => {return x/100;}}) // amps
	.int16le('DailySessionShuntPeakDischg',{ formatter: (x) => {return x/100;}}) // amps
	.uint8('DailySessionCriticalEvents')
	.int32le('DailySessionStartTime') 	// Epoch
	.int32le('DailySessionFinishTime')  // Epoch
	.floatle('DailySessionCumulShuntAhCharge',{ formatter: (x) => {return x/1000;}})  // Ah
	.floatle('DailySessionCumulShuntAhDischg',{ formatter: (x) => {return x/1000;}})  // Ah
	.floatle('DailySessionCumulShuntkWhCharge',{ formatter: (x) => {return x/1000;}}) // kWh
	.floatle('DailySessionCumulShuntkWhDischg',{ formatter: (x) => {return x/1000;}}) // kWh

module.exports = function(msg)
{
	return status.parse(msg);
}
