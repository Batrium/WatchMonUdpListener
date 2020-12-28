const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Description = Telemetry Lifetime metrics 
// MsgLength   = 94
// Version     = 3
// Frequency   = 30 seconds
// Valid from  = SW 2.14
const status = new Parser()
    .skip(8)
    .uint32le('FirstSyncTime')          // index 8 - Epoch
    .uint32le('LifeCountStartup')       // index 12
    .uint32le('LifeCountCriticalBattOk') // index 16
    .uint32le('LifeCountChargeOn')      // index 20
    .uint32le('LifeCountChargeLimp')    // index 24
    .uint32le('LifeCountDischgOn')      // index 28
    .uint32le('LifeCountDischgLimp')    // index 32
    .uint32le('LifeCountHeatOn')        // index 36
    .uint32le('LifeCountCoolOn')        // index 40
    .int16le( 'LifeCountDailySession')  // index 44
    .uint32le('RecentTimeCriticalOn')   // index 46 - Epoch
    .uint32le('RecentTimeCriticalOff')  // index 50 - Epoch
    .uint32le('RecentTimeChargeOn')     // index 54 - Epoch
    .uint32le('RecentTimeChargeOff')    // index 58 - Epoch
    .uint32le('RecentTimeChargeLimp')   // index 62 - Epoch
    .uint32le('RecentTimeDischgOn')     // index 66 - Epoch
    .uint32le('RecentTimeDischgOff')    // index 70 - Epoch
    .uint32le('RecentTimeDischgLimp')   // index 74 - Epoch
    .uint32le('RecentTimeHeatOn')       // index 78 - Epoch
    .uint32le('RecentTimeHeatOff')      // index 82 - Epoch
    .uint32le('RecentTimeCoolOn')       // index 86 - Epoch
    .uint32le('RecentTimeCoolOff')      // index 90 - Epoch

module.exports = function(msg)
{
    return status.parse(msg);
}
