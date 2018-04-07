const fileProcessor = require('../dao/file-processor')

const entityModel = require('../models/entity-model')


let fltcon = '$FLTCON ALT=%%,NALPHA=%%,ALPHA=%%,NMACH=%%,MACH=%%,$'
let refq = '$REFQ XCG=%%,LREF=%%,SREF=%%,$'

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


exports.writeDefaultData = function writeDefaultData(path) {
  console.log('controller: writeDefaultData()')
  fileProcessor.writeFile(path, processFltconData(fltcon))
  fileProcessor.appendFile(path, '\n'+processRefValue(refq))
}

exports.writeCustomData = function writeCustomData(path,data) {
  console.log('controller: writeCustomData.')
  fileProcessor.writeFile(path, data)
}

function setParaValue(vector, paraValue) {
  return vector.replace('%%', paraValue)
}

function getParaArrayLength(paraName){
  let paraArray = entityModel.getMissileModelValue(paraName)
  if(!paraArray) {
    // If paraArray is undefined, return 0;
    return 0;
  }
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
  console.log('fltcon:' + res)
  return res
}

function processRefValue(input){
  console.log('controller: processRefValue.')
  let res = input
  res = setParaValue(res, entityModel.getMissileModelValue('barycenter-ref'))
  res = setParaValue(res, entityModel.getMissileModelValue('length-ref'))
  res = setParaValue(res, entityModel.getMissileModelValue('area-ref'))
  console.log('refq:' + res)
  return res
}