/**
 * @description 由于没有找到合适的 electron 和一些测试框架的组成, 所以这里使用了 nodejs 提供的 assert 断言框架
 * 如果后续找到了好的框架, 重构这一部分测试
 */

const path = require('path')
const { clipboard } = require('electron')
const assert = require('assert')
const md5 = require('md5')
const jimp = require('jimp')
const { copyLogoToClip, getLogoBitmap } = require('../index')

const run = async () => {
  const result = await copyLogoToClip()
  console.log(result)

  const logoJimp = await jimp.read(path.resolve(__dirname, '../logo.png'))

  const imagePngFromClipboard = clipboard.readImage().toPNG()

  const imagePngFromClipboardJimp = await jimp.read(imagePngFromClipboard)

  assert.ok(md5(logoJimp.bitmap.data) === md5(imagePngFromClipboardJimp.bitmap.data), '写入 clipboard 的图片的 bitmap 和读取的图片的 bitmap 一致')

  const moduleExportBitmap = await getLogoBitmap()
  assert.ok(
    md5(logoJimp.bitmap.data) === md5(moduleExportBitmap),
    '模块暴露出正确的 logoBitmap'
  )

  console.log('\n✅ 写入 clipboard 的图片的 bitmap 和读取的图片的 bitmap 一致. \n\n✅ 模块暴露出正确的 logoBitmap')
  process.exit(0)
}

process.addListener('unhandledRejection', (reason, promise) => {
  console.error(reason, promise)
  process.exit(1)
})

run()
