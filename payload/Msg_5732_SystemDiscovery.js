const Parser = require('binary-parser').Parser;

// Category    = Discovery
// MsgLength   = 50
// Description = System Discovery message
// Version     = 2
// Frequency   = 2 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.string('SystemCode', 	{ encoding: 'utf8', length: 8, stripNull: true })
	.int16le('SystemFirmwareVersion')
	.int16le('SystemHardwareVersion')
	.int32le('SystemTime') // Epoch
	.uint8('SystemOpStatus') /* Choices
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
	.uint8('SystemAuthMode') /* Choices
			Default 	= 0,
			Technician 	= 1,
			Factory 	= 2, */
	.uint8('CriticalBatOkState')    // 0 = Off , 1 = On
	.uint8('ChargePowerRateState')  /* Choices
			Off 			= 0,
			Limited Power 	= 2,
			Normal Power  	= 4, */
	.uint8('DischargePowerRateState') /* Choices
			Off 			= 0,
			Limited Power 	= 2,
			Normal Power  	= 4, */
	.uint8('HeatOnState') 			// 0 = Off , 1 = On
	.uint8('CoolOnState') 			// 0 = Off , 1 = On
	.int16le('MinCellVolt', 	{ formatter: (x) => {return x/1000;}})
	.int16le('MaxCellVolt', 	{ formatter: (x) => {return x/1000;}})
	.int16le('AvgCellVolt', 	{ formatter: (x) => {return x/1000;}})
	.uint8('MinCellTemp', 		{ formatter: (x) => {return x-40;}})     // temperature ºC
	.uint8('NumOfCellsActive')
	.uint8('CmuRxOpStatusUSN')
	.uint8('CmuPollerMode')  /* Choices
			Idle = 0,
			Normal = 1,
			Collection Start = 2,
			Collection Running = 3,
			Sync Start = 4,
			Sync Running = 5,
			NetworkTest Start = 6,
			NetworkTest Running = 9,
			BypassTest Start = 7,
			BypassTest Running = 8,
			RebootAll Start = 10,
			Rebooting AllDevices = 11,
			Simulator Start = 12,
			Simulator Running = 13, */
	.uint8('ShuntSOC',			{ formatter: (x) => {return x/2-5;}})    // percent
	.int16le('ShuntVoltage',	{ formatter: (x) => {return x/100;}})
	.floatle('ShuntCurrent',	{ formatter: (x) => {return x/1000;}})
	.uint8('ShuntStatus') /* Choices
			Timeout = 0,
			Discharging = 1,
			Idle = 2,
			Charging = 4 */
	.uint8('ShuntRxAmpTicks')

module.exports = function(msg)
{
	return status.parse(msg);
}
