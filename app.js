import $ from 'common/common.js';
//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('session 未过期，并且在本生命周期一直有效！');
        if (!wx.getStorageSync('skey')) {
          //数据缓存中的session不存在，重新登录获取session
          console.log('数据缓存中的session不存在，重新登录获取session');
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              $.post('index.php?m=home&c=login&a=get3rd_session', { code: res.code, },function(res){
                console.log(res.data);
                wx.setStorageSync('skey', res.data);
                console.log('重新登录成功，session值写入缓存！');
                // 获取用户的授权情况
              });
            }
          })
        } else if (wx.getStorageSync('skey')) {
            console.log('数据缓存中的session存在！');
            $.post('index.php?m=home&c=login&a=check3rdSession', { skey: JSON.stringify(wx.getStorageSync('skey')),             },function(res){
              console.log(res);
              if (res.data.status == 0) {
                console.log('数据缓存中的session存在，但session比对不成功！');
                that.wxlogin();
              }else {
                console.log('数据缓存中session存在，且session比对成功！');
              }
            });
        }
        
      },
      fail: function () {
        //登录态过期,重新登录
        console.log('session 登录态过期,重新登录！');
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            $.post('index.php?m=home&c=login&a=get3rd_session', { code: res.code, },function(res){
              console.log(res.data);
              wx.setStorageSync('skey', res.data);
              console.log('重新登录成功，session值写入缓存！');
            });
          }
        });
        
      }
    })

    wx.getSetting({
      
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框！');
          console.log(wx.getStorageSync('skey'));
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // while (!wx.getStorageSync('skey')) {

          // }
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 将userInfo写入后台存储
              
              var data = {
                sessionArray: JSON.stringify(wx.getStorageSync('skey')),
                userInfo: JSON.stringify(res.userInfo),
              };

              $.post('index.php?m=activity&c=user&a=saveUserInfo', data, function (res) {
                if (res.status == 1) {
                  // if (getCurrentPages().length != 0) {
                  //   getCurrentPages()[getCurrentPages().length - 1].onLoad();
                  // }
                }
              });
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
          
  },

  wxlogin: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        $.post('index.php?m=home&c=login&a=get3rd_session',{ code:res.code, },function(res){
          wx.setStorageSync('skey', res.data);
          console.log('重新登录成功，session值写入缓存！');
        });
      }
    })
  },

  globalData: {
    userInfo: null
  }  
})