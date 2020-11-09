


const CarMotionData = require('../converter/out/CarMotionData.js');
const CarSetupData = require('../converter/out/CarSetupData.js');
const CarStatusData = require('../converter/out/CarStatusData.js');
const CarTelemetryData = require('../converter/out/CarTelemetryData.js');
const FinalClassificationData = require('../converter/out/FinalClassificationData.js');
const LapData = require('../converter/out/LapData.js');
const LobbyInfoData = require('../converter/out/LobbyInfoData.js');
const MarshalZone = require('../converter/out/MarshalZone.js');
const ParticipantData = require('../converter/out/ParticipantData.js');
const WeatherForecastSample = require('../converter/out/WeatherForecastSample.js');

const PacketCarSetupData = require('../converter/out/PacketCarSetupData.js');
const PacketCarStatusData = require('../converter/out/PacketCarStatusData.js');
const PacketCarTelemetryData = require('../converter/out/PacketCarTelemetryData.js');
const PacketEventData = require('../converter/out/PacketEventData.js');
const PacketFinalClassificationData = require('../converter/out/PacketFinalClassificationData.js');
const PacketHeader = require('../converter/out/PacketHeader.js');
const PacketLapData = require('../converter/out/PacketLapData.js');
const PacketLobbyInfoData = require('../converter/out/PacketLobbyInfoData.js');
const PacketMotionData = require('../converter/out/PacketMotionData.js');
const PacketParticipantsData = require('../converter/out/PacketParticipantsData.js');
const PacketSessionData = require('../converter/out/PacketSessionData.js');

const Struct = require('../Struct/index.js');


module.exports = class Parser {
    constructor(buffer) {
        this.buffer = buffer;
        this.struct = new Struct();
        this.data = {};

        this.ini();
    }

    /** Add types for struct class */
    ini() {
        this.struct
            .use(CarMotionData)
            .use(MarshalZone)
            .use(WeatherForecastSample)
            .use(LapData)
            .use(ParticipantData)
            .use(CarSetupData)
            .use(CarTelemetryData)
            .use(CarStatusData)
            .use(FinalClassificationData)
            .use(LobbyInfoData)
    }

    /** @param {Buffer} buffer */
    parse(buffer) {
        this.data = {};
        this.struct.reset();
        this.struct.setBuffer(buffer);

        try {
            this.struct.object('PacketHeader', PacketHeader);

            switch (this.struct.data.PacketHeader.packetId) {
                case 0:
                    this.struct
                        .object('PacketMotionData', PacketMotionData)
                    break;
    
                case 1:
                    this.struct
                        .object('PacketSessionData', PacketSessionData)
                    break;
    
                case 2:
                    this.struct
                        .object('PacketLapPada', PacketLapData)
                    break;
    
                case 3:
                    // Not done yet
                    this.struct.data.msg = 'Packet not done yet';
                    break;
    
                case 4:
                    this.struct
                        .object('PacketParticipantsData', PacketParticipantsData)
                    break;
    
                case 5:
                    this.struct
                        .object('PacketCarSetupData', PacketCarSetupData)
                    break;
    
                case 6:
                    this.struct
                        .object('PacketCarTelemetryData', PacketCarTelemetryData)
                    break;
    
                case 7:
                    this.struct
                        .object('PacketCarStatusData', PacketCarStatusData)
                    break;
    
                case 8:
                    this.struct
                        .object('PacketFinalClassificationData', PacketFinalClassificationData)
                    break;
    
                case 9:
                    this.struct
                        .object('PacketLobbyInfoData', PacketLobbyInfoData)
                    break;
                
                default:
                    this.struct.data.msg = 'Could not parse packet';
                    break;
            }
    
        } catch (error) {
            console.log('Failed to parse packet');
            throw error;
        }

        this.data = this.struct.data;
    }

}
