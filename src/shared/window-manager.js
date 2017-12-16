const electron = require('electron')
const app = electron.app
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const BASE_PATH = path.join('file://', __dirname, '/../../')
let windowList = new Map()
let windowOptions = null
let windowUrl = null
let debug = true
let mainWindow = null
let mainWindowName

exports.createWindow = function createWindow(windowName, isReload=false) {
  setWindowInfo(windowName)
  // Reload or create Window
  if(isReload && windowList.size>0){
    // Delete the origin window stored in windowList
    windowList.delete(mainWindowName)
    // Reload window
    mainWindow.loadURL(windowUrl)
    mainWindowName = windowName
    windowList.set(windowName, mainWindow)
  }else{
    // Create new window
    onCreateWindow(windowName, windowOptions, windowUrl, debug)
  }
  return windowList.get(windowName)
}

// if value of windowList doesn't exit, return 'undefined'
exports.getWindow = function(windowName){
  if(windowList.has(windowName)){
    return windowList.get(windowName)
  }else{
    return null
  }
}

exports.setMainWindow = function(windowName){
  mainWindowName = windowName
  mainWindow = windowList.get(mainWindowName)
}

exports.getMainWindow = function(){
  if(mainWindow !== null && typeof(mainWindow)!=='undefined')
  return mainWindow
}

exports.refreshWindow = function(){

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
    case 'CalculationWindow':
      windowOptions = defaultWindowOptions
      windowUrl = path.join(BASE_PATH,'/sections/calculation-page/calculation-page.html')
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

