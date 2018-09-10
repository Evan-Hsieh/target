const remote = require('electron').remote
const controller = remote.require('./src/main/controllers/controller')
const path = require('path')
const BASE_PATH = path.join(__dirname, '/../../../')
const charts = require('echarts')

let resEntities
let dataNameList = []
let isInitDataNameList = false

document.getElementById('button-calculate-model').addEventListener('click', function (event) {
  console.log('click calculation button')
  initDataNameList()
  clickCalcultion()
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

function clickCalcultion() {
  // let inputFilePath = BASE_PATH + 'bin/t.txt'
  // writeData(inputFilePath)
  // calculate()

  let outputFilePath = BASE_PATH + 'bin/for006.dat'
  readData(outputFilePath)

  document.getElementById('show-result-wrapper').innerHTML = ''
  dataNameList.forEach(function (name, index, array) {
    showDataTable(name)
  })
}

function clickVisualize() {
  console.log('calculation-presenter: clickVisualize')
  // check if the data ready
  if (resEntities == null) {
    console.log('the data is not ready, so read it first')
    let outputFilePath = BASE_PATH + 'bin/for006.dat'
    readData(outputFilePath)
  }

  // dataNameList.forEach(function (name, index, array) {
  //   showDataChart(name)
  // })
  showDataChart()
}

function calculate() {
  // call tool.exe
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

function showDataChart() {


// 基于准备好的dom，初始化echarts实例
  var myChart = charts.init(document.getElementById('div-show-data-chart'));

  console.log('showDataChart')
// 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  });
}