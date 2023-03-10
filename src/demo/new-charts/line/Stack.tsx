import { useEffect, useRef } from 'react'
import rmstCharts, { IChartInstance } from '../../../rmst-charts-new'

const option = {
  xAxis: {
    data: ['a', 'b', 'c', 'd', 'e', 'f']
  },
  series: [
    {
      type: 'line' as const,
      data: [620, 932, 901, 934, 800, 800]
      // smooth: true
    },
    {
      type: 'line' as const,
      data: [100, 200, 400, 500, 150, 423]
      // smooth: true
    }
  ]
}

const Stack = () => {
  const insRef = useRef<IChartInstance>()
  useEffect(() => {
    const ins = rmstCharts.init(document.querySelector('.canvas-container'))
    insRef.current = ins

    ins.setOption(option)
  }, [])

  const setOption = () => {
    insRef.current.setOption(option)
  }

  return (
    <>
      <button onClick={setOption}>setOption</button>
      <hr />
      <div className="canvas-container"></div>
    </>
  )
}

export default Stack
