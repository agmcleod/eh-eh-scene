import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { renderMap } from 'common/renderMap'
import { parseMapData } from 'common/parseMapData'
import { FileInput } from './styledComponents'

export const Main = () => {
  const fileField = React.createRef()
  const canvas = React.createRef()

  return (
    <Container>
      <h1>Level</h1>
      <div>
        <label htmlFor='file'>Select .tmx & corresponding tileset images</label>
        <FileInput
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
        <label htmlFor='file'>
          <Button variant='contained' component='span'>
            Upload
          </Button>
        </label>
      </div>
      <canvas id='canvas' ref={canvas} />
    </Container>
  )
}
