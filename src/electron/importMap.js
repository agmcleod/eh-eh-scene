const { dialog } = require('electron')
const xmljs = require('xml-js')
const path = require('path')
const fs = require('fs')

const { ELECTRON_EVENTS } = require('../common/constants')

const importMap = mainWindow => async event => {
  const target = await dialog.showOpenDialog(mainWindow, {
    filters: [
      {
        name: 'Tiled Map',
        extensions: ['tmx']
      }
    ]
  })

  if (!target.canceled) {
    const tmxPath = target.filePaths[0]
    loadMap(tmxPath, (tmxPath, mapData, imageData) => {
      event.reply(
        ELECTRON_EVENTS.import_map_success,
        tmxPath,
        mapData,
        imageData
      )
    })
  }
}

const loadMap = (tmxPath, callback) => {
  fs.readFile(tmxPath, 'utf8', (err, mapData) => {
    if (err) {
      dialog.showErrorBox('Failed to open tmx file', err.message)
    } else {
      // we do parse the XML on the client side using DOMParser
      // this is done here so we can pass the image data down to the web client
      const tmx = xmljs.xml2js(mapData)
      const map = tmx.elements.find(el => el.name === 'map')
      const tileset = map.elements.find(el => el.name === 'tileset')
      const images = tileset.elements.filter(el => el.name === 'image')
      const imageData = []
      for (const image of images) {
        const imagePath = path.join(
          path.dirname(tmxPath),
          image.attributes.source
        )
        fs.readFile(imagePath, (err, data) => {
          if (err) {
            dialog.showErrorBox('Failed to open tmx file', err.message)
          } else {
            const extname = path.extname(imagePath).replace('.', '')
            imageData.push({
              data: `data:image/${extname};base64,${Buffer.from(data).toString(
                'base64'
              )}`,
              name: image.attributes.source
            })
            if (imageData.length === images.length) {
              callback(tmxPath, mapData, imageData)
            }
          }
        })
      }
    }
  })
}

module.exports = {
  importMap,
  loadMap
}
