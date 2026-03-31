// base sample graph data - replace with actual paths and distances
// SAMPLE ONLY - this is for reference and testing; TIGNAN SA BABA YUNG COORDS
const schoolMap = {
  'Gate': { 'Library': 50, 'Cafeteria': 80 },
  'Library': { 'Gate': 50, 'Main Hall': 30, 'Cafeteria': 40 },
  'Cafeteria': { 'Gate': 80, 'Library': 40, 'Gym': 60 },
  'Main Hall': { 'Library': 30, 'Gym': 20 },
  'Gym': { 'Cafeteria': 60, 'Main Hall': 20 }
};

let pathGraph = {};

// This is for node coordinates on the 600x400 canvas 
// NOTE: WAG PAPALITAN YUNG CANVAS SIZE SA INDEX.HTML, DAPAT 600x400 TALAGA PARA HINDI MAGKA-MISMATCH
// Pa edit niyo na lang yung coordinates based on actual map layout, ito sample lang to para may reference kayo kung paano i-structure yung data
const nodeCoords = {
  'UNIVERSITY CHAPEL': { x: 443, y: 340 },
  'PERPETUA SOCORRO HALL/ADMIN BLDG.': { x: 460, y: 320 },
  "FOUNDER'S STATUE": { x: 437, y: 329 },
  'COVERED WALK': { x: 335, y: 180 },
  'JUNIOR HIGH SCHOOL BUILDING': { x: 415, y: 300 },
  'OPEN TENNIS COURT': { x: 385, y: 275 },
  'MINI PARK': { x: 230, y: 190 },
  'MONTESSORI BUILDING': { x: 377, y: 160 },
  'GRADUATE SCHOOL BUILDING': { x: 415, y: 217 },
  'DR. ANDRES C. GONZALES BUILDING': { x: 286, y: 190 },
  'SENIOR H/S BUILDING': { x: 286, y: 160 },
  'UNIVERSITY FORUM': { x: 246, y: 210 },
  'SWIMMING POOL': { x: 190, y: 240 },
  'BASKETBALL COURT 1': { x: 200, y: 220 },
  'TWIN TENNIS COURT': { x: 210, y: 200 },
  'OVAL AND FOOTBALL FIELD': { x: 140, y: 220 },
  'GUARD HOUSE 1': { x: 440, y: 364 },
  'DR. SANTIAGO ORTEGA BUILDING': { x: 210, y: 160 },
  'SGO CAFETERIA': { x: 220, y: 120 },
  'FIRING RANGE': { x: 230, y: 130 },
  'MINI TREE PARK': { x: 250, y: 25 },
  'GREGORIA SANCHEZ HALL': { x: 320, y: 70 },
  'MARITIME BUILDING': { x: 280, y: 57 },
  'BASKETBALL COURT 2': { x: 320, y: 110 },
  'PC COLLECTION BUILDING': { x: 425, y: 382 },
  'GATE 1': { x: 435, y: 369},
  'GATE 3': { x: 70, y: 235 },
  'THE HUB': { x: 155, y: 120 }
};

// This is for the fixed campus path connections
const pathEdges = [

  ['GATE 1', 'UNIVERSITY CHAPEL', 40],
  ['UNIVERSITY CHAPEL', "FOUNDER'S STATUE", 15],
  ["FOUNDER'S STATUE", 'JUNIOR HIGH SCHOOL BUILDING', 30],
  ['JUNIOR HIGH SCHOOL BUILDING', 'OPEN TENNIS COURT', 40],
  ['OPEN TENNIS COURT', 'DR. ANDRES C. GONZALES BUILDING', 50],
  ['DR. ANDRES C. GONZALES BUILDING', 'SENIOR H/S BUILDING', 20],
  ['SENIOR H/S BUILDING', 'UNIVERSITY FORUM', 60],
  ['UNIVERSITY FORUM', 'SWIMMING POOL', 25],
  ['SWIMMING POOL', 'BASKETBALL COURT 1', 25],
  ['BASKETBALL COURT 1', 'TWIN TENNIS COURT', 20],
  ['TWIN TENNIS COURT', 'OVAL AND FOOTBALL FIELD', 80],
  ['OVAL AND FOOTBALL FIELD', 'GATE 3', 70],
  ['UNIVERSITY CHAPEL', 'PERPETUA SOCORRO HALL/ADMIN BLDG.', 20],
  ['GATE 3', 'THE HUB', 70],
  ['THE HUB', 'DR. SANTIAGO ORTEGA BUILDING', 80],
  ['DR. SANTIAGO ORTEGA BUILDING', 'SGO CAFETERIA', 20],
  ['SGO CAFETERIA', 'FIRING RANGE', 60],
  ['FIRING RANGE', 'MINI TREE PARK', 60],
  ['MINI TREE PARK', 'GREGORIA SANCHEZ HALL', 40]
];


