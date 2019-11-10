export const parseMapData = (xml, images, callback) => {
  if (xml) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    const map = xmlDoc.getElementsByTagName('map')[0]

    // assuming one tileset for a given level
    const tileset = map.getElementsByTagName('tileset')[0]

    const tilesetImage = new Image()
    tilesetImage.src = images[0].data
    const layers = map.getElementsByTagName('layer')

    const layerData = []

    for (const layer of layers) {
      layerData.push({
        id: parseInt(layer.getAttribute('id'), 10),
        name: layer.getAttribute('name'),
        width: parseInt(layer.getAttribute('width'), 10),
        height: parseInt(layer.getAttribute('height'), 10),
        data: layer
          .getElementsByTagName('data')[0]
          .textContent.replace('\n', '')
          .split(',')
          .map(v => parseInt(v, 10))
      })
    }

    const mapData = {
      width: parseInt(map.getAttribute('width'), 10),
      height: parseInt(map.getAttribute('height'), 10),
      tileWidth: parseInt(map.getAttribute('tilewidth'), 10),
      tileHeight: parseInt(map.getAttribute('tileheight'), 10),
      tileset: {
        firstgid: parseInt(tileset.getAttribute('firstgid'), 10),
        name: tileset.getAttribute('name'),
        tileWidth: parseInt(tileset.getAttribute('tilewidth'), 10),
        tileHeight: parseInt(tileset.getAttribute('tileheight'), 10),
        spacing: parseInt(tileset.getAttribute('spacing'), 10),
        margin: parseInt(tileset.getAttribute('margin'), 10),
        tilecount: parseInt(tileset.getAttribute('tilecount'), 10),
        columns: parseInt(tileset.getAttribute('columns'), 10)
      },
      layers: layerData
    }

    callback(null, mapData, tilesetImage)
  }
}
