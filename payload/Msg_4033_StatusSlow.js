const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Description = Combined status - slow miscellaneous
// MsgLength   = 66
// Version     = 3
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint32le('StartupTime')             // index 8 - Epoch
    .int16le('DailySessNumOfRecords')    // index 12
    .int16le('DailySessMaxNumOfRecords') // index 14
    .uint32le('QuickSessRecentTime')     // index 16 - Epoch
    .int16le('QuickSessNumOfRecords')    // index 20
    .int16le('QuickSessMaxNumOfRecords') // index 22
    .bit1('IsProcessControl')         // boolean index 24 - bit0
    .bit1('IsInitialStartup')         // boolean index 24 - bit1
    .bit1('IgnoreWhenCellsOverdue')   // boolean index 24 - bit2
    .bit1('IgnoreWhenShuntsOverdue')  // boolean index 24 - bit3
    .bit1('MonitorDailySessionStats') // boolean index 24 - bit4
    .bit3('reserved1')
    .skip(1)    
    .floatle('NomCapacityToEmpty',  { formatter: (x) => {return x/1000;}}) // index 26 - Ah
    .skip(8) // acculmNett ADC
    .uint32le('ShuntSerialNo') // index 38
    .uint32le('ShuntManuCode') // index 42
    .int16le('ShuntPartNum')   // index 46
    .int16le('ShuntVersCode')  // index 48
    .string('ShuntPns1',    { encoding: 'utf8', length: 8, stripNull: true }) // index 50
    .string('ShuntPns2',    { encoding: 'utf8', length: 8, stripNull: true }) // index 58

module.exports = function(msg)
{
    return status.parse(msg);
}
