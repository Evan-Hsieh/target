const path = require('path')
const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray

let appIcon = null

ipc.on('put-in-tray', function (event) {
  const iconName = process.platform === 'win32' ? 'set-para-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: '移除',
    click: function () {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('在托盘中的 Electron 示例.')
  appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function () {
  appIcon.destroy()
})

app.on('window-all-closed', function () {
  if (appIcon) appIcon.destroy()
})