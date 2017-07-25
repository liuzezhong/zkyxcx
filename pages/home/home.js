// home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userTasks: {},
    userTasksAlready: {},
    scene: 0,
    tasks_name: '比赛',
    reward: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('home.js onLoad');
    console.log(options);
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene);
    console.log(scene);
    console.log('**************');
        
    var that = this;
    wx.request({
      url: 'http://192.168.100.252/index.php?m=activity&c=user&a=index', //仅为示例，并非真实的接口地址
      data: {
        skey: wx.getStorageSync('skey'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          'userInfo': res.data.userInfo,
          'userTasks': res.data.userTasks,
          'userTasksAlready': res.data.userTasksAlready,
        });
      }
    });

    if(scene) {
      that.setData({
        scene : scene,
      });
      console.log(wx.getStorageSync('skey'));
      wx.request({
        url: 'http://192.168.100.252/index.php?m=activity&c=index&a=setSign', //仅为示例，并非真实的接口地址
        data: {
          skey: wx.getStorageSync('skey'),
          tasks_id: scene,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data.sign_task.title);
          that.setData({
            tasks_name: res.data.sign_task.title,
            reward: res.data.sign_task.reward,
          });
        }
      })
    }
    
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

  findTask: function(event) {
  
    wx.navigateTo({
      url: '/pages/task/index/index',
    })
  },

  receive: function(event) {
    this.setData({
      scene: 0,
    });

    wx.request({
      url: 'http://192.168.100.252/index.php?m=activity&c=user&a=addRankMoney', //仅为示例，并非真实的接口地址
      data: {
        skey: wx.getStorageSync('skey'),
        reward: this.data.reward,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        wx.redirectTo({
          url: '/pages/home/home',
        })
      }
    })
  }
})