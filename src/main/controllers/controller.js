const fileProcessor = require('../dao/file-processor')

const entityModel = require('../models/entity-model')


let fltcon = '$FLTCON ALT=%%,NALPHA=%%,ALPHA=%%,NMACH=%%,MACH=%%,$'
let refq = '$REFQ XCG=%%,LREF=%%,SREF=%%,$'
let body = '$AXIBOD TNOSE=%%,LNOSE=%%,DNOSE=%%,LCENTER=%%,DCENTER=%%,TAFT=%%,LAFT=%%,DAFT=%%,DEXIT=%%,$'
let other = 'DIM M\nDERIV DEG\nPLOT\nDAMP'

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
  // Delete the file, if success, then append data
  fileProcessor.unlink(path)
}


exports.appendDefaultData = function writeDefaultData(path) {
  console.log('controller: appendDefaultData()')
  fileProcessor.appendFileSync(path, processFltconData(fltcon))
  fileProcessor.appendFileSync(path, '\n' + processRefValue(refq))
  fileProcessor.appendFileSync(path, '\n' + processBodyPara(body))
}


exports.writeCustomData = function writeCustomData(path, data) {
  console.log('controller: writeCustomData.')
  fileProcessor.writeFile(path, data)
}

function setParaValue(vector, paraValue) {
  return vector.replace('%%', paraValue)
}

function getParaArrayLength(paraName) {
  let paraArray = entityModel.getMissileModelValue(paraName)
  if (!paraArray) {
    // If paraArray is undefined, return 0;
    return 0
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
  return res
}

function processBodyPara(input) {
  console.log('controller: processBodyPara.')
  let res = input
  res = setParaValue(res, entityModel.getMissileModelValue('type-warhead'))
  res = setParaValue(res, entityModel.getMissileModelValue('length-warhead'))
  res = setParaValue(res, entityModel.getMissileModelValue('diameter-warhead'))

  res = setParaValue(res, entityModel.getMissileModelValue('length-column'))
  res = setParaValue(res, entityModel.getMissileModelValue('diameter-column'))

  res = setParaValue(res, entityModel.getMissileModelValue('type-stern'))
  res = setParaValue(res, entityModel.getMissileModelValue('length-stern'))
  res = setParaValue(res, entityModel.getMissileModelValue('diameter-tail'))
  res = setParaValue(res, entityModel.getMissileModelValue('diameter-nozzle'))

  return res
}

function processRefValue(input) {
  console.log('controller: processRefValue.')
  let res = input
  res = setParaValue(res, entityModel.getMissileModelValue('barycenter-ref'))
  res = setParaValue(res, entityModel.getMissileModelValue('length-ref'))
  res = setParaValue(res, entityModel.getMissileModelValue('area-ref'))
  return res
}

