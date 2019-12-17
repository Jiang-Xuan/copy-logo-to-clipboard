const { platform } = require('os')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')
const jimp = require('jimp')

const promisifyExec = promisify(exec)

const execPath = path.resolve(__dirname, './.exec')

module.exports = {
  getLogoBitmap: async () => {
    const logoJimp = await jimp.read(path.resolve(__dirname, './logo.png'))

    return logoJimp.bitmap.data
  },
  copyLogoToClip: async () => {
    if (platform() === 'win32') {
      return promisifyExec(
        `cd ${execPath} && cd .\\win-unpacked && .\\copy-logo-to-clipboard.exe`
      )
    } else if (platform() === 'darwin') {
      return promisifyExec(
        `cd ${execPath} && cd ./mac/copy-logo-to-clipboard.app/Contents/MacOS && ./copy-logo-to-clipboard`
      )
    } else {
      throw new Error('only support win32, darwin')
    }
  }
}
