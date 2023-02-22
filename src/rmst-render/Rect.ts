import Path from './Path'

export default class Rect extends Path {
  constructor(data: Rect['data']) {
    super()

    this.data = data
  }

  declare data: { x: number; y: number; width: number; height: number; bgColor: string; [key: string]: any }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, bgColor } = this.data

    ctx.fillStyle = bgColor
    ctx.fillRect(x, y, width, height)
  }

  isInner(offsetX: number, offsetY: number) {
    const isInnerRect =
      offsetX >= this.data.x &&
      offsetX <= this.data.x + this.data.width &&
      offsetY >= this.data.y &&
      offsetY <= this.data.y + this.data.height

    return isInnerRect
  }
}