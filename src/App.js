import React from 'react'
import { Provider } from 'react-redux'

import { ELECTRON_EVENTS } from 'common/constants'
import { store } from 'common/store'
import { hydrate } from 'common/store/actions'
import { Main } from './core/Main'

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

window.ipcRenderer.on(ELECTRON_EVENTS.save_requested, (ev, filePath) => {
  const { components, entityDefinitions, mapData } = store.getState()
  window.ipcRenderer.send(ELECTRON_EVENTS.save_data, {
    data: JSON.stringify({ components, entityDefinitions, mapData }),
    filePath
  })
})

window.ipcRenderer.on(ELECTRON_EVENTS.open_level, (ev, data) => {
  store.dispatch(hydrate(data))
})
