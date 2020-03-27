import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    swiperList: [],
    cateList: [],
    floorList: []
  }
  onLoad() {
    this.getSwiperData()
    this.getCateItems()
    this.getFloorData()
  }
  methods = {
    goGoodsList(e) {
      wepy.navigateTo({
        url: e
      })
    }
  }
  // 获取轮播图数据
  async getSwiperData() {
    const {
      data: res
    } = await wepy.get('/home/swiperdata')
    if (res.meta.status !== 200) {
      return wepy.baseToast('获取轮播图数据失败')
    }
    // console.log(res.message)
    this.swiperList = res.message
    this.$apply()
  }
  // 获取分类菜单
  async getCateItems() {
    const {
      data: res
    } = await wepy.get('/home/catitems')
    // console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast('获取分类列表数据失败')
    }
    this.cateList = res.message
    this.$apply()
  }
  // 获取楼层数据
  async getFloorData() {
    const { data: res } = await wepy.get('/home/floordata')
    console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.floorList = res.message
    this.$apply()
  }
}
