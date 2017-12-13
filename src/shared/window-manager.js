const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
let windowList = new Map()
let mainWindow = null

exports.createWindow = function createWindow(windowName, windowOptions, windowUrl, debug) {

  if (process.platform === 'linux') {
    windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL(windowUrl)

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    //require('devtron').install()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  windowList.set(windowName, mainWindow)
  return mainWindow
}

// if value of windowList doesn't exit, return 'undefined'
exports.getWindow = function(windowName){
  if(windowList.has(windowName)){
    return windowList.get(windowName)
  }else{
    return null
  }
}

