import wepy from 'wepy'
const baseURL = 'https://www.uinav.com/api/public/v1'
// const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'
// const baseURL = 'https://api.zbztb.cn/api/public/v1'
// 封装的全局弹窗提示功能
wepy.baseToast = function (str = '获取数据失败！') {
  wepy.showToast({
    title: str,
    // 弹框期间不会携带任何图标
    icon: 'none',
    duration: 1500
  })
}
// 封装get请求，url相对路径，data默认值为空对象
wepy.get = function (url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'GET',
    data: data
  })
}
// 封装post请求，url相对路径
wepy.post = function (url, data) {
  return wepy.request({
    url: baseURL + url,
    method: 'POST',
    data: data
  })
}
