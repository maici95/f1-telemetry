


const UPDATE_FREQ = 1000 / 10;
const GREEN = '#00CC01';
const RED = '#FF0100';
const TARGET = 0.3;
const OVERTAKE_COLOR = '#FF00FF';

const LED0_COLOR = '#00FF00';
const LED1_COLOR = '#FF0000';
const LED2_COLOR = '#C71585';

const TYRE_WEAR_WARNING = 60;
const NORMAL = '#ddd';

const ENGINE_TEMP_TARGET = 125;
const TYRE_TEMP_TARGET = 100;

// Fetch data from server
function fetchData() {
    return new Promise((resolve, reject) => {
    fetch('/data')
        .then(res => res.json())
        .then(result => {
            resolve(result);
        });
    });
}

// Gear
function getGear(gear) {
    if (gear === -1) {
        return 'R';
    }
    if (gear === 0) {
        return 'N';
    }
    return gear;
}

// Get flag color by index
const flagColor = flag => ({
    0: 'none',      // none
    1: '#00CC01',   // green
    2: '#0000FF',   // blue
    3: '#FBDF00',   // yellow
    4: '#FF0100'    // red
}[flag]);

// Fuel mix
const fuelMix = mode => ({
    0: 'lean',
    1: 'normal',
    2: 'high',
    3: 'max'
}[mode]);

// Get color by tyre wear
const tyreColor = wear => {
    if (wear > TYRE_WEAR_WARNING) {
        return RED;
    } else {
        return NORMAL;
    }
}

// Convert seconds to HH:MM:SS format
const secondsToHMS = seconds => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = seconds % 60;
    
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;

    return h+':'+m+':'+s;
}

