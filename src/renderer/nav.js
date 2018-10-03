const electron = require('electron')
//const settings = require('electron-settings')
const defaultClickButtonIdList = [
  'button-set-body-para',
  'button-calc-models'
]


// Callback methods *************
electron.ipcRenderer.on('click-menu-item', function(event, message){
  console.log('receive message : ' + message )
  switch(message){
    case 'set-para':
      document.getElementById('button-set-body-para').click()
      break
    case 'check-para':
      document.getElementById('button-check-para').click()
      break
    case 'calc-models':
      document.getElementById('button-calc-models').click()
      break
    case 'visualize-result':
      document.getElementById('button-visualize-result').click()
      break
    default:
      break
  }
  //document.getElementById("tempDiv").innerHTML = "hello"
})

// Listeners of document elements **************
document.body.addEventListener('click', function (event) {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
})

// Functions *********************

function clickNavButton(buttonID){
  let navButton = document.getElementById(buttonID)
  if (navButton){
    navButton.click()
  }else{
    for(let alternativeButtonId of defaultClickButtonIdList){
      let alternativeButton = document.getElementById(alternativeButtonId)
      if(alternativeButton){
        alternativeButton.click()
        break
      }
    }
  }

}



function handleSectionTrigger (event) {
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
    // When click the item of aside navigator,
    // the 'is-selected' will be added in the class of tag
  event.target.classList.add('is-selected')

  // Display the current section
  const sectionId = event.target.dataset.section + '-section'
  document.getElementById(sectionId).classList.add('is-shown')

  // Save currently active button in localStorage
  const buttonId = event.target.getAttribute('id')
  console.log('button click:' + buttonId)
  settings.set('activeSectionButtonId', buttonId)
}

// Default section that will be open
function activateDefaultSection () {
  document.getElementById('button-set-body-para').click()
}

function showMainContent () {
  document.querySelector('.js-nav').classList.add('is-shown')
  document.querySelector('.js-content').classList.add('is-shown')
}

function handleModalTrigger (event) {
  hideAllModals()
  const modalId = event.target.dataset.modal + '-modal'
  document.getElementById(modalId).classList.add('is-shown')
}

function hideAllModals () {
  const modals = document.querySelectorAll('.modal.is-shown')
  Array.prototype.forEach.call(modals, function (modal) {
    modal.classList.remove('is-shown')
  })
  showMainContent()
}

function hideAllSectionsAndDeselectButtons () {
  const sections = document.querySelectorAll('.js-section.is-shown')
  Array.prototype.forEach.call(sections, function (section) {
    section.classList.remove('is-shown')
  })

  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('is-selected')
  })
}

// about
function displayAbout () {
  document.querySelector('#about-modal').classList.add('is-shown')
}

// ********************
// Script Sentences:
// These scripts will be executed
// when every html page use <script> to load this js file
// ********************
// // Default to the view that was active the last time the app was open
// const buttonClicked = settings.get('activeSectionButtonId')
// if (buttonClicked) {
//   showMainContent()
//   clickNavButton(buttonClicked)
// } else {
  activateDefaultSection()
  //display about.html
  displayAbout()
//}

