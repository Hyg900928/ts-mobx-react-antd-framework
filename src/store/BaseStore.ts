import { observable, action } from 'mobx'

export default class BaseStore {
  @observable curPage = 1 // 当前页数

  @observable limit = 10 // 每页行数

  @observable loading = false // loading...

    // num,str赋值
    @action('BaseStore :: setter')
    setStore(key: any, val: any) {
      this[key] = val
    }
}
