//index.js
//获取应用实例
var gearBase64 = require('../index/gearBase64')
var hotArray = require('../index/hotImage')
var command = require('../index/blueCommand')
Page({
  data: {
    func1_selected: false,
    func1_image: "../../images/4modeImage_mianmo/1.png",
    func1_image_HL: "../../images/4modeImage_mianmo/1-1.png",
    func2_selected: false,
    func2_image: "../../images/4modeImage_mianmo/2.png",
    func2_image_HL: "../../images/4modeImage_mianmo/2-2.png",
    func3_selected: false,
    func3_image: "../../images/4modeImage_mianmo/3.png",
    func3_image_HL: "../../images/4modeImage_mianmo/3-3.png",
    func4_selected: false,
    func4_image: "../../images/4modeImage_mianmo/4.png",
    func4_image_HL: "../../images/4modeImage_mianmo/4-4.png",
    func5_selected: true,
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
    isMonitoring:false,
    power:100,
    modelIsOpen:false
  },
  // 功能前置校验
  tipsConnect:function(){
    if(!this.data.isConnected){
      wx.showModal({
        title: '提示',
        content: '蓝牙未连接',
        showCancel: false,
      })
    }
    return this.data.isConnected;
  },
  modelSelected:function(){
    if(this.data.func1_selected || this.data.func2_selected || this.data.func3_selected ||this.data.func4_selected){
      return true
    }
    wx.showModal({
      title: '提示',
      content: '模式未选择',
      showCancel: false,
    })
    return false
  },
  // 交互事件函数
  func1: function () {
    if(!this.tipsConnect()) return
    // 发送模式
    this.write(command.zj_1())
    // 强度调整，停止

    // 加热调整，停止

    this.setData({
      func1_selected: true,
      func2_selected: false,
      func3_selected: false,
      func4_selected: false,
      // hot:0,
      // hotImageNow:hotArray.hot[0],
      gear:1,
      gearImageNow: gearBase64.gear[1],
    })
    this.logMode()
  },
  func2: function () {
    if(!this.tipsConnect()) return;
    // 发送模式
    this.write(command.tn_2())
    // 强度调整，停止
    
    // 加热调整，停止

    this.setData({
      func1_selected: false,
      func2_selected: true,
      func3_selected: false,
      func4_selected: false,
      // hot:0,
      // hotImageNow:hotArray.hot[0],
      gear:1,
      gearImageNow: gearBase64.gear[1],
    })
    this.logMode()
  },
  func3: function () {
    if(!this.tipsConnect()) return;
    // 发送模式
    this.write(command.qd_3())
    // 强度调整，停止
    
    // 加热调整，停止
    
    this.setData({
      func1_selected: false,
      func2_selected: false,
      func3_selected: true,
      func4_selected: false,
      // hot:0,
      // hotImageNow:hotArray.hot[0],
      gear:1,
      gearImageNow: gearBase64.gear[1],
    })
    this.logMode()
  },
  func4: function () {
    if(!this.tipsConnect()) return;

    // 发送模式
    this.write(command.gs_4())
    // 强度调整，停止
    
    // 加热调整，停止
    
    this.setData({
      func1_selected: false,
      func2_selected: false,
      func3_selected: false,
      func4_selected: true,
      // hot:0,
      // hotImageNow:hotArray.hot[0],
      gear:1,
      gearImageNow: gearBase64.gear[1],
    })
    this.logMode()
  },
  func5: function () {
    if(!this.tipsConnect()) return
    if(!this.modelSelected()) return
    let hot = this.data.hot
    hot = 0
    this.setData({
      func5_selected: true,
      hot:hot,
      hotImageNow:hotArray.hot[hot]
    })
  },
  hotSub:function(){
    if(!this.tipsConnect()) return;
    if(this.data.func5_selected == true){
      let hot = this.data.hot
      if (hot>0) {
        hot--
        this.write(command.hot(hot.toString()))
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
    if(!this.tipsConnect()) return;
    if(this.data.func5_selected == true){
      let hot = this.data.hot
      if (hot<3) {
        hot++
        this.write(command.hot(hot.toString()))
        this.setData({
          hot:hot,
          hotImageNow:hotArray.hot[hot]
        })
      }else{
        let hot = this.data.hot
        this.write(command.hot(hot.toString()))
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
    // 当前模式开关
    if(this.data.func1_selected || this.data.func2_selected || this.data.func3_selected ||this.data.func4_selected){
      if(!this.data.modelIsOpen){
        this.write(command.open())
        this.setData({
          modelIsOpen:true
        })
      }
    }else{
      // 关闭
      this.write(command.cloes())
      this.setData({
        modelIsOpen:false
      })
      this.modleNotSelected()
      // 关闭强度
      // 关闭加热
    }
  },
  gearAdd:function () {
    if(!this.tipsConnect()) return
    if(!this.modelSelected()) return
    let gear = this.data.gear
    if (gear<9) {
      gear++
      this.write(command.gear(gear.toString()))
      this.setData({
        gear:gear,
        gearImageNow:gearBase64.gear[gear]
      })
    }else{
      let gear = this.data.gear
      this.write(command.gear(gear.toString()))
    }
  },
  gearSub:function () {
    if(!this.tipsConnect()) return
    if(!this.modelSelected()) return
    let gear = this.data.gear
    if (gear>0) {
      gear--
      this.write(command.gear(gear.toString()))
      this.setData({
        gear:gear,
        gearImageNow:gearBase64.gear[gear]
      })
    }else{
      this.write(command.gear(gear.toString()))
    }
  },
  getPower:function(e){
    if(!this.tipsConnect()) return;
    this.write(command.getPower)
  },
  setBuleConnet:function(e){
    const {
      isConnected
    } = this.data

    if (isConnected) {
      // this.write(command.shutdown)
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
            if (res.devices[0].name.search("AMY") != -1) {
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
    let serviceId = e.currentTarget.dataset.name.advertisServiceUUIDs[0]
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
          serviceId: serviceId,
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
            console.log('Service信息', res.services)
            // 获取设备Characteristic信息 (必须在获得serviceID之后)
            wx.getBLEDeviceCharacteristics({
              deviceId: deviceId,
              serviceId: serviceId,
              success: (res) => {
                console.log('Characteristic信息', res)
                const characteristicId_sender = res.characteristics[1].uuid
                const characteristicId_notify = res.characteristics[0].uuid
                console.log('characteristicId_sender', characteristicId_sender)
                console.log('characteristicId_notify', characteristicId_notify)
                that.setData({
                  characteristicId_sender: characteristicId_sender,
                  characteristicId_notify: characteristicId_notify
                })
                that.notify()
                that.write(command.getCurrent)
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
  modleNotSelected:function(){
    this.setData({
      func1_selected:false,
      func2_selected:false,
      func3_selected:false,
      func4_selected:false,
      func5_selected:true,
      hot:0,
      hotImageNow:hotArray.hot[0],
      gear:0,
      gearImageNow: gearBase64.gear[0],
    })
  },
  disconnectSetData:function(){
    this.setData({
      func1_selected:false,
      func2_selected:false,
      func3_selected:false,
      func4_selected:false,
      func5_selected:true,
      hot:0,
      hotImageNow:hotArray.hot[0],
      gear:0,
      gearImageNow: gearBase64.gear[0],
      power:100
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
        that.disconnectSetData();
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
        // 获取电量
        this.write(command.getPower)
        // 监听蓝牙设备错误事件，包括异常断开等等
        wx.onBLEConnectionStateChange(res => {
          console.log('蓝牙设备错误事件:')
          console.log(res)
          that.setData({
            isConnected: res.connected,
          })
          if (res.connected == false) {
            that.disconnectSetData();
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
          var hex = that.ab2hex(res.value)
          console.log(hex)
          if(hex.search("cc0308") != -1){
            var openAndClose = hex.substr(7,1)
            if(openAndClose == '0'){
              command.cloes()
            }else{
              command.open()
            }
            console.log('设备控制-设置模式开关:'+openAndClose)
            var model = hex.substr(9,1)
            var func1_selected = false
            var func2_selected = false
            var func3_selected = false
            var func4_selected = false
            var func5_selected = true
            if (model == '1') {
              command.zj_1()
              func1_selected = true
            } else if(model == '2'){
              command.tn_2()
              func2_selected = true
            } else if(model == '3'){
              command.qd_3()
              func3_selected = true
            } else if(model == '4'){
              command.gs_4()
              func4_selected = true
            }else{
              command.no_model()
            }
            console.log('设备控制-设置模式:'+model)
            var gear= hex.substr(11,1)
            command.gear(gear)
            console.log('设备控制-设置档位:'+gear)
            var hot = hex.substr(13,1)
            command.hot(hot)
            if(hot !== '0') func5_selected = true
            console.log('设备控制-设置热度:'+hot)
            this.setData({
              func1_selected:func1_selected,
              func2_selected:func2_selected,
              func3_selected:func3_selected,
              func4_selected:func4_selected,
              func5_selected:func5_selected,
              hot:parseInt(hot, 10),
              hotImageNow:hotArray.hot[parseInt(hot, 10)],
              gear:parseInt(gear, 10),
              gearImageNow: gearBase64.gear[parseInt(gear, 10)],
            })

            var modelTime = hex.substr(16,2)
            console.log('设备控制-设置模式时间:'+modelTime)
            var hotTime = hex.substr(20,2)
            console.log('设备控制-设置热度时间:'+hotTime)
          }
          if(hex.search("cc0208") != -1){
            var openAndClose = hex.substr(6,2)
            console.log('蓝牙控制-设置模式开关:'+openAndClose)
            var model = hex.substr(8,2)
            console.log('蓝牙控制-设置模式:'+model)
            var gear= hex.substr(10,2)
            console.log('蓝牙控制-设置档位:'+gear)
            var hot = hex.substr(12,2)
            console.log('蓝牙控制-设置热度:'+hot)
            var modelTime = hex.substr(16,2)
            console.log('蓝牙控制-设置模式时间:'+modelTime)
            var hotTime = hex.substr(20,2)
            console.log('蓝牙控制-设置热度时间:'+hotTime)
          }
          if(hex.search("cc0101") != -1){// 获取电量
            var power = parseInt(hex.substr(6,2), 16)
            that.setData({
              power: power
            })
          }
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
    const that = this
    console.log('write:'+e)
    var buf = new ArrayBuffer(e.length);
    var dataView = new DataView(buf);
    e.forEach(function (item, index) {
      dataView.setUint8(index, item);
    });
    if (that.data.isConnected) {
      //写入数据
      wx.writeBLECharacteristicValue({
        deviceId: that.data.deviceId,
        serviceId: that.data.serviceId,
        characteristicId: that.data.characteristicId_sender,
        value: buf,
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