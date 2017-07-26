// form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasksInfo: {},
    projectInfo: {},
    formData:{},
    formInfo:{},
    tasks_id: 0,
    project_id: 0,

    testPro: [{ msg: '1' }, { msg: '2' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var tasks_id = options.tasks_id;
    var project_id = options.project_id;
    that.setData({
      tasks_id : tasks_id,
      project_id : project_id,
    });
    wx.request({
      url: 'http://192.168.100.252/index.php?m=activity&c=index&a=getActivityForms', //仅为示例，并非真实的接口地址
      data: {
        tasks_id: tasks_id,
        project_id: project_id,
      },
      
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          'tasksInfo': res.data.tasks,
          'projectInfo': res.data.project,
          'formInfo': res.data.enrol_name,
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

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value;
    var tasks_id = this.data.tasks_id;
    var project_id = this.data.project_id;
    var skey = wx.getStorageSync('skey');
    this.setData({
      formData: formData,
    });
    console.log(tasks_id);
    console.log(project_id);

    wx.request({
      url: 'http://192.168.100.252/index.php?m=activity&c=index&a=saveForms', //仅为示例，并非真实的接口地址
      data: {
        tasks_id: tasks_id,
        project_id: project_id,
        formData: JSON.stringify(this.data.formData),
        testPro: this.data.testPro,
        skey: skey,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        console.log(res.data);
        if(res.data.status == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }else if(res.data.status == 1) {
          wx.navigateTo({
            url: '/pages/success/success',
          })
          /*  
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.switchTab({
                url: '/pages/task/index/index'
              })
                   
            }
          })
          */
        }
        
      },
    });

  },
})