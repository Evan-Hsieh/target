const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
let isMacMenuSet = false


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
    },{
        label: '重做',
        role: 'redo'
    },{
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
                electron.dialog.showMessageBox(focusedWindow, options, function () {})
            }
        }
    }]
}, {
    label: '建立模型',
    submenu: [{
        label: '输入参数',
        click: function () {
            console.log("输入参数")
        }
    }, {
        label: '查看参数',
        click: function () {
            console.log("查看参数")
        }
    }]
}, {
    label: '计算绘图',
    submenu: [{
        label: '模型计算',
        click: function () {
            console.log("模型计算")
        }
    }, {
        label: '绘制图形',
        click: function () {
            console.log("绘制图形")
        }
    }]
}, {
    label: '窗口',
    submenu: [{
        label: '最小化窗口',
        role: 'minimize'
    },{
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
        }
    }]
}
]


exports.initMenu = function initMenu(){
    if(process.platform === 'darwin' && !isMacMenuSet){
        setMacMenuTemplate()
        isMacMenuSet = true
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}


function setMacMenuTemplate(){
    var name = app.getName()
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
}

