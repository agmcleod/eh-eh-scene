const { app } = require('electron')

const { openLevel } = require('./openLevel')

const isMac = process.platform === 'darwin'

module.exports.createMenuTemplate = (window, options) => [
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
    submenu: [
      { label: 'New', click: () => window.webContents.send('new-project') },
      { label: 'Open', click: () => openLevel(window) },
      { label: 'Save' },
      {
        label: 'Save As',
        click: options.saveAs
      },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    role: 'editMenu'
  }
]
