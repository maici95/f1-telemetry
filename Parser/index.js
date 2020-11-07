


import CarMotionData from '../converter/out/CarMotionData.js';
import CarSetupData from '../converter/out/CarSetupData.js';
import CarStatusData from '../converter/out/CarStatusData.js';
import CarTelemetryData from '../converter/out/CarTelemetryData.js';
import FinalClassificationData from '../converter/out/FinalClassificationData.js';
import LapData from '../converter/out/LapData.js';
import LobbyInfoData from '../converter/out/LobbyInfoData.js';
import MarshalZone from '../converter/out/MarshalZone.js';
import ParticipantData from '../converter/out/ParticipantData.js';
import WeatherForecastSample from '../converter/out/WeatherForecastSample.js';

import PacketCarSetupData from '../converter/out/PacketCarSetupData.js';
import PacketCarStatusData from '../converter/out/PacketCarStatusData.js';
import PacketCarTelemetryData from '../converter/out/PacketCarTelemetryData.js';
import PacketEventData from '../converter/out/PacketEventData.js';
import PacketFinalClassificationData from '../converter/out/PacketFinalClassificationData.js';
import PacketHeader from '../converter/out/PacketHeader.js';
import PacketLapData from '../converter/out/PacketLapData.js';
import PacketLobbyInfoData from '../converter/out/PacketLobbyInfoData.js';
import PacketMotionData from '../converter/out/PacketMotionData.js';
import PacketParticipantsData from '../converter/out/PacketParticipantsData.js';
import PacketSessionData from '../converter/out/PacketSessionData.js';

import Struct from '../Struct/index.js';


export default class Parser {
    constructor(buffer) {
        this.buffer = buffer;
        this.struct = new Struct();
        this.data = {};
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
                        .use(CarMotionData)
                        .object('PacketMotionData', PacketMotionData)
                    break;
    
                case 1:
                    this.struct
                        .use(MarshalZone)
                        .use(WeatherForecastSample)
                        .object('PacketSessionData', PacketSessionData)
                    break;
    
                case 2:
                    this.struct
                        .use(LapData)
                        .object('PacketLapPada', PacketLapData)
                    break;
    
                case 3:
                    // Not done yet
                    this.struct.data.msg = 'Packet not done yet';
                    break;
    
                case 4:
                    this.struct
                        .use(ParticipantData)
                        .object('PacketParticipantsData', PacketParticipantsData)
                    break;
    
                case 5:
                    this.struct
                        .use(CarSetupData)
                        .object('PacketCarSetupData', PacketCarSetupData)
                    break;
    
                case 6:
                    this.struct
                        .use(CarTelemetryData)
                        .object('PacketCarTelemetryData', PacketCarTelemetryData)
                    break;
    
                case 7:
                    this.struct
                        .use(CarStatusData)
                        .object('PacketCarStatusData', PacketCarStatusData)
                    break;
    
                case 8:
                    this.struct
                        .use(FinalClassificationData)
                        .object('PacketFinalClassificationData', PacketFinalClassificationData)
                    break;
    
                case 9:
                    this.struct
                        .use(LobbyInfoData)
                        .object('PacketLobbyInfoData', PacketLobbyInfoData)
                    break;
                
                default:
                    this.struct.data.msg = 'Could not parse packet';
                    break;
            }
    
        } catch (error) {
            console.log('Failed to parse packet');
        }

        this.data = this.struct.data;
    }

}
