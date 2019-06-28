import _debug from 'debug'
import Utils from '.'

const debug = _debug('app:Admin:MessageManagement')
const StorageKeys = ['gameAppId', 'gameInfo', 'gameName']
const Storage = {
  getItem(key: any) {
    let value
    try {
      if (StorageKeys.indexOf(key) !== -1) {
        value = sessionStorage.getItem(key)
      } else {
        value = localStorage.getItem(key)
      }
      // return value
    } catch (ex) {
      debug('localStorage.getItem报错, ', ex.message)
    } finally {
      return value
    }
  },
  setItem(key: any, val: any) {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      if (StorageKeys.indexOf(key) !== -1) {
        sessionStorage.setItem(key, val)
      } else {
        localStorage.setItem(key, val)
      }
    } catch (ex) {
      debug('localStorage.setItem报错, ', ex.message)
    }
  },
  removeItem(key: any) {
    return localStorage.removeItem(key)
  },

  // Basic Data Type for zlib
  getItemBasicZlib(key: any) {
    return Utils.zlibDecryption(this.getItem(key))
  },
  // Reference Data Type
  getItemJson(key: any) {
    return this.getItem(key) != null ? JSON.parse(this.getItem(key)) : {}
  },
  setItemJson(key: any, val: any) {
    this.setItem(key, JSON.stringify(val))
  },

  getItemJsonZlib(key: any) {
    return this.getItem(key) != null ? JSON.parse(Utils.zlibDecryption(this.getItem(key))) : {}
  },

}

export default Storage
