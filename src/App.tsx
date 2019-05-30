import React from 'react'
import { hot } from 'react-hot-loader/root'
import { LocaleProvider } from 'antd'
import { observer, inject} from 'mobx-react'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import DevTools, { configureDevtool } from 'mobx-react-devtools';
import Routers from './router'
import createStore from '@/store/rootStore'

const Configs = require('../configs/index.ts')
const store = new createStore()


@inject('rootStore')
@observer
class App extends React.Component<any, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { rootStore } = this.props
    const devToolsNode = process.env.NODE_ENV === 'development' ? <DevTools  /> : null
    return (
      <div>
        <Routers rootStore={rootStore} />
        {devToolsNode}
      </div>
    )
  }
}

export default App
