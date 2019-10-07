import React from 'react'

import { Col } from 'common/components/Col'
import { Row } from 'common/components/Row'
import { renderMap } from 'common/renderMap'

function submit(e, fileField) {
  e.preventDefault()

  const tmxReader = new FileReader()

  const images = []
  let tmxFile = ''

  for (const file of fileField.current.files) {
    const { name, type } = file
    if (/\.tmx$/.test(name)) {
      tmxFile = file
    } else if (/^image/.test(type)) {
      images.push(file)
    } else {
      console.log('unrecognized file', file)
    }
  }

  if (tmxFile) {
    tmxReader.readAsText(tmxFile)
    tmxReader.onload = f => {
      const xml = f.target.result
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, 'text/xml')
      const map = xmlDoc.getElementsByTagName('map')[0]

      // assuming one tileset for a given level
      const tileset = map.getElementsByTagName('tileset')[0]
      const imageTag = tileset.getElementsByTagName('image')[0]
      const imageFile = images.find(
        image => image.name === imageTag.getAttribute('source')
      )
      if (!imageFile) {
        alert(
          `Tileset ${imageTag.getAttribute(
            'source'
          )} not found in uploaded files`
        )

        return
      }

      const imageReader = new FileReader()
      imageReader.readAsDataURL(imageFile)
      const tilesetImage = new Image()
      imageReader.onload = f => {
        tilesetImage.src = f.target.result
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

        const canvas = document.querySelector('#canvas')
        canvas.width = mapData.width * mapData.tileWidth
        canvas.height = mapData.height * mapData.tileHeight

        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ccc'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        tilesetImage.onload = () => renderMap(ctx, mapData, tilesetImage)
      }

      imageReader.onerror = e => console.error(e)
    }
  }
}

function App() {
  const fileField = React.createRef()
  const canvas = React.createRef()

  return (
    <div className='App'>
      <h1>Level</h1>
      <Row>
        <Col>
          <label htmlFor='file'>
            Select .tmx & corresponding tileset images
          </label>
          <input id='file' type='file' ref={fileField} multiple />
        </Col>

        <input type='button' onClick={e => submit(e, fileField)} value='Load' />
      </Row>
      <canvas id='canvas' ref={canvas} />
    </div>
  )
}

export default App
