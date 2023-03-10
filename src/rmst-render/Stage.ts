import Circle from './Circle'
import Line from './Line'
import Path from './Path'
import Rect from './Rect'

type IGraph = Circle | Rect | Path | Line

type IOption = {
  container: HTMLElement
}

export const stageConstant = {
  _id: 0,
  r: 0,
  g: 0,
  b: 0
}

export type IExtraData = ReturnType<typeof createExtraData>
export function createExtraData() {
  stageConstant.r += 100

  return {
    _id: ++stageConstant._id,
    rgb: `rgb(${[stageConstant.r, stageConstant.g, stageConstant.b].toString()})`
  }
}

declare global {
  interface CanvasRenderingContext2D {
    isCtx2?: boolean
  }
}

export class Stage {
  constructor(option: IOption) {
    const { container } = option
    const stage = initStage(container)

    this.canvasElement = stage.canvasElement
    this.ctx = stage.ctx

    const canvas2 = createCanvas(container.offsetWidth, container.offsetHeight)
    this.canvasElement2 = canvas2.canvasElement
    this.ctx2 = canvas2.ctx

    this.ctx2.isCtx2 = true

    this.addStageEventListener()
  }

  canvasElement: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  canvasElement2: HTMLCanvasElement
  ctx2: CanvasRenderingContext2D

  parent: null
  elements: IGraph[] = []

  get center() {
    return { x: this.canvasElement.offsetWidth / 2, y: this.canvasElement.offsetHeight / 2 }
  }

  removeAllElements() {
    this.elements = []

    this.renderStage()
  }

  append(element: IGraph | IGraph[]) {
    this.elements = this.elements.concat(element)
    this.elements = this.elements.map(item => Object.assign(item, { parent: this }))

    this.renderStage()
  }

  renderStage() {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.ctx.clearRect(0, 0, this.canvasElement2.width, this.canvasElement2.height)

    this.elements.forEach(elementItem => {
      elementItem.draw(this.ctx)

      elementItem.draw(this.ctx2)
    })
  }

  addStageEventListener() {
    this.canvasElement.onmousemove = evt => {
      this.elements.forEach(elementItem => {
        elementItem.handleMove(evt.offsetX, evt.offsetY)
      })
    }

    this.canvasElement.onmousedown = evt => {
      for (const elementItem of this.elements.slice(0).reverse()) {
        const isInner = elementItem.handleMouseDown(evt.offsetX, evt.offsetY)

        if (isInner) {
          break
        }
      }
    }

    this.canvasElement.onmouseup = evt => {
      for (const elementItem of this.elements.slice(0).reverse()) {
        const isInner = elementItem.handleMouseUp(evt.offsetX, evt.offsetY)

        if (isInner) {
          break
        }
      }
    }

    this.canvasElement.onclick = evt => {
      for (const elementItem of this.elements.slice(0).reverse()) {
        const isInner = elementItem.handleClick(evt.offsetX, evt.offsetY)

        if (isInner) {
          break
        }
      }
    }
  }

  setCursor(cursor: ICursor) {
    this.canvasElement.style.cursor = cursor
  }
}

type ICursor =
  | 'url'
  | 'default'
  | 'auto'
  | 'crosshair'
  | 'pointer'
  | 'move'
  | 'e-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 'n-resize'
  | 'se-resize'
  | 'sw-resize'
  | 's-resize'
  | 'w-resize'
  | 'text'
  | 'wait'
  | 'help'

export const dpr = 1.5 // window.devicePixelRatio
function createCanvas(containerWidth: number, containerHeight: number) {
  const canvasElement = document.createElement('canvas')
  const canvasWidth = containerWidth * dpr
  const canvasHeight = containerHeight * dpr

  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight
  canvasElement.style.width = '100%'
  canvasElement.style.height = '100%'

  const ctx = canvasElement.getContext('2d')

  ctx.scale(dpr, dpr)
  ctx.textBaseline = 'top'
  ctx.font = `${14}px ????????????`

  return { canvasElement, ctx }
}

function initStage(canvasContainer: HTMLElement) {
  const { offsetWidth, offsetHeight } = canvasContainer
  const { canvasElement, ctx } = createCanvas(offsetWidth, offsetHeight)

  canvasContainer.append(canvasElement)

  return { canvasElement, ctx }
}

export default Stage
