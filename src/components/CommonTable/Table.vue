<template>
  <div style="margin: 10px 0">
    <slot></slot>
  </div>
  <a-table v-bind="$attrs" :columns="getColumns($attrs)">
    <template #[item]="data" v-for="item in Object.keys($slots).filter((item) => item !== 'bodyCell')" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #bodyCell="{ column, record }">
      <slot name="bodyCell" v-bind="{ column, record }"></slot>
      <template v-if="column.key === 'commonTableAction'">
        <a-button v-if="!operation.hiddenEdit" type="primary" @click="handleEdit(record)">编辑</a-button>
        <a-button v-if="!operation.hiddenView" type="primary" @click="handleView(record)">查看</a-button>
        <a-popconfirm title="是否确定删除" @confirm="handleDelete(record)">
          <a-button v-if="!operation.hiddenDelete" type="primary" danger>删除</a-button>
        </a-popconfirm>
        <template v-if="operation.customs && operation.customs.length">
          <template v-for="(operate, index) of operation.customs" :key="index">
            <a-button v-if="!operate.hidden" :type="operate.type || 'primary'" v-bind="getButtonBind(operate)" @click="operate.click(record)">
              {{ operate.name }}
            </a-button>
          </template>
        </template>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>
<script lang="ts" setup>
  import { PropType, useAttrs } from 'vue'
  import { CustomOperationType, OperationType } from '@/components/CommonTable/types'

  const props = defineProps({
    operation: {
      type: Object as PropType<OperationType>,
      default: () => {}
    }
  })
  const emits = defineEmits(['handleView', 'handleEdit', 'handleDelete'])
  const attrs = useAttrs()

  function getColumns(attrsCopy: any) {
    const { operation } = props
    const columns = attrsCopy.columns as any
    if (operation.hiddenView && operation.hiddenEdit && operation.hiddenDelete && (!operation.customs || !operation.customs.length)) {
      return columns || []
    }
    columns.push({
      key: 'commonTableAction',
      title: '操作',
      width: getActionColumnsWidth(operation),
      ...filterActionColumnsAttrs(operation)
    })
    return columns || []
  }

  function getActionColumnsWidth(operation: OperationType) {
    let width = 0
    let buttonWidth = 85
    if (JSON.stringify(operation) === '{}') return buttonWidth * 3 + 'px'
    if (!operation.hiddenDelete) {
      width += buttonWidth
    }
    if (!operation.hiddenEdit) {
      width += buttonWidth
    }
    if (!operation.hiddenView) {
      width += buttonWidth
    }
    if (operation.customs && operation.customs.length) {
      width += operation.customs.length * buttonWidth
    }
    return width + 'px'
  }
  // 过滤非columns原生属性
  function filterActionColumnsAttrs(operation: OperationType) {
    const { hiddenDelete, hiddenEdit, hiddenView, customs, ...rest } = operation
    return rest
  }

  // 单项数据的数据类型
  type SourceDataModel = typeof attrs.sourceData extends Array<infer P> ? P : never

  function handleView(data: SourceDataModel) {
    emits('handleView', data)
  }
  function handleEdit(data: SourceDataModel) {
    emits('handleEdit', data)
  }
  function handleDelete(data: SourceDataModel) {
    emits('handleDelete', data)
  }
  function getButtonBind(operate: CustomOperationType) {
    const { name, type, ...rest } = operate
    return rest
  }
</script>
