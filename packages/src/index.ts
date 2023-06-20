import fs from 'fs'
import path from 'path'
import {createCanvas, Image} from 'canvas'

let root

interface Config {
  iconPath?: string // icon图片位置，默认/src/assets/icon
  savePath?: string // 生成样式图片保存位置，默认/src/assets/icon
  width?: number // 合并生成的图片宽度，单位px，默认 500
  spacing?: number //两张图片间的间距，默认 5
  prefix?: string // 生成css类名前缀，默认 icon-
}

interface imgList {
  path: string
  width: number
  height: number
  image: Image
  x?: number
  y?: number
}

// 根据参数路径返回相对路径
const getRelativePath = (cPath, filed) => {
  const fullPath = path.join(root, cPath, filed)
  return path.relative(root, fullPath)
}
const imgSprites = (config: Config) => {
  const {
    iconPath = "/src/assets/icon",
  } = config
  const fullPath = path.join(root, iconPath)
  fs.readdir(fullPath, (err, paths) => {
    if (err) {
      throw err
    }
    // 提取jpg和png两种格式，同时排除sprites.png，确保当生成图片保存在同一目录时sprites.png再次被引用
    const pathsFilter = paths.filter((item: string) => {
      return (item.endsWith('.jpg') || item.endsWith('.png')) && item !== 'sprites.png'
    })
    const length = pathsFilter.length
    let index = 0
    const tempArray: any[] = []
    pathsFilter.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        tempArray.push({
          path: src,
          width: img.width,
          height: img.height,
          image: img
        })
        index++
        if (index === length) {
          writeFile(tempArray, config)
        }
      }
      img.src = getRelativePath(iconPath, src)// 不支持带有中文名称*/
    })
  })
}
const writeFile = (imgArray, config: Config) => {
  const {
    savePath = "/src/assets/icon",
    width = 500,
    spacing = 5,
    prefix = "icon-"
  } = config
  // 对tempArray排序，将高度差不多的放一行，减少行与行的间距
  imgArray.sort((a, b) => {
    if (a.height < b.height) {
      return -1
    }
    if (a.height > b.height) {
      return 1
    }
    return 0
  })
  let usedWidth = 0 // 当前列已使用宽度，换行时要回0
  let usedHeight = 0 // 当前使用高度
  let maxHeight = 0 // 当前行最大高度，换行时要回0
  imgArray.forEach((item) => {
    // 计算每张图片的坐标位置点
    if (item.width + usedWidth + spacing > width) {
      // 要换行
      usedHeight += maxHeight + spacing
      usedWidth = 0
      maxHeight = 0
      // 如果xy没有时才重写
      item.x = item.x || 0
    } else {
      item.x = item.x || usedWidth
    }
    if (item.height > maxHeight) {
      maxHeight = item.height
    }
    item.y = item.y || usedHeight
    usedWidth += item.width + spacing
  })
  const canvasHeight = usedHeight + maxHeight // 生成图片的高度
  // 将图片写进canvas
  const canvas = createCanvas(width, canvasHeight)
  const ctx = canvas.getContext('2d')
  //
  const imgSavePath = getRelativePath(savePath, 'sprites.png')
  let cssTemp = `[class*="${prefix}"]:before{content:"";background-image: url(./sprites.png); display:flex;align-items: center}\n`
  imgArray.forEach((item: imgList) => {
    ctx.drawImage(item.image, item.x, item.y, item.width, item.height)
    const clsName = item.path.substring(0, item.path.indexOf('.'))
    const x = item.x ? `-${item.x}px` : 0
    const y = item.y ? `-${item.y}px` : 0
    cssTemp += `.${
      prefix + clsName
    }:before{background-position: ${x} ${y};width: ${item.width}px;height: ${
      item.height
    }px}\n`
  })
  // 创建css文件
  const cssSavePath = getRelativePath(savePath, 'sprites.css')
  fs.writeFile(`${cssSavePath}`, cssTemp, function (err) {
    if (err) throw err
    // 绿色
    console.log(`成功写入css文件:${cssSavePath}`)
  })
  // 创建图片文件
  const out = fs.createWriteStream(imgSavePath)
  const stream = canvas.createPNGStream()
  stream.pipe(out)
  out.on('finish', () => console.log(`成功合并图片:${imgSavePath}`))
}
const sprites = (config: Config) => {
  return {
    name: 'vitePluginSprites',
    enforce: 'pre',
    configResolved(cfg) {
      //console.log('cfg', cfg.root)
      root = cfg.root
    },
    buildStart() {
      //console.log('buildStart')
      imgSprites(config)
    },
    load() {
     // console.log('load')
    }
  }
}
export default sprites
