import React from 'react'
import { default as Loadable } from 'react-loadable'
import {
  Route,
  Switch,
} from 'react-router-dom'

const loading = ({ isLoading, error }) => {
  return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null
}

const routes = [
  {
    path: '/',
    component: () => import('@/containers/Home'),
    exact: true,
  },
  {
    path: '/about',
    component:() => import('@/containers/About'),
    exact: true,
  },
]

const Routers = ({
  rootStore,
  // children
}) => {
  return (
      <div>
        {/* {children} */}
        <Switch>
          {
            routes.map(route => {
              let r = translateRoute(route, route.path, {
                ...route,
                component: Loadable({
                  loader: route.component,
                  loading,
                  render(loaded, props: any) {
                    let Component = loaded.default
                    return <Component {...props} rootStore={rootStore} />
                  },
                }),
              })

              return <Route
                key={route.path}
                {...r}
              />
            })
          }
          <Route component={() => <h1>404-Not Found</h1>} />
        </Switch>
      </div>
  )
}

function translateRoute(route, sPath, sR) {
  let res = route
  if (sPath && sR) {
    if (res.path === sPath) {
      res = sR
    }
  }
  return res
}

export default Routers
