const remote = require('electron').remote
const {dialog} = require('electron').remote
const entityModel = remote.require('./src/main/models/entity-model')
const utils = require('../../shared/utils')
const submitButtons = document.querySelectorAll('.submit-button')
const checkParaTable = document.getElementById('check-para-table')
let pModel = entityModel.getPredefineModel()


// Initialize the table of showing data
pModel.forEach(function (value, index, thisArray) {
  let trNode = document.createElement('tr')
  let trId = document.createAttribute('id')
  trId.nodeValue = 'tr-' + value['para-item-id']
  trNode.setAttributeNode(trId)

  let tdName = createElement('td', false, '', false, '', true, value['para-item-name'])
  let tdValue = createElement('td', false, '', false, '', false, '')
  let vUnits = value['para-item-units']
  if (vUnits === 'undefined') {
    vUnits = ''
  }
  let tdUnits = createElement('td', false, '', false, '', true, vUnits)
  let tdRemarks = createElement('td', false, '', false, '', false, '')
  trNode.appendChild(tdName)
  trNode.appendChild(tdValue)
  trNode.appendChild(tdUnits)
  trNode.appendChild(tdRemarks)

  checkParaTable.appendChild(trNode)
})


function createElement(eleLabel, isSetId, eleId, isSetName, eleName, isSetText, eleText) {
  let cLabel = document.createElement(eleLabel)
  if (isSetId) {
    let cId = document.createAttribute('id')
    cId.nodeValue = eleId
    cLabel.setAttributeNode(cId)
  }
  if (isSetName) {
    let cName = document.createAttribute('name')
    cName.nodeValue = eleName
    cLabel.setAttributeNode(cName)
  }
  if (isSetText) {
    let cText = document.createTextNode(eleText)
    cLabel.appendChild(cText)
  }
  return cLabel
}


// Bind submit buttons click event for collect data
Array.prototype.forEach.call(submitButtons, function (submitBtn) {
  submitBtn.addEventListener('click', function (event) {
    let btnId = event.target.id
    let idArray = btnId.split('-')
    let sectionId = 'set-' + idArray[2] + '-' + idArray[3] + '-section'
    collectData(sectionId)
  })
})

// Collect data from the input of set-para page
function collectData(sectionId) {
  let selectElement = '#' + sectionId + ' .input-para'
  let inputFrames = document.querySelectorAll(selectElement)
  for (let inputFrame of inputFrames) {
    let inputFrameId = inputFrame.id
    // Get the parameter name from the id of input frame.
    // Because the id has the prefix 'input-', the substring begin at index 6
    let paraName = inputFrameId.substr(6)
    let inputValue = removeLastComma(inputFrame.value)
    //check input
    if (!checkInput(paraName, inputValue)) {
      console.log('The input is invalidated')
      return
    }
    //set input
    entityModel.setMissileModelValue(paraName, inputValue)

    // Set the table value of check-para page
    let trTableId = 'tr-' + paraName
    if (paraName === (entityModel.sweepBack)) {
      let inputSweepBackType = document.querySelector('#' + entityModel.inputTag + entityModel.sweepBackType)
      if (inputSweepBackType.value === '0.') {
        trTableId = 'tr-' + entityModel.angleFrontEdge
      } else {
        trTableId = 'tr-' + entityModel.angleRearEdge
      }
      entityModel.setMissileModelValue(entityModel.sweepBackType, inputSweepBackType.value)
      entityModel.setMissileModelValue(entityModel.sweepBack, inputValue)
    }

    document.getElementById(trTableId).children[1].innerHTML = transferParaValueForShow(inputValue)
  }
  //remote.require('./src/main/models/entity-model').setMissileModel(mMissileModel)
  //remote.setMainMissileModel(mMissileModel)
}

function removeLastComma(inputStr) {
  if (inputStr.lastIndexOf(',') === inputStr.length - 1) {
    inputStr = inputStr.substr(0, inputStr.length - 1)
  }
  return inputStr
}


function transferParaValueForShow(value) {
  switch (value) {
    case 'CONE':
      return '锥形'
    case 'OGIVE':
      return '弧形'
    case 'KARMAN':
      return '卡门'
    case 'HEX':
      return '六边形'
    default:
      return value
  }

}

function checkInput(paraName, inputValue) {
  if (paraName === entityModel.fsValueRef || paraName === entityModel.numGroupWings || paraName === entityModel.typeWingsProfile
    || paraName === entityModel.typeWarhead || paraName === entityModel.typeStern) {
    return true
  }
  if (utils.testSpaceLine(inputValue)) {
    dialog.showErrorBox('输入参数异常', '输入参数为空。')
    return false
  } else if (paraName === entityModel.machFlight || paraName === entityModel.angleFlight || paraName === entityModel.posWings || paraName === entityModel.layoutAngleWings) {
    if (!utils.testNumberArray(inputValue)) {
      console.log(paraName + '数组异常值：' + inputValue)
      dialog.showErrorBox('输入参数异常', '输入参数格式不正确，输入参数为整数或小数，部分参数如：弹翼位置、布局、马赫数与攻角支持输入数组，每个数以英文逗号作为分隔。')
      return false
    }
  } else {
    if (!utils.testNumber(inputValue)) {
      console.log(paraName + '数字异常值：' + inputValue)
      dialog.showErrorBox('输入参数异常', '输入参数格式不正确，输入参数为整数或小数，部分参数如：弹翼位置、布局、马赫数与攻角支持输入数组，每个数以英文逗号作为分隔。')
      return false
    }
  }
  return true
}






