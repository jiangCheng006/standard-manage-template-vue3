<template>
  <div>
    <VueUeditorWrap :modelValue="value" @update:modelValue="updateValue" :config="editorConfig" @beforeInit="initEditor" />
    <a-modal v-model:visible="show" @ok="insertImage" @cancel="show = false" title="图片上传">
      <div class="demo-upload-list" v-for="(item, index) in imageList" :key="index">
        <img :src="item" />
        <div class="demo-upload-list-cover">
          <icon icon="PlusSquareOutlined" @click="handleRemove(index)" />
        </div>
      </div>
      <a-upload
        multiple
        name="file"
        :action="action"
        :data="{ name: 'file' }"
        :headers="{
          Authorization: tokenStore.getToken()
        }"
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
        @change="uploadStatusChange"
        type="drag"
        style="display: inline-block; width: 58px; height: 58px"
      >
        <a class="upload-btn">
          <icon icon="CameraOutlined" />
        </a>
        <!--<a-button icon="PlusSquareOutlined">Upload files</a-button>-->
      </a-upload>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { VueUeditorWrap } from 'vue-ueditor-wrap'
  import { defineComponent, reactive, toRefs, nextTick } from 'vue'
  import { message } from 'ant-design-vue'
  import { useToken } from '@/store/useUserInfo'

  export default defineComponent({
    components: {
      VueUeditorWrap
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      initialFrameWidth: {
        type: Number,
        default: 600
      },
      initialFrameHeight: {
        type: Number,
        default: 300
      }
    },
    emits: ['update:value', 'blur'],
    setup(props, { emit }) {
      const tokenStore = useToken()
      const action = import.meta.env.VITE_BASE_URL + '/golfer/termManage/upload'
      const editorConfig = {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        toolbars: [
          [
            'source', // 源代码
            'undo', // 撤销
            'redo', // 重做
            'bold', // 加粗
            'italic', // 斜体
            'underline', // 下划线
            'fontborder', // 字符边框
            'strikethrough', // 删除线
            'superscript', // 上标
            'subscript', // 下标
            'removeformat', // 清除格式
            'formatmatch', // 格式刷
            'autotypeset', // 自动排版
            'blockquote', // 引用
            'pasteplain', // 纯文本粘贴模式
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            'selectall', // 全选
            'fullscreen', // 全屏
            'cleardoc', // 清空文档
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'lineheight', // 行间距
            'paragraph', // 段落格式
            'fontfamily', // 字体
            'fontsize', // 字号
            'directionalityltr', // 从左向右输入
            'directionalityrtl', // 从右向左输入
            'indent', // 首行缩进
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            'touppercase', // 字母大写
            'tolowercase', // 字母小写
            'link', // 超链接
            'unlink', // 取消链接
            'anchor', // 锚点
            'imagenone', // 默认
            'imageleft', // 左浮动
            'imageright', // 右浮动
            'imagecenter', // 居中
            'emotion', // 表情
            'insertvideo', // 视频
            'music', // 音乐
            'map', // Baidu地图
            'insertframe', // 插入Iframe
            'insertcode', // 代码语言
            'pagebreak', // 分页
            'template', // 模板
            'background', // 背景
            'horizontal', // 分隔线
            'date', // 日期
            'time', // 时间
            'spechars', // 特殊字符
            'inserttable', // 插入表格
            'deletetable', // 删除表格
            'insertparagraphbeforetable', // "表格前插入行"
            'insertrow', // 前插入行
            'deleterow', // 删除行
            'insertcol', // 前插入列
            'deletecol', // 删除列
            'mergecells', // 合并多个单元格
            'mergeright', // 右合并单元格
            'mergedown', // 下合并单元格
            'splittocells', // 完全拆分单元格
            'splittorows', // 拆分成行
            'splittocols', // 拆分成列
            'charts', // 图表
            'deletecaption', // 删除表格标题
            'inserttitle', // 插入标题
            'edittable', // 表格属性
            'edittd', // 单元格属性
            'print', // 打印
            'preview', // 预览
            'searchreplace', // 查询替换
            'edittip ', // 编辑提示
            'drafts', // 从草稿箱加载
            'help' // 帮助
          ]
        ],
        // 初始容器高度
        initialFrameHeight: props.initialFrameHeight,
        // 初始容器宽度
        initialFrameWidth: props.initialFrameWidth,
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
        serverUrl: 'http://ygj-store.j-travel365.com/store/file/uploadV2',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: `/UEditor/`
      }

      const imageState = reactive<{
        show: boolean
        imageList: string[]
        fileNameList: string[]
        editorHandler: Function
      }>({
        show: false,
        imageList: [],
        fileNameList: [], // 批量上传图片名称集合
        editorHandler: () => {}
      })

      function initEditor(editorId: any) {
        // @ts-ignore
        const UE = window.UE
        addCustomButton(editorId, UE)
        nextTick(() => {
          addBlurListener(editorId, UE)
        })
      }
      function addBlurListener(editorId: string, UE: any) {
        UE.getEditor(editorId).addListener('blur', function () {
          emit('blur', props.value)
        })
      }
      function addCustomButton(_editorId: any, UE: any) {
        UE.registerUI(
          'test-button',
          function (editor: any, uiName: any) {
            // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
              execCommand: () => {
                imageState.imageList = []
                imageState.show = true
                imageState.editorHandler = editor
                // editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
              }
            })

            // 创建一个 button
            var btn = new UE.ui.Button({
              // 按钮的名字
              name: uiName,
              // 提示
              title: '图片上传',
              // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
              cssRules: 'background-position: -380px 0;',
              // 点击时执行的命令
              onclick: function () {
                // 这里可以不用执行命令，做你自己的操作也可
                editor.execCommand(uiName)
              }
            })

            // 当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function () {
              var state = editor.queryCommandState(uiName)
              if (state === -1) {
                btn.setDisabled(true)
                btn.setChecked(false)
              } else {
                btn.setDisabled(false)
                btn.setChecked(state)
              }
            })
            // 因为你是添加 button，所以需要返回这个 button
            return btn
          },
          2 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */ /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
        )
      }

      function insertImage() {
        let imageList = imageState.imageList
        let imageHtml = ''
        ;(imageList || []).map((item) => {
          imageHtml = imageHtml + '<p><img src="' + item + '"/></p>'
        })
        if (imageHtml !== '') {
          // @ts-ignore
          imageState.editorHandler.execCommand('inserthtml', imageHtml)
        }
        imageState.show = false
      }
      function handleBeforeUpload(file: File) {
        if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) < 0) {
          message.error('上传文件格式不正确！')
          return false
        }
        imageState.fileNameList.push(file.name)
        // changeImg(file, this.fileSuccess)
        return true
      }
      function uploadStatusChange({ file }: any) {
        if (file.status === 'done') {
          if (file.response.code === 200) {
            imageState.imageList.push(file.response.data.url as string)
            imageState.fileNameList.push(file.name)
          }
        }
      }
      function fileSuccess(res: any, _fileName: string) {
        // @ts-ignore
        imageState.imageList.push(res.data.data[0].store)
        console.log(imageState.imageList)
      }
      function handleRemove(index: number) {
        imageState.imageList.splice(index, 1)
      }
      function updateValue(e: string) {
        emit('update:value', e)
      }
      return {
        action,
        editorConfig,
        initEditor,
        insertImage,
        handleBeforeUpload,
        fileSuccess,
        handleRemove,
        ...toRefs(imageState),
        updateValue,
        uploadStatusChange,
        tokenStore
      }
    }
  })
</script>

<style lang="less" scope="scoped">
  .ivu-upload-drag {
    height: 100%;
    text-align: center;
    line-height: 58px;
    .ivu-btn {
      display: none;
    }
  }
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
