
import  React from 'react'
import  ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { configure } from 'mobx'
import { LocaleProvider } from 'antd'
import { createBrowserHistory } from 'history'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Provider as MobxProvider, observer, inject } from 'mobx-react'

import createStore from '@/store/rootStore'
import App from './App'

configure({
  enforceActions: 'observed' // 开启严格模式, 外界修改store ,只能通过action来修改
})

const store = new createStore()
const history = createBrowserHistory()
const render = (Component) => {
  ReactDom.render(
    <LocaleProvider locale={zhCN as any}>
      <AppContainer>
       <MobxProvider rootStore={store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </MobxProvider>
      </AppContainer>
    </LocaleProvider>,
    document.getElementById('app'),
  )
}

render(App)

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    const containers = require('./App').default
    render(containers)
  })
}
