const Parser = require('binary-parser').Parser;

// Category    = Aggregated telemetry
// Object      = CtrlLogic
// Description = Combined status - Control logic
// MsgLength   = 79
// Version     = 1
// Frequency   = 2 seconds
// Support     = Current
// Valid to    = SW 1.0.29
const status = new Parser()
	.skip(8)
	.uint8('isCriticalBattOkState')  		// Boolean 0 = Off , 1 = On
	.uint8('isCriticalBattOkCalc')  			// Boolean 0 = Off , 1 = On
	.uint8('isCriticalTransition')  			// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalCellOverdue')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalCellVoltLo')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalCellVoltHi')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalCellTempLo')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalCellTempHi')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalSupplyVoltLo')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalSupplyVoltHi')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalAmbientLo')  			// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalAmbientHi')  			// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalShuntVoltLo')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalShuntVoltHi')  		// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalShuntVoltLoIdle')  	// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalShuntPeakCharge')  	// Boolean 0 = Off , 1 = On
	.uint8('hasCriticalShuntPeakDischg')  	// Boolean 0 = Off , 1 = On
	.uint8('isChargeOnState')  				// Boolean 0 = Off , 1 = On
	.uint8('isChargeLimPower')  				// Boolean 0 = Off , 1 = On
	.uint8('isChargeTransition')  			// Boolean 0 = Off , 1 = On
	.uint8('isChargePowerRateState') /* Choices ChargeRateStates
			Off 			= 0,
			Limited Power 	= 2,
			Normal Power  	= 4, */
	.uint8('isChargePowerRateCalc')  		/* Choices ChargeRateStates */
	.uint8('hasChargeCellVoltHi ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasChargeCellVoltPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeCellVoltLimPower ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasChargeCellTempLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasChargeCellTempHi ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasChargeAmbientTempLo ') 		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeAmbientTempHi ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeSupplyVoltHi ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeSupplyVoltPause ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasChargeShuntVoltHi ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeShuntVoltPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeShuntVoltLimPower ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasChargeShuntSocHi ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasChargeShuntSocPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeAboveInitalBypass ')	// Boolean 0 = Off , 1 = On
	.uint8('hasChargeAboveFinalBypass ')		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeInBypass ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasChargeBypassComplete ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasChargeBypassTempRelief ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasChargeBypassSessionLo ')  	// Boolean 0 = Off , 1 = On
	.uint8('isDischgOnState ')  				// Boolean 0 = Off , 1 = On
	.uint8('isDischgLimPower ')  			// Boolean 0 = Off , 1 = On
	.uint8('isDischgTransition ')  			// Boolean 0 = Off , 1 = On
	.uint8('isDischgPowerRateState ') /* Choices DischgRateStates
			Off 			= 0,
			Limited Power 	= 2,
			Normal Power  	= 4, */
	.uint8('isDischgPowerRateCalc ')  		/* Choices DischgRateStates */
	.uint8('hasDischgCellVoltLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasDischgCellVoltPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasDischgCellVoltLimPower ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasDischgCellTempLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasDischgCellTempHi ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasDischgAmbientLo ')	  		// Boolean 0 = Off , 1 = On
	.uint8('hasDischgAmbientHi ') 			// Boolean 0 = Off , 1 = On
	.uint8('hasDischgSupplyVoltLo ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasDischgSupplyVoltPause ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasDischgShuntVoltLo ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasDischgShuntVoltPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('hasDischgShuntVoltLimPower ')  	// Boolean 0 = Off , 1 = On
	.uint8('hasDischgShuntSocLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasDischgShuntSocPause ')  		// Boolean 0 = Off , 1 = On
	.uint8('isHeatOnState ')  				// Boolean 0 = Off , 1 = On
	.uint8('isHeatOnCalc ')  				// Boolean 0 = Off , 1 = On
	.uint8('isHeatTransition ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasHeatAmbientLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasHeatCellTempLo ')  			// Boolean 0 = Off , 1 = On
	.uint8('isCoolOnState')  				// Boolean 0 = Off , 1 = On
	.uint8('isCoolOnCalc')  					// Boolean 0 = Off , 1 = On
	.uint8('isCoolTransition')  				// Boolean 0 = Off , 1 = On
	.uint8('hasCoolAmbientHi ')  			// Boolean 0 = Off , 1 = On
	.uint8('hasCoolCellTempHi ')  			// Boolean 0 = Off , 1 = On

module.exports = function(msg)
{
	return status.parse(msg);
}
