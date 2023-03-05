import LayoutView from '../LayoutView/LayoutView'

import RenderDemo from '../demo/render/BaseDemo'
import GroupDraggable from '../demo/render/GroupDraggable'
import Animate from '../demo/render/Animate'
import Draggable from '../demo/render/Draggable'

export default {
  path: '/rmst-render',
  element: <LayoutView />,
  uiConfig: { title: 'render(主要)' },
  children: [
    {
      path: 'render-base',
      element: <RenderDemo />,
      uiConfig: { title: '基础图形' }
    },
    {
      path: 'render-draggable',
      element: <Draggable />,
      uiConfig: { title: 'draggable' }
    },
    {
      path: 'render-group',
      element: <GroupDraggable />,
      uiConfig: { title: '成组 draggable' }
    },
    {
      path: 'render-animate',
      element: <Animate />,
      uiConfig: { title: 'Animate' }
    }
  ]
}
