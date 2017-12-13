const path = require('path')
const glob = require('glob')
const electron = require('electron')
const autoUpdater = require('./auto-updater')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

const debug = /--debug/.test(process.argv[2])
const basePath = path.join('file://', __dirname)

const windowManager = require('./src/shared/window-manager')
if (process.mas) app.setName('Electron APIs')

let mainWindow = null


let windowOptions = {
  width: 1080,
  minWidth: 680,
  height: 840,
  title: app.getName()
}

function initialize() {
  let shouldQuit = makeSingleInstance()
  if (shouldQuit) return app.quit()

  loadDemos()

  app.on('ready', function () {
    console.log('main')
    windowManager.createWindow('ParametersWindow',windowOptions,path.join(basePath,'/sections/para-page/para-page.html'),debug)

    autoUpdater.initialize()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (mainWindow === null) {
      windowManager.createWindow('ParameterWindow',windowOptions,path.join(basePath,'/sections/para-page/para-page.html'),debug)
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
function makeSingleInstance() {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadDemos() {
  let files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
  autoUpdater.updateMenu()
}

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
  case '--squirrel-install':
    autoUpdater.createShortcut(function () {
      app.quit()
    })
    break
  case '--squirrel-uninstall':
    autoUpdater.removeShortcut(function () {
      app.quit()
    })
    break
  case '--squirrel-obsolete':
  case '--squirrel-updated':
    app.quit()
    break
  default:
    console.log('target/main.js')
    console.log('process id is ' + process.pid)
    initialize()
}
