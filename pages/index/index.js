//index.js
//获取应用实例
var gearBase64 = require('./gearBase64')
var hotArray = require('./hotImage')
Page({
  data: {
    func1_selected: false,
    func1_image: "../../images/4modeImage/1.png",
    func1_image_HL: "../../images/4modeImage/1-1.png",
    func2_selected: false,
    func2_image: "../../images/4modeImage/2.png",
    func2_image_HL: "../../images/4modeImage/2-2.png",
    func3_selected: false,
    func3_image: "../../images/4modeImage/3.png",
    func3_image_HL: "../../images/4modeImage/3-3.png",
    func4_selected: false,
    func4_image: "../../images/4modeImage/4.png",
    func4_image_HL: "../../images/4modeImage/4-4.png",
    func5_selected: false,
    func5_image: "../../images/hotModeImage/hot.png",
    func5_image_HL: "../../images/hotModeImage/hot_1.png",
    hot:0,
    hotImageNow:hotArray.hot[0],
    gear:0,
    gearImageNow: gearBase64.gear[0],
    isConnected:false,
    bule_image:'../../images/buleImage/1.png',
    bule_image_HL:'../../images/buleImage/1-1.png',
    scaning: false,
    devices:[],
    deviceId:null,
    deviceName:null,
    serviceId:null,
    characteristicId_sender:null,
    characteristicId_notify:null,
    isMonitoring:false
  },
  // 交互事件函数
  func1: function () {
    this.setData({
      func1_selected: !this.data.func1_selected,
      func2_selected: false,
      func3_selected: false,
      func4_selected: false
    })
    this.logMode()
    this.write('0xDD,0x01,0x01,0x64,0x55')
  },
  func2: function () {
    this.setData({
      func1_selected: false,
      func2_selected: !this.data.func2_selected,
      func3_selected: false,
      func4_selected: false
    })
    this.logMode()
  },
  func3: function () {
    this.setData({
      func1_selected: false,
      func2_selected: false,
      func3_selected: !this.data.func3_selected,
      func4_selected: false
    })
    this.logMode()
  },
  func4: function () {
    this.setData({
      func1_selected: false,
      func2_selected: false,
      func3_selected: false,
      func4_selected: !this.data.func4_selected
    })
    this.logMode()
  },
  func5: function () {
    let hot = this.data.hot
    hot = 0
    this.setData({
      func5_selected: !this.data.func5_selected,
      hot:hot,
      hotImageNow:hotArray.hot[hot]
    })
  },
  hotSub:function(){
    if(this.data.func5_selected == true){
      let hot = this.data.hot
      if (hot>0) {
        hot--
        this.setData({
          hot:hot,
          hotImageNow:hotArray.hot[hot]
        })
      }
    }
    else{
      wx.showToast({
        title: '请打开热敷模式',
        icon: 'error',
        duration: 2000
      })
      
    }
  },
  hotAdd:function(){
    if(this.data.func5_selected == true){
      let hot = this.data.hot
      if (hot<3) {
        hot++
        this.setData({
          hot:hot,
          hotImageNow:hotArray.hot[hot]
        })
      }
    }
    else{
      wx.showToast({
        title: '请打开热敷模式',
        icon: 'error',
        duration: 2000
      })
    }
  },
  // 四种模式输出
  logMode: function () {
    console.log('活力模式是否打开' + this.data.func1_selected)
    console.log('轻享模式是否打开' + this.data.func2_selected)
    console.log('敲打模式是否打开' + this.data.func3_selected)
    console.log('舒缓模式是否打开' + this.data.func4_selected)
  },

  gearAdd:function () {
    let gear = this.data.gear
    if (gear<9) {
      gear++
      this.setData({
        gear:gear,
        gearImageNow:gearBase64.gear[gear]
      })
    }
  },
  gearSub:function () {
    let gear = this.data.gear
    if (gear>0) {
      gear--
      this.setData({
        gear:gear,
        gearImageNow:gearBase64.gear[gear]
      })
    }
  },

  setBuleConnet:function(e){
    const {
      isConnected
    } = this.data

    if (isConnected) {
      this.disconnect(e)
    } else {
      this.initBlue()
    }
  },

  // 生命周期函数
  onLoad: function(){

  },

  bindItemTap:function(e){
    this.connect(e)
  },

  actionSheetChange:function(){

  },

  actionSheetCancel:function(){
    this.setData({
      scaning:false
    })
  },

  initBlue: function() {
    // 自动初始化蓝牙模块
    let that = this;
    wx.showLoading({
      title: '开启蓝牙适配'
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log("初始化蓝牙适配器成功");
        // wx.showToast({
        //   title: '初始化蓝牙适配器成功',
        //   icon: 'success',
        //   duration: 2000
        // })
        that.scan();
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({
          title: '蓝牙初始化失败',
          icon: 'error',
          duration: 2000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    });
  },
  scan: function () {
    console.log('scaning')
    let that = this
    let devices = []
    this.setData({
        scaning: true,
      }),
      wx.startBluetoothDevicesDiscovery({
        services: [],
        allowDuplicatesKey: false,
        success: function (res) {
          // 搜索成功
          // console.log('已发现设备列表',res)
          wx.onBluetoothDeviceFound(res => {
            // console.log(`lijianfei:${JSON.stringify(res)}`)
            if (res.devices[0].name == 'AMY_000003') {
              console.log('已发现设备列表', res)
              devices.push(res.devices[0])
            }
            that.setData({
              devices: devices
            })
          })
        },
        fail: function (err) {
          console.log('搜索失败', err);
          wx.showToast({
            title: '蓝牙搜索失败',
            icon: 'error',
            duration: 2000
          })
        },
        complete: () => {
          // 停止搜索
          setTimeout(function () {
            wx.stopBluetoothDevicesDiscovery()
            // that.setData({
            //   scaning: false,
            // })
          }, 3000)
        }
      });
  },
  connect: function (e) {
    console.log(e)
    // 连接设备
    let that = this
    let deviceId = e.currentTarget.dataset.name.deviceId
    let deviceName = e.currentTarget.dataset.name.name
    console.log('deviceId', deviceId)
    wx.createBLEConnection({
      deviceId: deviceId,
      success: (res) => {
        console.log('设备已连接成功')
        console.log(res)
        // 连接成功
        that.setData({
          isConnected: true,
          deviceId: deviceId,
          deviceName: deviceName,
          scaning:false
        })
        wx.showToast({
          title: '设备已连接',
          icon: 'success',
          duration: 2000
        })
        // 获取设备Service信息
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: (res) => {
            console.log('Service信息', res)
            const serviceId = res.services[1].uuid;
            console.log('serviceId', serviceId)
            that.setData({
              serviceId: serviceId,
            })
            // 获取设备Characteristic信息 (必须在获得serviceID之后)
            wx.getBLEDeviceCharacteristics({
              deviceId: deviceId,
              serviceId: serviceId,
              success: (res) => {
                console.log('Characteristic信息', res)
                const characteristicId_sender = res.characteristics[0].uuid
                const characteristicId_notify = res.characteristics[1].uuid
                console.log('characteristicId_sender', characteristicId_sender)
                console.log('characteristicId_notify', characteristicId_notify)
                that.setData({
                  characteristicId_sender: characteristicId_sender,
                  characteristicId_notify: characteristicId_notify
                })
                that.notify()
              },
              fail: err => {
                console.log(err)
              }
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        // 连接失败
        console.log(err)
      }
    })
  },
  disconnect: function (e) {
    const {
      deviceId
    } = this.data

    // 断开已连接设备
    const that = this
    wx.closeBLEConnection({
      deviceId: deviceId,
      success: (res) => {
        console.log('设备已断开连接')
        // console.log(res)
        that.setData({
          isConnected: false,
        })
        wx.showToast({
          title: '设备已断开连接',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  notify: function () {
    // 更改通知监听
    const that = this
    const {
      deviceId,
      serviceId,
      characteristicId_notify,
      isMonitoring
    } = this.data
    // console.log(this.data)
    wx.notifyBLECharacteristicValueChange({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId_notify,
      state: true,
      success: res => {
        console.log('开启监听成功', res)
        // 监听蓝牙设备错误事件，包括异常断开等等
        wx.onBLEConnectionStateChange(res => {
          console.log(res)
          that.setData({
            isConnected: res.connected,
          })
          if (res.connected === false) {
            wx.showToast({
              title: '设备已断开连接',
              icon: 'success',
              duration: 2000
            })
          } 
        })
        // 监听低功耗蓝牙设备的特征值变化
        wx.onBLECharacteristicValueChange(res => {
          console.log(res)
          // 将bufferArray类型转为string类型
          console.log('接收到数据：' + that.buf2string(res.value))
          // 因为buffer不能直接在console.log里输出，会显示null
          var hex = that.ab2hex(res.value)
          console.log(hex)
        })
        that.setData({
          isMonitoring: true
        })
      },
      fail: err => {
        that.setData({
          isMonitoring: false
        })
        console.log('监听状态更新失败', err)
      }
    })
  },
  write: function (e) {
    var that = this
    let buffer = that.hexStringToArrayBuffer('ÝdU');
    // let buffer = new ArrayBuffer(6)
    // let dataView = new DataView(buffer)
    // dataView.setUint8(4, 187)
    // dataView.setUint8(5, 50)

    // 向蓝牙设备发送一个0x00的16进制数据
    // let buffer = new ArrayBuffer(5)
    // let dataView = new DataView(buffer)
    // dataView.setUint8(0, 221)
    // dataView.setUint8(1, 1)
    // dataView.setUint8(2, 1)
    // dataView.setUint8(3, 100)
    // dataView.setUint8(4, 85)

    console.log("buff is", buffer);
    if (that.data.isConnected) {
      //写入数据
      wx.writeBLECharacteristicValue({
        deviceId: that.data.deviceId,
        serviceId: that.data.serviceId,
        characteristicId: that.data.characteristicId_sender,
        value: buffer,
        success: function (res) {
          console.log('发送成功')
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '蓝牙已断开',
        showCancel: false,
        success: function (res) {
          that.setData({
            isConnected: false
          })
        }
      })
    }

  },

  // ArrayBuffer转16进度字符串示例
  ab2hex: function (buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('');
  },
  arrayBufferToHexString: function (buffer) {
    let bufferType = Object.prototype.toString.call(buffer)
    if (buffer != '[object ArrayBuffer]') {
      return
    }
    let dataView = new DataView(buffer)

    var hexStr = '';
    for (var i = 0; i < dataView.byteLength; i++) {
      var str = dataView.getUint8(i);
      var hex = (str & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }

    return hexStr.toUpperCase();
  },
  hexStringToArrayBuffer: function (str) {
    if (!str) {
      return new ArrayBuffer(0);
    }

    var buffer = new ArrayBuffer(str.length);
    let dataView = new DataView(buffer)

    let ind = 0;
    for (var i = 0, len = str.length; i < len; i += 2) {
      let code = parseInt(str.substr(i, 2), 16)
      dataView.setUint8(ind, code)
      ind++
    }
    return buffer;
  },
  buf2hex: function (buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
  },
  buf2string: function (buffer) {
    var arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i])
    }
    return str
  },
})