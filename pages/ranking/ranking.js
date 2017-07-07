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
    myRank: {
      rankNumber: 1021,
      rankMoney: 66
    },

    object: {
      text: 'init data'
    },

    userRank: [
      {
        userAvatarUrl: 'http://img1.2345.com/duoteimg/qqTxImg/11/542b567ecf0f2794.jpg!200x200.jpg',
        userName: '刘泽中',
        rankMoney: 12230,
        percentage: "100%"
      },
      {
        userAvatarUrl: 'http://www.qqxoo.com/uploads/allimg/170129/2255523224-5.jpg',
        userName: '周杰伦',
        rankMoney: 5681,
        percentage: "76%"
      },
      {
        userAvatarUrl: 'http://img1.skqkw.cn:888/2014/12/08/07/rf5rlvjegvz-10335.jpg',
        userName: '白骨精',
        rankMoney: 924,
        percentage: "61%"
      },
      {
        userAvatarUrl: 'http://img2.imgtn.bdimg.com/it/u=3065230094,1438966738&fm=26&gp=0.jpg',
        userName: '王大锤',
        rankMoney: 736,
        percentage: "54%"
      },
      {
        userAvatarUrl: 'http://www.qqxoo.com/uploads/allimg/170705/1412591Z3-2.jpg',
        userName: '中铠云',
        rankMoney: 681,
        percentage: "49%"
      },
      {
        userAvatarUrl: 'http://img1.skqkw.cn:888/2014/12/08/07/rf5rlvjegvz-10335.jpg',
        userName: '白骨精',
        rankMoney: 544,
        percentage: "42%"
      },
      {
        userAvatarUrl: 'http://k2.jsqq.net/uploads/allimg/1706/7_170622145618_8.jpg',
        userName: '金大宝',
        rankMoney: 412,
        percentage: "34%"
      },
    ],

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
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    }),
    wx.request({
      url: 'http://localhost/index.php?m=home&c=rank&a=index', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          'userRank': res.data
        });
      }
    })
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