//app.js
App({
  onLaunch: function () {
    console.log('onLaunch');
    console.log(wx.getStorageSync('skey'));
    var that = this;    
    wx.checkSession({
      success: function () {
        //查看本地缓存是否存在skey
        var skey = wx.getStorageSync('skey');
        if(skey) {
          //存在本地缓存再去服务端验证
          wx.request({
            url: 'http://192.168.100.252/index.php?m=home&c=login&a=checksession',
            data: {
              skey: skey,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              if (res.data.status == 0) {
                
                that.userLogin(); //重新登录
              }
            }
          })
        } else if(!skey) {
          //不存在本地缓存直接登录
          that.userLogin() //重新登录
        }
      },
      fail: function () {
        //登录态过期
        that.userLogin() //重新登录
      }
    })
    
  },

  userLogin: function() {
    wx.login({
      success: function (res_code) {
        if (res_code.code) {
          wx.getUserInfo({
            success: function (res) {
              //发起网络请求
              
              wx.request({
                url: 'http://192.168.100.252/index.php?m=home&c=login&a=index',
                data: {
                  res_code: res_code.code,
                  res_info: res.rawData,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                  var skey = res.data;
                  if (skey.status == 1) {
                    wx.setStorageSync('skey', skey.data);
                    console.log('app.js userLogin');
                    console.log(wx.getStorageSync('skey'));
                    wx.redirectTo({
                      url: '/pages/home/home',
                    })
                  } else if (skey.status == 0) {
                  }
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res_code) {
          if (res_code.code) {
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)

                //发起网络请求
                wx.request({
                  url: 'http://192.168.100.252/index.php?m=home&c=login&a=index',
                  data: {
                    res_code: res_code.code,
                    res_info: res.rawData,
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  success: function (res) {
                    var skey = res.data;
                    
                    if(skey.status == 1) {
                      wx.setStorage({
                        key: "skey",
                        data: skey.data,
                      })
                    }else if(skey.status == 0){
                      console.log(skey.message);
                    }
                  }
                })
              }
            })            
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  //全局变量默认为零
  globalData: 0,

  onShow: function (options) {
    
  },
})