// This is for building the graph structure from the fixed path edges
function buildFixedGraph() {
  const nodes = Object.keys(nodeCoords);
  const graph = {};
  nodes.forEach((node) => {
    graph[node] = {};
  });

  pathEdges.forEach(([a, b, dist]) => {
    if (!(a in graph) || !(b in graph)) return;
    graph[a][b] = dist;
    graph[b][a] = dist;
  });

  return graph;
}

// This is for creating autocomplete options
function populateLocationList() {
  const list = document.getElementById('location-list');
  list.innerHTML = '';

  Object.keys(nodeCoords).forEach((loc) => {
    const option = document.createElement('option');
    option.value = loc;
    list.appendChild(option);
  });
}

// This is for shortest path using Dijkstra
// Dijkstra algroithm (THISSSS)
function findShortestPath(graph, startNode, endNode) {
  let distances = {};
  let parents = {};
  let visited = new Set();

  // This is for initial distance setup
  for (let node in graph) {
    distances[node] = Infinity;
    parents[node] = null;
  }
  distances[startNode] = 0;

  // This is for picking the next node to visit
  function getLowestDistanceNode(distances, visited) {
    let lowest = null;
    for (let node in distances) {
      if (!visited.has(node)) {
        if (lowest === null || distances[node] < distances[lowest]) {
          lowest = node;
        }
      }
    }
    return lowest;
  }

  let currentNode = getLowestDistanceNode(distances, visited);

  // This is for processing all nodes
  while (currentNode !== null) {
    let distance = distances[currentNode];
    let neighbors = graph[currentNode];

    for (let neighbor in neighbors) {
      let newDistance = distance + neighbors[neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        parents[neighbor] = currentNode;
      }
    }
    visited.add(currentNode);
    currentNode = getLowestDistanceNode(distances, visited);
  }

  // This is for building the path array
  let path = [];
  let currentStep = endNode;

  while (currentStep !== null) {
    path.unshift(currentStep);
    currentStep = parents[currentStep];
  }

  if (path[0] !== startNode) {
    return { distance: Infinity, path: [] };
  }

  return { distance: distances[endNode], path: path };
}

// This is for drawing node markers
function drawNodes(selectedNode = null) {
  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');

  for (const node in nodeCoords) {
    const coords = nodeCoords[node];
    if (!coords) continue;

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, node === selectedNode ? 7 : 5, 0, Math.PI * 2);
    ctx.fillStyle = node === selectedNode ? '#f1c40f' : '#27ae60';
    ctx.fill();


  }
}


function drawPath(pathArray) {
  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (pathArray.length) {
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();

    for (let i = 0; i < pathArray.length; i++) {
      const coords = nodeCoords[pathArray[i]];
      if (!coords) continue;
      if (i === 0) {
        ctx.moveTo(coords.x, coords.y);
      } else {
        ctx.lineTo(coords.x, coords.y);
      }
    }

    ctx.stroke();
  }

  drawNodes();
}


