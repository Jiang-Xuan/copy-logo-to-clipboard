const path = require('path')
const os = require('os')

// 执行文件的存放目录
const EXEC_FILE_STORE_PATH = path.resolve(__dirname, './.exec')
// 下载文件的 host
const DOWNLOAD_HOST = 'https://assets.tuchuang.space'

let downloadUrl

if (os.platform() === 'darwin') {
  downloadUrl = `${DOWNLOAD_HOST}/copy-logo-to-clipboard-1.0.0-mac.zip`
} else if (os.platform() === 'win32') {
  downloadUrl = `${DOWNLOAD_HOST}/copy-logo-to-clipboard-1.0.0-win32.zip`
} else {
  throw Error(`不支持的平台, ${os.platform()}`)
}

const download = require('download')

const downloadExecFile = async () => {
  const dulpex = download(downloadUrl, EXEC_FILE_STORE_PATH)

  dulpex.on('downloadProgress', ({ percent }) => {
    console.log(`下载进度: ${percent * 100}%`)
  })
}

downloadExecFile()
