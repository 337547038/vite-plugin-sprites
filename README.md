# vite-plugin-sprites

一款基于NodeJs的图片合成Vite插件，可将多张小图合并成一张大图并生成对应的css样式，可有效减少服务器接收和发送请求，提高页面加载速度。支持 Vue、React等所有框架

## 示例

https://337547038.github.io/vite-plugin-sprites/

## 安装使用

安装依赖

```shell
npm install vite-plugin-sprites -D
# or
pnpm install vite-plugin-sprites -D
# or
yarn install vite-plugin-sprites -D
```

## 使用配置

```ts
// vite.config.ts
import { defineConfig } from 'vite' 
import sprites from 'vite-plugin-sprites'

export default defineConfig({
  plugins: [
    sprites({
      //　所有参数为可选
      iconPath: '/src/assets/icon', // icon图片位置，默认/src/assets/icon
      savePath: '/src/assets/icon', // 生成的图片样式存放目录，默认/src/assets/icon（插件不会创建目录，需确保存放路径存在）
      width: 500, // 合并生成的图片宽度，单位px，默认 500
      spacing: 5, //两张图片间的间距，默认 5
      prefix: 'icon-' // 生成css类名前缀，默认 icon-
    })
  ]
})
```

## 引入样式

在页面适当位置引入生成的样式，如

```ts
import './assets/icon/sprites.css'
```

## 在页面中使用

```html
<div>
  <i class="icon-down"></i>
</div>
```
