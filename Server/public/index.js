


const UPDATE_FREQ = 1000 / 10;
const GREEN = '#00CC01';
const RED = '#FF0100';
const TARGET = 0.3;

const LED0_COLOR = '#00FF00';
const LED1_COLOR = '#FF0000';
const LED2_COLOR = '#C71585';

const TYRE_WEAR_WARNING = 60;
const NORMAL = '#ddd';

const ENGINE_TEMP_TARGET = 125;
const TYRE_TEMP_TARGET = 100;

function fetchData() {
    return new Promise((resolve, reject) => {
    fetch('/data')
        .then(res => res.json())
        .then(result => {
            resolve(result);
        });
    });
}

const flagColor = flag => ({
    0: 'none',      // none
    1: '#00CC01',   // green
    2: '#0000FF',   // blue
    3: '#FBDF00',   // yellow
    4: '#FF0100'    // red
}[flag]);

const tyreColor = wear => {
    if (wear > TYRE_WEAR_WARNING) {
        return RED;
    } else {
        return NORMAL;
    }
}

const secondsToHMS = seconds => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = seconds % 60;

    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;

    return h+':'+m+':'+s;
}

function App() {

    const [loaded, setLoaded] = React.useState(false);
    const [header, setHeader] = React.useState({});
    const [motion, setMotion] = React.useState({});
    const [session, setSession] = React.useState({});
    const [lapData, setLapData] = React.useState({});
    const [carSetup, setCarSetup] = React.useState({});
    const [carTelemetry, setCarTelemetry] = React.useState({});
    const [carStatus, setCarStatus] = React.useState({});

    React.useEffect(() => {
        if (!loaded) {
            setInterval(() => {
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
            }, UPDATE_FREQ);
            setLoaded(true);
        }
    });

    const [engineWarning, setEngineWarning] = React.useState(false);
    React.useEffect(() => {
        if (carTelemetry.engineTemperature > ENGINE_TEMP_TARGET) {
            setEngineWarning(true);
        } else {
            setEngineWarning(false);
        }
    }, [carTelemetry])

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

    // Last lap delta
    const [miniIndex, setMiniIndex] = React.useState(0);
    const [lastLap, setLastLap] = React.useState([]);
    const [currentLap, setCurrentLap] = React.useState([]);
    const [lapNum, setLapNum] = React.useState(null);
    const [lapDelta, setLapDelta] = React.useState(0);

    React.useEffect(() => {
        if (lapData.lapDistance > miniIndex * 100) {
            setMiniIndex(miniIndex + 1);
            setCurrentLap([...currentLap, lapData.currentLapTime]);
        }

        if (lapNum !== lapData.currentLapNum) {
            setLapNum(lapData.currentLapNum);
            setLastLap([...currentLap]);
            setMiniIndex(0);
            setCurrentLap([]);
        }

        if (lastLap.length > 0 && currentLap.length > 0) {
            const index = currentLap.length - 1;
            setLapDelta((lastLap[index] - currentLap[index]));
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
            </LinePanel>
            <div>
                <Column size="m">
                    <div className="small" style={{
                        color: Math.abs(lapDelta) < TARGET ? '#fff'
                            : lapDelta < TARGET * -1 ? RED
                            : GREEN
                        }}>
                        <div className="label">delta</div>
                        {lapDelta.toFixed(2)}
                    </div>

                    <div className="small">
                        
                    </div>
                    {carStatus.tyresWear &&
                    <div className="highlighted">
                        <div className="small" style={{display: 'flex'}}>
                            <div style={{color: tyreColor(carStatus.tyresWear[2])}} className="half">{carStatus.tyresWear[2] || 0}</div>
                            <div style={{color: tyreColor(carStatus.tyresWear[3])}} className="half">{carStatus.tyresWear[3] || 0}</div>
                        </div>
                        <div className="small" style={{display: 'flex'}}>
                            <div style={{color: tyreColor(carStatus.tyresWear[0])}} className="half">{carStatus.tyresWear[0] || 0}</div>
                            <div style={{color: tyreColor(carStatus.tyresWear[1])}} className="half">{carStatus.tyresWear[1] || 0}</div>
                        </div>
                    </div>
                    }
                </Column>

                <Column size="l">
                    <div className={'big highlighted'} style={{background: flagColor(carStatus.vehicleFiaFlags)}}>
                        {carTelemetry.gear || 'N'}
                    </div>
                    <div className="small" style={{color: '#C71585'}}>
                        <div className="label">speed</div>
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
                </Column>

                <Column size="s">
                    <div style={{width:'100%', height:(100 - (carStatus.ersStoreEnergy / 4000000) * 100)+'%'}}></div>
                    <div className='ers-bar' style={{width:'100%', height:(carStatus.ersStoreEnergy / 4000000) * 100+'%'}}></div>
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

function Info(props) {
    return (
        <div className="info-text">
            {props.children}
        </div>
    );
}
function Warning(props) {
    return (
        <div className="warning-text">
            {props.children}
        </div>
    );
}

function LinePanel(props) {
    return (
        <div className="line-panel">
            {props.children}
        </div>
    );
}
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


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
