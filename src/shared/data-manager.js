const remote = require('electron').remote
const entityModel  = remote.require('./src/main/models/entity-model')
const submitButtons = document.querySelectorAll('.submit-button')

Array.prototype.forEach.call(submitButtons, function (submitBtn) {
  submitBtn.addEventListener('click', function(event){
    let btnId = event.target.id
    let idArray = btnId.split('-')
    let sectionId = 'set-' + idArray[2] + '-' + idArray[3] + '-section'
    collectData(sectionId)
  })
})

function collectData(sectionId){
  let selectElement = '#' + sectionId +' .input-para'

  //console.log(selectElement)
  let inputFrames = document.querySelectorAll(selectElement)
  Array.prototype.forEach.call(inputFrames, function (inputFrame) {
    let inputFrameId = inputFrame.id
    let paraName = inputFrameId.substr(6)
    //console.log('para name:' + paraName)
    //console.log('input value:' + inputFrame.value)
    //mMissileModel[paraName] = inputFrame.value
    entityModel.setMissileModelValue(paraName, inputFrame.value)
  })
  //remote.require('./src/main/models/entity-model').setMissileModel(mMissileModel)
  //remote.setMainMissileModel(mMissileModel)
}




