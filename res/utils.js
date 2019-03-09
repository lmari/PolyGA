/*
This file is part of PolyGA, Copyright 2018, Luca Mari.

PolyGA is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 2.

PolyGA is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License <http://www.gnu.org/licenses/> for more details.
*/
Array.prototype.toString = function(n) {
  let res = '';
  for(let i = 0; i < this.length; i++) res += this[i].toFixed(n) + ' ';
  return res;
}

Array.prototype.remove = function(from, to) {
  let rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function checkRange(what, from, to) {
  let n = parseInt(what);
  return !(!Number.isInteger(n) || (n < from) || (n > to));
}

function enableConfiguration(x) {
  sNumPts.enable(x);
  sNumSrs.enable(x);
}

function enableTuning(x) {
  sNumDel.enable(x);
  sCombin.enable(x);
  sChange.enable(x);
  sChang2.enable(x);
  sNumNew.enable(x);
}

var xData, pTarg, yTarg, pData, yData, MSEs, sortedMSEs, median, lastFit, minTarg, maxTarg, chart;
var selectedAsUnfit = new Array();

function writeData(field, withHighlight, wholePop) { //write some data
  var num = wholePop ? numSrs : numSrs - numDel;
  var txt = '<h3>num gen: ' + numGen;
  txt += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;median MSE: ' + median.toFixed(3);
  txt += '</h3>';
  if(showData) {
    txt += 'x: ' + xData.toString(2) + '<br>';
    txt += 'target (params): ' + pTarg.toString(3) + '<br>';
    //txt += 'target (coords): ' + yTarg.toString(3) + '<br>';
    if(!withHighlight) {
      for(var j = 0; j < num; j++) {
        txt += 'y[' + j + '] (params): ' + pData[j].toString(3) + '<br>';
        //txt += 'y[' + j + '] (coords): ' + yData[j].toString(3) + '<br>';
      }
      txt += '<br>MSEs: ';
      for(var j = 0; j < num; j++) { txt += MSEs[j].toFixed(3) + ' '; }
      txt += '<br>sorted MSEs: ';
      for(var j = 0; j < num; j++) { txt += sortedMSEs[j].toFixed(3) + ' '; }
    } else {
      for(var j = 0; j < num; j++) {
        if(selectedAsUnfit.includes(j)) { txt += '<b>'; }
        txt += 'y[' + j + '] (params): ' + pData[j].toString(3) + '<br>';
        //txt += 'y[' + j + '] (coords): ' + yData[j].toString(3) + '<br>';
        if(selectedAsUnfit.includes(j)) { txt += '</b>'; }
      }
      txt += '<br>MSEs: ';
      for(var j = 0; j < num; j++) {
        if(selectedAsUnfit.includes(j)) { txt += '<b>'; }
        txt += MSEs[j].toFixed(3) + ' ';
        if(selectedAsUnfit.includes(j)) { txt += '</b>'; }
      }
      txt += '<br>sorted MSEs: ';
      for(var j = 0; j < num; j++) { txt += sortedMSEs[j].toFixed(3) + ' '; }
    }
  }
  $(field).html(txt);
}

function resetTarget(refresh) { //(re)set the target polynomial: x coords, params, y coords
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
    writeData("#myText", false, true);
  }
}

function setData() { //(re)set the population polynomials: params, y coords
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
  writeData("#myText", false, true);
}

function selectFit() {
  selectedAsUnfit = new Array();
  lastFit = sortedMSEs[numSrs - numDel - 1];
  for(var j = 0; j < numSrs; j++) {
    if(MSEs[j] <= lastFit) {
      chart.data.datasets[j+1].borderColor = 'rgb(0, 0, 255)';
    } else {
      selectedAsUnfit.push(j);
      chart.data.datasets[j+1].borderColor = 'rgb(255, 0, 0)';
      chart.data.datasets[j+1].borderDash = [5, 5];
    }
    chart.update();
    writeData("#myText", true, true);
  }
}

function removeUnfit() {
  for(var j = numSrs-1; j >= 0; j--) {
    if(MSEs[j] > lastFit) {
      chart.data.datasets.remove(j+1);
      pData.remove(j);
      yData.remove(j);
      MSEs.remove(j);
    } else {
      chart.data.datasets[j+1].borderColor = 'rgb(255, 99, 132)';
    }
  }
  var num = numSrs - numDel;
  if(num > 0) {
    var m = num % 2 == 0 ? num / 2 - 1 : (num - 1) / 2;
    median = sortedMSEs[m];
  } else {
    median = 0;
  }
  chart.update();
  writeData("#myText", false, false);
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
  var changeAmpl = chang2 / 100; //amplitude of mutation
  var parentIndexes = new Array();
  var num = numSrs - numDel;
  for(var j = 0; j < num; j++) { parentIndexes.push(j); }
  for(var j = 0; j < numSrs; j++) {
    pData[j] = new Array();
    if(j < (numSrs - numNew)) { //offspring from parents
      var r1, r2;
      if(num == 1) {
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
  setChartData()
  chart.update();
  writeData("#myText", false, true);
}

var funId = -99;
var numGen = 1;
function startProcess() {
  if(bManExec.state == 1) {
    removeUnfit();
    updateSrs();
    bManExec.setLabel(txt.bManExec1);
    bManExec.state = 0;
  } else if(bManExec.state == 2) {
      updateSrs();
      bManExec.setLabel(txt.bManExec1);
      bManExec.state = 0;
    }
  bManExec.disable();
  enableConfiguration(false);
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
  bManExec.enable();
  enableConfiguration(true);
}
