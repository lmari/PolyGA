Array.prototype.toString = function(n) {
  var res = '';
  for(var i = 0; i < this.length; i++) {
    res += this[i].toFixed(n) + ' ';
  }
  return res;
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var xData, pTarg, yTarg, pData, yData, MSEs, sortedMSEs, median, minTarg, maxTarg, chart;
var selectedAsUnfit = new Array();

function writeData(field, withHighlight) {
  var txt = '<h3>num gen: ' + numGen;
  txt += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;median MSE: ' + median.toFixed(3);
  txt += '</h3>';
  if(showData) {
    txt += 'x: ' + xData.toString(2) + '<br>';
    txt += 'target (params): ' + pTarg.toString(3) + '<br>';
    //txt += 'target (coords): ' + yTarg.toString(3) + '<br>';
    if(!withHighlight) {
      for(var j = 0; j < tempNumSrs; j++) {
        txt += 'y[' + j + '] (params): ' + pData[j].toString(3) + '<br>';
        //txt += 'y[' + j + '] (coords): ' + yData[j].toString(3) + '<br>';
      }
      txt += '<br>MSEs: ';
      for(var j = 0; j < tempNumSrs; j++) { txt += MSEs[j].toFixed(3) + ' '; }
      txt += '<br>sorted RMSEs: ';
      for(var j = 0; j < tempNumSrs; j++) { txt += sortedMSEs[j].toFixed(3) + ' '; }
    } else {
      for(var j = 0; j < tempNumSrs; j++) {
        if(selectedAsUnfit.includes(j)) { txt += '<b>'; }
        txt += 'y[' + j + '] (params): ' + pData[j].toString(3) + '<br>';
        //txt += 'y[' + j + '] (coords): ' + yData[j].toString(3) + '<br>';
        if(selectedAsUnfit.includes(j)) { txt += '</b>'; }
      }
      txt += '<br>MSEs: ';
      for(var j = 0; j < tempNumSrs; j++) {
        if(selectedAsUnfit.includes(j)) { txt += '<b>'; }
        txt += MSEs[j].toFixed(3) + ' ';
        if(selectedAsUnfit.includes(j)) { txt += '</b>'; }
      }
      txt += '<br>sorted MSEs: ';
      for(var j = 0; j < tempNumSrs; j++) { txt += sortedMSEs[j].toFixed(3) + ' '; }
    }
  }

  $(field).html(txt);
}

function resetTarget(refresh) {
  xData = new Array(); //x coords of world
  pTarg = new Array(); //params of target series
  yTarg = new Array(); //y coords of target series
  var x, y;
  for(var i = 0; i < numPts; i++) { xData.push(4 * i / (numPts - 1) - 2); } //x values, in [-2,2]
  for(var i = 0; i < numPts; i++) { pTarg.push((Math.random() - 0.5) / (2 * i + 1)); } //to be estimated
  for(var i = 0; i < numPts; i++) {
    x = xData[i];
    y = 0;
    for(var k = 0; k < numPts; k++) { y += pTarg[k] * (x**k); }
    yTarg.push(y);
  }
  minTarg = Math.min(-1, Math.min.apply(Math, yTarg));
  maxTarg = Math.max(+1, Math.max.apply(Math, yTarg));
  if(refresh) {
    computeMSEs();
    setChartData();
    writeData("#myText");
  }
}

function setData() {
  pData = new Array(); //params of test series
  yData = new Array(); //y coords of test series
  for(var j = 0; j < numSrs; j++) {
    pData[j] = new Array();
    for(var i = 0; i < numPts; i++) { pData[j].push(Math.random() - 0.5); } //initial estimations
  }
  computeSeries();
}

function computeSeries() {
  for(var j = 0; j < numSrs; j++) {
    yData[j] = new Array();
    for(var i = 0; i < numPts; i++) {
      x = xData[i];
      y = 0;
      for(var k = 0; k < numPts; k++) { y += pData[j][k] * (x**k); }
      yData[j].push(y);
    }
  }
}

function computeMSEs() {
  MSEs = new Array();
  for(var j = 0; j < numSrs; j++) {
    e = 0;
    for(var i = 0; i < numPts; i++) { e += (yTarg[i] - yData[j][i])**2; }
    MSEs.push(e / numPts);
  }
  sortedMSEs = Array.from(MSEs).sort((a,b) => {return a - b;});
  var m = numSrs % 2 == 0 ? numSrs / 2 - 1 : (numSrs - 1) / 2;
  median = sortedMSEs[m];
}

function setChartData() {
  var chartData = new Array();
  chartData.push({
    borderColor: 'rgb(99, 255, 132)',
      fill: false,
      data: yTarg
  });
  for(var j = 0; j < numSrs; j++) {
    chartData.push({
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
      fill: false,
      data: yData[j]
    });
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xData,
      datasets: chartData
    },
    options: {
      animation: false,
      legend: { display: false },
      tooltips: { enabled: false },
      hover: {mode: null},
      scales: {
        xAxes: [{ ticks: { display: false } }],
        yAxes: [{ ticks: { min: minTarg, max: maxTarg } }]
      }
    }
  });
}

