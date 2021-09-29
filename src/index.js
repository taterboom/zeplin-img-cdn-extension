/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

function layer(context, selectedLayer) {
  const { sourceId, version, assets } = selectedLayer
  if (assets && version.assets) {
    const layerAssetsInfo = version.assets.find((item) => item.layerId === sourceId)
    if (layerAssetsInfo && layerAssetsInfo.contents) {
      const asset = layerAssetsInfo.contents.find((item) => item.densityScale === 3)
      if (asset) {
        return asset.url
      }
    }
  }
}

function screen(context, selectedVersion, selectedScreen) {
  console.log("s", context, selectedVersion, selectedScreen)
}

function component(context, selectedVersion, selectedComponent) {
  console.log("c", context, selectedVersion, selectedComponent)
}

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