function showTooltip(htmlContent, x, y) {
  const tooltip = document.getElementById('hover-tooltip');
  if (!tooltip) return;

  tooltip.innerHTML = htmlContent;
  tooltip.style.display = 'block';
  tooltip.style.left = `${x + 12}px`;
  tooltip.style.top = `${y + 12}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById('hover-tooltip');
  if (!tooltip) return;
  tooltip.style.display = 'none';
}

function getNodeTooltipContent(node) {
  const coords = nodeCoords[node] || { x: 0, y: 0 };
  const graph = Object.keys(pathGraph).length ? pathGraph : schoolMap;
  const connections = graph[node] ? Object.entries(graph[node]).map(([to, d]) => `${to} (${d}m)`) : [];
  const connectionText = connections.length ? connections.join(', ') : 'None';
  return `<strong>${node}</strong><br/>x: ${coords.x}, y: ${coords.y}<br/>Connected to: ${connectionText}`;
}


function drawDirectPath(start, end) {
  const startCoords = nodeCoords[start];
  const endCoords = nodeCoords[end];
  if (!startCoords || !endCoords) return;

  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(startCoords.x, startCoords.y);
  ctx.lineTo(endCoords.x, endCoords.y);
  ctx.stroke();

  drawNodes();
}

// This is for calculating straight-line distance
function calcStraightDistance(start, end) {
  const p1 = nodeCoords[start];
  const p2 = nodeCoords[end];
  if (!p1 || !p2) return Infinity;
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// This is for button click path calculation
function calculateAndDraw(start, end) {
  const graph = Object.keys(pathGraph).length ? pathGraph : schoolMap;
  const result = findShortestPath(graph, start, end);

  if (!result.path.length || result.distance === Infinity) {
    const straightDist = calcStraightDistance(start, end);
    document.getElementById('output').innerText =
      `No route in graph data; drawing direct line (approx ${Math.round(straightDist)}px).`;
    drawDirectPath(start, end);
    return;
  }

  document.getElementById('output').innerText =
    `Distance: ${result.distance}m | Path: ${result.path.join(' -> ')}`;
  drawPath(result.path);
}

// This is for UI setup and autocomplete initialization
function setupSearchControls() {
  populateLocationList();
  pathGraph = buildFixedGraph();

  // Draw all nodes on initial load to verify coordinates
  const mapCanvas = document.getElementById('map-canvas');
  if (mapCanvas) {
    const ctx = mapCanvas.getContext('2d');
    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    drawNodes();
  }

  const btn = document.getElementById('find-route-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const from = document.getElementById('from-input').value.trim();
    const to = document.getElementById('to-input').value.trim();

    if (!from || !to) {
      alert('Choose both From and To locations.');
      return;
    }

    if (!(from in nodeCoords) || !(to in nodeCoords)) {
      alert('Please choose valid location names from the list.');
      return;
    }

    calculateAndDraw(from, to);
  });

  const mapCanvas2 = document.getElementById('map-canvas');
  if (mapCanvas2) {
    let hoverNode = null;

    function findNodeAt(x, y, radius = 10) {
      for (const node in nodeCoords) {
        const coords = nodeCoords[node];
        const distance = Math.hypot(coords.x - x, coords.y - y);
        if (distance <= radius) {
          return node;
        }
      }
      return null;
    }

    mapCanvas2.addEventListener('mousemove', (event) => {
      const rect = mapCanvas2.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const node = findNodeAt(x, y);

      if (node) {
        if (hoverNode !== node) {
          hoverNode = node;
          drawNodes(node);
        }
        showTooltip(getNodeTooltipContent(node), event.clientX, event.clientY);
      } else {
        if (hoverNode !== null) {
          hoverNode = null;
          drawNodes();
        }
        hideTooltip();
      }
    });

    mapCanvas2.addEventListener('click', (event) => {
      const rect = mapCanvas2.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const clickedNode = findNodeAt(x, y);

      if (clickedNode) {
        document.getElementById('output').innerText =
          `Clicked Node: ${clickedNode} (x:${Math.round(x)}, y:${Math.round(y)})`;
        drawPath([]);
        drawNodes(clickedNode);
        showTooltip(getNodeTooltipContent(clickedNode), event.clientX, event.clientY);

        const fromInput = document.getElementById('from-input');
        const toInput = document.getElementById('to-input');

        if (!fromInput.value.trim()) {
          fromInput.value = clickedNode;
        } else if (!toInput.value.trim()) {
          toInput.value = clickedNode;
        } else {
          fromInput.value = clickedNode;
          toInput.value = '';
        }
      } else {
        hideTooltip();
      }
    });

    // Hide tooltip when leaving map area
    mapCanvas2.addEventListener('mouseleave', () => {
      hideTooltip();
      hoverNode = null;
      drawNodes();
    });
  }
}

// This is for initialization on page load
window.addEventListener('DOMContentLoaded', setupSearchControls);

// IMPORTANT NOTE:

// Paayos ng data structure ng nodeCoords at pathEdges based sa actual map layout at distances 
// para accurate yung pathfinding at visualization.

// Intindihin yung code kahit ako nalilito na rin sa dami ng data points, pero basically yung nodeCoords is para 
// sa position ng bawat location sa canvas, at yung pathEdges naman is para sa connectivity 
// at distances ng mga paths sa campus.