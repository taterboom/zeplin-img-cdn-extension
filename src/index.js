/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

function layer(context, selectedLayer) {
  const { sourceId, version, assets } = selectedLayer
  const ext = context.getOption("ext")
  const useOptimized = context.getOption("optimize")
  const scale = parseInt(context.getOption("scale"))
  if (assets && version.assets) {
    const layerAssetsInfo = version.assets.find((item) => item.layerId === sourceId)
    if (layerAssetsInfo && layerAssetsInfo.contents) {
      const asset = layerAssetsInfo.contents.find((item) => {
        return item.densityScale === scale && item.format === ext
      })
      let originalUrl
      let optimizedUrl
      /**
       * 实际发现客户端和网页版存在两种数据结构:
       * web: {url, format, densityScale, optimized: { url, format, densityScale, originalURL, status }}
       * client: {url, format, densityScale} | {url, format, densityScale, originalURL, status}
       * 看出来网页版的数据结构中 原始图片和压缩图片的数据是在一个对象中
       * 客户端的数据结构将两者摊平
       */
      for (let i = 0; i < layerAssetsInfo.contents.length; i++) {
        const item = layerAssetsInfo.contents[i]
        if (item.densityScale === scale && item.format === ext) {
          if (typeof item.optimized === "object") {
            originalUrl = item.url
            optimizedUrl = item.optimized.url
          } else if (item.originalURL !== undefined) {
            originalUrl = item.originalURL
            optimizedUrl = item.url
          }
        }
      }
      if (useOptimized && optimizedUrl) {
        return optimizedUrl
      }
      if (originalUrl) {
        return originalUrl
      }
    }
  }
}

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function colors(context) {}

function textStyles(context) {}

function spacing(context) {}

function exportColors(context) {}

function exportTextStyles(context) {}

function exportSpacing(context) {}

/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */

function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

function comment(context, text) {}

export default {
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment,
}
