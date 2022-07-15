export interface CustomOperationType {
  name?: string
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
  hidden?: boolean
  [key: string]: any
}

export interface OperationType {
  hiddenView?: boolean
  hiddenEdit?: boolean
  hiddenDelete?: boolean
  fixed?: boolean | string
  customs?: CustomOperationType[]
  [key: string]: any
}
