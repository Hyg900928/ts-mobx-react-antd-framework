
import  React from 'react'
import  ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'
import { configure } from 'mobx'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Provider as MobxProvider } from 'mobx-react'
import config from '../configs'
import createStore from '@/store/rootStore'
import App from './App'

configure({
  enforceActions: 'observed' // 开启严格模式, 外界修改store ,只能通过action来修改
})

const __DEV__ = config.env === 'development'
const store = new createStore()

const render = (Component) => {
  ReactDom.render(
    <LocaleProvider locale={zhCN as any}>
      <MobxProvider rootStore={store}>
            <BrowserRouter>
              <Component />
            </BrowserRouter>
          </MobxProvider>
    </LocaleProvider>,
    document.getElementById('app'),
  )
}

render(App)

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    const containers = require('./App.tsx').default
    render(containers)
  })
}

// 开启pwa
if ('serviceWorker' in navigator && !__DEV__) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      })
  })
}
