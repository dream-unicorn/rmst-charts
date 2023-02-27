import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import LayoutView from '../LayoutView/LayoutView'

import LineDemo from '../demo/old-charts/LineDemo'
import BarDemo from '../demo/old-charts/BarDemo'
import PieDemo from '../demo/old-charts/PieDemo'
import ArcAnimate from '../demo/old-charts/ArcAnimate'
import CandleTask from '../demo/old-charts/CandleTask'

import RenderDemo from '../demo/render/BaseDemo'
import GroupDemo from '../demo/render/GroupDemo'

import Pie from '../demo/new-charts/Pie'
import Line from '../demo/new-charts/Line'

import KonvaBase from '../demo/konva/KonvaBase'
import Plum from '../demo/other/Plum'
import Animate from '../demo/render/Animate'

export type IRouteObject = RouteObject & {
  uiConfig?: { hidden?: boolean; title?: string; icon?: any }
  children?: IRouteObject[]
}

export const routes: IRouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/new-charts/line" replace={true} />,
    uiConfig: { hidden: true }
  },
  {
    path: '/new-charts',
    element: <LayoutView />,
    uiConfig: { title: 'new-charts' },
    children: [
      { path: 'line', element: <Line /> },
      { path: 'pie', element: <Pie /> }
    ]
  },

  {
    path: '/rmst-render',
    element: <LayoutView />,
    uiConfig: { title: 'render' },
    children: [
      {
        path: 'render-base',
        element: <RenderDemo />,
        uiConfig: { title: '基础图形' }
      },
      {
        path: 'render-group',
        element: <GroupDemo />,
        uiConfig: { title: '成组' }
      },

      {
        path: 'render-animate',
        element: <Animate />,
        uiConfig: { title: 'Animate' }
      }
    ]
  },
  {
    path: '/konva',
    element: <LayoutView />,
    uiConfig: { title: 'konva' },
    children: [
      {
        path: 'konva-base',
        element: <KonvaBase />,
        uiConfig: { title: 'konva-体验' }
      }
    ]
  },
  {
    path: '/old-charts',
    element: <LayoutView />,
    uiConfig: { title: 'old-charts' },
    children: [
      { path: 'old-line', element: <LineDemo /> },
      { path: 'old-bar', element: <BarDemo /> },
      { path: 'old-pie', element: <PieDemo /> },
      { path: 'old-arcAnimate', element: <ArcAnimate /> },
      { path: 'old-K线图', element: <CandleTask /> }
    ]
  },
  {
    path: '/other',
    element: <LayoutView />,
    uiConfig: { title: '杂项' },
    children: [{ path: 'plum', element: <Plum /> }]
  }
]
