const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = Shunt/Fast
// MsgLength   = 50
// Description = Combined status Shunt/Fast
// Version     = 4
// Frequency   = 300 milliseconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .int16le('SupplyVolt',              { formatter: (x) => {return x/100;}})  // index 8
    .uint8('AmbientTemp',               { formatter: (x) => {return x-40;}})   // index 10 - temperature ºC
    .uint8('ShuntTemp',                 { formatter: (x) => {return x-40;}})   // index 11 - temperature ºC 
    .int16le('ShuntVoltage',            { formatter: (x) => {return x/100;}})  // index 12 - voltage
    .floatle('ShuntCurrent',            { formatter: (x) => {return x/1000;}}) // index 14 - amp
    .floatle('ShuntPowerVA',            { formatter: (x) => {return x/1000;}}) // index 18 - kW
    .int16le('ShuntSOC',                { formatter: (x) => {return x/100;}})  // index 22 - percent hi-res 2 dec.pt
    .skip(1) // original SoC low res
    .bit1('hasShuntSocCountLo')         // boolean index 25 - bit0
    .bit1('hasShuntSocCountHi')         // boolean index 25 - bit1
    .bit1('hasShuntLoSocRecal')         // boolean index 25 - bit2
    .bit1('hasShuntHiSocRecal')         // boolean index 25 - bit3
    .bit4('reserved')
    // shunt.hasShuntOkSocRange = !(shunt.hasShuntLoSocRecal || shunt.hasShuntHiSocRecal);
    .floatle('NomCapacityToFull',       { formatter: (x) => {return x/1000;}}) // index 26 - Ah
    .floatle('NomCapacityToEmpty',      { formatter: (x) => {return x/1000;}}) // index 30 - Ah 
    .int16le('EstDurationToFullmins')   // index 34 - minutes
    .int16le('EstDurationToEmptymins')  // index 36 - minutes
    .floatle('ShuntAcculmAvgCharge',    { formatter: (x) => {return x/1000;}}) // index 38 - ampere
    .floatle('ShuntAcculmAvgDischg',    { formatter: (x) => {return x/1000;}}) // index 42 - ampere
    .floatle('ShuntAcculmAvgNett',      { formatter: (x) => {return x/1000;}}) // index 46 - ampere

module.exports = function(msg)
{
    return status.parse(msg);
}
