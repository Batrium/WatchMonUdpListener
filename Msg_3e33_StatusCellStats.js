const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Rapid/CellStats
// Description = Combined status - Rapid/CellStats
// MsgLength   = 48
// Version     = 3
// Frequency   = 300 milliseconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .int16le('MinCellVolt',     { formatter: (x) => {return x/1000;}}) // index 8
    .int16le('MaxCellVolt',     { formatter: (x) => {return x/1000;}}) // index 10
    .uint8('MinCellVoltId')     // index 12
    .uint8('MaxCellVoltId')     // index 13
    .uint8('MinCellTemp',       { formatter: (x) => {return x-40;}}) // index 14 - temperature ºC
    .uint8('MaxCellTemp',       { formatter: (x) => {return x-40;}}) // index 15 - temperature ºC
    .uint8('MinCellTempId')     // index 16
    .uint8('MaxCellTempId')     // index 17
    .int16le('MinBypassAmp',    { formatter: (x) => {return x/1000;}}) // index 18 - amperes
    .int16le('MaxBypassAmp',    { formatter: (x) => {return x/1000;}}) // index 20 - amperes
    .uint8('MinBypassAmpId')    // index 22
    .uint8('MaxBypassAmpId')    // index 23
    .uint8('MinBypassTemp',     { formatter: (x) => {return x-40;}})   // index 24 - temperature ºC
    .uint8('MaxBypassTemp',     { formatter: (x) => {return x-40;}})   // index 25 - temperature ºC
    .uint8('MinBypassTempId',   { formatter: (x) => {return x-40;}})   // index 26
    .uint8('MaxBypassTempId',   { formatter: (x) => {return x-40;}})   // index 27
    .int16le('AvgCellVolt',     { formatter: (x) => {return x/1000;}}) // index 28
    .uint8('AvgCellTemp',       { formatter: (x) => {return x-40;}})   // index 30 - temperature ºC
    .uint8('NumOfCellsAboveInitialBypass') // index 31
    .uint8('NumOfCellsAboveFinalBypass')   // index 32
    .uint8('NumOfCellsInBypass')           // index 33
    .uint8('NumOfCellsOverdue')            // index 34
    .uint8('NumOfCellsActive')             // index 35
    .uint8('NumOfCellsInSystem')           // index 36
    .skip(1)                               // reserved 37
    .floatle('MinBypassSession',        { formatter: (x) => {return x/1000;}}) // index 38 - Ah
    .floatle('MaxBypassSession',        { formatter: (x) => {return x/1000;}}) // index 42 - Ah
    .uint8('MinBypassSessionID')           // index 46
    .uint8('MaxBypassSessionID')           // index 47 

module.exports = function(msg)
{
    return status.parse(msg);
}
