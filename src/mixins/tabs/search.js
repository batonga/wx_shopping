import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    value: '',
    suggestList: [],
    kwList: []
  }
  methods = {
    // 搜索框值改变调用该方法
    onChange(e) {
      var kw = e.detail.trim()
      this.value = kw
      if (kw.length <= 0) {
        this.suggestList = []
        return
      }
      this.getSuggestList(e.detail)
    },
    // 确定搜索调用
    onSearch(e) {
      // console.log(e.detail)
      const kw = e.detail.trim()
      if (kw.length <= 0) {
        return
      }
      // 把用户搜索历史存在kwList数组中
      if (this.kwList.indexOf(kw) === -1) {
        this.kwList.unshift(kw)
      }
      this.kwList = this.kwList.slice(0, 10)
      wepy.setStorageSync('kwList', this.kwList)
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + kw
      })
    },
    // 搜索取消时候调用
    onCancel(e) {
      this.suggestList = []
    },
    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    },
    deleteHistory() {
      this.kwList = []
      wepy.setStorageSync('kwList', [])
    },
    historyGoGoodsList(msg) {
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + msg
      })
    }
  }
  onLoad() {
    const kwList = wx.getStorageSync('kwList')
    this.kwList = kwList || []
    // console.log(kwList)
  }
  computed = {
    isShowHistory() {
      if (this.value === '') {
        return true
      } else {
        return false
      }
    }
  }
  async getSuggestList(searchValue) {
    const {
      data: res
    } = await wepy.get('/goods/qsearch', {
      query: searchValue
    })
    console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.suggestList = res.message
    this.$apply()
  }
}
