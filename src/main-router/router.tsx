import type { MenuProps } from 'antd'

import { RouteObject, Navigate } from 'react-router-dom'

import newCharts from './router.newCharts'
import rmstRender from './router.rmstRender'
import konva from './router.konva'
import oldCharts from './router.oldCharts'
import other from './router.other'

export type IRouteObject = RouteObject & {
  uiConfig?: { hidden?: boolean; title?: string; icon?: any }
  children?: IRouteObject[]
}

export const routes: IRouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/new-charts/line/base" replace={true} />,
    uiConfig: { hidden: true }
  },
  newCharts,
  rmstRender,
  konva,
  oldCharts,
  other
]

export const convertToAntdData = (
  array: IRouteObject[],
  recur: boolean,
  parentKey = ''
): MenuProps['items'] => {
  return array
    .filter(item => !item.uiConfig?.hidden)
    .map(item => {
      const key = item.path.startsWith('/') ? item.path : `${parentKey}/${item.path}`

      return Object.assign(
        { label: item.uiConfig?.title || item.path, key },
        recur && item.children && { children: convertToAntdData(item.children, recur, key) }
      )
    })
}

export function findPath(routeObject: IRouteObject) {
  let path = ''

  const dfs = routeObject => {
    if (routeObject.path.startsWith('/')) {
      path += routeObject.path
    } else {
      path += '/' + routeObject.path
    }

    if (routeObject.children) {
      dfs(routeObject.children[0])
    }
  }

  dfs(routeObject)

  return path
}

function joinPath(...args) {
  return args.map(item => item.replace(/(^\/)|(\/$)/g, '')).join('/')
}
