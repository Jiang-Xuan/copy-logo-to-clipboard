const { platform } = require('os')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const promisifyExec = promisify(exec)

const execPath = path.resolve(__dirname, './.exec')

module.exports = {
  logoMd5Hash: '3c7185dd08b19791c4141f089616952f',
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
