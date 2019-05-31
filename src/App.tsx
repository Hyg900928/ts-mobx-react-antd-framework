import React from 'react'
import { observer, inject} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import Routers from './router'

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
