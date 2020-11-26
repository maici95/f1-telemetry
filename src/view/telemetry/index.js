


const socket = io();
const body = document.querySelector('body');

const sessionDropDown = document.querySelector('#sessionDropDown');
const lapsElem = document.querySelector('#lapsElem');

// Array for graph objects
const graphs = [];
// let for testing -- Matrix for sessions' laps
let laps = Array(10).fill(0).map(() => []);
// Array of indices for laps to be drawn
let showLapsIndices = [];
// Current lap number
let currentLapNum = null;
// Telemetry mode -- 0 = live, 1 = "inspect"
let teleMode = 0;
// Index for selected session
let sessionIndex = 1;

// Colors for graphs' laps
const colors = ['red', 'blue', 'green', 'yellow'];


// For testing -- 3 laps of data
fetch('/test_data.json')
    .then(res => res.json())
    .then(result => {
        laps = result;
        renderDropDown();
        renderLapBoxes(1);
});


// Render dropdown element for sessions
function renderDropDown() {
    sessionDropDown.innerHTML = '';
    for (let i = 0; i < laps.length; i++) {
        if (i === 0) {
            continue;
        }
        const option = document.createElement('option');
        option.value = i;
        option.text = i + ' : ' + laps[i].length + ' laps';
        sessionDropDown.appendChild(option);
    }
}

// Switch between telemetry modes
document.getElementById('modeBtn').addEventListener('click', (event) => {
    teleMode = teleMode === 0 ? 1 : 0;
    event.target.innerHTML = teleMode === 0 ? 'mode: live' : 'mode: lap';
});

// Select session
sessionDropDown.addEventListener('change', (event) => {
    renderLapBoxes(event.target.value);
    sessionIndex = parseInt(event.target.value);
});

// Render checkboxeses for selected session
function renderLapBoxes(index) {
    lapsElem.innerHTML = '';
    showLapsIndices = [];
    let lapIndex = 0;

    for (let i of laps[index]) {
        showLapsIndices.push(false);
        lapsElem.appendChild(new lapCheckBox(lapIndex));
        lapIndex++;
    }
}

// Lap checkbox
function lapCheckBox(index) {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    checkBox.addEventListener('click', () => {
        showLapsIndices[index] = !showLapsIndices[index];
        drawLapsData();
    });

    return checkBox;
}

// Draw "inspect" mode laps data
function drawLapsData() {
    if (teleMode === 1) {
        for (let graph of graphs) {
            graph.context.clearRect(0, 0, graph.canvas.width, graph.canvas.height);

            let n = 0;
            let c = 0;

            for (let lap of laps[sessionIndex]) {

                // Skip lap if lap is not selected
                if (!showLapsIndices[n++]) {
                    continue;
                }

                graph.context.strokeStyle = colors[c++];

                let lastX = 0;
                let lastY = 0;

                for (let i of lap) {

                    const x2 = parseInt(i[graph.data.xKey] / i.trackLength * graph.canvas.width);
                    const y2 = parseInt(graph.canvas.height - (i[graph.data.yKey] / graph.data.yMax * graph.canvas.height));

                    graph.context.beginPath();
                    graph.context.moveTo(lastX + 0.5, lastY + 0.5);
                    graph.context.lineTo(x2 + 0.5, y2 + 0.5);
                    graph.context.closePath();
                    graph.context.stroke();
            
                    // Update last axis' values
                    lastX = x2;
                    lastY = y2;

                }
            }
        }
    }
}

// ini
renderDropDown();



