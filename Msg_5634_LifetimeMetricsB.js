const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Description = Telemetry Lifetime metrics - B
// MsgLength   = 104
// Version     = 4
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('SystemBypassTestOutcome')  /* Choices BypassTestOutcomes
        NotTested = 0,
        Preparing = 1,
        Testing = 2,
        PassOk = 3,
        Failed = 4, */
    .uint8('LifetimeSetupVers')          // index 9 
    .uint32le('RecentTimeBypassInitial') // index 12 - Epoch
    .uint32le('RecentTimeBypassComplete') // index 16 - Epoch
    .uint32le('RecentTimeBypassTest')    // index 20 - Epoch
    .uint32le('RecentTimeWizardSetup')   // index 24 - Epoch
    .uint32le('RecentTimeBypassExtra')   // index 28 - Epoch
    .uint32le('LifeCountSocLimit1')      // index 32
    .uint32le('RecentTimeSocLimit1On')   // index 36 - Epoch
    .uint32le('RecentTimeSocLimit1Off')  // index 40 - Epoch
    .uint32le('LifeCountSocLimit2')      // index 44
    .uint32le('RecentTimeSocLimit2On')   // index 48 - Epoch
    .uint32le('RecentTimeSocLimit2Off')  // index 52 - Epoch
    .uint32le('LifeCountSocLimit3')      // index 56
    .uint32le('RecentTimeSocLimit3On')   // index 60 - Epoch
    .uint32le('RecentTimeSocLimit3Off')  // index 64 - Epoch
    .uint32le('LifeCountSocLimit4')      // index 68
    .uint32le('RecentTimeSocLimit4On')   // index 72 - Epoch
    .uint32le('RecentTimeSocLimit4Off')  // index 76 - Epoch
    .uint32le('LifeCountAltChargeOn')    // index 80
    .uint32le('RecentTimeAltChargeOn')   // index 84 - Epoch
    .uint32le('RecentTimeAltChargeOff')  // index 88 - Epoch
    .uint32le('LifeCountAltDischgOn')    // index 92
    .uint32le('RecentTimeAltDischgOn')   // index 96 - Epoch
    .uint32le('RecentTimeAltDischgOff')  // index 100 - Epoch

module.exports = function(msg)
{
    return status.parse(msg);
}
