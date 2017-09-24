import $ from '../../common/common.js';
// success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tasks_id = options.tasks_id;
    this.setData({
      tasks_id: tasks_id,
    });
  },

  resuccess: function (event) {
    wx.navigateBack({
      delta: 4,
    })
  },

  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    });
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('来自页面内转发按钮');
    }
    return {
      title: '邀请好友一起报名',
      path: '/pages/task/detail/detail?tasks_id='+this.data.tasks_id,
      success: function (res) {
      
        //用户+100积分
        var data = {
          skey: JSON.stringify(wx.getStorageSync('skey')),
          reward: 10,
        };
        $.post('index.php?m=activity&c=user&a=addrankmoney',data,function(res){
          console.log('铠币领取成功');
        });
      },
      fail: function (res) {
        console.log(res.shareTickets[0]);
      }
    }
  },
})