import * as zlib from 'zlib'


const Utils = {

  // 深拷贝
  deepClone(data) {
    return JSON.parse(JSON.stringify(data))
  },

  // 针对ObservableArray/Object的深拷贝 ==有问题
  deepCloneObservable(data) {
    let o: any
    const t = typeof (data)
    if (t === 'object') {
      o = data.length ? [] : {}
    } else {
      return data
    }
    if (t === 'object') {
      if (data.length) {
        for (const value of data) {
          o.push(this.deepCloneObservable(value))
        }
      } else {
        for (const i in data) {
          o[i] = this.deepCloneObservable(data[i])
        }
      }
    }
    return o
  },

  arrRemove(arr, i) {
    const index = arr.indexOf(i)
    if (index > -1) arr.splice(index, 1)
  },

  /**
   * 使用zlib解密
   * @param str 解密字符串
   */
  zlibDecryption(str = '') {
    return zlib.unzipSync(Buffer.from(str, 'base64')).toString()
  },

  // 登出的时候把storage清除
  logOutClearStorage() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userLoginPermission')
    localStorage.removeItem('ssoToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userGroupList')
    localStorage.removeItem('gameAuthList')
    localStorage.removeItem('gameAppId')
    localStorage.removeItem('gameInfo')
    localStorage.removeItem('gameName')
  },

  // 去除两边的空格
  trim(name = '') {
    return name.replace(/(^\s*)|(\s*$)/g, '')
  },
}

export default Utils
