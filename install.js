const path = require('path')
const os = require('os')

// 执行文件的存放目录
const EXEC_FILE_STORE_PATH = path.resolve(__dirname, './.exec')
// 下载文件的 host
const DOWNLOAD_HOST = 'https://assets.tuchuang.space'

let downloadUrl
let platformSupport = true

const VERSION = '0.2.0'

if (os.platform() === 'darwin') {
  downloadUrl = `${DOWNLOAD_HOST}/copy-logo-to-clipboard-${VERSION}-mac.zip`
} else if (os.platform() === 'win32') {
  downloadUrl = `${DOWNLOAD_HOST}/copy-logo-to-clipboard-${VERSION}-win32.zip`
} else {
  console.error(`不支持的平台, ${os.platform()}`)
  platformSupport = false
}

const download = require('download')

const downloadExecFile = async () => {
  await new Promise((resolve, reject) => {
    const dulpex = download(downloadUrl, EXEC_FILE_STORE_PATH, {
      extract: true
    })

    dulpex.on('downloadProgress', ({ percent }) => {
      console.log(`下载进度: ${percent * 100}%`)
      if (percent === 100) {
        resolve()
      }
    })
  })
}

if (platformSupport) {
  downloadExecFile()
}
