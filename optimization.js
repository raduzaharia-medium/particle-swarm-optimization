var globalBestPosition = [50, 50];
var currentPositions = [[10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [110, 120], [120, 130], [130, 140], [140, 150], [150, 160]];
var bestPositions = [[10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [210, 220], [220, 230], [230, 240], [240, 250], [250, 260]];

function approach(currentPosition, bestPosition, position) {
  var result = currentPosition;

  result[0] +=
    2 * Math.random() * (bestPosition[0] - currentPosition[0]) +
    2 * Math.random() * (position[0] - currentPosition[0]);
  result[1] +=
    2 * Math.random() * (bestPosition[1] - currentPosition[1]) +
    2 * Math.random() * (position[1] - currentPosition[1]);

  return result;
}

function evaluate(position) {
  var optimalPosition = [300, 200];
  return (
    Math.abs(optimalPosition[0] - position[0]) +
    Math.abs(optimalPosition[1] - position[1])
  );
}

function draw(position) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.strokeStyle = "#F4F776";
  context.lineWidth = 2;

  context.beginPath();
  context.arc(position[0], position[1], 5, 0, 2 * Math.PI);
  context.stroke();
}

function clearCanvas() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function optimize() {
  clearCanvas();

  for (var i = 0; i < currentPositions.length; i++) {
    currentPositions[i] = approach(currentPositions[i], bestPositions[i], globalBestPosition);

    if (evaluate(currentPositions[i]) < evaluate(bestPositions[i]))
      bestPositions[i] = currentPositions[i];
    if (evaluate(currentPositions[i]) < evaluate(globalBestPosition))
      globalBestPosition = currentPositions[i];
    draw(currentPositions[i]);
  }

  requestAnimationFrame(optimize);
}

requestAnimationFrame(optimize);
