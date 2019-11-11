const { app } = require('electron')

const { openLevel } = require('./openLevel')

const isMac = process.platform === 'darwin'

module.exports.createMenuTemplate = (window, options) => {
  const fileMenu = [
    {
      label: 'New',
      click: () => window.webContents.send('new-project')
    },
    {
      label: 'Open',
      click: () => openLevel(window),
      accelerator: 'CmdOrCtrl+O'
    },
    { label: 'Save' },
    {
      label: 'Save As',
      click: options.saveAs
    },
    isMac ? { role: 'close' } : { role: 'quit' }
  ]

  if (process.env.NODE_ENV !== 'production') {
    fileMenu.push({ role: 'toggleDevTools', label: 'Dev Tools' })
  }

  return [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { role: 'hide' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }
        ]
      : []),
    {
      label: 'File',
      submenu: fileMenu
    },
    {
      label: 'Edit',
      role: 'editMenu'
    }
  ]
}
