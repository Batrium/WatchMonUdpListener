const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Object      = Shunt
// MsgLength   = 115
// Description = Telemetry Lifetime metrics
// Version     = 2
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint32le('FirstSyncTime') 			// Epoch
	.uint32le('LifeCountStartup')
	.uint32le('LifeCountCriticalBattOk')
	.uint32le('LifeCountChargeOn')
	.uint32le('LifeCountChargeLimp')
	.uint32le('LifeCountDischgOn')
	.uint32le('LifeCountDischgLimp')
	.uint32le('LifeCountHeatOn')
	.uint32le('LifeCountCoolOn')
	.int16le( 'LifeCountDailySession')
	.uint32le('RecentTimeCriticalOn') 	// Epoch
	.uint32le('RecentTimeCriticalOff') 	// Epoch
	.uint32le('RecentTimeChargeOn') 	// Epoch
	.uint32le('RecentTimeChargeOff') 	// Epoch
	.uint32le('RecentTimeChargeLimp') 	// Epoch
	.uint32le('RecentTimeDischgOn') 	// Epoch
	.uint32le('RecentTimeDischgOff') 	// Epoch
	.uint32le('RecentTimeDischgLimp') 	// Epoch
	.uint32le('RecentTimeHeatOn') 		// Epoch
	.uint32le('RecentTimeHeatOff') 		// Epoch
	.uint32le('RecentTimeCoolOn') 		// Epoch
	.uint32le('RecentTimeCoolOff') 		// Epoch
	.uint32le('RecentTimeBypassInitial') // Epoch
	.uint32le('RecentTimeBypassComplete') // Epoch
	.uint32le('RecentTimeBypassTest') 	// Epoch
	.uint8('SystemBypassTestOutcome')  /* Choices BypassTestOutcomes
		NotTested = 0,
		Preparing = 1,
		Testing = 2,
		PassOk = 3,
		Failed = 4, */
	.uint32le('RecentTimeWizardSetup') // Epoch
	.uint32le('RecentTimeBypassExtra') // Epoch

module.exports = function(msg)
{
	return status.parse(msg);
}
