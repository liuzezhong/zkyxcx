//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World!!!',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    console.log(wx.getStorageSync('skey'));
    var that = this;
    wx.request({
      url: 'http://192.168.100.252/index.php?m=home&c=login&a=getUserInfo',
      data: {
        skey: wx.getStorageSync('skey'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  
  huodong: function(event) {
    wx.navigateTo({
      url: '../details/details'
    })
  }
})
