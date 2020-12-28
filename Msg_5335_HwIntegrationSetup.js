const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = Integration
// MsgLength   = 28
// Description = Hardware Integration setup configuration
// Version     = 5
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('HwIntegrationSetupVers')
    .uint8('HwIntegrationUsbTxBroadcast')       // boolean 0 = Off , 1 = On
    .uint8('HwIntegrationWifiUdpTxBroadcast')   // boolean 0 = Off , 1 = On
    .uint8('HwIntegrationWifiBroadcastMode') /* WifiBroadcastModes
            None        = 0, NOUDP
            Verbose     = 1,
            Verbose ReadOnly = 4,
            Limited     = 2,
            Disabled    = 3, 
            SoftApOnly  = 5, */
    .uint8('HwIntegrationCanbusTxBroadcast')    // boolean 0 = Off , 1 = On
    .uint8('HwIntegrationCanbusMode') /* CanbusModes
            None        = 0,
            Native      = 1,
            Elcon TCCharger 250k = 2,
            EnPower Charger 500k = 3,
            Solax PowerSK control = 4,
            Sma SunnyIsland V31 = 5,
            Brusa NLG5  = 6,
            EnPower Charger 250k = 7,
            Solax PowerSK Limited = 8,
            Brusa NLG6  = 9,
            Project Lychee = 10,
            Eltek FlatPack2 HE2000/48 = 11,
            Victron = 15,
            Native2 = 17,
            Goodwe = 18,
            SofarME3000SP = 20,
            PylonTechSMA = 21,
            MultiMon = 23,
            Victron Master = 24,
            Elcon TCCharger 500k = 25,  */
    .uint32le('HwIntegrationCanbusRemoteAddr') // index 14
    .uint32le('HwIntegrationCanbusBaseAddr')   // index 18
    .uint32le('HwIntegrationCanbusGroupAddr')  // index 22
    .uint8('HwIntegrationMqttTxBroadcast')  // index 26 - boolean 0 = Off , 1 = On
    .uint8('HwIntegrationMqttBroadcastMode') /* WifiBroadcastModes
            Disabled    = 0,
            Normal      = 1,
            Verbose     = 2,
            Verbose ReadOnly = 3, */

module.exports = function(msg)
{
    return status.parse(msg);
}
