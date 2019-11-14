import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { H1 } from 'common/components/Header'
import { ELECTRON_EVENTS } from 'common/constants'
import { renderMap } from 'common/renderMap'
import { parseMapData } from 'common/parseMapData'
import { TabPanel } from 'common/components/TabPanel'
import { Components } from './Components'

export const Main = ({ setTmxFilePath }) => {
  const canvas = React.createRef()

  const [currentTab, setTab] = useState(0)

  useEffect(() => {
    const listener = (ev, tmxPath, mapData, images) => {
      parseMapData(mapData, images, (err, mapData, tilesetImage) => {
        if (err) {
          console.error(err)
        } else {
          setTmxFilePath(tmxPath)
          const canvas = document.querySelector('#canvas')
          canvas.width = mapData.width * mapData.tileWidth
          canvas.height = mapData.height * mapData.tileHeight

          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ccc'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          tilesetImage.onload = () => renderMap(ctx, mapData, tilesetImage)
        }
      })
    }

    window.ipcRenderer.on(ELECTRON_EVENTS.import_map_success, listener)

    return () =>
      window.ipcRenderer.removeListener(
        ELECTRON_EVENTS.import_map_success,
        listener
      )
  }, [setTmxFilePath])

  return (
    <Container>
      <H1>Level</H1>
      <div>
        <label htmlFor='file'>Select .tmx file</label>
        <Button
          variant='contained'
          component='span'
          onClick={() => window.ipcRenderer.send(ELECTRON_EVENTS.import_map)}
        >
          Select
        </Button>
      </div>
      <Tabs
        value={currentTab}
        indicatorColor='primary'
        textColor='primary'
        centered
        onChange={(_, newValue) => setTab(newValue)}
      >
        <Tab label='scene' />
        <Tab label='entity definitions' />
        <Tab label='components' />
      </Tabs>
      <TabPanel index={0} value={currentTab}>
        <canvas id='canvas' ref={canvas} />
      </TabPanel>
      <TabPanel index={1} value={currentTab} />
      <TabPanel index={2} value={currentTab}>
        <Components />
      </TabPanel>
    </Container>
  )
}

Main.propTypes = {
  setTmxFilePath: PropTypes.func.isRequired
}
