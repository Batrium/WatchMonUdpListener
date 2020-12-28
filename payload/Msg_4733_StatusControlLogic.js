const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = CtrlLogic
// Description = Combined status - Control logic
// MsgLength   = 41
// Version     = 3
// Frequency   = 2 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .bit1('isCriticalBattOkState')      // boolean index 8 - bit0
    .bit1('isCriticalBattOkCalc')       // boolean index 8 - bit1
    .bit1('isCriticalTransition')       // boolean index 8 - bit2
    .bit1('hasCriticalCellOverdue')     // boolean index 8 - bit3
    .bit1('hasCriticalCellVoltLo')      // boolean index 8 - bit4
    .bit1('hasCriticalCellVoltHi')      // boolean index 8 - bit5
    .bit1('hasCriticalCellTempLo')      // boolean index 8 - bit6
    .bit1('hasCriticalCellTempHi')      // boolean index 8 - bit7
    .bit1('hasCriticalSupplyVoltLo')    // boolean index 9 - bit0
    .bit1('hasCriticalSupplyVoltHi')    // boolean index 9 - bit1
    .bit1('hasCriticalAmbientLo')       // boolean index 9 - bit2
    .bit1('hasCriticalAmbientHi')       // boolean index 9 - bit3
    .bit1('hasCriticalShuntVoltLo')     // boolean index 9 - bit4
    .bit1('hasCriticalShuntVoltHi')     // boolean index 9 - bit5
    .bit1('hasCriticalShuntVoltLoIdle') // boolean index 9 - bit6
    .bit1('reserved1')
    .bit1('hasCriticalShuntPeakCharge') // boolean index 10 - bit0
    .bit1('hasCriticalShuntPeakDischg') // boolean index 10 - bit1
    .bit4('reserved2')
    .bit1('hasCriticalRecovery')        // boolean index 10 - bit6
    .bit1('hasCriticalPrecharge')       // boolean index 10 - bit7
    .skip(3)    
    .bit1('isHeatOnState')              // boolean index 14 - bit0
    .bit1('isHeatOnCalc')               // boolean index 14 - bit1
    .bit1('isHeatTransition')           // boolean index 14 - bit2
    .bit1('hasHeatAmbientLo')           // boolean index 14 - bit3
    .bit1('hasHeatCellTempLo')          // boolean index 14 - bit4
    .bit1('hasAmbientTriggeredHeat')    // boolean index 14 - bit5
    .bit1('hasCellTempTriggeredHeat')   // boolean index 14 - bit6
    .bit1('reserved3')                  // boolean index 14 - bit7  
    .bit1('isCoolOnState')              // boolean index 15 - bit0
    .bit1('isCoolOnCalc')               // boolean index 15 - bit1
    .bit1('isCoolTransition')           // boolean index 15 - bit2
    .bit1('hasCoolAmbientHi ')          // boolean index 15 - bit3
    .bit1('hasCoolCellTempHi ')         // boolean index 15 - bit4
    .bit1('hasAmbientTriggeredHeat')    // boolean index 15 - bit5
    .bit1('hasCellTempTriggeredHeat')   // boolean index 15 - bit6
    .bit1('reserved4')                  // boolean index 15 - bit7
    .uint8('isChargePowerRateState') /* Choices ChargeRateStates
            Off             = 0,
            Limited Power   = 2,
            Normal Power    = 4, */
    .uint8('isChargePowerRateCalc')     /* Choices ChargeRateStates */
    .bit1('isChargeOnState')            // boolean index 18 - bit0
    .bit1('isChargeLimPower')           // boolean index 18 - bit1
    .bit1('isChargeTransition')         // boolean index 18 - bit2
    .bit1('hasChargeCellVoltHi')        // boolean index 18 - bit3
    .bit1('hasChargeCellVoltPause')     // boolean index 18 - bit4
    .bit1('hasChargeCellVoltLimPower')  // boolean index 18 - bit5
    .bit1('hasChargeCellTempLo')        // boolean index 18 - bit6
    .bit1('hasChargeCellTempHi')        // boolean index 18 - bit7
    .bit1('hasChargeAmbientTempLo')     // boolean index 19 - bit0
    .bit1('hasChargeAmbientTempHi')     // boolean index 19 - bit1
    .bit1('hasChargeSupplyVoltHi')      // boolean index 19 - bit2
    .bit1('hasChargeSupplyVoltPause')   // boolean index 19 - bit3
    .bit1('hasChargeShuntVoltHi')       // boolean index 19 - bit4
    .bit1('hasChargeShuntVoltPause')    // boolean index 19 - bit5
    .bit1('hasChargeShuntVoltLimPower') // boolean index 19 - bit6
    .bit1('hasFluidFlowActive')         // boolean index 19 - bit7
    .bit1('hasChargeShuntSocHi ')       // boolean index 20 - bit0
    .bit1('hasChargeShuntSocPause ')    // boolean index 20 - bit1
    .bit1('hasChargeAboveInitalBypass ')// boolean index 20 - bit2
    .bit1('hasChargeAboveFinalBypass ') // boolean index 20 - bit3
    .bit1('hasChargeInBypass ')         // boolean index 20 - bit4
    .bit1('hasChargeBypassComplete ')   // boolean index 20 - bit5
    .bit1('hasChargeBypassTempRelief ') // boolean index 20 - bit6
    .bit1('hasChargeBypassSessionLo ')  // boolean index 20 - bit7
    .uint8('isChargePowerRateAlt')      /* Choices ChargeRateStates */
    .bit1('RebalanceBypassExtra')       // boolean index 22 - bit0
    .bit7('reserved5')
    .skip(1)    
    .uint8('isDischgPowerRateState ')   /* Choices DischgRateStates
            Off             = 0,
            Limited Power   = 2,
            Normal Power    = 4, */
    .uint8('isDischgPowerRateCalc')     /* Choices DischgRateStates */
    .bit1('isDischgOnState')            // boolean index 26 - bit0
    .bit1('isDischgLimPower')           // boolean index 26 - bit1
    .bit1('isDischgTransition')         // boolean index 26 - bit2
    .bit1('hasDischgCellVoltLo')        // boolean index 26 - bit3
    .bit1('hasDischgCellVoltPause')     // boolean index 26 - bit4
    .bit1('hasDischgCellVoltLimPower')  // boolean index 26 - bit5
    .bit1('hasDischgCellTempLo')        // boolean index 26 - bit6
    .bit1('hasDischgCellTempHi')        // boolean index 26 - bit7
    .bit1('hasDischgAmbientLo')         // boolean index 27 - bit0
    .bit1('hasDischgAmbientHi')         // boolean index 27 - bit1
    .bit1('hasDischgSupplyVoltLo')      // boolean index 27 - bit2
    .bit1('hasDischgSupplyVoltPause')   // boolean index 27 - bit3
    .bit1('hasDischgShuntVoltLo')       // boolean index 27 - bit4
    .bit1('hasDischgShuntVoltPause')    // boolean index 27 - bit5
    .bit1('hasDischgShuntVoltLimPower') // boolean index 27 - bit6
    .bit1('reserved6')
    .bit1('hasDischgShuntSocLo')        // boolean index 28 - bit0
    .bit1('hasDischgShuntSocPause')     // boolean index 28 - bit0
    .bit6('reserved7')
    .uint8('isDischgPowerRateAlt')      /* Choices DischgRateStates */  
    .bit1('isSocOnState1')          // boolean index 30 - bit0
    .bit1('hasSocLoTriggered1')     // boolean index 30 - bit1
    .bit1('hasSocHiTriggered1')     // boolean index 30 - bit2
    .bit1('isSocOnState2')          // boolean index 30 - bit3
    .bit1('hasSocLoTriggered2')     // boolean index 30 - bit4
    .bit1('hasSocHiTriggered2')     // boolean index 30 - bit5  
    .bit2('reserved8')
    .bit1('isSocOnState3')          // boolean index 31 - bit0
    .bit1('hasSocLoTriggered3')     // boolean index 31 - bit1
    .bit1('hasSocHiTriggered3')     // boolean index 31 - bit2
    .bit1('isSocOnState4')          // boolean index 31 - bit3
    .bit1('hasSocLoTriggered4')     // boolean index 31 - bit4
    .bit1('hasSocHiTriggered4')     // boolean index 31 - bit5  
    .bit2('reserved9')  
    .bit1('ExpansionOutputFet5')    // boolean index 32 - bit0
    .bit1('ExpansionOutputFet6')    // boolean index 32 - bit1
    .bit1('ExpansionOutputFet7')    // boolean index 32 - bit2
    .bit1('ExpansionOutputFet8')    // boolean index 32 - bit3
    .bit1('ExpansionOutputRelay1')  // boolean index 32 - bit4
    .bit1('ExpansionOutputRelay2')  // boolean index 32 - bit5
    .bit1('ExpansionOutputRelay3')  // boolean index 32 - bit6
    .bit1('ExpansionOutputRelay4')  // boolean index 32 - bit7
    .bit1('ExpansionInput1')        // boolean index 33 - bit0
    .bit1('ExpansionInput2')        // boolean index 33 - bit1
    .bit1('ExpansionInput3')        // boolean index 33 - bit2
    .bit1('ExpansionInput4')        // boolean index 33 - bit3
    .bit1('ExpansionInput5')        // boolean index 33 - bit4
    .bit1('ExpansionInput6')        // boolean index 33 - bit5
    .bit1('ExpansionOutputPwm1')    // boolean index 33 - bit6
    .bit1('ExpansionOutputPwm2')    // boolean index 33 - bit7
    .skip(2)
    .int16le('ExpansionInputAIN1')  // index 36
    .int16le('ExpansionInputAIN2')  // index 38
    .uint8('DiffLogicTicks')        // index 40

module.exports = function(msg)
{
    return status.parse(msg);
}
