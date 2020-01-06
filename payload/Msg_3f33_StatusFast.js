const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Fast
// MsgLength   = 80
// Description = Combined status Fast
// Version     = 3
// Frequency   = 2 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('CmuPollerMode') 	    /* Choices
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
	.uint8('CmuTxAckCount')            // Cellmon TX Acknowledgement Count
	.uint8('CmuTxOpStatusNodeId')      // Cellmon TX Operating Status Node ID
	.uint8('CmuTxOpStatusUSN')         // Cellmon TX Operating Status Universal Serial Number
	.uint8('CmuTxOpParamNodeId')       // Cellmon TX Parameter Node ID
	.int16le('GroupMinCellVolt',		{ formatter: (x) => {return x/1000;}})
	.int16le('GroupMaxCellVolt',		{ formatter: (x) => {return x/1000;}})
	.uint8('GroupMinCellTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('GroupMaxCellTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('CmuRxOpStatusNodeId')
	.uint8('CmuRxOpStatusGroupAck')
	.uint8('CmuRxOpStatusUSN')
	.uint8('CmuRxOpParamNodeId')
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
			Default = 0,
			Technician = 1,
			Factory = 2, */
	.int16le('SupplyVolt',				{ formatter: (x) => {return x/100;}})
	.uint8('AmbientTemp',				{ formatter: (x) => {return x-40;}})   // temperature ºC
	.uint32le('SystemTime') // Epoch
	.uint8('ShuntSOC', 					{ formatter: (x) => {return x/2-5;}})  // percent
	.uint8('ShuntTemp',					{ formatter: (x) => {return x-40;}})   // temperature ºC
	.floatle('NomCapacityToFull',		{ formatter: (x) => {return x/1000;}}) // Ah
	.floatle('NomCapacityToEmpty',		{ formatter: (x) => {return x/1000;}}) // Ah
	.uint8('ShuntPollerMode') /* Choices
			Idle Start = 0,
			Idle = 1,
			Sync Start = 2,
			Sync Running = 3,
			Normal = 4,
			ShuntMon2 SetupStart = 5,
			ShuntMon2 SetupRunning = 6,
			ShuntMon2 Normal = 7, */
	.uint8('ShuntStatus') /* Choices
			Timeout = 0,
			Discharging = 1,
			Idle = 2,
			Charging = 4 */
	.uint8('hasShuntLoSocRecal')		// boolean 0 = Off , 1 = On
	.uint8('hasShuntHiSocRecal') 		// boolean 0 = Off , 1 = On
	//  shunt.hasShuntOkSocRange = !(shunt.hasShuntLoSocRecal || shunt.hasShuntHiSocRecal);
	.uint8('ExpansionOutputFet5') 		// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputFet6') 		// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputFet7') 		// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputFet8') 		// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputRelay1') 	// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputRelay2') 	// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputRelay3') 	// boolean 0 = Off , 1 = On
	.uint8('ExpansionOutputRelay4') 	// boolean 0 = Off , 1 = On
	.int16le('ExpansionOutputPwm1')
	.int16le('ExpansionOutputPwm2')
	.uint8('ExpansionInput1') 			// boolean 0 = Off , 1 = On
	.uint8('ExpansionInput2') 			// boolean 0 = Off , 1 = On
	.uint8('ExpansionInput3') 			// boolean 0 = Off , 1 = On
	.uint8('ExpansionInput4') 			// boolean 0 = Off , 1 = On
	.uint8('ExpansionInput5')
	.int16le('ExpansionInputAIN1')
	.int16le('ExpansionInputAIN2')
	.floatle('MinBypassSession', 		{ formatter: (x) => {return x/1000;}}) // Ah
	.floatle('MaxBypassSession', 		{ formatter: (x) => {return x/1000;}}) // Ah
	.uint8('MinBypassSessionID')
	.uint8('MaxBypassSessionID')
	.uint8('RebalanceBypassExtra')  	// boolean 0 = Off , 1 = On
	.int16le('RepeatCellVoltCounter')

module.exports = function(msg)
{
	return status.parse(msg);
}
