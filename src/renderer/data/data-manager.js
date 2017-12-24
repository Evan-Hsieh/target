const remote = require('electron').remote
const entityModel  = remote.require('./src/main/models/entity-model')
const submitButtons = document.querySelectorAll('.submit-button')

// Bind submit buttons click event for collect data
Array.prototype.forEach.call(submitButtons, function (submitBtn) {
  submitBtn.addEventListener('click', function(event){
    let btnId = event.target.id
    let idArray = btnId.split('-')
    let sectionId = 'set-' + idArray[2] + '-' + idArray[3] + '-section'
    collectData(sectionId)
  })
})

// Collect data from the input of set-para page
function collectData(sectionId){
  let selectElement = '#' + sectionId +' .input-para'
  let inputFrames = document.querySelectorAll(selectElement)
  Array.prototype.forEach.call(inputFrames, function (inputFrame) {
    let inputFrameId = inputFrame.id
    // Get the parameter name from the id of input frame.
    // Because the id has the prefix 'input-', the substring begin at index 6
    let paraName = inputFrameId.substr(6)
    //console.log('para name:' + paraName)
    //console.log('input value:' + inputFrame.value)
    //mMissileModel[paraName] = inputFrame.value
    entityModel.setMissileModelValue(paraName, inputFrame.value)
  })
  //remote.require('./src/main/models/entity-model').setMissileModel(mMissileModel)
  //remote.setMainMissileModel(mMissileModel)
}

// Initialize the table of showing data
const checkParaTable = document.getElementById('check-para-table')
let pModel = entityModel.getPredefineModel()
pModel.forEach(function (value,index,thisArray) {
  let trNode = document.createElement('tr')
  let trId = document.createAttribute('id')
  trId.nodeValue = value['para-item-id']
  trNode.setAttributeNode(trId)

  let tdName = createElement('td',false,'',false,'',true,value['para-item-name'])
  let tdValue = createElement('td',false,'',false,'',false,'')
  let vUnits = value['para-item-units']
  if (vUnits === 'undefined') {
    vUnits = ''
  }
  let tdUnits = createElement('td',false,'',false,'',true,vUnits)
  let tdRemarks = createElement('td',false,'',false,'',false,'')
  trNode.appendChild(tdName)
  trNode.appendChild(tdValue)
  trNode.appendChild(tdUnits)
  trNode.appendChild(tdRemarks)

  checkParaTable.appendChild(trNode)
})


function createElement(eleLabel, isSetId, eleId, isSetName, eleName, isSetText, eleText){
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





