import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    activeKey: 0,
    cateList: [],
    // 二级分类的数据
    secondCate: [],
    wh: 0
  }
  onLoad() {
    this.getCatesList()
    this.getHeight()
  }
  methods = {
    onChange(event) {
      // console.log(event.detail)
      this.secondCate = this.cateList[event.detail].children
      // console.log(this.secondCate)
      this.$apply()
    },
    goGoodsList(cid) {
      wepy.navigateTo({
        url: '/pages/goods_list?cid=' + cid
      })
    }
  }
  async getCatesList() {
    const {
      data: res
    } = await wepy.get('/categories')
    if (res.meta.status !== 200) {
      return wepy.baseToast('获取分类列表数据失败')
    }
    // console.log(res)
    this.cateList = res.message
    this.secondCate = res.message[0].children
    this.$apply()
  }
  // 动态获取可视高度
  async getHeight() {
    const res = await wepy.getSystemInfo()
    // console.log(res)
    if (res.errMsg === 'getSystemInfo:ok') {
      this.wh = res.windowHeight
      this.$apply()
    }
  }
}