// App component
function App() {

    const [loaded, setLoaded] = React.useState(false);
    const [inter, setInter] = React.useState(null);
    const [header, setHeader] = React.useState({});
    const [motion, setMotion] = React.useState({});
    const [session, setSession] = React.useState({});
    const [lapData, setLapData] = React.useState({});
    const [carSetup, setCarSetup] = React.useState({});
    const [carTelemetry, setCarTelemetry] = React.useState({});
    const [carStatus, setCarStatus] = React.useState({});
    const [tyreView, setTyreView] = React.useState(0);

    function changeTyreView() {
        let view = tyreView;
        view++;
        if (view > 1) {
            view = 0;
        }
        setTyreView(view);
    }

    React.useEffect(() => {
        if (!loaded) {
/*             setInterval(() => {
                fetchData().then(result => {
                    if (result.length > 1) {
                        const pId = result[0].packetHeader.playerCarIndex;
                        setHeader(result[0].packetHeader);
                        setMotion({...result[0].carMotionData[pId], ...result[0].PacketMotionData});
                        setSession({...result[1]});
                        setLapData({...result[2].lapData[pId]});
                        setCarSetup({...result[5].carSetups[pId]});
                        setCarTelemetry({...result[6].carTelemetryData[pId]});
                        setCarStatus({...result[7].carStatusData[pId]});
                    }
                });
            }, UPDATE_FREQ); */
            const inter = setInterval(fData, UPDATE_FREQ);
            setLoaded(true);
        }
    });

    function fData() {
        fetchData().then(result => {
            if (result.length > 1) {
                const pId = result[0].PacketHeader.playerCarIndex;
                setHeader(result[0].PacketHeader);
                setMotion({...result[0].carMotionData[pId], ...result[0].PacketMotionData});
                setSession({...result[1]});
                setLapData({...result[2].lapData[pId]});
                setCarSetup({...result[5].carSetups[pId]});
                setCarTelemetry({...result[6].carTelemetryData[pId]});
                setCarStatus({...result[7].carStatusData[pId]});
            }
        });
    }

    // Engine warning
    const [engineWarning, setEngineWarning] = React.useState(false);
    React.useEffect(() => {
        if (carTelemetry.engineTemperature > ENGINE_TEMP_TARGET) {
            setEngineWarning(true);
        } else {
            setEngineWarning(false);
        }
    }, [carTelemetry])

    // Tyre temperature warning
    const [tyreTempWarning, setTyreTempWarning] = React.useState(false);
    React.useEffect(() => {
        if (carTelemetry.tyresInnerTemperature) {
            let warning = false;
            for (let i of carTelemetry.tyresInnerTemperature) {
                if (i > TYRE_TEMP_TARGET) {
                    warning = true;
                    break;
                }
            }
            setTyreTempWarning(warning);
        }
    }, [carTelemetry]);

    // Frontwing damage warning
    const [frontWingWarning, setFrontWingWarning] = React.useState(false);
    React.useEffect(() => {
        if (carStatus) {
            if (carStatus.frontLeftWingDamage > 0 || carStatus.frontRightWingDamage > 0) {
                setFrontWingWarning(true);
            } else {
                setFrontWingWarning(false);
            }
        }
    }, [carStatus]);

    // Tyre wear warning
    const [tyreWearWarning, setTyreWearWarning] = React.useState(false);
    React.useEffect(() => {
        if (carStatus.tyresDamage) {
            let warning = false;
            for (let i of carStatus.tyresDamage) {
                if (i > TYRE_WEAR_WARNING) {
                    warning = true;
                    break;
                }
            }
            setTyreWearWarning(warning);
        }
    }, [carStatus]);

    // Last lap delta
    const [miniIndex, setMiniIndex] = React.useState(0);
    const [lastLap, setLastLap] = React.useState([]);
    const [currentLap, setCurrentLap] = React.useState([]);
    const [bestLap, setBestLap] = React.useState([]);
    const [lapNum, setLapNum] = React.useState(null);
    const [lapDelta, setLapDelta] = React.useState(0);
    const [lapDeltaView, setLapDeltaView] = React.useState(0);

    function changeDeltaView() {
        let view = lapDeltaView;
        view++;
        if (view > 1) {
            view = 0;
        }
        setLapDeltaView(view);
    }

    React.useEffect(() => {
        if (lapData.lapDistance > miniIndex * 100) {
            setMiniIndex(miniIndex + 1);
            setCurrentLap([...currentLap, lapData.currentLapTime]);
        }
        if (lapNum !== lapData.currentLapNum) {
            const index = currentLap.length - 1;
            if (bestLap.length < 1 || !bestLap[index]) {
                setBestLap(currentLap);
            }
            if (bestLap[index] > currentLap[index]) {
                setBestLap(currentLap);
            }
            setLapNum(lapData.currentLapNum);
            setLastLap([...currentLap]);
            setMiniIndex(0);
            setCurrentLap([]);
        }
        if (lastLap.length > 0 && currentLap.length > 0) {
            const index = currentLap.length - 1;
            if (lapDeltaView === 0) {
                setLapDelta((lastLap[index] - currentLap[index]));
            }
            if (lapDeltaView === 1) {
                setLapDelta((bestLap[index] - currentLap[index]));
            }
        }
    }, [session]);


    return (
        <div>
            <LEDPanel>
                <LED color={LED0_COLOR} active={carTelemetry.drs}></LED>
                <LED color={LED0_COLOR} active={carTelemetry.drs}></LED>
                <LED color={LED0_COLOR} active={carTelemetry.drs}></LED>
                <LED color={LED0_COLOR} active={carTelemetry.drs || carStatus.drsAllowed}></LED>
                <LED color={LED0_COLOR} active={carTelemetry.drs || carStatus.drsAllowed}></LED>

                <LED color={LED1_COLOR} active={carTelemetry.engineRPM > 11000}></LED>
                <LED color={LED1_COLOR} active={carTelemetry.engineRPM > 11000}></LED>
                <LED color={LED1_COLOR} active={carTelemetry.engineRPM > 11250}></LED>
                <LED color={LED1_COLOR} active={carTelemetry.engineRPM > 11250}></LED>
                <LED color={LED1_COLOR} active={carTelemetry.engineRPM > 11250}></LED>

                <LED color={LED2_COLOR} active={carTelemetry.engineRPM > 11550}></LED>
                <LED color={LED2_COLOR} active={carTelemetry.engineRPM > 11550}></LED>
                <LED color={LED2_COLOR} active={carTelemetry.engineRPM > 11750}></LED>
                <LED color={LED2_COLOR} active={carTelemetry.engineRPM > 11750}></LED>
                <LED color={LED2_COLOR} active={carTelemetry.engineRPM > 12000}></LED>
            </LEDPanel>
            <LinePanel>
                {lapData && session.test && <Info>{lapData.currentLapNum || 0} / {session.test.totalLaps || 0}</Info>}
                {session.test && <Info>{secondsToHMS(session.test.sessionTimeLeft)}</Info>}
                {engineWarning && <Warning>Engine temps</Warning>}
                {tyreTempWarning && <Warning>Tyre temps</Warning>}
                {frontWingWarning && <Warning>Frontwing damage</Warning>}
                {tyreWearWarning && <Warning>Tyre wear</Warning>}
            </LinePanel>
            <div>
                <Column size="m">
                    <div
                        onClick={() => changeDeltaView()}
                        className="small" style={{
                        color: Math.abs(lapDelta) < TARGET ? '#fff'
                            : lapDelta < TARGET * -1 ? RED
                            : GREEN
                        }}>
                        <div className="label">{lapDeltaView === 0 ? 'last' : 'best'}</div>
                        {(lapDelta * -1).toFixed(2)}
                    </div>

                    <div className="small">
                        
                    </div>

                    {carStatus.tyresWear && carTelemetry.tyresInnerTemperature &&
                        <div className="highlighted" onClick={() => changeTyreView()}>
                            <div className="label">{tyreView === 0 ? '%' : '℃'}</div>
                            <div className="small" style={{display: 'flex'}}>
                                <div className="half">
                                    {tyreView === 0 ? carStatus.tyresWear[2] : carTelemetry.tyresInnerTemperature[2]}
                                </div>
                                <div className="half">
                                    {tyreView === 0 ? carStatus.tyresWear[3] : carTelemetry.tyresInnerTemperature[3]}
                                </div>
                            </div>
                            <div className="small" style={{display: 'flex'}}>
                                <div className="half">
                                    {tyreView === 0 ? carStatus.tyresWear[0] : carTelemetry.tyresInnerTemperature[0]}
                                </div>
                                <div className="half">
                                    {tyreView === 0 ? carStatus.tyresWear[1] : carTelemetry.tyresInnerTemperature[1]}
                                </div>
                            </div>
                        </div>
                    }
                </Column>

                <Column size="l">
                    <div className={'big highlighted'} style={{background: flagColor(carStatus.vehicleFiaFlags)}}>
                        {getGear(carTelemetry.gear) || 'N'}
                    </div>
                    <div className="small highlighted"
                        style={{
                            color: 'cyan',
                            background: carStatus.ersDeployMode === 2 ? OVERTAKE_COLOR : 'none'
                            }}>
                        <div className="label" style={{color: '#fff'}}>speed</div>
                        {carTelemetry.speed || 0}
                    </div>
                </Column>

                <Column size="m">
                    <div className="small">
                        <div className="label">lap</div>
                        {(lapData.currentLapTime || 0).toFixed(2)}
                    </div>
                    <div className="small">
                        <div className="label">last</div>
                        {(lapData.lastLapTime || 0).toFixed(2)}
                    </div>

                    <div className="small">
                            
                    </div>
                    <div className="small">
                        <div className="label">{fuelMix(carStatus.fuelMix)}</div>
                            {/* {(carStatus.fuelRemainingLaps || 0).toFixed(2)} */}

                            {(carStatus.fuelRemainingLaps || 0).toString().split('.').map((e, i) => {
                                if (i === 0) {
                                    return e + '.';
                                }
                                if (i === 1) {
                                    return (
                                        <span style={{fontSize: '7vh'}}>{e.slice(0, 3)}</span>
                                    );
                                }
                            })}

                    </div>
                </Column>

                <Column size="s">
                    <div style={{position: 'relative', height:'100%'}}>
                        <div className='ers-bar' style={{height:(carStatus.ersStoreEnergy / 4000000) * 100+'%'}}></div>
                        <div className='ers-bar-rem' style={{height:((4000000 - carStatus.ersDeployedThisLap) / 4000000) * 100+'%'}}></div>
                    </div>
                </Column>
            </div>
        </div>
    );
}

// Led panel for leds
function LEDPanel(props) {
    return (
        <div className="led-panel">
            {props.children}
        </div>
    );
}

// Led component
function LED(props) {
    let style = {};
    if (props.active) {
        style = {
            background: props.color,
            boxShadow: '0 0 20px '+props.color + ',0 0 100px '+props.color + ',0 0 200px '+'#fff'
        }
    }
    return (
        <div className="led" style={style}></div>
    );
}

// Info text component
function Info(props) {
    return (
        <div className="info-text">
            {props.children}
        </div>
    );
}

// Warning text component
function Warning(props) {
    return (
        <div className="warning-text">
            {props.children}
        </div>
    );
}

// Line panel for text components
function LinePanel(props) {
    return (
        <div className="line-panel">
            {props.children}
        </div>
    );
}

// Column
function Column(props) {
    const colWidth =
          props.size === 'l' ? '35vw'
        : props.size === 'm' ? '30vw'
        : props.size === 's' ? '5vw'
        : '20vw';

    const style = {
        width: colWidth
    }
    return (
        <div className="column" style={style}>
            {props.children}
        </div>
    );
}


// Render display
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
