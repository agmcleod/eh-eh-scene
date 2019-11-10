const electron = require('electron')

const path = require('path')
const fs = require('fs')
const url = require('url')

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer')

// Module to control application life.
const { app, dialog, ipcMain } = electron
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const { createMenuTemplate } = require('./electron/createMenuTemplate')
const { importMap } = require('./electron/importMap')

const { ELECTRON_EVENTS } = require('./common/constants')

let mainWindow

const saveAs = async () => {
  try {
    const result = await dialog.showSaveDialog(mainWindow)
    if (!result.cancelled) {
      mainWindow.webContents.send(
        ELECTRON_EVENTS.save_requested,
        result.filePath
      )
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

async function createWindow() {
  try {
    await installExtension(REACT_DEVELOPER_TOOLS)
    await installExtension(REDUX_DEVTOOLS)
  } catch (e) {
    console.error('Error installing extensions', e.message)
  }

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

  ipcMain.on(ELECTRON_EVENTS.save_data, async (event, args) => {
    const data = JSON.parse(args.data)
    data.mapData.tmxFilePath = path.relative(
      args.filePath,
      data.mapData.tmxFilePath
    )
    fs.writeFile(args.filePath, JSON.stringify(data), err => {
      if (err) {
        dialog.showErrorBox('Failed to save file', err.message)
      }
    })
  })

  ipcMain.on(ELECTRON_EVENTS.import_map, importMap(mainWindow))
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
