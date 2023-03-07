


const Packet = require('../Packet.js');

const LobbyInfoData = require('./LobbyInfoData.js');

module.exports = class PacketLobbyInfoData extends Packet {
	constructor(buffer, pointer, header) {
		super();
		/** @private */
		this.buffer = buffer;
		/** @private */
		this.pointer = pointer;
		this.header = header;
		this.numPlayers = 0;
		/** @type {Array.<LobbyInfoData> */
		this.lobbyPlayers = [];
	}

	parse() {
		this
//			.PacketHeader('header')
			.uint8('numPlayers')
			.LobbyInfoData('lobbyPlayers', 22)
	}

}

