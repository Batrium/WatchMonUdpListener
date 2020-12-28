const Parser = require('binary-parser').Parser;

// Category    = Discovery
// Description = System Discovery message
// MsgLength   = 57
// Version     = 3
// Frequency   = 2 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('SystemOpStatus') /* Choices
            Simulator = 0,        // LED = rainbow pulse
            Idle = 1,             // LED = green slow pulse
            Discharging = 2,      // LED = green solid
            SoC Empty = 3,        // LED = green double blink
            Charging = 4,         // LED = blue slow pulse
            Full = 5,             // LED = blue double blink
            Timeout = 6,          // LED = red solid
            Critical Pending = 7, // LED = red fast pulse
            Critical Offline = 8, // LED = red slow pulse
            Mqtt Offline = 9,     // LED = white blink
            Auth Setup = 10,      // LED = white solid
            Shunt Timeout = 11,   // LED = red solid  */
    .uint8('SystemAuthMode') /* Choices
            Default     = 0,
            Technician  = 1,
            Factory     = 2, */
    .bit1('CriticalBatOkState')         // boolean index 10 - bit0
    .bit1('CriticalIsTransition')       // boolean index 10 - bit1
    .bit1('CriticalIsPrecharge')        // boolean index 10 - bit2
    .bit1('HeatOnState')                // boolean index 10 - bit3
    .bit1('CoolOnState')                // boolean index 10 - bit4
    .bit3('reserved1')
    .bit1('ChargeOnState')              // boolean index 11 - bit0
    .bit1('ChargeIsLimPower')           // boolean index 11 - bit1
    .bit1('DischgOnState')              // boolean index 11 - bit2
    .bit1('DischgIsLimPower')           // boolean index 11 - bit3
    .bit1('ChargeInBypass')             // boolean index 11 - bit4
    .bit1('ChargeHasBypassTempRelief')  // boolean index 11 - bit5
    .bit2('reserved2')
    .int16le('MinCellVolt',     { formatter: (x) => {return x/1000;}})   // index 12 - voltage
    .int16le('MaxCellVolt',     { formatter: (x) => {return x/1000;}})   // index 14 - voltage
    .int16le('AvgCellVolt',     { formatter: (x) => {return x/1000;}})   // index 16 - voltage
    .uint8('MinCellTemp',       { formatter: (x) => {return x-40;}})     // index 18 - temperature ºC
    .uint8('MaxCellTemp',       { formatter: (x) => {return x-40;}})     // index 19 - temperature ºC
    .uint8('AvgCellTemp',       { formatter: (x) => {return x-40;}})     // index 20 - temperature ºC
    .uint8('NumOfCellsInBypass')
    .int16le('ShuntVoltage',    { formatter: (x) => {return x/100;}})
    .floatle('ShuntCurrent',    { formatter: (x) => {return x/1000;}})
    .floatle('ShuntPowerVA',    { formatter: (x) => {return x/1000;}}) // kW
    .int16le('ShuntSOC',        { formatter: (x) => {return x/100;}})  // percent hires 2 dec.pt
    .floatle('NomCapacityToEmpty',  { formatter: (x) => {return x/1000;}}) // Ah
    .floatle('ShuntCumulkWhCharge', { formatter: (x) => {return x/1000;}}) // kWh
    .floatle('ShuntCumulkWhDischg', { formatter: (x) => {return x/1000;}}) // kWh
    .uint8('CriticalEvents')
    .int32le('SystemTime')      // index 47 - Epoch
    .uint8('GlobalSetupVers')   // index 51
    .uint8('LifetimeSetupVers') // index 52
    .uint8('DiffBypassTicks')   // index 53
    .uint8('DiffTempTicks')     // index 54
    .uint8('DiffVoltTicks')     // index 55
    .uint8('DiffLogicTicks')    // index 56

module.exports = function(msg)
{
    return status.parse(msg);
}
