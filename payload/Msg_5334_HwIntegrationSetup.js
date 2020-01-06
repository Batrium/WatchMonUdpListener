const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = Integration
// MsgLength   = 26
// Description = Hardware Integration setup configuration
// Version     = 4
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('HwIntegrationSetupVers')
	.uint8('HwIntegrationUsbTxBroadcast')  		// boolean 0 = Off , 1 = On
	.uint8('HwIntegrationWifiUdpTxBroadcast') 	// boolean 0 = Off , 1 = On
	.uint8('HwIntegrationWifiBroadcastMode') /* WifiBroadcastModes
			None 		= 0,
			Verbose 	= 1,
			Verbose ReadOnly = 4,
			Limited 	= 2,
			Disabled 	= 3, */
	.uint8('HwIntegrationCanbusTxBroadcast') 	// boolean 0 = Off , 1 = On
	.uint8('HwIntegrationCanbusMode') /* CanbusModes
			None   		= 0,
			Native 		= 1,
			Elcon TCCharger = 2,
			EnPower Charger500k = 3,
			Solax PowerSK control = 4,
			Sma SunnyIsland V31 = 5,
			Brusa NLG5 	= 6,
			EnPower Charger 250k = 7,
			Solax PowerSK Limited = 8,
			Brusa NLG6 	= 9,
			Project Lychee = 10,
			Eltek FlatPack2 HE2000/48 = 11,
			Project42 	= 42,	*/
	.uint32le('HwIntegrationCanbusRemoteAddr')
	.uint32le('HwIntegrationCanbusBaseAddr')
	.uint32le('HwIntegrationCanbusGroupAddr')

module.exports = function(msg)
{
	return status.parse(msg);
}
