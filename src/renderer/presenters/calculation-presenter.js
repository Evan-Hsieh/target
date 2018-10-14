const remote = require('electron').remote
const controller = remote.require('./src/main/controllers/controller')
const path = require('path')
const BASE_PATH = path.join(__dirname, '/../../../')
const charts = require('echarts')
const fs = require('fs')

let inputFilePath = BASE_PATH + 'bin/for005.dat'
let outputFilePath = BASE_PATH + 'bin/for006.dat'
let exeFilePath = BASE_PATH + 'bin/misdat.exe'

let resEntities
let dataNameList = []
let isInitDataNameList = false

document.getElementById('button-calculate-model').addEventListener('click', function (event) {
  console.log('click calculation button')
  initDataNameList()
  clickCalcultion()
})
document.getElementById('button-show-calculated-result').addEventListener('click', function (event) {
  console.log('click show-calculated-result button')
  initDataNameList()
  clickShowClaculatedResult()
})
document.getElementById('button-draw-result').addEventListener('click', function (event) {
  console.log('click draw button')
  initDataNameList()
  clickVisualize()
})


function initDataNameList() {
  if (!isInitDataNameList) {
    dataNameList.push('cn', 'cm', 'ca', 'cy', 'cl', 'cd')
  }
  isInitDataNameList = true
}

function prepareCalculate(){

}

function clickCalcultion() {
  console.log('calculation presenter: clickCalcultion')
  writeData(inputFilePath)
  calculate(exeFilePath)
}

function clickShowClaculatedResult() {
  console.log('calculation presenter: clickShowClaculatedResult')
  readData(outputFilePath)
  document.getElementById('show-result-wrapper').innerHTML = ''
  dataNameList.forEach(function (name, index, array) {
    showDataTable(name)
  })
}


function clickVisualize() {
  console.log('calculation-presenter: clickVisualize')
  // check if the data ready
  if (resEntities === null) {
    console.log('the data is not ready, so read it first')

    if(fs.existsSync(outputFilePath)){
      readData(outputFilePath)
    }
  }

  dataNameList.forEach(function (name, index, array) {
    showDataChart(name)
  })
  //showDataChart('cn')
}

function calculate(exeFilePath) {
  // call tool.exe
  if(!fs.existsSync(exeFilePath)){
    console.log('calculation presenter: calculate(). This file doest exist')
    return
  }
  controller.execFile(exeFilePath)
}

function readData(path) {
  console.log('calculation presenter: readData()')
  resEntities = controller.readFile(path)
}


function writeData(path, data) {
  console.log('calculation presenter: writeData()')
  if (arguments.length === 1) {
    controller.writeDefaultData(path)
  }
  if (arguments.length === 2) {
    controller.writeCustomData(path, data)
  }
}

function showDataTable(resultParaName) {
  let machNum = resEntities.mach.length
  console.log('machnum:' + machNum)
  let alphaNum = resEntities.alpha.length
  console.log('alphaNum:' + alphaNum)

  let tableContent = '<h3>' + resultParaName + '计算结果:</h3>'
  tableContent += '<table class="table-show-result-table">'
  for (let i = -1; i < machNum; i++) {
    tableContent += '<tr>'
    for (let j = -1; j < alphaNum; j++) {
      if (i === -1 && j === -1) {
        tableContent += '<td>Ma\\&alpha;</td>'
      }
      if (i === -1 && j !== -1) {
        tableContent += '<td>' + resEntities.alpha[j] + '</td>'
      }
      if (i !== -1 && j === -1) {
        tableContent += '<td>' + resEntities.mach[i] + '</td>'
      }
      if (i !== -1 && j !== -1) {
        tableContent += '<td>' + resEntities[resultParaName][i][j] + '</td>'
      }
    }
    tableContent += '</tr>'
  }
  tableContent += '</table>'

  document.getElementById('show-result-wrapper').insertAdjacentHTML('beforeend', tableContent)
}

function showDataChart(name) {
  console.log('showDataChart')
  let dataId = 'div-id-show-' + name + '-chart'
  let chartDiv = '<div id=\"' + dataId + '\" class=\"div-class-show-data-chart\"></div>'

  document.getElementById('div-wrapper-show-data-chart').insertAdjacentHTML('beforeend', chartDiv)


  let myChart = charts.init(document.getElementById(dataId))
  let legendArray = []
  let seriesArray = []

  resEntities.mach.forEach(function (item, index, array) {
    let legendItem = item + '马赫'
    legendArray.push(legendItem)
    seriesArray.push({
      name: legendItem,
      type: 'line',
      stack: '总量',
      data: resEntities[name][index]
    })
  })

  let option = {
    title: {
      text: name + '结果图像'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legendArray
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: resEntities.alpha
    },
    yAxis: {
      type: 'value'
    },
    series: seriesArray
  }

  myChart.setOption(option)
}