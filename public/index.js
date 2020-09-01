


const timeStamps = {}
const packets = {}

const UPDATE_FREQ = 100;


function getPacket2() {
    const id = document.querySelector('#packetId').value;
    if (id) {
        getPacket(id);
    }
}

/**
 * Get packet from server by id.
 * 
 */
async function getPacket(id) {
    const pId = id;
    const timeStamp = timeStamps[id] || null;

    if (pId || pId === 0) {
        try {
            return fetch('/packet/'+pId+'/'+timeStamp)
            .then(res => res.json())
            .then(result => {
                if (result.msg === 'ok') {
                    timeStamps[pId] = result.timeStamp;
                    // Handle received packet
                    packets[pId] = result.data;
                    return result.data;
                }
            });
        } catch (error) {
    
        }
    } else {
        //console.log('invalid id');
    }
}


/**
 * Fetch every packet every UPDATE_FREQ ms
 */
/* function fetchPackets() {
    for (let i = 0; i < 10; i++) {
        getPacket(i);
    }
} setInterval(fetchPackets, UPDATE_FREQ); */


/**
 * 
 */
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

/*
0 === motion
1 === session
2 === lapData
3 === event
4 === participants
5 === carSetups
6 === carTelemetry
7 === carStatus
*/




function App(props) {
    const { useEffect, useState } = React;
    const [data, setData] = React.useState({});
    const [fetchInt, setFetchInt] = React.useState(null);
    const [carIndex, setCarIndex] = React.useState(null);



    React.useEffect(() => {
        if (!fetchInt) {
            setFetchInt(setInterval(fetchPackets, UPDATE_FREQ));
        }
    }, [fetchInt]);

    function fetchPackets() {
        for (let i = 0; i < 10; i++) {
            getPacket(i).then(res => {
                if (res) {
                    let d = data;
                    d[i] = res;

                    // Doing stuff with specific packet data
                    if (i === 0) {
                        setCarIndex(res.PacketHeader.playerCarIndex);
                    }

                    setData({
                        ...data,
                        i: res
                    });
                }
            });
        }
    }

    return (
        <div>
            <Display>
{/*                 <Row>
                    <Cell>1</Cell>
                    <Cell>2</Cell>
                    <Cell>3</Cell>
                </Row>
                <Row>
                    <Cell>1</Cell>
                </Row> */}
                <div className="led-panel">
                    <LED
                        status={1}
                    >

                    </LED>
                </div>

                <div className="info-panel">
                    <Col>
                        <Cell>top left</Cell>
                        <Cell>2</Cell>
                        <Cell>2</Cell>
                        <Cell>2</Cell>
                    </Col>
                    <Col>
                        <Cell big>{
                            data[6] && data[6].telemetry.carTelemetryData[carIndex].gear
                        }</Cell>
                        <Cell>
                            -
                        </Cell>
                    </Col>
                    <Col>
                        <Cell>2</Cell>
                        <Cell>2</Cell>
                        <Cell>2</Cell>
                        <Cell>2</Cell>
                    </Col>
                </div>

{/*                 <table className="main-table">
                    <tbody>
                        <tr>
                            <td style={{maxWidth: '30%'}}>car index: {carIndex}</td>
                            <td rowSpan="3"
                                style={{
                                    fontSize: '150px',
                                    height: '26.25vh',
                                    width: '100%'
                                }}
                            >
                                {
                                data[6] && data[6].telemetry.carTelemetryData[carIndex].gear
                                }
                            </td>
                            <td style={{maxWidth: '30%'}}>3</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">
                                <table style={{height: '37vh'}}>
                                    <tbody>
                                    <tr>
                                        <td>tl33333333333333</td>
                                        <td>2222</td>
                                    </tr>
                                    <tr>
                                        <td>3333</td>
                                        <td>4</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td rowSpan="2">4</td>
                        </tr>
                        <tr>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table> */}
            </Display>
        </div>
    );
}

function LED(props) {

    return (
        <div className="led">
            {props.children}
        </div>
    );
}

function Display(props) {
    return (
        <div className="display">
            {props.children}
        </div>
    );
}

function Row(props) {
    return (
        <div className="row">
            {props.children}
        </div>
    );
}

function Col(props) {
    return (
        <div className="col">
            {props.children}
        </div>
    );
}

function Cell(props) {
    const height = props.big ? '75%' : '25%';
    const fontSize = props.big ? '300px' : '40px';
    return (
        <div className="cell"
            style={{
                height: height,
                fontSize: fontSize
            }}
        >
            {props.children}
        </div>
    )
}

