const Parser = require('binary-parser').Parser;	
	// Category    = Hardware Configuration
	// Object      = Expansion
	// MsgLength   = 32
	// Description = Hardware Expansion setup configuration
	// Version     = 3
	// Frequency   = 20 seconds
	// Support     = Current
	// Valid to    = SW 1.0.29
	const status = new Parser()
		.skip(8)
		.uint8('HwExpansionSetupVers')  
		.uint8('HwExpansionTemplate')  /* ExtensionTemplateOptions
				None = 0,
				ExpansionBoard 12v = 1,
				ExpansionBoard 48v = 2,
				WatchMonCmC v2.0   = 3,	*/	
		.uint8('HwExpansionNeoPixelMode')  /* NeoPixelExtStatusModes
				None 				= 0,
				Repeat 				= 1,
				Status + 7seg SoC% 	= 2,
				Solid SoC% 8seg 	= 3,	*/
		.uint8('HwExpansionRelay1')  /* ExpansionOutputAssignments
				None = 0,
				ManualOn = 1,
				Critical BattOk = 2,
				Charging On = 4,
				Discharging On = 5,
				Heating Required = 6,
				Cooling Required = 7,
				Run / Idle input = 8,
				Charge / Normal input = 9,
				Bypass Complete = 10,
				Charging Limited = 11,
				Discharging Limited = 12,
				Critical Recovery = 13,
				Critical PulseOn = 14,
				Critical PulseOff = 15,
				Critical Fault = 16,
				Critical PrechargeTimer = 17, */
		.uint8('HwExpansionRelay2')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionRelay3')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionRelay4')		/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput5')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput5')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput7')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput8')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput9')  	/* ExpansionOutputAssignments */
		.uint8('HwExpansionOutput10') 	/* ExpansionOutputAssignments */
		.uint8('HwExpansionInput1')  	/* ExtensionInputOptions
				None 					= 0,
				Run / Idle mode 		= 1,
				Charge / Normal mode 	= 2,
				Critical contact sensor - On = 3,
				Critical contact sensor - Fault = 4, */
		.uint8('HwExpansionInput2')  	/* ExtensionInputOptions */
		.uint8('HwExpansionInput3')  	/* ExtensionInputOptions */
		.uint8('HwExpansionInput4')  	/* ExtensionInputOptions */
		.uint8('HwExpansionInput5')  	/* ExtensionInputOptions */
		.uint8('HwExpansionInputAIN1') 
		.uint8('HwExpansionInputAIN2') 
		.int16le('HwExpansionCustomFeature1')
		.int16le('HwExpansionCustomFeature2')
module.exports = function(msg)
{
	return status.parse(msg);
}
