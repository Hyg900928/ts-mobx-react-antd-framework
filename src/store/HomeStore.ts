import { observable, action } from 'mobx';
import RootStore from './rootStore'
import BaseStore from './BaseStore'
// import _debug from 'debug'

// const debug = _debug('app:HomeStore')

class HomeStore extends BaseStore {
  @observable a = 'hhh';

  @observable num = 0;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super()
    this.rootStore = rootStore;
  }

  @action add = async () => {
    this.num++;
  };
}

export default HomeStore;
