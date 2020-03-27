import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    cart: [],
    addressInfo: null,
    isLogin: false
  }
  methods = {
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.baseToast('获取用户地址失败')
      }
      this.addressInfo = res
      wepy.setStorageSync('address', this.addressInfo)
      this.$apply()
    },
    async getUserInfo(userInfo) {
      // 获取用户信息
      if (userInfo.detail.errMsg !== 'getUserInfo:ok') {
        return wepy.baseToast('获取用户信息失败！')
      }
      console.log(userInfo)
      // 获取用户登录的凭证 Code
      const loginRes = await wepy.login()
      console.log(loginRes)
      if (loginRes.errMsg !== 'login:ok') {
        return wepy.baseToast('缺少code！')
      }
      // 登录的参数
      const loginParams = {
        code: loginRes.code,
        encryptedData: userInfo.detail.encryptedData,
        iv: userInfo.detail.iv,
        rawData: userInfo.detail.rawData,
        signature: userInfo.detail.signature
      }
      // 发起登录的请求，换取登录成功之后的 Token 值
      const { data: res } = await wepy.post('/users/wxlogin', loginParams)
      console.log(res)
      // if (res.meta.status !== 200) {
      //   return wepy.baseToast('微信登录失败！')
      // }
      // 把登录成功之后的 Token 字符串，保存到 Storage 中
      wepy.setStorageSync('token', res.message.token)
      this.islogin = true
      this.$apply()
    }
  }
  onLoad() {
    this.cart = this.$parent.globalData.cart.filter(x => x.isCheck) || []
    this.getStorageSyncAddress()
  }
  computed = {
    isAddress() {
      if (this.addressInfo) {
        return false
      } else {
        return true
      }
    },
    addressStr() {
      if (this.addressInfo === null) {
        return
      }
      const info = this.addressInfo
      return info.provinceName + info.cityName + info.countyName + info.detailInfo
    }
  }
  async getStorageSyncAddress() {
    const res = await wepy.getStorageSync('address') || null
    this.addressInfo = res
  }
}
