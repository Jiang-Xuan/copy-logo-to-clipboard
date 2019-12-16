/* eslint-env jest */

const path = require('path')
const { clipboard } = require('electron')
const assert = require('assert')
const md5 = require('md5')
const jimp = require('jimp')
const { copyLogoToClip } = require('../index')

const run = async () => {
  const result = await copyLogoToClip()
  console.log(result)

  const logoJimp = await jimp.read(path.resolve(__dirname, '../logo.png'))

  const imagePngFromClipboard = clipboard.readImage().toPNG()

  const imagePngFromClipboardJimp = await jimp.read(imagePngFromClipboard)

  assert.ok(md5(logoJimp.bitmap.data) === md5(imagePngFromClipboardJimp.bitmap.data), '写入 clipboard 的图片的 bitmap 和读取的图片的 bitmap 一致')

  process.exit(0)
}

process.addListener('unhandledRejection', (reason, promise) => {
  console.error(reason, promise)
  process.exit(1)
})

run()
