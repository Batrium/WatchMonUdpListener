const Parser = require('binary-parser').Parser;

// Category    = Control Configuration
// Object      = Thermal
// MsgLength   = 40
// Description = Control thermal setup configuration
// Version     = 3
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('ControlHeatMode')  /* Choices ThermalControlModes
            Auto             = 0,
            Manually On      = 1,
            Manually Off     = 2, */
    .uint8('ControlHeatMonitorLoCellTemp')      // Boolean 0 = Off , 1 = On
    .uint8('ControlHeatMonitorLoAmbient')       // Boolean 0 = Off , 1 = On
    .uint8('ControlHeatLoCellTemp',             { formatter: (x) => {return x-40;}})   // index 11 - temperature ºC
    .uint8('ControlHeatLoAmbient',              { formatter: (x) => {return x-40;}})   // index 12 - temperature ºC
    .uint32le('ControlHeatStopInterval',        { formatter: (x) => {return x/1000;}}) // index 13 - seconds
    .uint32le('ControlHeatStartInterval',       { formatter: (x) => {return x/1000;}}) // index 17 - seconds
    .uint8('ControlCoolMode')                   /* Choices ThermalControlModes */
    .uint8('ControlCoolMonitorHiCellTemp')      // Boolean 0 = Off , 1 = On
    .uint8('ControlCoolMonitorHiAmbient')       // Boolean 0 = Off , 1 = On
    .uint8('ControlCoolMonitorInBypass')        // Boolean 0 = Off , 1 = On
    .uint8('ControlCoolHiCellTemp',             { formatter: (x) => {return x-40;}})   // index 25 - temperature ºC
    .uint8('ControlCoolHiAmbient',              { formatter: (x) => {return x-40;}})   // index 26 - temperature ºC
    .uint32le('ControlCoolStopInterval',        { formatter: (x) => {return x/1000;}}) // index 27 - seconds
    .uint32le('ControlCoolStartInterval',       { formatter: (x) => {return x/1000;}}) // index 31 - seconds
    .uint8('ControlThermalSetupVers')
    .uint8('ControlHeatLoCellCutout',           { formatter: (x) => {return x-40;}})   // index 36 - temperature ºC
    .uint8('ControlHeatLoAmbientCutout',        { formatter: (x) => {return x-40;}})   // index 37 - temperature ºC
    .uint8('ControlCoolHiCellCutout',           { formatter: (x) => {return x-40;}})   // index 38 - temperature ºC
    .uint8('ControlCoolHiAmbientCutout',        { formatter: (x) => {return x-40;}})   // index 39 - temperature ºC

module.exports = function(msg)
{
    return status.parse(msg);
}
