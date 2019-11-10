const electron = require('electron')
const xmljs = require('xml-js')
const path = require('path')
const fs = require('fs')
const url = require('url')

// Module to control application life.
const { app, dialog, ipcMain } = electron
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const { createMenuTemplate } = require('./electron/createMenuTemplate')

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

  ipcMain.on(ELECTRON_EVENTS.save_data, async (event, args) => {
    fs.writeFile(args.filePath, args.data, err => {
      if (err) {
        dialog.showErrorBox('Failed to save file', err.message)
      }
    })
  })

  ipcMain.on(ELECTRON_EVENTS.import_map, async event => {
    const target = await dialog.showOpenDialog(mainWindow, {
      filters: [
        {
          name: 'Tiled Map',
          extensions: ['tmx']
        }
      ]
    })

    if (!target.canceled) {
      fs.readFile(target.filePaths[0], 'utf8', (err, mapData) => {
        if (err) {
          dialog.showErrorBox('Failed to opne tmx file', err.message)
        } else {
          const tmx = xmljs.xml2js(mapData)
          const map = tmx.elements.find(el => el.name === 'map')
          const tileset = map.elements.find(el => el.name === 'tileset')
          const images = tileset.elements.filter(el => el.name === 'image')
          const imageData = []
          for (const image of images) {
            const imagePath = path.join(
              path.dirname(target.filePaths[0]),
              image.attributes.source
            )
            fs.readFile(imagePath, (err, data) => {
              if (err) {
                dialog.showErrorBox('Failed to opne tmx file', err.message)
              } else {
                const extname = path.extname(imagePath).replace('.', '')
                imageData.push({
                  data: `data:image/${extname};base64,${Buffer.from(
                    data
                  ).toString('base64')}`,
                  name: image.attributes.source
                })
                if (imageData.length === images.length) {
                  event.reply(
                    ELECTRON_EVENTS.import_map_success,
                    mapData,
                    imageData
                  )
                }
              }
            })
          }
        }
      })
    }
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
