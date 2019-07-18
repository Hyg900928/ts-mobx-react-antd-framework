// import { RouterStore } from 'mobx-react-router'
import HomeStore from './HomeStore';
import CustomTableStore from './CustomTableStore'
import BaseStore from './BaseStore'
// import { observable } from 'mobx'

class RootStore extends BaseStore {
  homeStore: HomeStore;

  customTableStore: CustomTableStore;

  constructor() {
    super()
    this.homeStore = new HomeStore(this);
    this.customTableStore = new CustomTableStore(this);
  }
}

export default RootStore;

// function createStore() {
//   return Object.keys(appStores)
//     .reduce((acc: any, storeName: any) => ({
//       ...acc,
//       [storeName]: new appStores[storeName](),
//     }), {})
// }

// export default createStore
