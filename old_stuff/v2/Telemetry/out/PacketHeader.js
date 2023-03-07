


const Packet = require('../Packet.js');


module.exports = class PacketHeader extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = 0;
		this.packetFormat = 0;
		this.gameMajorVersion = 0;
		this.gameMinorVersion = 0;
		this.packetVersion = 0;
		this.packetId = 0;
		this.sessionUID = 0;
		this.sessionTime = 0;
		this.frameIdentifier = 0;
		this.playerCarIndex = 0;
		this.secondaryPlayerCarIndex = 0;
	}

	parse() {
		this
			.uint16('packetFormat')
			.uint8('gameMajorVersion')
			.uint8('gameMinorVersion')
			.uint8('packetVersion')
			.uint8('packetId')
			.uint64('sessionUID')
			.float('sessionTime')
			.uint32('frameIdentifier')
			.uint8('playerCarIndex')
			.uint8('secondaryPlayerCarIndex')
	}

}

