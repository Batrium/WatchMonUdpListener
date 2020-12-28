const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = System
// MsgLength   = 82
// Description = System setup configuration
// Version     = 6
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('HwSystemSetupVers') // index 8
    .skip(1)
    .int16le('SystemId')        // index 10
    .int16le('HubId')           // index 12
    .string('SystemCode',  { encoding: 'utf8', length: 8, stripNull: true })  // index 14
    .string('SysName',     { encoding: 'utf8', length: 20, stripNull: true }) // index 22
    .string('AssetCode',   { encoding: 'utf8', length: 20, stripNull: true }) // index 42
    .bit1('AllowTechAuthUsb')         // boolean index 62 - bit0
    .bit1('AllowTechAuthWifi')        // boolean index 62 - bit1
    .bit1('AllowTechAuthMqtt')        // boolean index 62 - bit2
    .bit5('reserved1')                  
    .bit1('AllowProgUpdateUsb')       // boolean index 63 - bit0
    .bit1('AllowProgUpdateWifi')      // boolean index 64 - bit1
    .bit6('reserved2')                // discard
    .int16le('SystemPresetId')        // index 64
    .int16le('SystemFirmwareVersion') // index 66
    .int16le('SystemHardwareVersion') // index 68
    .uint32le('SystemSerialNo')       // index 70
    .int16le('reserved3')             // index 74
    .uint8('AllowQuickSession')       // boolean index 77 - bit0 - 0 = Off , 1 = On
    .uint32le('QuickSessionInterval', { formatter: (x) => {return x/1000;}})  // index 78 - seconds

module.exports = function(msg)
{
    return status.parse(msg);
}
