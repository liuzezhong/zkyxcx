import $ from '../../../common/common.js';
// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasksInfo: {},
    project_value: [],
    project_key: [],
    index: 0,
    tasks_id: 0,
    enrol_flag:0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tasks_id = options.tasks_id;    
    var that = this;
    that.setData({
      'tasks_id': tasks_id,
    });
  },
  
  onShow: function (options) {
    var tasks_id = this.data.tasks_id;
    var that = this;
    $.post('/index.php?m=activity&c=index&a=getActivityDetails', { tasks_id: tasks_id, skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {

      that.setData({
        'tasksInfo': res.data.tasks,
        'project_value': res.data.project_value,
        'project_key': res.data.project_key,
        'enrol_flag': res.data.enrol_flag,
        'enrol': res.data.enrol,
      });
    });
  },

  bindPickerChange: function (e) {
    var tasks_id = this.data.tasks_id;
    
    this.setData({
      index: e.detail.value
    });
    var project_id = this.data.project_key[this.data.index];
    
    wx.navigateTo({
      url: '/pages/task/form/form?tasks_id='+tasks_id+'&project_id='+project_id,
    })
  },

  bindReportPickerChange: function (e) {
    var tasks_id = this.data.tasks_id;
    wx.navigateTo({
      url: '/pages/task/form/form?tasks_id=' + tasks_id + '&project_id=-1',
    })
  },

  onPullDownRefresh: function () {
  
    var tasks_id = this.data.tasks_id;
    var that = this;

    $.post('/index.php?m=activity&c=index&a=getActivityDetails', { tasks_id: tasks_id, skey: JSON.stringify(wx.getStorageSync('skey')), }, function (res) {
      
      that.setData({
        'tasksInfo': res.data.tasks,
        'project_value': res.data.project_value,
        'project_key': res.data.project_key,
        'enrol_flag': res.data.enrol_flag,
      });
      wx.stopPullDownRefresh();
    });
  }
})