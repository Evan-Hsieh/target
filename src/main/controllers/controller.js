const fileProcessor = require('../dao/file-processor')

const entityModel = require('../models/entity-model')

const calculation = require('../calculation/calculation')


let fltcon = '$FLTCON ALT=%%,NALPHA=%%,ALPHA=%%,NMACH=%%,MACH=%%,$'
let refq = '$REFQ XCG=%%,LREF=%%,SREF=%%,$'
let body = '$AXIBOD TNOSE=%%,LNOSE=%%,DNOSE=%%,LCENTER=%%,DCENTER=%%,TAFT=%%,LAFT=%%,DAFT=%%,DEXIT=%%,$'
let wing = '$FINSET%% SECTYP=%%,XLE=%%,NPANEL=%%,PHIF=%%,STA=%%,SWEEP=%%,CHORD=%%,SSPAN=%%,$'
let other = 'DIM M\nDERIV DEG\nPLOT\nDAMP'

exports.readFile = function readFile(path) {
  console.log('controller: readFile.')
  console.log('path:' + path)
  let dataContent = fileProcessor.readFileSync(path)
  //console.log('dataContent:' + dataContent )
  let resEntities = calculation.processFileResult(dataContent)
  if(resEntities !== null) {
    return resEntities
  }
  //console.log('readFile resEntities:' + resEntities.cl[0])
}




function appendDefaultData(path) {
  console.log('controller: appendDefaultData()')
  fileProcessor.appendFileSync(path, processFltconData(fltcon))
  fileProcessor.appendFileSync(path, '\n' + processRefValue(refq))
  fileProcessor.appendFileSync(path, '\n' + processBodyPara(body))
  processWingPara(path, wing)
  fileProcessor.appendFileSync(path, '\n' + other)
}

exports.writeDefaultData = function writeDefaultData(path) {
  console.log('controller: writeDefaultData()')
  // Delete the file, if success, then append data
  fileProcessor.unlinkSync(path)
  console.log('unlink successfully')
  appendDefaultData(path)
}


exports.writeCustomData = function writeCustomData(path, data) {
  console.log('controller: writeCustomData.')
  fileProcessor.writeFile(path, data)
}

exports.execFile = function execFile(filePath) {
  console.log('controller: execFile(). The filePath:' + filePath)
  fileProcessor.execFile(filePath)
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


function processWingPara(path, input) {
  console.log('controller: processWingPara.')
  let res = input
  //let numWingGroup = entityModel.getMissileModelValue('num-group-wings')
  let numWingGroup = 1
  let positionWing = [entityModel.getMissileModelValue('pos-wings')]
  // If the confirm button doesn't been clicked, this para maybe undefined
  if (typeof positionWing[0] === 'undefined') {
    console.log('controller:processWingPara undefined')
    return
  }
  if (positionWing[0].indexOf(',') !== -1) {
    positionWing = positionWing[0].split(',')
    numWingGroup = positionWing.length
  }

  for (let i = 0; i < numWingGroup; i++) {
    res = setParaValue(res, (i + 1))
    res = setParaValue(res, entityModel.getMissileModelValue('type-wings-profile'))
    res = setParaValue(res, positionWing[i])

    let layoutAngleWings = entityModel.getMissileModelValue('layout-angle-wings')
    let numPanel = 1
    if (layoutAngleWings.indexOf(',') !== -1) {
      numPanel = layoutAngleWings.split(',').length
    }
    res = setParaValue(res, numPanel)
    res = setParaValue(res, layoutAngleWings)

    res = setParaValue(res, entityModel.getMissileModelValue(entityModel.sweepBackType))
    res = setParaValue(res, entityModel.getMissileModelValue(entityModel.sweepBack))

    let chordValue = entityModel.getMissileModelValue(entityModel.lengthRootChord) + ',' + entityModel.getMissileModelValue(entityModel.lengthTipChord)
    res = setParaValue(res, chordValue)
    let sspanValue = entityModel.getMissileModelValue(entityModel.distanceRootChord) + ',' + entityModel.getMissileModelValue(entityModel.distanceTipChord)
    res = setParaValue(res, sspanValue)

    // Append content in file
    fileProcessor.appendFileSync(path, '\n' + res)
    res = input
  }
}

