// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carousel: {
      imgs: [
        'http://qiniu.lijianfei.com/uPic/meilala_banner_tiny.png',
        'http://qiniu.lijianfei.com/uPic/meilala_bannner_tiny2.png',
        'http://qiniu.lijianfei.com/uPic/meilala_banner_tiny3.png',
      ],
      currentIndex: 0,
    },
    list:[
      {
        img:'http://qiniu.lijianfei.com/uPic/meilala_jinzhun_tiny.png',
        title:"吊坠按摩仪",
        path:'../index/index'
      },
      {
        img:'http://qiniu.lijianfei.com/uPic/meilala_mianmo_tiny.png',
        title:"智能面膜仪",
        path:'../mianmo/mianmo'
      }
    ]
  },
  swiperChange:function (e) {
    var that =this;
    var carousel = that.data.carousel;
    carousel.currentIndex = e.detail.current;
    that.setData({
      carousel: carousel
    });
  },
  buttonTap:function(e){
    var bean = e.currentTarget.dataset.bean // e.currentTarget
    // console.log(bean)
    if(bean.path){
      wx.navigateTo({
        url: bean.path
      })
    }else{
      wx.showToast({
        title: '此功能暂未开放',
        icon: 'error',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})