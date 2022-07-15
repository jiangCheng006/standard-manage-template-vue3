import { reactive } from 'vue'
interface paginationType {
  total: number
  pageSize: number
  current: number
  hideOnSinglePage: boolean
  showSizeChanger: boolean
  showQuickJumper: boolean
  showLessItems: boolean
  pageSizeOptions: string[]
  showTotal: (total: number) => string
  onChange: (page: number, pageSize: number) => void
  onShowSizeChange: (page: number, size: number) => void
}
function isExist(val: unknown): val is boolean {
  return typeof val !== 'undefined' && val !== null
}
export const usePagination = (option: Partial<paginationType> = {}) => {
  const onChange = function (page: number, pageSize: number) {
    pagination.current = page
    option.onChange && option.onChange(page, pageSize)
  }
  const onShowSizeChange = function (current: number, size: number) {
    pagination.current = 1
    pagination.pageSize = size
    option.onShowSizeChange && option.onShowSizeChange(current, size)
  }

  function setCurrentPage(page: number) {
    pagination.current = page
  }

  function getTotal() {
    return pagination.total
  }

  const pagination = reactive<paginationType>({
    total: 0,
    pageSize: 10,
    current: 1,
    hideOnSinglePage: isExist(option.hideOnSinglePage) ? option.hideOnSinglePage : false,
    showSizeChanger: isExist(option.showSizeChanger) ? option.showSizeChanger : true,
    showQuickJumper: isExist(option.showQuickJumper) ? option.showQuickJumper : true,
    showLessItems: isExist(option.showLessItems) ? option.showLessItems : true,
    pageSizeOptions: option['pageSizeOptions'] ? option['pageSizeOptions'] : ['10', '20', '30', '40'],
    showTotal: (total: number) => `共 ${total} 条数据`,
    onChange,
    onShowSizeChange
  })

  return {
    pagination,
    setCurrentPage,
    getTotal
  }
}
