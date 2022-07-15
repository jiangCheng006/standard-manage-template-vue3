declare interface BasicResult<T> {
  code: number
  data: T
  message: string
}

declare interface BasicPageParams {
  pageNum: number
  pageSize: number
}

declare interface BasicPageResult<T> {
  total: number
  records: T[]
  [key: string]: any
}
