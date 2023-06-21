import spriteImage from './image'

interface Config {
  iconPath?: string // icon图片位置，默认/src/assets/icon
  savePath?: string // 生成样式图片保存位置，默认/src/assets/icon
  width?: number // 合并生成的图片宽度，单位px，默认 500
  spacing?: number //两张图片间的间距，默认 5
  prefix?: string // 生成css类名前缀，默认 icon-
  root?: string
}

const sprites = (config: Config) => {
  return {
    name: 'vitePluginSprites',
    enforce: 'pre',
    configResolved(cfg: any) {
      config.root = cfg.root
    },
    buildStart() {
      spriteImage(config)
    }
  }
}
sprites.images = spriteImage
export default sprites


