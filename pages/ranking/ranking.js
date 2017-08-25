import $ from '../../common/common.js';
// pages/ranking/ranking.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        link: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        link: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    
    userRank: [],

    indicatorDots: true,  //是否出现焦点
    autoplay: true,       //是否自动切换
    interval: 4000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    $.post('index.php?m=activity&c=user&a=rank', { skey: JSON.stringify(wx.getStorageSync('skey')), },function(res){
      that.setData({
        'userRank': res.data.ranks,
        'userInfo': res.data.userInfo
      });    
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    $.post('index.php?m=activity&c=user&a=rank', { skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
      that.setData({
        'userRank': res.data.ranks,
        'userInfo': res.data.userInfo
      });
      wx.stopPullDownRefresh();
    });
  },

})