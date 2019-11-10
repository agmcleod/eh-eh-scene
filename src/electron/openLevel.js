const path = require('path')
const fs = require('fs')
const { dialog } = require('electron')

const { ELECTRON_EVENTS } = require('../common/constants')
const { loadMap } = require('./importMap')

module.exports.openLevel = async mainWindow => {
  const target = await dialog.showOpenDialog(mainWindow, {
    filters: [
      {
        name: 'JSON Files',
        extensions: ['json']
      }
    ]
  })

  if (!target.canceled) {
    const levelFilePath = target.filePaths[0]
    fs.readFile(levelFilePath, 'utf8', (err, mapData) => {
      if (err) {
        dialog.showErrorBox('Failed to open level file', err.message)
      } else {
        const data = JSON.parse(mapData)
        mainWindow.webContents.send(ELECTRON_EVENTS.open_level, data)
        loadMap(
          path.resolve(levelFilePath, data.mapData.tmxFilePath),
          (tmxPath, mapData, imageData) => {
            mainWindow.webContents.send(
              ELECTRON_EVENTS.import_map_success,
              tmxPath,
              mapData,
              imageData
            )
          }
        )
      }
    })
  }
}
