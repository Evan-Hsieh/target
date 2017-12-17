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
    console.log('input value:' + inputFrame.id)
    console.log('input value:' + inputFrame.value)
  })
}


