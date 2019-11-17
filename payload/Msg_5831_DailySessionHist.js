const Parser = require('binary-parser').Parser;

// Category    = Session history
// Object      = Quick
// MsgLength   = 60
// Description = Daily session history
// Version     = 1
// Frequency   = adhoc
// Support     = Current
// Created     = SW 1.0.29
const status = new Parser()
	.skip(8)
	.int16le('DailySessionHistId')
	.uint32le('DailySessionHistTime') 		// Epoch   *** log key ***
	.uint8('DailySessionHistCriticalEvents')
	.skip(1)
	.uint8('DailySessionHistMinReportTemp',			{ formatter: (x) => {return x-40;}})	// temperature ºC
	.uint8('DailySessionHistMaxReportTemp',			{ formatter: (x) => {return x-40;}})	// temperature ºC
	.uint8('DailySessionHistMinShuntSoc', 			{ formatter: (x) => {return (x-5)/2;}}) // percent
	.uint8('DailySessionHistMaxShuntSoc', 			{ formatter: (x) => {return (x-5)/2;}}) // percent
	.int16le('DailySessionHistMinCellVolt',			{ formatter: (x) => {return x/1000;}})
	.int16le('DailySessionHistMaxCellVolt',			{ formatter: (x) => {return x/1000;}})
	.int16le('DailySessionHistMinSupplyVolt',		{ formatter: (x) => {return x/100;}})
	.int16le('DailySessionHistMaxSupplyVolt',		{ formatter: (x) => {return x/100;}})
	.int16le('DailySessionHistMinShuntVolt',		{ formatter: (x) => {return x/100;}})
	.int16le('DailySessionHistMaxShuntVolt',		{ formatter: (x) => {return x/100;}})
	.uint8('DailySessionHistThermalBandA',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandB',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandC',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandD',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandE',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandF',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandG',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistThermalBandH',			{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandA',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandB',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandC',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandD',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandE',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandF',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandG',				{ formatter: (x) => {return x/10;}}) // hours
	.uint8('DailySessionHistSocBandH',				{ formatter: (x) => {return x/10;}}) // hours
	.int16le('DailySessionHistShuntPeakCharge',		{ formatter: (x) => {return x/100;}})  // amp
	.int16le('DailySessionHistShuntPeakDischg',		{ formatter: (x) => {return x/100;}})  // amp
	.int16le('DailySessionHistCumulShuntAhCharge',	{ formatter: (x) => {return x/1000;}}) // Ah
	.int16le('DailySessionHistCumulShuntAhDischg',	{ formatter: (x) => {return x/1000;}}) // Ah

module.exports = function(msg)
{
	return status.parse(msg);
}
