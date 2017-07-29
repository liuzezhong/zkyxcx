import $ from '../../common/common.js';

// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },

  primary: function() {
    
    wx.request({
      url: 'http://192.168.100.252/index.php?m=activity&c=wxpay&a=getRequestPayment', //仅为示例，并非真实的接口地址
      data: {
        skey: wx.getStorageSync('skey'),
        total_fee: 1,
        body: '中铠街区-比赛报名费',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp.toString(),
          'nonceStr': res.data.nonceStr,
          'package': res.data.packages,          
          'paySign': res.data.paySign,
          'signType': 'MD5',
          'success': function (res) {
            console.log(res);
          },
          'fail': function (res) {
            console.log(res);
          }
        })
      }
    });    
  }
})