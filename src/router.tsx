import React from 'react'
import Loadable from 'react-loadable'
import {
  Route,
  Switch,
} from 'react-router-dom'

const loading = ({ isLoading, error }) => (isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null)


const routes = [
  {
    path: '/',
    component: () => import('@/containers/Home'),
    exact: true,
  },
  {
    path: '/about',
    component: () => import('@/containers/About'),
    exact: true,
  },
  {
    path: '/spreadSheet',
    component: () => import('@/containers/SpreadSheet/index'),
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
              const r = translateRoute(route, route.path, {
                ...route,
                component: Loadable({
                  loader: route.component,
                  loading,
                  render(loaded, props: any) {
                    const Component = loaded.default
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
