



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

    if (pId) {
        try {
            return fetch('http://localhost:3000/packet/'+pId+'/'+timeStamp)
            .then(res => res.json())
            .then(result => {
                if (result.msg === 'ok') {
                    timeStamps[pId] = result.timeStamp;
                    // Handle received packet
                    packets[pId] = result.data;

                    console.log(result.data);

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



function App(props) {
    const { useEffect, useState } = React;
    const [data, setData] = React.useState({});
    const [fetchInt, setFetchInt] = React.useState(null);


    React.useEffect(() => {
        if (!fetchInt) {
            //setFetchInt(setInterval(fetchPackets, 1000));
        }

    }, [fetchInt]);

    function fetchPackets() {
        for (let i = 0; i < 10; i++) {
            const p = getPacket(i).then(res => {

                console.log(i);
                //console.log(i, res);
                
            });
        }
    }

    console.log(data);

    return (
        <div>
            {data[1]}
        </div>
    );
}




