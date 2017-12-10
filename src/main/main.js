// Basic parameters
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const path = require('path')

var projectPath = path.join(__dirname, '/../..')
var mainWindow = null

const debug = /--debug/.test(process.argv[2])

//if (process.mas) app.setName('Electron APIs')
app.setName("Missile Expert System")

// Entrance of executing command
switch (process.argv[1]) {
    default:
        initialize()
}


function initialize () {
  var shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()

  app.on('ready', function () {
    createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}


function createWindow () {
    var windowOptions = {
        width: 1080,
        minWidth: 680,
        height: 840,
        title: app.getName()
    }

    mainWindow = new BrowserWindow(windowOptions)
    //mainWindow.loadURL("https://baidu.com")
    mainWindow.loadURL(path.join("file://", projectPath, '/app/pages/index.html'))

    // Launch full screen with DevTools open, usage: npm run debug
    if (debug) {
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
        require('devtron').install()
    }

    mainWindow.show()
    //mainWindow.once('ready-to-show', () => {
    //   mainWindow.show()
    //})

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


