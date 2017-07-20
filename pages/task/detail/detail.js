// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasksInfo: {},
    project_value: [],
    project_key: [],
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    tasks_id: 0,
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
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
    wx.request({
      url: 'http://localhost/index.php?m=activity&c=index&a=getActivityDetails', //仅为示例，并非真实的接口地址
      data: {
        tasks_id: tasks_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          'tasksInfo': res.data.tasks,
          'project_value': res.data.project_value,
          'project_key': res.data.project_key,
        });
      },
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

  },

  bindPickerChange: function (e) {
    var tasks_id = this.data.tasks_id;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    });
    var project_id = this.data.project_key[this.data.index];
    console.log(project_id);
    wx.navigateTo({
      url: '/pages/task/form/form?tasks_id='+tasks_id+'&project_id='+project_id,
    })
  },
})