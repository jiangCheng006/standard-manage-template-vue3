const prefix = 'prefix_'

function formatKey(key: string) {
  return prefix + key
}

class StorageUtil {
  private constructor() {}

  private static instance: StorageUtil

  public static getInstance() {
    if (!this.instance) {
      this.instance = new StorageUtil()
    }
    return this.instance
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(formatKey(key), JSON.stringify(value))
  }

  public getItem(key: string) {
    const value = localStorage.getItem(formatKey(key))
    return value !== null ? JSON.parse(value) : null
  }

  public removeItem(key: string) {
    localStorage.removeItem(formatKey(key))
  }

  public clear() {
    localStorage.clear()
  }
}

export default StorageUtil.getInstance()
