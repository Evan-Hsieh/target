const remote = require('electron').remote
const controller = remote.require('./src/main/controllers/controller')
const path = require('path')
const BASE_PATH = path.join(__dirname, '/../../../')

let resEntities = []

document.getElementById('button-calculate-model').addEventListener('click', function (event) {
  console.log('click calculation button')
  clickCalcultion()
})
document.getElementById('button-draw-result').addEventListener('click', function (event) {
  console.log('click draw button')
  clickVisualize()
})


function clickCalcultion() {
  // let inputFilePath = BASE_PATH + 'bin/t.txt'
  // writeData(inputFilePath)
  // calculate()

  let outputFilePath = BASE_PATH + 'bin/for006.dat'
  readData(outputFilePath)

  document.getElementById('show-result-wrapper').innerHTML = ''
  showDataTable('cn')
  // showDataTable('cm')
  // showDataTable('ca')
  // showDataTable('cy')
  // showDataTable('cl')
  // showDataTable('cd')
}

function calculate() {
  // call tool.exe
}

function clickVisualize() {
  console.log('calculation-presenter:' + 'vasualize')
  let outputFilePath = BASE_PATH + 'bin/for006.dat'
  readData(outputFilePath)
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

  document.getElementById('show-result-wrapper').insertAdjacentHTML('beforeend',tableContent)
}