import pkgInfo from '../../package.json'
const baseInfo = {
  version: pkgInfo.version, // 项目版本
  name: pkgInfo.name, // 项目名称
  title: '力石后台管理系统', // 项目标题
  logo: '@/assets/logo.png', // 项目logo地址(本地地址或远程地址均可)
  uploadUrl: '/upload', // 项目上传api地址
  withPermission: false
}

export default baseInfo
