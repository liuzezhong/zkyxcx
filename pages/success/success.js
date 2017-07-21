// success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      console.log(res.target)
    }
    return {
      title: '邀请好友一起报名',
      path: '/',
      success: function (res) {
        console.log(res.shareTickets[0]);
        if (res.shareTickets[0]) {
          //用户+100积分
          wx.showToast({
            title: '转发成功！',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateBack({
                delta: 4,
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.shareTickets[0]);
      }
    }
  },
})