// import { hot } from 'react-hot-loader/root';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import createStore from '@/store/rootStore'

import Routers from './router'


interface AppProps extends RouteComponentProps<{}> {
  rootStore: createStore,
}


@inject('rootStore')
@observer
class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props)
  }
  render() {
    const { rootStore } = this.props
    // 注意 Devtools包,与mobx-react@6, 不兼容,
    return (
      <div>
         {/* {devToolsNode} */}
        <Routers rootStore={rootStore} />
      </div>
    )
  }
}

export default App
