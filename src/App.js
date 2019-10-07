import React from 'react'

import { Col } from 'common/components/Col'
import { Row } from 'common/components/Row'
import { renderMap } from 'common/renderMap'
import { parseMapData } from 'common/parseMapData'

export const App = () => {
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
          <input
            id='file'
            type='file'
            ref={fileField}
            multiple
            onChange={() =>
              parseMapData(fileField, (err, mapData, tilesetImage) => {
                if (err) {
                  console.error(err)
                } else {
                  const canvas = document.querySelector('#canvas')
                  canvas.width = mapData.width * mapData.tileWidth
                  canvas.height = mapData.height * mapData.tileHeight

                  const ctx = canvas.getContext('2d')
                  ctx.fillStyle = '#ccc'
                  ctx.fillRect(0, 0, canvas.width, canvas.height)

                  tilesetImage.onload = () =>
                    renderMap(ctx, mapData, tilesetImage)
                }
              })
            }
          />
        </Col>
      </Row>
      <canvas id='canvas' ref={canvas} />
    </div>
  )
}
