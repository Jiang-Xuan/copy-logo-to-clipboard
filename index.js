const { platform } = require('os')
const { exec } = require('child_process')
const { promisify } = require('util')

const promisifyExec = promisify(exec)

module.exports = {
  logoMd5Hash: '3c7185dd08b19791c4141f089616952f',
  copyLogoToClip: () => {
    if (platform() === 'win32') {
      return promisifyExec(
        'cd ./build/copy-logo-to-clipboard-win32-64 && ./copy-logo-to-clipboard-win32-64.exe'
      )
    } else if (platform() === 'darwin') {
      return promisifyExec(
        'cd ./build/copy-logo-to-clipboard-darwin-x64/copy-logo-to-clipboard.app/Contents/MacOS && ./copy-logo-to-clipboard'
      )
    } else {
      throw new Error('only support win32, darwin')
    }
  }
}
