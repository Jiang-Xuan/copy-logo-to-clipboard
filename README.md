# copy tuchuang.space logo to system clipboard

复制 tuchuang.space 的 logo 进入系统剪切板

文件 logo.png 的 md5 hash 值为 `MD5 (logo.png) = 3c7185dd08b19791c4141f089616952f`

该项目是做 https://github.com/Jiang-Xuan/tuchuang.space/issues/36 的 e2e 测试的辅助工具

## Usage

```js
import { copyLogoToClip, logoMd5Hash } from 'copy-logo-to-clipboard/index'

describe('上传图片交互', () => {
  it('ctrl + v 可以正常粘贴图片', async () => {
    await copyLogoToClip()
    await ctrlvOnPage()
    const uploadImage = await getImage()
    expect(md5(uploadImage)).toEqual(logoMd5Hash)
  })
})
```

## test

暂时没有找到一个合适的和 electron 配合的测试框架, 所以使用了 nodejs 的 assert 断言. test 目录是一个 npm 包, `npm run test` 会执行 `electron test`, 然后在 electron 的环境中执行 `test/index.test.js` 文件, 如果进程没有错误退出, 则测试成功, 如果进程错误退出, 则测试失败.

## Notes

electron-builder 生成的 zip 文件有问题, 无法被 download 正常解压, 所以手动压缩生成的 app, exe 文件, **Macos 下压缩 electron-builder 生成的 mac 目录**
