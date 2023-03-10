import LayoutView from '../LayoutView/LayoutView'

import LineDemo from '../demo/old-charts/LineDemo'
import BarDemo from '../demo/old-charts/BarDemo'
import PieDemo from '../demo/old-charts/PieDemo'
import ArcAnimate from '../demo/old-charts/ArcAnimate'
import CandleTask from '../demo/old-charts/CandleTask'

export default {
  path: '/old-charts',
  element: <LayoutView />,
  uiConfig: { title: 'old-charts' },
  children: [
    { path: 'line', element: <LineDemo /> },
    { path: 'bar', element: <BarDemo /> },
    { path: 'pie', element: <PieDemo /> },
    { path: 'arcAnimate', element: <ArcAnimate /> },
    { path: 'K线图', element: <CandleTask /> }
  ]
}
