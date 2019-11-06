const electron = require('electron')
// Module to control application life.
const { app, dialog, ipcMain } = electron
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const fs = require('fs')
const url = require('url')

const { createMenuTemplate } = require('./electron/createMenuTemplate')

let mainWindow
let workingFile

const saveAs = async () => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: workingFile
    })
    if (!result.cancelled) {
      mainWindow.webContents.send('save-requested', result.filePath)
    }
  } catch (e) {
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Error Saving Project',
      message: e.message,
      detail: e.stack
    })
  }
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/electron/preload.js'
    }
  })

  electron.Menu.setApplicationMenu(
    electron.Menu.buildFromTemplate(createMenuTemplate(mainWindow, { saveAs }))
  )

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    })

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('save-data', async (event, args) => {
    fs.writeFile(args.filePath, args.data, err => {
      if (err) {
        dialog.showErrorBox('Failed to save file', err.message)
      }
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
