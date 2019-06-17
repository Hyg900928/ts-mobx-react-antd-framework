// import { hot } from 'react-hot-loader/root';
import React from 'react'
import { observer, inject} from 'mobx-react'
import DevTools from 'mobx-react-devtools';

import Routers from './router'
import RootStore from './store/rootStore';
import { object } from 'prop-types';

const devToolsNode = process.env.NODE_ENV === 'development' ? <DevTools  /> : null
// @inject('rootStore')
// @observer
// class App extends React.Component<any, {}> {
//   constructor(props: any) {
//     super(props)
//   }
//   render() {
//     const { rootStore } = this.props
//     const devToolsNode = process.env.NODE_ENV === 'development' ? <DevTools  /> : null
//     return (
//       <div>
//         <Routers rootStore={rootStore} />
//         {devToolsNode}
//       </div>
//     )
//   }
// }

const App = inject('rootStore')(observer(props => {
  const { rootStore } = props
  return (
    <div>
      <Routers rootStore={rootStore}  />
      {/* {devToolsNode} */}
    </div>

  )
}))

export default App