socket.on('teleData', (data) => {
    if (graph.data.currentLapNum !== data.currentLapNum) {
        currentLapNum = data.currentLapNum;
        laps[data.sessionType].push([]);
        renderDropDown();
    }

    if (teleMode === 1) {
        if (graph.data.currentLapNum !== data.currentLapNum) {
            graph.data.currentLapNum = data.currentLapNum;
        }
    }

    const n = laps[data.sessionType].length - 1;
    laps[data.sessionType][n].push(data);

    if (teleMode === 0) {
        for (let graph of graphs) {
            // new values for x and y axis
            const x2 = parseInt(data[graph.data.xKey] / data.trackLength * graph.canvas.width);
            const y2 = parseInt(graph.canvas.height - (data[graph.data.yKey] / graph.data.yMax * graph.canvas.height));
    
            // Start of the new lap
            if (graph.data.currentLapNum !== data.currentLapNum) {
                graph.context.clearRect(0, 0, graph.canvas.width, graph.canvas.height);
                graph.data.currentLapNum = data.currentLapNum;
                graph.data.lastX = null;
                graph.data.lastY = null;
                return;
            }
    
            if (graph.data.lastX === null) {
                graph.data.lastX = x2;
                graph.data.lastY = y2;
                return;
            }
    
            // Live draw
            graph.context.beginPath();
            graph.context.moveTo(graph.data.lastX + 0.5, graph.data.lastY + 0.5);
            graph.context.lineTo(x2 + 0.5, y2 + 0.5);
            graph.context.closePath();
            graph.context.stroke();
    
            // Update last axis' values
            graph.data.lastX = x2;
            graph.data.lastY = y2;
        }
    }
});





// Graph component -- xKey hard coded as lap distance
function Graph(label, xKey, yKey, yMax) {
    const graph = {}

    const width = window.innerWidth - 4;
    const height = 300;

    const parentDiv = document.createElement('div');
    parentDiv.style.width = width;
    parentDiv.style.height = height;

    const labelElem = document.createElement('div');
    labelElem.innerHTML = label;
    labelElem.style.position = 'absolute';
    labelElem.style.margin = 10;
    labelElem.style.color = '#888';

    parentDiv.appendChild(labelElem);

    parentDiv.style.marginTop = 20;

    const canvas = document.createElement('canvas');
    graph.canvas = canvas;
    graph.context = canvas.getContext('2d');
    graph.label = label;
    graph.canvas.width = width;
    graph.canvas.height = height;

    graph.context.lineJoin = 'round';
    graph.context.lineWidth = 1.5;
    graph.context.strokeStyle = 'red'

    const grid = document.createElement('canvas');
    graph.grid = grid;

    graph.grid.width = width;
    graph.grid.height = height;

    drawGrid(graph.grid, width, height, yMax);

    parentDiv.appendChild(grid);
    parentDiv.appendChild(canvas);
    body.appendChild(parentDiv);

    graph.data = {
        xKey: xKey,
        yKey: yKey,
        yMax: yMax,
        lastX: null,
        lastY: null,
        currentLapNum: null
    }

    return graph;
}

// Draw grid on canvas
/**
 * @param {HTMLCanvasElement} canvas 
 * @param {*} width 
 * @param {*} height 
 * @param {*} yMax 
 */
function drawGrid(canvas, width, height, yMax) {
    const context = canvas.getContext('2d');

    context.lineWidth = 1
    context.strokeStyle = '#888';
    context.fillStyle = '#888'

    // replace with stepping
    const rowHeight = height / 8;

    let rows = height / rowHeight;

    for (let i = 0; i < height; i += rowHeight) {
        const value = (yMax / (height / rowHeight) * rows--).toFixed(2);
        context.fillText(value, 94, i + 12);

        context.beginPath();
        context.moveTo(width, parseInt(i) + 0.5);
        context.lineTo(0, parseInt(i) + 0.5);
        context.closePath();
        context.stroke();
    }

    for (let i = 0; i < width; i += 90) {
        const value = (i / width * 100).toFixed(1);
        context.fillText(value, i + 4, height - 4);

        context.beginPath();
        context.moveTo(i + 0.5, 0);
        context.lineTo(i + 0.5, height);
        context.closePath();
        context.stroke();
    }
}


// Create graphs
const graph = new Graph('speed', 'lapDistance', 'speed', 340);
//const graph4 = new Graph('lap time', 'lapDistance', 'currentLapTime', 35);
const graph2 = new Graph('throttle', 'lapDistance', 'throttle', 1);
const graph3 = new Graph('gear', 'lapDistance', 'gear', 8);

graphs.push(graph);
//graphs.push(graph4);
graphs.push(graph2);
graphs.push(graph3);

