const height = []
const weight = []


for (let i = 150; i <= 200; i++) {
  height.push(i+'cm')
}

for (let i = 40; i <= 200; i++) {
  weight.push(i+'kg')
}


Page({
  data: {
    height: height,
    weight: weight,
    items: [
      { name: 'm', value: '男' },
      { name: 'w', value: '女'},
    ],
    region: ['江苏省', '无锡市', '北塘区'],
    xueArray: ['请选择','A', 'B', 'O', 'AB'],
    clothSize: ['请选择','S','M','L','XL','XXL'],
    culturalLevel: ['请选择','小学','初中','高中','大专','本科','硕士','博士'],
    index: 0,  
    heightIndex: 0,
    wightIndex: 0,
    clothIndex: 0,
    culturalLevelIndex: 0,
  },
  test1: function(){
    console.log('2323');
  },
  bindblur: function() {
    console.log('1212');
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})
