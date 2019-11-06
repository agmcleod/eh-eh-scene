import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'common/store'
import { Main } from './core/Main'

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

window.ipcRenderer.on('save-requested', (ev, filePath) => {
  const { components } = store.getState()
  window.ipcRenderer.send('save-data', {
    data: JSON.stringify({ components }),
    filePath
  })
})
