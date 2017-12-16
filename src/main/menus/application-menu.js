const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

const windowManager = require('../../shared/window-manager')



let template = [{
  label: '文件',
  submenu: [{
    label: '新建工程',
    accelerator: 'CmdOrCtrl+N'
  }, {
    label: '打开工程',
    accelerator: 'CmdOrCtrl+O'
  }, {
    label: '保存工程',
    accelerator: 'CmdOrCtrl+S'
  }, {
    type: 'separator'
  }, {
    label: '退出程序',
    accelerator: 'CmdOrCtrl+Q',
    role: 'quit'
  }]
}, {
  label: '编辑',
  submenu: [{
    label: '撤销',
    role: 'undo'
  }, {
    label: '重做',
    role: 'redo'
  }, {
    label: '重载',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // 重载之后, 刷新并关闭所有的次要窗体
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: '切换开发者工具',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: '应用程序菜单演示',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: '应用程序菜单演示',
          buttons: ['好的'],
          message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {
        })
      }
    }
  }]
}, {
  label: '建立模型',
  submenu: [{
    label: '输入参数',
    click: function () {
      console.log("Log: application-menu.js: click nav button of setting parameter")
      let parameterWindow = windowManager.getWindow('ParametersWindow')
      if(parameterWindow === null){
        parameterWindow = windowManager.createWindow('ParametersWindow', true)
      }
      parameterWindow.webContents.send('click-menu-item', 'set-para')
    }
  }, {
    label: '查看参数',
    click: function () {
      console.log("Log: application-menu.js: click nav button of checking parameter")
      let parameterWindow = windowManager.getWindow('ParametersWindow')
      if(parameterWindow === null){
        parameterWindow = windowManager.createWindow('ParametersWindow', true)
      }
      parameterWindow.webContents.send('click-menu-item', 'check-para')
    }
  }]
}, {
  label: '计算绘图',
  submenu: [{
    label: '模型计算',
    click: function () {
      console.log("模型计算")
      let calculationWindow = windowManager.getWindow('CalculationWindow')
      if(calculationWindow === null){
        calculationWindow = windowManager.createWindow('CalculationWindow', true)
      }
      calculationWindow.webContents.send('click-menu-item', 'calc-model')
    }
  }, {
    label: '绘制图形',
    click: function () {
      console.log("绘制图形")
      let calculationWindow = windowManager.getWindow('CalculationWindow')
      if(calculationWindow === null){
        calculationWindow = windowManager.createWindow('CalculationWindow', true)
      }
      calculationWindow.webContents.send('click-menu-item', 'visualize-result')
    }
  }]
}, {
  label: '窗口',
  submenu: [{
    label: '最小化窗口',
    role: 'minimize'
  }, {
    label: '切换全屏',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: '关闭当前窗口',
    role: 'close'
  }]
}, {
  label: '帮助',
  submenu: [{
    label: '查看帮助',
    click: function () {
      console.log("查看帮助")
    }
  }]
}, {
  label: '关于',
  submenu: [{
    label: '软件信息',
    role: 'about'
  }, {
    label: '版权信息',
    click: function () {
      console.log("版权信息")
      console.log('参数窗口的ID是'+ windowManager.getWindow('ParametersWindow').id)
      console.log('计算窗口的ID是'+ windowManager.getWindow('CalculationWindow').id)


    }
  }]
}
]


function addUpdateMenuItems(items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: '正在检查更新',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: '检查更新',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: '重启并安装更新',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `关于 ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: `隐藏 ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隐藏其它',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: '显示全部',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: '退出',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // 窗口菜单.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: '前置所有',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  console.log('menu')
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
