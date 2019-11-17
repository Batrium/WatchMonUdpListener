const Parser = require('binary-parser').Parser;

// Category    = Telemetry Metrics
// Object      = Session
// MsgLength   = 25
// Description = Telemetry Session metrics
// Version     = 1
// Frequency   = adhoc
// Support     = Current
// Created    	= SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint32le('QuickSessRecentTime') 		// EPOCH
	.int16le('QuickSessNumOfRecords')
	.int16le('QuickSessMaxNumOfRecords')
	.uint32le('QuickSessionInterval',		{ formatter: (x) => {return x/1000;}})
	.uint8('AllowQuickSession')  			// boolean 0 = Off , 1 = On
	.int16le('DailySessNumOfRecords')
	.int16le('DailySessMaxNumOfRecords')

module.exports = function(msg)
{
	return status.parse(msg);
}
