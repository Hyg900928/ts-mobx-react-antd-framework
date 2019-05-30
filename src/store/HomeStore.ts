import Utils from '@/utils'
import { observable, action, runInAction } from 'mobx'
import _debug from 'debug'
import BaseStore from './BaseStore'

const debug = _debug('app:HomeStore')

class HomeStore {
  @observable a = 'hhh';
  @observable num = 0;
  rootStore: any;
  constructor(rootStore: any) {
    this.rootStore = rootStore
  }

  @action add = async () => {
    this.num++
  }



}

export default HomeStore
