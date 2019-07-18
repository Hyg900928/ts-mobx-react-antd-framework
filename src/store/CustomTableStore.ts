import { observable, action, runInAction } from 'mobx';
import BaseStore from './BaseStore'
import RootStore from './rootStore'
// import _debug from 'debug'

// const debug = _debug('app:HomeStore')

class CustomTableStore extends BaseStore {
  @observable id = 0;

  @observable num = 0;

  @observable heads = [];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    super()
    this.rootStore = rootStore;
  }

  @action add = async () => {
    await this.num++;
    runInAction('setHeads', () => {
      this.heads.push(this.num)
    })
  };
}

export default CustomTableStore;
