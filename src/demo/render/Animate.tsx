import { useEffect, useRef } from 'react'

import { Circle, Rect, Stage } from '../../rmst-render'

const Animate = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = new Stage({
      container: canvasRef.current
    })

    const arc = new Circle({
      x: 100,
      y: 100,
      radius: 50,
      bgColor: 'pink'
    })

    const sector = new Circle({
      x: 400,
      y: 100,
      startAngle: 0,
      endAngle: 0,
      radius: 50,
      bgColor: 'pink'
    })
    sector.onEnter = () => {
      stage.setCursor('pointer')
    }

    sector.onLeave = () => {
      stage.setCursor('auto')
    }

    const rect = new Rect({
      x: 200,
      y: 50,
      width: 100,
      height: 60,
      bgColor: 'purple'
    })

    stage.append([arc, rect, sector])

    arc.animate({ radius: 100 }).then(() => arc.animate({ radius: 50 }))
    rect.animate({ x: 200 + 100 }).then(() => rect.animate({ x: 200 }))
    sector.animate({ endAngle: 100 })
  }, [])

  return (
    <>
      <div className="canvas-container" ref={canvasRef}></div>
    </>
  )
}

export default Animate
