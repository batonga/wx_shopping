import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    goodsList: [],
    total: 0,
    isover: false,
    isLoding: false
  }
  onLoad(options) {
    // console.log(options)
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodsList()
  }
  // 上拉加载更多
  onReachBottom() {
    // console.log('触底了')
    // 防止发送多个数据请求
    if (this.isLoding) {
      return
    }
    if (this.pagenum * this.pagesize >= this.total) {
      this.isover = true
      return
    }
    this.pagenum++
    this.getGoodsList()
  }
  // 下拉刷新
  onPullDownRefresh() {
    this.isover = this.isLoding = false
    this.pagenum = 1
    this.goodsList = []
    this.total = 0
    this.getGoodsList(function () {
      // 停止下拉刷新的行为
      wepy.stopPullDownRefresh()
    })
  }
  async getGoodsList(cb) {
    // 发数据请求 isLoading改为true
    this.isLoding = true
    const {
      data: res
    } = await wepy.get('/goods/search', {
      query: this.query,
      cid: this.cid,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
    if (res.meta.status !== 200) {
      return wepy.baseToast('获取数据失败')
    }
    this.goodsList = [...this.goodsList, ...res.message.goods]
    this.total = res.message.total
    // console.log(res.message.goods)
    // 数据请求完毕 isLoding改为false
    this.isLoding = false
    this.$apply()
    // 关闭下拉刷新行为的回调
    cb && cb()
  }
  methods = {
    // 点击商品跳转到商品详情页
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    }
  }
}
