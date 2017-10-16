module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// Category    = Telemetry
	// Object      = CellNodeItem
	// Description = Cell node - array up to 16 nodes
	// MsgLength   = variable
	// Version     = 1
	// Frequency   = 300 mS
	// Support     = Current
	// Valid to    = SW 1.0.29
	this.parse_415a = function(msg) 
	{		
		var subParser = new Parser()
		.uint8('ID')
                .uint8('USN')
                .int16le('MinCellVolt',                 { formatter: (x) => {return x/1000;}})
                .int16le('MaxCellVolt',                 { formatter: (x) => {return x/1000;}})
                .uint8('MinCellTemp',                   { formatter: (x) => {return x-40;}}) // temperature ºC
                .uint8('BypassTemp',                    { formatter: (x) => {return x-40;}}) // temperature ºC
                .int16le('BypassAmp',                   { formatter: (x) => {return x/1000;}})
                .uint8('Status'); /* Choices NodeStatuses
                                None = 0,
                                HighVolt = 1,
                                HighTemp = 2,
                                Ok = 3,
                                Timeout = 4,
                               LowVolt = 5,
A                               Disabled = 6,i
			       InBypass = 7,
                                InitialBypass = 8,
                                FinalBypass = 9,
                                MissingSetup = 10,
                                NoConfig = 11,
                                CellOutLimits = 12, */

		var status = new Parser()
		.skip(8)
		.uint8('CmuRxOpStatusNodeID')
		.uint8('Records')
		.uint8('FirstNodeID')
		.uint8('LastNodeID')
		.array('nodes', {
			type : subParser,
			length : 'Records'
		})


		return status.parse(msg);
	}


}

/*
c# method

var cmu = context.data.CellGroupStatus;
lock (cmu.thisLock)
{
	cmu.RxOpStatus_NodeID = buffer[8];
}

int records = buffer[9];
int firstID = buffer[10];
int lastID = buffer[11];
int index = 12;

for (int nodeID = firstID; nodeID <= lastID; nodeID++)
{
	var itm = context.broker.usb.cmdParser.CollectCellNodeItem((ushort)nodeID);
	lock (itm.thisLock)
	{
		if (itm.DisableRefresh) return;
		itm.CollectRxTime1 = DateTime.Now;
		var NodeID = buffer[index];
		itm.USN = buffer[index + 1];
		itm.MinCellVolt = MsgConverter.ToVoltFromMilli(buffer, index + 2);
		itm.MaxCellVolt = MsgConverter.ToVoltFromMilli(buffer, index + 4);
		itm.MaxCellTemp = MsgConverter.ToCelcius(buffer, index + 6);
		itm.BypassTemp = MsgConverter.ToCelcius(buffer, index + 7);
		itm.BypassAmp = MsgConverter.ToAmpFromMilli(buffer, index + 8);
		itm.Status = (NodeStatuses)buffer[index + 10];

		index += 11;
	}
}
*/
