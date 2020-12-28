const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = System
// MsgLength   = 76
// Description = System setup configuration
// Version     = 5
// Frequency   = 20 seconds
const status = new Parser()
    .skip(8)
    .int16le('HwSystemSetupVers')
    .string('SystemCode',   { encoding: 'utf8', length: 8, stripNull: true })
    .string('SysName',      { encoding: 'utf8', length: 20, stripNull: true })
    .string('AssetCode',    { encoding: 'utf8', length: 20, stripNull: true })
    .uint8('AllowTechAuth')         // boolean 0 = Off , 1 = On
    .uint8('AllowQuickSession')     // boolean 0 = Off , 1 = On
    .uint32le('QuickSessionInterval', { formatter: (x) => {return x/1000;}})  // seconds
    .int16le('SystemPresetId')
    .int16le('SystemFirmwareVersion')
    .int16le('SystemHardwareVersion')
    .uint32le('SystemSerialNo')
    .uint8('ShowScheduler')         // boolean 0 = Off , 1 = On
    .uint8('ShowStripCycle')        // boolean 0 = Off , 1 = On

module.exports = function(msg)
{
    return status.parse(msg);
}
