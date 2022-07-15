import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          token: 'this is a test token'
        },
        msg: 'success',
        success: true
      }
    }
  },
  {
    url: '/mock/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: null,
        msg: '退出成功',
        success: true
      }
    }
  },
  {
    url: '/mock/userInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: [
          {
            children: [
              {
                code: '1-1',
                external_url: '',
                icon: 'icon-new-nav-shouye',
                id: '1283955219190243329',
                label: '首页',
                path: '/map/index',
                sort: 1
              }
            ],
            code: '1',
            external_url: '',
            icon: 'icon-new-nav-shouye',
            id: '1283955219190243329',
            label: '首页',
            path: '/map/index',
            sort: 1
          },
          {
            children: [
              {
                children: [],
                code: '3',
                external_url: '',
                icon: 'icon-parking',
                id: '1283955219299295233',
                label: '停车场',
                path: '/map/IED/IED_parking',
                sort: 1
              },
              {
                children: [],
                code: '1-2',
                external_url: '',
                icon: 'icon-video',
                id: '1283955219362209793',
                label: '监控',
                path: '/map/IED/IED_video',
                sort: 2
              },
              {
                children: [],
                code: '1-3',
                external_url: '',
                icon: 'icon-wifi',
                id: '1283955219471261698',
                label: 'WIFI',
                path: '/map/IED/IED_wifi',
                sort: 3
              },
              {
                children: [],
                code: '1-4',
                external_url: '',
                icon: 'icon-iconguangboxuanzhong',
                id: '1283955219525787650',
                label: '广播',
                path: '/map/IED/IED_radio',
                sort: 4
              },
              {
                children: [],
                code: '1-5',
                external_url: '',
                icon: 'icon-environment',
                id: '1283955219584507906',
                label: '环测',
                path: '/map/IED/IED_environment',
                sort: 5
              },
              {
                children: [],
                code: '1-6',
                external_url: '',
                icon: 'icon-ledscreen',
                id: '1283955219693559810',
                label: 'LED屏',
                path: '/map/IED/IED_led',
                sort: 6
              },
              {
                children: [],
                code: 'IED_wash',
                external_url: '',
                icon: 'icon-wash',
                id: '1283955219748085762',
                label: '卫生间',
                path: '/map/IED/IED_wash',
                sort: 7
              },
              {
                children: [],
                code: 'IED_trash',
                external_url: '',
                icon: 'icon-trash',
                id: '1283955219802611714',
                label: '垃圾桶',
                path: '/map/IED/IED_trash',
                sort: 8
              },
              {
                children: [],
                code: 'IED_inspectionWell',
                external_url: '',
                icon: 'icon-ziyuan10',
                id: '1285053236781768706',
                label: '窨井',
                path: '/map/IED/IED_inspectionWell',
                sort: 10
              },
              {
                children: [],
                code: 'IED_lighting',
                external_url: '',
                icon: 'icon-zhaoming',
                id: '1285054318350163970',
                label: '照明',
                path: '/map/IED/IED_lighting',
                sort: 11
              },
              {
                children: [],
                code: 'IED_alarm',
                external_url: '',
                icon: 'icon-alarm',
                id: '1427177364827168769',
                label: '报警柱',
                path: '/map/IED/IED_alarm',
                sort: 12
              },
              {
                children: [],
                code: 'IED_gate',
                external_url: '',
                icon: 'icon-gate',
                id: '1427809682906439681',
                label: '票务闸机',
                path: '/map/IED/IED_gate',
                sort: 13
              }
            ],
            code: '2',
            external_url: '',
            icon: 'menu',
            id: '1283955219244769282',
            label: '智能管控',
            path: '/map/IED',
            sort: 2
          },
          {
            children: [
              {
                children: [],
                code: 'sceneControl_patrol',
                external_url: '',
                icon: 'icon-xungeng',
                id: '1354016685337636866',
                label: '巡更巡检',
                path: '/map/sceneControl/sceneControl_patrol',
                sort: 1
              },
              {
                children: [],
                code: 'sceneControl_vehicle',
                external_url: '',
                icon: 'icon-chechuantiaoduxitong',
                id: '1287592357702131714',
                label: '车船调度',
                path: '/map/sceneControl/vehicle/dispatch',
                sort: 3
              },
              {
                children: [],
                code: 'videoID',
                external_url: '',
                icon: 'icon-renlianshibie',
                id: '1284046769085734913',
                label: '视频识别',
                path: '/map/sceneControl/videoID/face',
                sort: 10
              },
              {
                children: [],
                code: 'sceneControl_runway',
                external_url: '',
                icon: 'icon-paodao',
                id: '1354061558442913794',
                label: '智慧跑道',
                path: '/map/sceneControl/sceneControl_runway',
                sort: 9999
              }
            ],
            code: '3',
            external_url: '',
            icon: 'ivu-icon ivu-icon-ios-alarm',
            id: '1284045165620092929',
            label: '场景管控',
            path: '/map/sceneControl/videoID',
            sort: 3
          },
          {
            children: [],
            code: '4',
            icon: 'icon-emergency-72',
            id: '1283955216241647617',
            label: '应急处置',
            path: '/map/sos',
            sort: 7
          }
        ],
        msg: '请求成功',
        success: true
      }
    }
  }
] as MockMethod[]
