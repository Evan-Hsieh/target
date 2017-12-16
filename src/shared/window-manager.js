const electron = require('electron')
const app = electron.app
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const BASE_PATH = path.join('file://', __dirname, '/../../')
let windowList = new Map()
let windowOptions = null
let windowUrl = null
let debug = true

exports.createWindow = function createWindow(windowName) {
  setWindowInfo(windowName)
  onCreateWindow(windowName, windowOptions, windowUrl, debug)
}

// if value of windowList doesn't exit, return 'undefined'
exports.getWindow = function(windowName){
  if(windowList.has(windowName)){
    return windowList.get(windowName)
  }else{
    return null
  }
}


let defaultWindowOptions = {
  width: 1080,
  minWidth: 680,
  height: 840,
  title: app.getName()
}

function setWindowInfo(windowName){
  switch(windowName){
    case 'ParametersWindow':
      windowOptions = defaultWindowOptions
      windowUrl = path.join(BASE_PATH,'/sections/para-page/para-page.html')
      break
    default:
      windowOptions = defaultWindowOptions
      windowUrl = path.join(BASE_PATH,'/sections/para-page/para-page.html')
      debug = false
      break
  }

}

function onCreateWindow(windowName, windowOptions, windowUrl, debug){

  // if (process.platform === 'linux') {
  //   windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
  // }

  let newWindow = new BrowserWindow(windowOptions)
  newWindow.loadURL(windowUrl)

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    newWindow.webContents.openDevTools()
    newWindow.maximize()
    //require('devtron').install()
  }

  newWindow.on('closed', function () {
    newWindow = null
  })

  windowList.set(windowName, newWindow)
}

