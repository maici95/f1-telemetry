


const UPDATE_FREQ = 1000 / 60;

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


    return (
        <div>
            packet format: {header.packetFormat}
            <br/>
            world x: {motion.worldPositionX}
            <br/>
            time left: {session.test && session.test.sessionTimeLeft}
            <br/>
            last lap: {lapData.lastLapTime}
            <br/>
            fuel load: {carSetup.fuelLoad}
            <br/>
            speed: {carTelemetry.speed}
            <br/>
            fuel mix: {carStatus.fuelMix}
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
