//index.js
//获取应用实例
Page({
  data: {
    
  },
  onLoad: () => {
    // 自动初始化蓝牙模块
    // let that = this;
    // wx.showLoading({
    //   title: '开启蓝牙适配'
    // });
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    // wx.openBluetoothAdapter({
    //   success: (res) =>  {
    //     console.log("初始化蓝牙适配器");
    //     // console.log(res);
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //     wx.showToast({
    //       title: '蓝牙初始化失败',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     setTimeout(function () {
    //       wx.hideToast()
    //     }, 2000)
    //   }
    // });
  },
  scan: function () {
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
          if (res.devices[0].name == 'yueweidianzi') {
            console.log('已发现设备列表',res)
            devices.push(res.devices[0])
          }
          that.setData({
            devices: devices
            })
          })
      },
      fail: function (err) {
        console.log('搜索失败',err);
      },
      complete: () => {
        // 停止搜索
        setTimeout(function(){
          wx.stopBluetoothDevicesDiscovery()
          that.setData({
            scaning: false,
          })
        }, 3000)
      }
    });
  },
  connect: function(e) {
    // 连接设备
    let that = this
    let deviceId = e.currentTarget.dataset.id
    let deviceName = e.currentTarget.dataset.name
    console.log('deviceId',deviceId)
    wx.createBLEConnection({
      deviceId: deviceId,
      success:(res) => {
        console.log('设备已连接成功')
        console.log(res)
        // 连接成功
        that.setData({
          isConnected: true,
          deviceId: deviceId,
          deviceName: deviceName,
        })
        // 获取设备Service信息
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: (res) => {
            console.log('Service信息',res)
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
                const characteristicId = res.characteristics[0].uuid
                console.log('characteristicId', characteristicId)
                that.setData({
                  characteristicId: characteristicId,
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
    // 断开已连接设备
    const that = this
    const deviceId = e.currentTarget.dataset.id
    wx.closeBLEConnection({
      deviceId: deviceId,
      success: (res) => {
        console.log('设备已断开连接')
        // console.log(res)
        that.setData({
          isConnected: false,
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  notify: function() {
    // 更改通知监听
    const that = this
    const { deviceId, serviceId, characteristicId, isMonitoring} = this.data
    // console.log(this.data)
    wx.notifyBLECharacteristicValueChange({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      state: true,
      success: res => {
        if (isMonitoring) {
          console.log('关闭监听成功', res)
        } else {
          console.log('开启监听成功', res)
          // 监听低功耗蓝牙设备的特征值变化
          wx.onBLECharacteristicValueChange(res => {
            let wendu = that.buf2string(res.value).substr(0, 2)
            let shidu =  that.buf2string(res.value).substr(2,2)
            let abs =  that.buf2string(res.value).substr(4,6)
            that.setData({
              wendu: wendu,
              shidu:shidu,
              abs:abs,
            })
          })
        };
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
  read: function() {
    // 读取蓝牙数据
    const that = this
    const { deviceId, serviceId, characteristicId, isMonitoring } = this.data
    wx.readBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: characteristicId,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  write: function() {
    // // 写入蓝牙数据
    // const that = this
    // const { deviceId, serviceId, characteristicId, isMonitoring, writeData } = this.data
    // let buffer = that.hexStringToArrayBuffer("11");
    // console.log("buff is", buffer);
    // console.log('deviceid='+deviceId)
    // console.log('serviceId='+serviceId)
    // console.log('characteristicId='+characteristicId)
    // wx.writeBLECharacteristicValue({
    //   deviceId: deviceId,
    //   serviceId: serviceId,
    //   characteristicId: characteristicId,
    //   value: buffer,
    //   success: res => {
    //     console.log('writeBLECharacteristicValue success', res.errMsg)
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
    let {inputValue} = this.data
    this.onred(inputValue)
  },

  // 打开红灯
  onred: function(e) {
    var that = this

    // let buffer = that.hexStringToArrayBuffer(e);
    let buffer = new ArrayBuffer(6)
    let dataView = new DataView(buffer)
    dataView.setUint8(4, 187)
    dataView.setUint8(5, 50)

    console.log("buff is", buffer);
    if (that.data.isConnected) {
      //写入数据
      wx.writeBLECharacteristicValue({
        deviceId: that.data.deviceId,
        serviceId: that.data.serviceId,
        characteristicId: that.data.characteristicId,
        value: buffer,
        success: function(res) {
          console.log('发送成功')
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
        success: function(res) {
          that.setData({
            searching: false
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
  hexStringToArrayBuffer: function(str) {
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
