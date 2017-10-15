module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// Category    = Telemetry Metrics
	// Object      = Session
	// MsgLength   = 25
	// Description = Telemetry Session metrics
	// Version     = 1
	// Frequency   = adhoc
	// Support     = Current
	// Created    	= SW 1.0.29
	this.parse_5431 = function(msg) 
	{
		var status = new Parser()
		.skip(8)
		.uint32le('QuickSessRecentTime') 		// EPOCH
		.int16le('QuickSessNumOfRecords')
		.int16le('QuickSessMaxNumOfRecords')
		.uint32le('QuickSessionInterval',		{ formatter: (x) => {return x/1000;}})
		.uint8('AllowQuickSession')  			// boolean 0 = Off , 1 = On
		.int16le('DailySessNumOfRecords')
		.int16le('DailySessMaxNumOfRecords')

		return status.parse(msg);
	}
}