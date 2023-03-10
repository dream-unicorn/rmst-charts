import { useEffect, useRef } from 'react'
import Circle from '../../rmst-render/Circle'
import Rect from '../../rmst-render/Rect'
import Stage from '../../rmst-render/Stage'

const Draggable = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Stage>()

  useEffect(() => {
    const stage = new Stage({
      container: canvasRef.current
    })
    stageRef.current = stage

    const rect = new Rect({
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      bgColor: 'blueviolet',
      draggable: true
    })
    const arc = new Circle({
      x: 100,
      y: 100,
      radius: 50,
      bgColor: 'pink',
      draggable: true
    })

    rect.onClick = () => {
      console.log('rect')
    }
    arc.onClick = () => {
      console.log('arc')
    }

    stage.append([rect, arc])
  }, [])

  const addToStage = () => {
    stageRef.current.append(
      new Circle({
        x: 200,
        y: 200,
        radius: 50,
        bgColor: 'cornflowerblue',
        draggable: true
      })
    )
  }

  return (
    <>
      <button onClick={addToStage}>向舞台添加元素</button>
      <div className="canvas-container" ref={canvasRef}></div>
    </>
  )
}

export default Draggable
