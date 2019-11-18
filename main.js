// Modules to control application life and create native browser window
const { app, clipboard, nativeImage } = require('electron')
const path = require('path')

const fooImage = nativeImage.createFromPath(path.resolve(__dirname, './logo.png'))

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  console.log('ready')
  clipboard.writeImage(fooImage)
  console.log(clipboard.readImage())

  app.quit()
})
