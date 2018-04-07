const remote = require('electron').remote
const controller = remote.require('./src/main/controllers/controller')
const path = require('path')
const BASE_PATH = path.join(__dirname, '/../../../')


document.getElementById('button-calculate-model').addEventListener('click', function (event) {
  console.log('click calculation button')
  calculate()
})

function calculate() {
  let inputFilePath = BASE_PATH + 'bin/t.txt'
  //readData(inputFilePath)
  writeData(inputFilePath)
}

function readData(path) {
  console.log('calculation presenter: readData()')
  controller.readFile(path)
}


function writeData(path, data) {
  console.log('calculation presenter: writeData()')
  if(arguments.length === 1) {
    controller.writeDefaultData(path)
  }
  if(arguments.length === 2) {
    controller.writeCustomData(path, data)
  }
}
