const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = Shunt
// MsgLength   = 68
// Description = Hardware shunt setup configuration
// Version     = 4
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('HwShuntShuntType')  /* ShuntTypes
            None                            = 0,
            SFP102MOD 100uOhm 375A 150V     = 1,
            SFP101EVB 72uOhm 500A 150V      = 2,
            SFP101EVB 25uOhm 1500A 150V     = 3,
            SFP102MOD (4k) 375A 750V        = 4,
            SFP102MOD (3k) 375A 600V        = 5,
            SFP102MOD Negative volt sense   = 6,
            SFP102MOD 50uOhm 750A 150V      = 7,
            ShuntMon2 50uOhm 500A 650V      = 16, 
            ShuntMon2 50uOhm 1000A 650V     = 17, 
            ShuntMon2 50uOhm 2000A 650V     = 18, 
            ShuntMon2 50uOhm 250A 650V      = 19,
            Simulator 15sec quick curve     = 33,
            Simulator 5min normal curve     = 34, */
    .int16le('HwShuntScale16volt') // index 9
    .int16le('HwShuntScale16amp')  // index 11
    .int16le('HwShuntChargeIdle',   { formatter: (x) => {return x/100;}})   // index 13 - ampere
    .int16le('HwShuntDischgIdle',   { formatter: (x) => {return x/100;}})   // index 15 - ampere
    .uint8( 'HwShuntSocCountLo',    { formatter: (x) => {return (x-5)/2;}}) // index 17 - percent
    .uint8( 'HwShuntSocCountHi',    { formatter: (x) => {return (x-5)/2;}}) // index 18 - percent
    .uint8( 'HwShuntSocLoRecal',    { formatter: (x) => {return (x-5)/2;}}) // index 19 - percent
    .uint8( 'HwShuntSocHiRecal',    { formatter: (x) => {return (x-5)/2;}}) // index 20 - percent
    .uint8( 'HwShuntMonitorSocLoRecal')     // boolean 0 = Off , 1 = On
    .uint8( 'HwShuntMonitorSocHiRecal')     // boolean 0 = Off , 1 = On
    .uint8( 'HwShuntMonitorInBypassRecal')  // boolean 0 = Off , 1 = On
    .floatle('HwShuntNomCapacity',  { formatter: (x) => {return x/1000;}})  // Ah
    .floatle('HwShuntGainVolt')
    .floatle('HwShuntGainAmp')
    .floatle('HwShuntGainAcculm')   // mAh
    .floatle('HwShuntGainTemp')     // temperature ºC
    .uint8( 'HwShuntReverseFlow')   // boolean 0 = Off , 1 = On
    .uint8( 'HwShuntSetupVers')
    .floatle('HwShuntGainVA')
    .floatle('HwShuntGainVAh')
    .int16le('HwShuntMax16volt')    // index 54
    .int16le('HwShuntMax16charge')  // index 56
    .int16le('HwShuntMax16dischg')  // index 58
    .uint8('HwShuntFilterVolt')  /* ShuntFilterVoltModes
            Live            = 0,
            Limit Jittle    = 1,
            Running 5       = 2,
            Running 10      = 3, */
    .uint8('HwShuntFilterAmp')  /* ShuntFilterAmpModes
            Live                = 0,
            Elapse 200mS        = 1,
            Elapse 1 seconds    = 2,
            Elapse 5 seconds    = 3, */
    .int16le('HwShuntScale16pw')  // index 62
    .int16le('HwShuntMaxPw16charge') // index 64
    .int16le('HwShuntMaxPw16dischg') // index 66

module.exports = function(msg)
{
    return status.parse(msg);
}
