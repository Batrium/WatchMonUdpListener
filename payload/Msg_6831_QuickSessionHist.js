const Parser = require('binary-parser').Parser;

// Category    = Session history
// Object      = Quick
// MsgLength   = 32
// Description = Quick session history
// Version     = 1
// Frequency   = adhoc
// Support     = Current
// Created     = SW 1.0.29
const status = new Parser()
	.skip(8)
	.int16le('QuickSessionHistId')
	.uint32le('QuickSessionHistTime') 		// Epoch  *** log key ***
	.uint8('QuickSessionHistSystemOpState') /* Choices
			Simulator = 0,   	  // LED = rainbow pulse
			Idle = 1,        	  // LED = green slow pulse
			Discharging = 2, 	  // LED = green solid
			SoC Empty = 3,   	  // LED = green double blink
			Charging = 4,    	  // LED = blue slow pulse
			Full = 5,        	  // LED = blue double blink
			Timeout = 6,     	  // LED = red solid
			Critical Pending = 7, // LED = red fast pulse
			Critical Offline = 8, // LED = red slow pulse
			Mqtt Offline = 9,     // LED = white blink
			Auth Setup = 10,      // LED = white solid
			Shunt Timeout = 11,   // LED = red solid  	*/
	.uint8( 'QuickSessionHistControlLogic')
	.int16le('QuickSessionHistMinCellVolt',			{ formatter: (x) => {return x/1000;}})
	.int16le('QuickSessionHistMaxCellVolt',			{ formatter: (x) => {return x/1000;}})
	.int16le('QuickSessionHistAvgCellVolt',			{ formatter: (x) => {return x/1000;}})
	.uint8(  'QuickSessionHistAvgCellTemp',			{ formatter: (x) => {return x-40;}})	// temperature ºC
	.int16le('QuickSessionHistSocHiRes',			{ formatter: (x) => {return x/100;}})	// percent
	.int16le('QuickSessionHistShuntVolt',			{ formatter: (x) => {return x/100;}})
	.floatle('QuickSessionHistShuntAmp',			{ formatter: (x) => {return x/1000;}})  // amp
	.uint8(  'QuickSessionHistNumOfCellsInBypass')

module.exports = function(msg)
{
	return status.parse(msg);
}
