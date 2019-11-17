const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Thermal
// MsgLength   = 36
// Description = Control thermal setup configuration
// Version     = 1
// Frequency   = 20 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('ControlHeatMode')  /* Choices ThermalControlModes
			Auto		  	 = 0,
			Manually On      = 1,
			Manually Off     = 2, */
	.uint8('ControlHeatMonitorLoCellTemp')  	// Boolean 0 = Off , 1 = On
	.uint8('ControlHeatMonitorLoAmbient')  		// Boolean 0 = Off , 1 = On
	.uint8('ControlHeatLoCellTemp', 			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('ControlHeatLoAmbient',	 			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint32le('ControlHeatStopInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlHeatStartInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint8('ControlCoolMode')  					/* Choices ThermalControlModes */
	.uint8('ControlCoolMonitorHiCellTemp')  	// Boolean 0 = Off , 1 = On
	.uint8('ControlCoolMonitorHiAmbient')   	// Boolean 0 = Off , 1 = On
	.uint8('ControlCoolMonitorInBypass')   		// Boolean 0 = Off , 1 = On
	.uint8('ControlCoolHiCellTemp', 			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint8('ControlCoolHiAmbient',	 			{ formatter: (x) => {return x-40;}}) // temperature ºC
	.uint32le('ControlCoolStopInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint32le('ControlCoolStartInterval',		{ formatter: (x) => {return x/1000;}}) // seconds
	.uint8('ControlThermalSetupVers')

module.exports = function(msg)
{
	return status.parse(msg);
}
