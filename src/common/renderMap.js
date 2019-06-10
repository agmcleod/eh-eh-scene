export const renderMap = (ctx, mapData, image) => {
  console.log(image)
  const { firstgid, margin, spacing, tileWidth, tileHeight } = mapData.tileset

  const tilesWide = ~~(image.width / (tileWidth + spacing))
  const tilesHigh = ~~(image.height / (tileHeight + spacing))
  for (const layer of mapData.layers) {
    for (let i = 0; i < layer.data.length; i++) {
      const cell = layer.data[i]
      if (cell !== 0) {
        const x = (i % mapData.width) * tileWidth
        const y = ~~(i / mapData.width) * tileHeight

        const tileX = ~~((cell - firstgid) % tilesWide)
        const tileY = ~~((cell - firstgid) / tilesHigh)
        const sx = tileX * tileWidth + margin + margin * tileX
        const sy = tileY * tileHeight + margin + margin * tileY

        if (sx > 60) {
          console.log({ tileX, tileWidth, tilesWide, cell, firstgid })
        }

        ctx.drawImage(
          image,
          sx,
          sy,
          tileWidth,
          tileHeight,
          x,
          y,
          tileWidth,
          tileHeight
        )
      }
    }
  }
}
