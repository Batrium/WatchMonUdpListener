module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// MsgLength   = 80;
	// Description = "Combined status Fast"
	// Version     = 3;
	// Frequency   = 2 seconds
	this.parse_3F33 = function(msg) 
	{
		var status = new Parser()
		.skip(8)
		.uint8('CmuPollerMode')
		.uint8('CmuTxAckCount')
		.uint8('CmuTxOpStatusNodeId')
		.uint8('CmuTxOpStatusUSN')
		.uint8('CmuTxOpParamNodeId')
		.int16le('GroupMinCellVolt',		{ formatter: (x) => {return x/1000;}})
		.int16le('GroupMaxCellVolt',		{ formatter: (x) => {return x/1000;}})		
		.uint8('GroupMinCellTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('GroupMaxCellTemp',		{ formatter: (x) => {return x-40;}})
		.uint8('CmuRxOpStatusNodeId')
		.uint8('CmuRxOpStatusGroupAck')
		.uint8('CmuRxOpStatusUSN')
		.uint8('CmuRxOpParamNodeId')
		.uint8('SystemOpStatus') // Choices
		.uint8('SystemAuthMode') // Choices
		.int16le('SupplyVolt',		{ formatter: (x) => {return x/100;}})
		.uint8('AmbientTemp',		{ formatter: (x) => {return x-40;}})
		.uint32le('SystemTime') // Epoch
		.uint8('ShuntSOC', 		{ formatter: (x) => {return x/2-5;}})
		.uint8('ShuntTemp',		{ formatter: (x) => {return x-40;}})
		.floatle('NomCapacityToFull',{ formatter: (x) => {return x/1000;}}) 
		.floatle('NomCapacityToEmpty',{ formatter: (x) => {return x/1000;}})
		.uint8('ShuntPollerMode') // Choices
		.uint8('ShuntStatus') // Choices
		.uint8('hasShuntLoSocRecal') // bool
		.uint8('hasShuntHiSocRecal') // bool
		.uint8('Expansion_OutputFet5') // bool
		.uint8('Expansion_OutputFet6') // bool
		.uint8('Expansion_OutputFet7') // bool
		.uint8('Expansion_OutputFet8') // bool
		.uint8('Expansion_OutputRelay1') // bool
		.uint8('Expansion_OutputRelay2') // bool
		.uint8('Expansion_OutputRelay3') // bool
		.uint8('Expansion_OutputRelay4') // bool
		.int16le('Expansion_OutputPwm1') // bool
		.int16le('Expansion_OutputPwm2') // bool
		.uint8('Expansion_Input1') // bool
		.uint8('Expansion_Input2') // bool
		.uint8('Expansion_Input3') // bool
		.uint8('Expansion_Input4') // bool
		.uint8('Expansion_Input5') // bool
		.int16le('Expansion_InputAIN1') // bool
		.int16le('Expansion_InputAIN2') // bool
		.floatle('MinBypassSession', { formatter: (x) => {return x/1000;}})
		.floatle('MaxBypassSession', { formatter: (x) => {return x/1000;}})
		.uint8('MinBypassSessionID')
		.uint8('MaxBypassSessionID')
		.uint8('RebalanceBypassExtra')  //bool
		.int16le('RepeatCellVoltCounter') // bool
		
		return status.parse(msg);
	}
}
