import $ from '../../../common/common.js';
// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasksList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    $.post('/index.php?m=activity&c=index&a=getActivity',{},function(res){
      that.setData({
        'tasksList': res.data,
      });  
    });
  },
  onShow: function () {
    var that = this;
    $.post('/index.php?m=activity&c=index&a=getActivity', {}, function (res) {
      that.setData({
        'tasksList': res.data,
      });
    });
  },

  tapList: function(event) {
    wx.navigateTo({
      url: '/pages/task/detail/detail?tasks_id=' + event.currentTarget.id,
    })
  },

  onPullDownRefresh : function() {
    var that = this;
    $.post('/index.php?m=activity&c=index&a=getActivity', {}, function (res) {
      that.setData({
        'tasksList': res.data,
      });
      wx.stopPullDownRefresh();
    });
  }
})