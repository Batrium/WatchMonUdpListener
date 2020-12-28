const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Object      = Shunt
// MsgLength   = 32
// Description = Hardware shunt metrics
// Version     = 2
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('ShuntMetricsVers')          // index 8
    .bit1('hasShuntSocCountLo')         // boolean index 9 - bit0
    .bit1('hasShuntSocCountHi')         // boolean index 9 - bit1
    .bit6('reserved')
    .int16le('ShuntSocCycles')          // index 10
    .uint32le('RecentTimeAcculmSave')   // index 12 - Epoch
    .uint32le('RecentTimeSocLoRecal')   // index 16 - Epoch
    .uint32le('RecentTimeSocHiRecal')   // index 20 - Epoch
    .uint32le('RecentTimeSocCountLo')   // index 24 - Epoch
    .uint32le('RecentTimeSocCountHi')   // index 28 - Epoch

module.exports = function(msg)
{
    return status.parse(msg);
}
