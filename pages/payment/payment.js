import $ from '../../common/common.js';
import config from '../../common/config.js';

// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_fee: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      total_fee: options.paymentmoney,
    });
  },

  primary: function() {
    var data = {
      skey: wx.getStorageSync('skey'),
      total_fee: this.data.total_fee * 100,
      body: '中铠街区-比赛报名费',
    };
    
    $.post('index.php?m=activity&c=wxpay&a=getRequestPayment',data,function(res){
      wx.requestPayment({
        'timeStamp': res.data.timeStamp.toString(),
        'nonceStr': res.data.nonceStr,
        'package': res.data.packages,
        'paySign': res.data.paySign,
        'signType': 'MD5',
        'success': function (res) {
          console.log(res);
          wx.request({
            url: config.server+'index.php?m=activity&c=wxpay&a=getRequestPayment'
          })
        },
        'fail': function (res) {
          console.log(res);
        }
      })
    });
  }
})