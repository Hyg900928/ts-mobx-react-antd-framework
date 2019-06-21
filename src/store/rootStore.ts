import { RouterStore } from 'mobx-react-router'
import HomeStore from './HomeStore'
import { observable } from 'mobx'

class RootStore {
  homeStore: HomeStore
  constructor() {
    this.homeStore = new HomeStore(this)
  }
}

export default RootStore

// function createStore() {
//   return Object.keys(appStores)
//     .reduce((acc: any, storeName: any) => ({
//       ...acc,
//       [storeName]: new appStores[storeName](),
//     }), {})
// }

// export default createStore
