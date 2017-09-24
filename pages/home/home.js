// home.js
import $ from '../../common/common.js';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userTasks: {},
    userTasksAlready: {},
    scene: 0,
    sign_task: {},
    userTasksStatus: 0,
    userTasksAlreadyStatus: 0,
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('home.js onLoad');
    if (app.globalData.userInfo) {
      this.setData({
        //userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log('app.js用户信息存在！ ');
      console.log(wx.getStorageSync('skey'));
      $.post('index.php?m=activity&c=user&a=index', { skey: JSON.stringify(wx.getStorageSync('skey')), },             function (res) {
        that.setData({
          'userInfo': res.data.userInfo,
          'userTasks': res.data.userTasks,
          'userTasksAlready': res.data.userTasksAlready,
          'userTasksStatus': res.data.userTasksStatus,
          'userTasksAlreadyStatus': res.data.userTasksAlreadyStatus,
          hasUserInfo: true
        });
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('app.js不存在 执行回调函数！ ');
      app.userInfoReadyCallback = res => {
        $.post('index.php?m=activity&c=user&a=index', { skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
          that.setData({
            'userInfo': res.data.userInfo,
            'userTasks': res.data.userTasks,
            'userTasksAlready': res.data.userTasksAlready,
            'userTasksStatus': res.data.userTasksStatus,
            'userTasksAlreadyStatus': res.data.userTasksAlreadyStatus,
            hasUserInfo: true
          });
        });
      }
    }

    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // var scene = 0;
    // if (decodeURIComponent(options.scene)) {
    //   scene = decodeURIComponent(options.scene);
    // }

    // if (scene != 0) {
    //   that.setData({
    //     scene: scene,
    //   });
    //   $.post('/index.php?m=activity&c=index&a=setSign', { skey: JSON.stringify(wx.getStorageSync('skey')), tasks_id: scene, }, function (res) {
    //     that.setData({
    //       sign_task: res.data.sign_task,
    //     });
    //   });
    // }

     

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   var that = this;
  //   $.post('/index.php?m=activity&c=user&a=index', { skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
  //     that.setData({
  //       'userInfo': res.data.userInfo,
  //       'userTasks': res.data.userTasks,
  //       'userTasksAlready': res.data.userTasksAlready,
  //       'userTasksStatus': res.data.userTasksStatus,
  //       'userTasksAlreadyStatus': res.data.userTasksAlreadyStatus,
  //       hasUserInfo: true
  //     });
  //   });
  // },

  findTask: function (event) {
    wx.navigateTo({
      url: '/pages/task/index/index',
    })
  },

  receive: function (event) {
    this.setData({
      scene: 0,
    });
    $.post('index.php?m=activity&c=user&a=addRankMoney', { skey: JSON.stringify(wx.getStorageSync('skey')),reward: this.data.reward,},function(res){
      wx.redirectTo({
        url: '/pages/home/home',
      })
    });
  },

  rankTian: function (event) {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },

  getUserInfo: function (event) {
    
    var that = this;
    if (event.detail.errMsg == 'getUserInfo:ok') {
      //用户授权
      console.log('用户授权登陆');
      console.log(wx.getStorageSync('skey'));
      console.log(event.detail.userInfo);
      var data = {
        sessionArray: JSON.stringify(wx.getStorageSync('skey')),
        userInfo: JSON.stringify(event.detail.userInfo),
      };

      $.post('index.php?m=activity&c=user&a=saveUserInfo', data,function(res){
        console.log(res.data);
        $.post('index.php?m=activity&c=user&a=index', { skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
          that.setData({
            'userInfo': res.data.userInfo,
            'userTasks': res.data.userTasks,
            'userTasksAlready': res.data.userTasksAlready,
            'userTasksStatus': res.data.userTasksStatus,
            'userTasksAlreadyStatus': res.data.userTasksAlreadyStatus,
            hasUserInfo: true
          });
        });
      });
      
    } else if (event.detail.errMsg == 'getUserInfo:fail auth deny') {
      //用户拒绝
      console.log('用户拒绝授权！');
    }

  },
  
  openTheTasks: function (event) {
    wx.navigateTo({
      url: '/pages/task/detail/detail?tasks_id=' + event.currentTarget.id,
    })
  },  

  onPullDownRefresh: function () {
    var that = this;
    $.post('index.php?m=activity&c=user&a=index', { skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
      that.setData({
        'userInfo': res.data.userInfo,
        'userTasks': res.data.userTasks,
        'userTasksAlready': res.data.userTasksAlready,
        'userTasksStatus': res.data.userTasksStatus,
        'userTasksAlreadyStatus': res.data.userTasksAlreadyStatus,
        hasUserInfo: true
      });
    });
    wx.stopPullDownRefresh();
  },

})