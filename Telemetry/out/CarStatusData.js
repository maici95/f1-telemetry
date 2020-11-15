


const Reader = require('../Reader.js');


module.exports = class CarStatusData extends Reader {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.tractionControl = 0;
		this.antiLockBrakes = 0;
		this.fuelMix = 0;
		this.frontBrakeBias = 0;
		this.pitLimiterStatus = 0;
		this.fuelInTank = 0;
		this.fuelCapacity = 0;
		this.fuelRemainingLaps = 0;
		this.maxRPM = 0;
		this.idleRPM = 0;
		this.maxGears = 0;
		this.drsAllowed = 0;
		this.drsActivationDistance = 0;
		this.tyresWear = [];
		this.actualTyreCompound = 0;
		this.visualTyreCompound = 0;
		this.tyresAgeLaps = 0;
		this.tyresDamage = [];
		this.frontLeftWingDamage = 0;
		this.frontRightWingDamage = 0;
		this.rearWingDamage = 0;
		this.drsFault = 0;
		this.engineDamage = 0;
		this.gearBoxDamage = 0;
		this.vehicleFiaFlags = 0;
		this.ersStoreEnergy = 0;
		this.ersDeployMode = 0;
		this.ersHarvestedThisLapMGUK = 0;
		this.ersHarvestedThisLapMGUH = 0;
		this.ersDeployedThisLap = 0;
	}

	parse() {
		this
			.uint8('tractionControl')
			.uint8('antiLockBrakes')
			.uint8('fuelMix')
			.uint8('frontBrakeBias')
			.uint8('pitLimiterStatus')
			.float('fuelInTank')
			.float('fuelCapacity')
			.float('fuelRemainingLaps')
			.uint16('maxRPM')
			.uint16('idleRPM')
			.uint8('maxGears')
			.uint8('drsAllowed')
			.uint16('drsActivationDistance')
			.uint8('tyresWear', 4)
			.uint8('actualTyreCompound')
			.uint8('visualTyreCompound')
			.uint8('tyresAgeLaps')
			.uint8('tyresDamage', 4)
			.uint8('frontLeftWingDamage')
			.uint8('frontRightWingDamage')
			.uint8('rearWingDamage')
			.uint8('drsFault')
			.uint8('engineDamage')
			.uint8('gearBoxDamage')
			.int8('vehicleFiaFlags')
			.float('ersStoreEnergy')
			.uint8('ersDeployMode')
			.float('ersHarvestedThisLapMGUK')
			.float('ersHarvestedThisLapMGUH')
			.float('ersDeployedThisLap')
	}

}

