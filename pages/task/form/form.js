import $ from '../../../common/common.js';
// form.js

const height = []
const weight = []
height.push('请选择身高')
weight.push('请选择体重')
for (let i = 150; i <= 200; i++) {
  height.push(i + 'cm')
}

for (let i = 40; i <= 200; i++) {
  weight.push(i + 'kg')
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasksInfo: {},
    projectInfo: {},
    formData:{},
    formInfo:{},
    enrol_value:{},
    tasks_id: 0,
    project_id: 0,
    items: [
      { name: '男', value: '男' },
      { name: '女', value: '女' },
    ],
    testPro: [{ msg: '1' }, { msg: '2' }],
    
    xueArray: ['请选择血型', 'A', 'B', 'O', 'AB'],
    clothSize: ['请选择尺码', 'S', 'M', 'L', 'XL', 'XXL'],
    culturalLevel: ['请选择学历', '小学', '初中', '高中', '大专', '本科', '硕士', '博士'],
    multiArray: [['IT|互联网', '金融业', '房地产', '商业服务', '批发|零售', '文体教育', '生产制造', '交通|物流', '服务业', '文化|体育', '能源|环保', '政府', '农|林|牧|渔', '其它'], ['互联网', '计算机软件', 'IT服务', '电子技术', '计算机硬件', '网络设备', '电信运营', '网络游戏']],
    multiIndex: [0, 0],
    bloodIndex: 0,
    heightIndex: 0,
    wightIndex: 0,
    clothIndex: 0,
    culturalIndex:0,
    enrol_flag: 0,
    pay_status:0,
    height: height,
    weight: weight,
    date: '1995-10-25',
    region: ['江苏省', '无锡市', '北塘区'],
  
  },

  setInputValue:function (e) {
    var value_id = e.currentTarget.id;
    var value = e.detail.value;
    var save = "enrol_value[" + value_id + "].value";
    var param = {};
    param[save] = value;
    this.setData(param);
  },

  bindDateChange: function (e) {
    
    this.setData({
      date: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    
    this.setData({
      region: e.detail.value
    })
  },

  radioChange: function (e) {
   
    this.setData({
      gender: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    
    this.setData({
      bloodIndex: e.detail.value,
    })
  },

  bindSGPickerChange: function (e) {
    
    this.setData({
      heightIndex: e.detail.value,
    })
  },

  bindTZPickerChange: function (e) {
    
    this.setData({
      wightIndex: e.detail.value,
    })
  },

  bindCMPickerChange: function (e) {
    
    this.setData({
      clothIndex: e.detail.value,
    })
  },

  bindXLPickerChange: function (e) {
    
    this.setData({
      culturalIndex: e.detail.value,
    })
  },

  bindMultiPickerChange: function (e) {
  
    this.setData({
      multiIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var tasks_id = options.tasks_id;
    var project_id = options.project_id;
    
    if(project_id == -1) {
      //已经报名
      that.setData({ enrol_flag: 1});
      $.post('/index.php?m=activity&c=index&a=getActivityFormsReport', { tasks_id: tasks_id, skey: JSON.stringify(wx.getStorageSync('skey'))},function (res){
        
        that.setData({
          'tasksInfo': res.data.tasks,
          'projectInfo': res.data.project,
          'formInfo': res.data.enrol_name,
          'enrol_value': res.data.enrol_value,
          'project_id': res.data.project_id,
          'tasks_id': res.data.tasks_id,
          'pay_status': res.data.pay_status,
        });
        wx.setNavigationBarTitle({
          title: res.data.tasks.title,
        });
        var enrol_value = res.data.enrol_value;
        for(var i in enrol_value) {
          if(enrol_value[i]['name_id'] == 3) {
            //出生日期
            that.setData({ date: enrol_value[i]['value']});
          } else if (enrol_value[i]['name_id'] == 4) {
            //性别
            if (enrol_value[i]['value'] == '男') {
              var xingbie = [
                { name: '男', value: '男', checked: 'true'},
                { name: '女', value: '女' },
              ];
            } else if (enrol_value[i]['value'] == '女') {
              var xingbie = [
                { name: '男', value: '男' },
                { name: '女', value: '女', checked: 'true' },
              ];
            }
            that.setData({ items: xingbie });
          } else if (enrol_value[i]['name_id'] == 5) {
            //血型
            var xueArray = that.data.xueArray;
            for(var j in xueArray) {
              if (xueArray[j] == enrol_value[i]['value']) {
                that.setData({ bloodIndex: j});
                break;
              }
            } 

          } else if (enrol_value[i]['name_id'] == 7) {
            //住址
            that.setData({ region: enrol_value[i]['value']});
          } else if (enrol_value[i]['name_id'] == 14) {
            //身高
            var height = that.data.height;
            for(var j in height) {
              if (height[j] == enrol_value[i]['value']) {
                that.setData({ heightIndex: j });
                break;
              }
            }
          } else if (enrol_value[i]['name_id'] == 15) {
            //体重
            var weight = that.data.weight;
            for(var j in weight) {
              if(weight[j] == enrol_value[i]['value']) {
                that.setData({ wightIndex: j});
              }
            }
          } else if (enrol_value[i]['name_id'] == 16) {
            //衣服尺码
            var clothSize = that.data.clothSize;
            for(var j in clothSize) {
              if (clothSize[j] == enrol_value[i]['value']) {
                that.setData({clothIndex: j});
              }
            }
          } else if (enrol_value[i]['name_id'] == 18) {
            //职位
            that.setData({ multiIndex: enrol_value[i]['value']});

          }
        }
      });
    }else {
      //未报名
      that.setData({
        tasks_id: tasks_id,
        project_id: project_id,
      });
      $.post('/index.php?m=activity&c=index&a=getActivityForms', { tasks_id: tasks_id, project_id: project_id }, function (res) {
        that.setData({
          'tasksInfo': res.data.tasks,
          'projectInfo': res.data.project,
          'formInfo': res.data.enrol_name,
        });
        wx.setNavigationBarTitle({
          title: res.data.tasks.title,
        });
      });
      
    };

    
    
  },

  formSubmit: function (e) {
    
    var that = this;
    var formData = e.detail.value;
    var tasks_id = this.data.tasks_id;
    var project_id = this.data.project_id;
    var skey = JSON.stringify(wx.getStorageSync('skey'));
    var out_trade_no = '';
    var enrol_flag = this.data.enrol_flag;
    this.setData({
      formData: formData,
    });
    
    var data = {
      tasks_id: tasks_id,
      project_id: project_id,
      formData: JSON.stringify(this.data.formData),
      testPro: this.data.testPro,
      skey: skey,
    };
    
    if (enrol_flag == 1) {
      //已报名
      var pay_status = that.data.pay_status;
      if(pay_status == 0) {
        //未支付
        $.post('/index.php?m=activity&c=index&a=updateForms', data, function (res) {
          if (that.data.projectInfo.price > 0) {
            var postData = {
              skey: JSON.stringify(wx.getStorageSync('skey')),
              total_fee: that.data.projectInfo.price * 100,
              body: '中铠街区-比赛报名费',
            };
            $.post('/index.php?m=activity&c=wxpay&a=getRequestPayment', postData, function (res) {
              that.setData({
                out_trade_no: res.data.out_trade_no,
              });
              wx.requestPayment({
                'timeStamp': res.data.timeStamp.toString(),
                'nonceStr': res.data.nonceStr,
                'package': res.data.packages,
                'paySign': res.data.paySign,
                'signType': 'MD5',
                'success': function (res) {
                  var data = {
                    skey: JSON.stringify(wx.getStorageSync('skey')),
                    total_fee: that.data.projectInfo.price * 100,
                    tasks_id: that.data.tasks_id,
                    project_id: that.data.project_id,
                    out_trade_no: that.data.out_trade_no,
                  };
                  $.post('/index.php?m=activity&c=wxpay&a=setPayStatus', data, function (res) {
                    wx.navigateTo({
                      url: '/pages/success/success?tasks_id=' + that.data.tasks_id,
                    });
                  });
                },
                'fail': function (res) {
                  console.log(res);
                }
              })
            });
          } else {
            var data = {
              skey: JSON.stringify(wx.getStorageSync('skey')),
              total_fee: that.data.projectInfo.price * 100,
              tasks_id: that.data.tasks_id,
              project_id: that.data.project_id,
              out_trade_no: that.data.out_trade_no,
            };
            $.post('/index.php?m=activity&c=wxpay&a=setPayStatus', data, function (res) {
              wx.navigateTo({
                url: '/pages/success/success?tasks_id=' + that.data.tasks_id,
              });
            });
          }

        });
      }else if(pay_status == 1) {
        //已支付
        $.post('/index.php?m=activity&c=index&a=updateForms', data, function (res) {
          wx.navigateTo({
            url: '/pages/success/success?tasks_id=' + that.data.tasks_id,
          });
        });
      }
    }else if(enrol_flag == 0) {
      //未报名
      $.post('/index.php?m=activity&c=index&a=saveForms', data, function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.status == 1) {
          if (that.data.projectInfo.price > 0) {
            var postData = {
              skey: JSON.stringify(wx.getStorageSync('skey')),
              total_fee: that.data.projectInfo.price * 100,
              body: '中铠街区-比赛报名费',
            };
            $.post('/index.php?m=activity&c=wxpay&a=getRequestPayment', postData, function (res) {
              that.setData({
                out_trade_no: res.data.out_trade_no,
              });
              wx.requestPayment({
                'timeStamp': res.data.timeStamp.toString(),
                'nonceStr': res.data.nonceStr,
                'package': res.data.packages,
                'paySign': res.data.paySign,
                'signType': 'MD5',
                'success': function (res) {
                  var data = {
                    skey: JSON.stringify(wx.getStorageSync('skey')),
                    total_fee: that.data.projectInfo.price * 100,
                    tasks_id: that.data.tasks_id,
                    project_id: that.data.project_id,
                    out_trade_no: that.data.out_trade_no,
                  };
                  $.post('/index.php?m=activity&c=wxpay&a=setPayStatus', data, function (res) {
                    wx.navigateTo({
                      url: '/pages/success/success?tasks_id=' + that.data.tasks_id,
                    });
                  });
                },
                'fail': function (res) {
                  console.log(res);
                }
              })
            });
          } else {
            var data = {
              skey: JSON.stringify(wx.getStorageSync('skey')),
              total_fee: that.data.projectInfo.price * 100,
              tasks_id: that.data.tasks_id,
              project_id: that.data.project_id,
              out_trade_no: that.data.out_trade_no,
            };
            $.post('/index.php?m=activity&c=wxpay&a=setPayStatus', data, function (res) {
              wx.navigateTo({
                url: '/pages/success/success?tasks_id=' + that.data.tasks_id,
              });
            });
          }

        }
      });
    }
  },




  bindMultiPickerColumnChange: function (e) {
    
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['互联网', '计算机软件', 'IT服务', '电子技术', '计算机硬件', '网络设备', '电信运营', '网络游戏'];
            break;
          case 1:
            data.multiArray[1] = ['基金/证券', '保险', '银行','信托/担保'];
            break;
          case 2:
            data.multiArray[1] = ['建筑/建材', '室内设计', '物业管理'];
            break;
          case 3:
            data.multiArray[1] = ['专业服务', '广告/公关', '中介服务', '检验/认证','外包服务'];
            break;
          case 4:
            data.multiArray[1] = ['快速消费品', '耐用消费品', '贸易/进出口', '零售/批发', '租赁服务'];
            break;
          case 5:
            data.multiArray[1] = ['教育/培训', '工艺美术', '奢饰品'];
            break;
          case 6:
            data.multiArray[1] = ['汽车/摩托', '大型设备', '加工制造','仪表仪器','印刷/包装','办公用品','生物工程','医疗设备','航天航空'];
            break;
          case 7:
            data.multiArray[1] = ['交通/运输', '物流/仓储'];
            break;
          case 8:
            data.multiArray[1] = ['医疗/保健', '酒店/餐饮','旅游/度假'];
            break;
          case 9:
            data.multiArray[1] = ['媒体/出版', '体育/休闲'];
            break;
          case 10:
            data.multiArray[1] = ['能源/矿产', '石油/化工','电力/电器','环保'];
            break;
          case 11:
            data.multiArray[1] = ['政府', '公共事业', '非营利机构', '学术/科研'];
            break;
          case 12:
            data.multiArray[1] = ['农业', '林业', '牧业', '渔业','跨领域'];
            break;
          case 13:
            data.multiArray[1] = ['其它'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  

})