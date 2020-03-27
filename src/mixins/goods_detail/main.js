import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    // 商品id
    goodsId: '',
    // 商品详细信息
    goodsInfo: {},
    // 收货地址
    addressInfo: null
  }
  methods = {
    // 点击轮播图图片预览功能
    preview(url) {
      wepy.previewImage({
        urls: this.goodsInfo.pics.map(x => x.pics_big),
        current: url
      })
    },
    addToCat() {
      wepy.showToast({
        title: '成功加入购物车！'
      })
      this.$parent.changeCartData(this.goodsInfo)
    },
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.baseToast('获取用户地址失败')
      }
      this.addressInfo = res
      wepy.setStorageSync('address', this.addressInfo)
      this.$apply()
    }
  }
  onLoad(options) {
    this.goodsId = options.goods_id
    this.getGoodsInfo()
    // 从本地数据获取地址信息
    this.getStorageSyncAddress()
  }
  computed = {
    addressStr() {
      if (this.addressInfo === null) {
        return '请选择收货地址'
      }
      const address = this.addressInfo
      const str = address.provinceName + address.cityName + address.countyName + address.detailInfo
      return str
    },
    // 购物车角标数量
    total() {
      return this.$parent.globalData.total
    }
  }
  // 获取商品信息
  async getGoodsInfo() {
    const {
      data: res
    } = await wepy.get('/goods/detail', {
      goods_id: this.goodsId
    })
    // console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast('获取商品数据失败')
    }
    this.goodsInfo = res.message
    this.$apply()
  }
  async getStorageSyncAddress() {
    const res = await wepy.getStorageSync('address') || null
    this.addressInfo = res
  }
}
