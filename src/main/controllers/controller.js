const fileProcessor = require('../dao/file-processor')

const entityModel = require('../models/entity-model')


let fltcon = '$FLTCON $ALT=%%,NALPHA=%%,ALPHA=%%,NMACH=%%,MACH=%%,$'


exports.readFile = function readFile(path) {
  fileProcessor.readFile(path)
  console.log('controller: readFile()')
  let value = entityModel.getMissileModelValue('length-warhead')
  console.log(value)
  let em = entityModel.getMissileModel()
  if (em.has('length-warhead')) {
    console.log('val:' + em.get('length-warhead'))
  }
}


exports.writeFile = function writeFile(path, inputData) {
  console.log('controller: writeFile()')
  let data = inputData
  if (arguments.length === 1) {
    data = processFltconData(fltcon)
  }
  fileProcessor.writeFile(path, data)
}

function setParaValue(vector, paraValue) {
  return vector.replace('%%', paraValue)
}

function getParaArrayLength(paraName){
  let paraArray = entityModel.getMissileModelValue(paraName)
  let paraArrayLength = 1
  if (paraArray.indexOf(',') !== -1) {
    paraArrayLength = paraArray.split(',').length
  }
  return paraArrayLength
}


function processFltconData(input) {
  console.log('controller: processFltconData.')
  let res = input
  res = setParaValue(res, entityModel.getMissileModelValue('height-flight'))
  res = setParaValue(res, getParaArrayLength('mach-flight'))
  res = setParaValue(res, entityModel.getMissileModelValue('mach-flight'))
  res = setParaValue(res, getParaArrayLength('angle-flight'))
  res = setParaValue(res, entityModel.getMissileModelValue('angle-flight'))
  return res
}