function setAll() {
  resetTarget();
  setData();
  computeMSEs();
  setChartData();
  writeData("#myText");
}

function selectFit() {
  selectedAsUnfit = new Array();
  for(var j = 0; j < numSrs; j++) {
    if(MSEs[j] <= median) {
      chart.data.datasets[j+1].borderColor = 'rgb(0, 0, 255)';
    } else {
      selectedAsUnfit.push(j);
      chart.data.datasets[j+1].borderColor = 'rgb(255, 0, 0)';
      chart.data.datasets[j+1].borderDash = [5, 5];
    }
    chart.update();
    writeData("#myText", true);
  }
}

function removeUnfit() {
  for(var j = numSrs-1; j >= 0; j--) {
    if(MSEs[j] > median) {
      chart.data.datasets.remove(j+1);
      pData.remove(j);
      yData.remove(j);
      MSEs.remove(j);
      tempNumSrs--;
    } else {
      chart.data.datasets[j+1].borderColor = 'rgb(255, 99, 132)';
    }
  }
  var m = tempNumSrs % 2 == 0 ? tempNumSrs / 2 - 1 : (tempNumSrs - 1) / 2;
  median = sortedMSEs[m];
  chart.update();
  writeData("#myText");
  selectedAsUnfit = new Array();
}

function updateSrs() {
  var cData = pData.slice(0); //clone the params of the fit series
  pData = new Array();
  // combin == 0<=x<=50: offspring from a random parent with a probability of x/100 that each gene is of another random parent
  // (hence x==0: no crossover: offspring identical to a random parent (asexual reproduction);
  //      x==100: full crossover: offspring with 50-50 genes of two random parents)
  // change == 0<=x<=100: probability of x/100 that each gene has a mutation
  // introd == 0<=x<=100: percentage of immigrants, i.e., brand new random individuals
  var c1 = combin / 100;
  var c2 = change / 100;
  var changeAmpl = 0.05; //amplitude of mutation
  var parentIndexes = new Array();
  if(tempNumSrs > 1) {
    for(var j = 0; j < tempNumSrs; j++) { parentIndexes.push(j); }
  }
  for(var j = 0; j < numSrs; j++) {
    pData[j] = new Array();
    if(j < numSrs * (100 - introd) / 100) { //offspring from parents
      var r1, r2;
      if(tempNumSrs == 1) {
        r1 = r2 = 0;
      } else {
        parentIndexes.sort(() => { return 0.5 - Math.random(); });
        r1 = parentIndexes[0];
        r2 = parentIndexes[1];
      }
      for(var i = 0; i < numPts; i++) {
        pData[j][i] = cData[Math.random() > c1 ? r1 : r2][i]; //combin
        if(Math.random() < c2) { pData[j][i] += (Math.random() - 0.5) * changeAmpl; } //change
      }
    } else { // immigrant
      for(var i = 0; i < numPts; i++) { pData[j][i] = Math.random() - 0.5; }
    }
  }
  computeSeries();
  computeMSEs();
  tempNumSrs = numSrs;
  setChartData()
  chart.update();
  writeData("#myText");
}

var funId = -99;
var numGen = 1;
function startProcess() {
  if(funId == -99) { //just to avoid multiple starts...
    funId = setInterval(function() {
      numGen++;
      selectFit();
      removeUnfit();
      updateSrs();
    }, 100); //frequency of repetition, in ms
  }
}

function stopProcess() {
  clearInterval(funId);
  funId = -99;
  numGen = 1;
}
