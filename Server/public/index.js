


const UPDATE_FREQ = 1000 / 5;

function fetchData() {
    return new Promise((resolve, reject) => {
    fetch('/data')
        .then(res => res.json())
        .then(result => {
            resolve(result);
        });
    });
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
            setLapDelta((lastLap[index] - currentLap[index]).toFixed(2));
        }
    }, [session]);


    return (
        <div>
            <LEDPanel></LEDPanel>
            <LinePanel>

            </LinePanel>
            <div>
                <Column size="m"></Column>
                <Column size="l">
                    <div className="big">
                        {carTelemetry.gear || 'N'}
                    </div>
                    <div className="small">
                        {carTelemetry.speed || 0}
                    </div>
                </Column>
                <Column size="m">
                    <div className="small" style={{color: lapDelta > 0 ? 'green' : 'red'}}>
                        {lapDelta}
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


function LEDPanel() {
    return (
        <div className="led-panel">
            
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
