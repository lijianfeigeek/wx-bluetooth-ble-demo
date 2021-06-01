// 获取当前电量
var getPower = [0xDD,0x01,0x01,0x64,0x55] //'DD01016455'
// 关机
var shutdown = [0xDD,0x04,0x01,0x00,0x55] //'DD04010055'
// 基础命令
var base = [0xDD,0x02,0x08,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x55]  //'DD0208000000000000000055'
var now =  [0xDD,0x02,0x08,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x55]  //'DD0208000000000000000055'
// 3开关
// 4模式
// 5档位
// 6热度
// 8模式时间
// 10加热时间
// 当前模式开
var open = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 3) now[index] = 0x01
    if(index === 8) now[index] = 0x64
    if(index === 10) now[index] = 0x64
  }
  return now
}
// 当前模式关
var cloes = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 3) now[index] = 0x00
    if(index === 8) now[index] = 0x64
    if(index === 10) now[index] = 0x64
  }
  return now
}
// 针灸模式
var zj_1 = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 4) now[index] = 0x01
    if(index === 5) now[index] = 0x00
    if(index === 6) now[index] = 0x00
  }
  return now
}
// 推拿模式
var tn_2 = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 4) now[index] = 0x02
    if(index === 5) now[index] = 0x00
    if(index === 6) now[index] = 0x00
  }
  return now
}
// 敲打模式
var qd_3 = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 4) now[index] = 0x03
    if(index === 5) now[index] = 0x00
    if(index === 6) now[index] = 0x00
  }
  return now
}
// 刮痧模式
var gs_4 = function(){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 4) now[index] = 0x04
    if(index === 5) now[index] = 0x00
    if(index === 6) now[index] = 0x00
  }
  return now
}
// 当前强度控制
var gear = function(e){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 5) now[index] = parseInt(e.toString(),16)
  }
  return now
}

// 当前热度控制
var hot = function(e){
  let len = now.length
  for (let index = 0; index < len; index++) {
    if(index === 6) now[index] = parseInt(e.toString(),16)
  }
  return now
}

module.exports = {
  shutdown,
  getPower,
  base,
  now,
  open,
  cloes,
  zj_1,
  tn_2,
  qd_3,
  gs_4,
  gear,
  hot
}