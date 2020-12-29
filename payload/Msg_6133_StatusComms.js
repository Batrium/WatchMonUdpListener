const Parser = require('binary-parser').Parser;
// Category    = Aggregated telemetry
// Object      = Communication
// MsgLength   = 94
// Description = Combined status Communication
// Version     = 3
// Frequency   = 300 milliseconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint32le('SystemTime')  // index 8 - Epoch
    .uint8('SystemOpStatus') /* Choices
            Simulator = 0,        // LED = rainbow pulse
            Idle = 1,             // LED = green slow pulse
            Discharging = 2,      // LED = green solid 
            SoC Empty = 3,        // LED = green double blink
            Charging = 4,         // LED = blue slow pulse
            Full = 5,             // LED = blue double blink
            Timeout = 6,          // LED = red solid
            Critical Pending = 7, // LED = red fast pulse
            Critical Offline = 8, // LED = red slow pulse
            Mqtt Offline = 9,     // LED = white blink
            Auth Setup = 10,      // LED = white solid
            Shunt Timeout = 11,   // LED = red solid    */
    .uint8('SystemAuthMode') /* Choices
            Default = 0,
            Technician = 1,
            Factory = 2, */
    .int16le('SystemAuthToken')       // index 14
    .uint8('SystemAuthRejectTicks')   // index 16
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
            JoinAp Running = 17,    */      
    .uint8('WifiRxCmdTicks')     // index 18
    .uint8('WifiRxUnknownTicks') // index 19
    .uint8('WifiRxErrorTicks')   // index 20
    .uint8('WifiTxCmdTicks')     // index 21
    .uint8('WifiRssi')           // index 22
    .uint8('CanbusOpStatus') /* Choices */      
    .uint8('CanbusRxStatusTicks')  // index 24
    .uint8('CanbusRxUnknownTicks') // index 25
    .uint8('CanbusRxErrorTicks')   // index 26
    .uint8('CanbusRxCmdTicks')     // index 27
    .uint8('CanbusTxCmdTicks')     // index 28
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
    .uint8('ShuntStatusVolt')     // index 31       
    .uint8('ShuntRxCmdTicks')     // index 32
    .uint8('ShuntRxUnknownTicks') // index 33
    .uint8('ShuntRxErrorTicks')   // index 34
    .uint8('ShuntTxCmdTicks')     // index 35
    .uint8('ShuntRxIdle')         // index 36
    .uint8('UsbOpStatus') /* Choices */     
    .uint8('UsbRxCmdTicks')       // index 38
    .uint8('UsbRxUnknownTicks')   // index 39
    .uint8('UsbRxErrorTicks')     // index 40
    .uint8('UsbTxCmdTicks')       // index 41
    .uint8('MqttOpStatus') /* Choices */        
    .uint16le('MqttRxCmdTicks')   // index 43
    .uint8('MqttRxUnknownTicks')  // index 45
    .uint8('MqttRxErrorTicks')    // index 46
    .uint16le('MqttTxCmdTicks')   // index 47
    .uint8('rs485OpStatus')  /* Choices */      
    .uint8('rs485RxCmdTicks')     // index 50
    .uint8('rs485RxUnknownTicks') // index 51
    .uint8('rs485RxErrorTicks')   // index 52
    .uint8('rs485TxCmdTicks')     // index 53   
    .uint8('CmuPollerMode') /* Choices
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
    .uint8('CmuRxCmdTicks')      // index 55
    .uint8('CmuRxUnknownTicks')  // index 56
    .uint8('CmuRxErrorTicks')    // index 57
    .uint8('CmuTxCmdTicks')      // index 58
    .uint8('CmuOpStatus') /* Choices */
    .uint8('CmuTxAckCount')             // index 60 - Cellmon TX Acknowledgement Count
    .uint8('CmuTxOpStatusNodeId')       // index 61 - Cellmon TX Operating Status Node ID
    .uint8('CmuTxOpStatusUSN')          // index 62 - Cellmon TX Operating Status Universal Serial Number
    .uint8('CmuTxOpParamNodeId')        // index 63 - Cellmon TX Parameter Node ID
    .int16le('GroupMinCellVolt', { formatter: (x) => {return x/1000;}}) // index 64
    .int16le('GroupMaxCellVolt', { formatter: (x) => {return x/1000;}}) // index 66
    .uint8('GroupMinCellTemp',   { formatter: (x) => {return x-40;}})   // index 68 - temperature ºC
    .uint8('GroupMaxCellTemp',   { formatter: (x) => {return x-40;}})   // index 69 - temperature ºC
    .uint8('CmuRxOpStatusNodeId')       // index 70
    .uint8('CmuRxOpStatusGroupAck')     // index 71
    .uint8('CmuRxOpStatusUSN')          // index 72
    .uint8('CmuRxOpParamNodeId')        // index 73
    .int16le('RepeatCellVoltCounter')   // index 74
    .uint8('HwSystemSetupVers')         // index 76
    .uint8('HwCellGroupSetupVers')      // index 77
    .uint8('HwShuntSetupVers')          // index 78
    .uint8('HwExpansionSetupVers')      // index 79
    .uint8('HwIntegrationSetupVers')    // index 80
    .uint8('ControlCriticalSetupVers')  // index 81
    .uint8('ControlChargeSetupVers')    // index 82
    .uint8('ControlDischargeSetupVers') // index 83
    .uint8('ControlThermalSetupVers')   // index 84
    .uint8('ControlRemoteSetupVers')    // index 85
    .uint8('ControlSchedulerSetupVers') // index 86
    .uint8('ControlSocLimitSetupVers')  // index 87
    .uint8('LifetimeSetupVers')         // index 88
    .uint8('GlobalSetupVers')           // index 89
    .uint8('DiffLogicTicks')            // index 90
    .uint8('DiffBypassTicks')           // index 91
    .uint8('DiffTempTicks')             // index 92
    .uint8('DiffVoltTicks')             // index 93

module.exports = function(msg)
{
    return status.parse(msg);
}   
