// 获取当前电量
var getPower = 'DD01016455'
// 关机
var shutdown = 'DD04010055'
// 基础命令
var base = 'DD0208000000000000000055'
var now = 'DD0208000000000000000055'
// 当前模式开
var open = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 7) arr[index] = '1'
    if(index === 16) arr[index] = '6'
    if(index === 17) arr[index] = '4'
    if(index === 20) arr[index] = '6'
    if(index === 21) arr[index] = '4'
  }
  return now = arr.join('')
}
// 当前模式关
var cloes = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 7) arr[index] = '0'
    if(index === 16) arr[index] = '0'
    if(index === 17) arr[index] = '0'
    if(index === 20) arr[index] = '0'
    if(index === 21) arr[index] = '0'
  }
  return now = arr.join('')
}
// 针灸模式
var zj_1 = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 9) arr[index] = '1'
  }
  return now = arr.join('')
}
// 推拿模式
var tn_2 = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 9) arr[index] = '2'
  }
  return now = arr.join('')
}
// 敲打模式
var qd_3 = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 9) arr[index] = '3'
  }
  return now = arr.join('')
}
// 刮痧模式
var gs_4 = function(){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 9) arr[index] = '1'
  }
  return now = arr.join('')
}
// 当前强度控制
var gear = function(e){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 11) arr[index] = e
  }
  return now = arr.join('')
}

// 当前热度控制
var hot = function(e){
  let arr = now.split('')
  let len = arr.length
  for (let index = 0; index < len; index++) {
    if(index === 13) arr[index] = e
  }
  return now = arr.join('')
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