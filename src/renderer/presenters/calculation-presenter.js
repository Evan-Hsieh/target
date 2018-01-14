const remote = require('electron').remote
const controller = remote.require('./src/main/controllers/controller')
const path = require('path')
const BASE_PATH = path.join(__dirname, '/../../../')


document.getElementById('button-calculate-model').addEventListener('click', function (event) {
  console.log('click calculation button')
  calculate();
})

function calculate() {
  let inputFilePath = BASE_PATH + 'bin/t.txt'
  readFile(inputFilePath)
}

function readFile(path) {
  console.log('calculation presenter: readFile()')
  controller.readFile(path)
}
