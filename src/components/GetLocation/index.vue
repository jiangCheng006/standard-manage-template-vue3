<template>
  <div class="location">
    <a-col :span="6" style="display: flex; align-items: center">
      <span style="flex: none">经度：</span>
      <a-input placeholder="点击按钮获取位置" :value="value && value.split(',')[0]" readOnly />
    </a-col>
    <a-col :span="6" :offset="1" style="display: flex; align-items: center">
      <span style="flex: none">纬度：</span>
      <a-input placeholder="点击按钮获取位置" :value="value && value.split(',')[1]" readOnly />
    </a-col>
    <a-col :span="6" :offset="1">
      <a-button type="primary" @click="openModal">点击获取位置</a-button>
    </a-col>

    <a-modal v-model:visible="modal" :mask-closable="false" width="80%" @cancel="closeMapModal" :style="{ top: '40px' }">
      <p style="text-align: center">请选择经纬度</p>
      <div style="position: relative">
        <div class="map-fixed-wrap">
          <div class="keyword">
            <span>请输入关键字：</span>
            <input id="xxx" @input="handleKeywordInput" placeholder="输入关键词搜索位置" />
            <div style="width: 0; height: 0; display: block; margin-left: 100px; overflow: hidden" id="tipinput"></div>
          </div>
          <div class="result">
            <div>选择点的经纬度：</div>
            <div class="result-item item-wrap">
              <span>经度：</span>
              <input v-model="loc.longitude" placeholder="点击地图获取坐标" />
            </div>
            <div class="result-item item-wrap">
              <span>纬度：</span>
              <input v-model="loc.latitude" placeholder="点击地图获取坐标" />
            </div>
          </div>
          <!--<div class="address">-->
          <!--  <span>地址：</span>-->
          <!--  <span>{{ address }}</span>-->
          <!--</div>-->
        </div>
        <div class="map" :id="'J_map' + modelName"></div>
      </div>
      <template #footer>
        <a-button type="primary" size="large" @click="confirm">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { debounce } from 'lodash-es'
  import { reactive, ref, watch, nextTick } from 'vue'
  import PoiMarker from '../../assets/poi-marker.png'
  import AMapLoader from '@amap/amap-jsapi-loader'

  const PRE_SELECT_LOCATION = 'pre_select_location'
  const props = defineProps({
    value: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 32
    },
    record: {
      type: Object
    }
  })

  const modelName = Date.now()
  const modal = ref(false)
  const map = ref<any>(null)
  const marker = ref<any>(null)
  // const address = ref('-')
  const auto = ref<any>(null)
  const loc = reactive({
    longitude: '',
    latitude: ''
  })

  watch(modal, (val) => {
    changeStatus(val)
  })
  function openModal() {
    modal.value = true
    // props.value = props.value ? props.value : (window.localStorage.getItem(PRE_SELECT_LOCATION) || '')
  }

  function changeStatus(status: boolean) {
    if (status) {
      let defaultLngLat: string[] | string = ''
      if (props.value && props.value.indexOf(',') > -1) {
        defaultLngLat = props.value.split(',')
        loc.longitude = defaultLngLat[0]
        loc.latitude = defaultLngLat[1]
      }
      nextTick(() => {
        initMap(defaultLngLat)
      })
    } else {
      reset()
    }
  }
  const emits = defineEmits(['update:value'])

  function initMap(defaultLngLat: string[] | string) {
    const options = {
      resizeEnable: true,
      center: defaultLngLat || [116.397428, 39.90923],
      zoom: 12
    }
    // @ts-ignore
    window._AMapSecurityConfig = {
      securityJsCode: '3a3f087edf0d422661239dba04c446b4'
    }

    AMapLoader.load({
      key: '0d04c9ef03c1b39fb7c4857b44a56116', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.AutoComplete,AMap.PlaceSearch,AMap.MarkerClusterer,AMap.DistrictSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map.value = new AMap.Map('J_map' + modelName, options)
        const autoOptions = {
          input: 'tipinput'
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const clickEventListener = map.value.on('click', (e: any) => {
          loc.longitude = e.lnglat.getLng()
          loc.latitude = e.lnglat.getLat()
        })

        const placeSearch = new AMap.PlaceSearch({
          map: map.value
        }) // 构造地点查询类

        auto.value = new AMap.AutoComplete(autoOptions)

        function select(e: any) {
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name) // 关键字查询查询
        }

        AMap.Event.addListener(auto.value, 'select', select) // 注册监听，当选中某条记录时会触发

        AMap.Event.addListener(placeSearch, 'markerClick', (e: any) => {
          console.log(e.data.location) //当前marker的经纬度信息
          loc.longitude = e.data.location.lat
          loc.latitude = e.data.location.lng
        })
        initMarket(AMap)
      })
      .catch((e) => {
        console.log(e)
      })

    // console.log('J_map' + modelName)
    // map.value = new AMap.Map('J_map' + modelName, options)
    // console.log(map)
  }
  function initMarket(AMap: any) {
    if (!(loc.longitude && loc.latitude)) {
      return
    }
    marker.value = new AMap.Marker({
      icon: PoiMarker,
      position: [loc.longitude, loc.latitude],
      offset: new AMap.Pixel(-26, -68)
    })
    marker.value.setMap(map.value)
  }
  function confirm() {
    const lnglat = loc.longitude && loc.latitude ? `${loc.longitude},${loc.latitude}` : ''
    emits('update:value', lnglat)
    window.localStorage.setItem(PRE_SELECT_LOCATION, lnglat)
    modal.value = false
    closeMapModal()
  }
  function reset() {
    loc.longitude = ''
    loc.latitude = ''
    map.value && map.value.destroy && map.value.destroy()
    marker.value && marker.value.setMap(null)
    marker.value = null
  }
  function closeMapModal() {
    map.value.destroy()
    map.value = null
  }
  const handleKeywordInput = debounce(function (e) {
    console.log(e.target.value)
    console.log(auto.value.search)
    auto.value.search(e.target.value)
  }, 200)
</script>

<style lang="less" scoped>
  p {
    margin-bottom: 0;
  }
  .location {
    width: 100%;
    display: inline-flex;
    align-items: center;
    .show-input {
      width: calc(100% - 40px);
    }
    .loc-icon {
      margin-left: 6px;
      width: 30px;
      cursor: pointer;
    }
  }
  .map-fixed-wrap {
    box-sizing: border-box;
    z-index: 100000;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 400px;
    height: 200px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    .keyword {
      margin-bottom: 20px;
    }
    .item-wrap {
      display: flex;
      align-items: center;
    }
    .result {
      margin-bottom: 20px;
      .result-item {
        margin-top: 10px;
      }
    }
  }
  .map {
    height: 600px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 10px;
  }
</style>
