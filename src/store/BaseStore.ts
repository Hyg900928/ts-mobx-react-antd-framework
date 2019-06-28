import { observable } from 'mobx'

export default class BaseStore {
  @observable curPage = 1 // 当前页数

  @observable limit = 10 // 每页行数

  @observable loading = false // loading...
}
