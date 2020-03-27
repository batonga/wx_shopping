import wepy from 'wepy'
export default class extends wepy.mixin {
  data = {
    cart: []
  }
  methods = {
    changeCount(e) {
      // 当前的count值
      // console.log(e.detail)
      const count = e.detail
      // 当前商品的id
      // console.log(e.target.dataset.id)
      const id = e.target.dataset.id
      this.$parent.changeCountById(id, count)
    },
    statusChanged(e) {
      // 复选框的选中状态
      // console.log(e.detail)
      const check = e.detail
      // 商品id
      const id = e.target.dataset.id
      this.$parent.changeCheckById(id, check)
    },
    // 根据id删除商品
    close(id) {
      this.$parent.deleteById(id)
    },
    // 修改所以商品选中状态
    changefullCheck(e) {
      // console.log(e.detail)
      this.$parent.changeCheckByFull(e.detail)
    },
    // 提交订单
    submitOrder() {
      if (this.amount <= 0) {
        return wepy.baseToast('交易金额不能为0！')
      }
      wepy.navigateTo({
        url: '/pages/order'
      })
    }
  }
  onLoad() {
    this.cart = this.$parent.globalData.cart
  }
  computed = {
    isEmpty() {
      if (this.cart.length <= 0) {
        return true
      } else {
        return false
      }
    },
    // 计算选中商品的总价
    amount() {
      let tatol = 0
      this.cart.forEach(item => {
        if (item.isCheck) {
          tatol += item.price * item.count
        }
      })
      // console.log(tatol)
      return tatol * 100
    },
    // 计算全选
    isFullCheack() {
      const full = this.cart.length
      let c = 0
      this.cart.forEach(item => {
        if (item.isCheck) {
          c++
        }
      })
      return full === c
    }
  }
}
