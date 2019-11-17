const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Communication
// MsgLength   = 33
// Description = Combined status Communication
// Version     = 1
// Frequency   = 2 seconds
// Support     = Current
// Created     = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint32le('SystemTime') // Epoch
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
	.int16le('SystemAuthToken')
	.int16le('SystemAuthRejectTicks')
	.uint8('WifiState') /* Choices WifiOpStates
			Broadcast Start = 0,
			Broadcast Prep = 1,
			Broadcast TxSetup = 2,
			Broadcast Running = 3,
			UsbCmd Start = 4,
			UsbCmd Running = 5,
			UsbCmd PassThru = 6,
			UsbProg Start = 7,
			UsbProg Running = 8,
			UsbProg PassThru = 9,
			Offline Start = 10,
			Offline Running = 11,
			Offline Stop = 12,
			Limited Start = 13,
			Limited Prep = 14,
			Limited Running = 15,
			JoinAp Start = 16,
			JoinAp Running = 17,	*/
	.uint8('WifiTxCmdTicks')
	.uint8('WifiRxCmdTicks')
	.uint8('WifiRxUnknownTicks')
	.uint8('CanbusOpStatus') /* Choices

				*/
	.uint8('CanbusRxStatusTicks')
	.uint8('CanbusRxUnknownTicks')
	.uint8('CanbusRxStatusTicks')
	.uint8('ShuntPollerMode') /* Choices ShuntPollerModes
			Idle Start = 0,
			Idle = 1,
			Sync Start = 2,
			Sync Running = 3,
			Normal = 4,
			ShuntMon2 SetupStart = 5,
			ShuntMon2 SetupRunning = 6,
			ShuntMon2 Normal = 7, */
	.uint8('ShuntStatus') /* Choices  ShuntStatuses
			Timeout = 0,
			Discharging = 1,
			Idle = 2,
			Charging = 4 */
	.uint8('ShuntRxAmpTicks')
	.uint8('ShuntTxAmpTicks')
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
	.uint8('CmuOpStatus') /* Choices */
	.uint8('CmuTxCmdTicks')

module.exports = function(msg)
{
	return status.parse(msg);
}
