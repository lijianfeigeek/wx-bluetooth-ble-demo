//logs.js
Page({
    /**
   * 页面的初始数据
   */
  data: {
    list:[
      {listName:'1. 可以开启，但无感觉',
       item:[{
         content:'1. 是否贴紧皮肤；',
       },{
        content:'2. 是否有移开衣物除去其他物品，或擦湿皮肤后再佩戴；',
      }]
      }, 
      {
        listName: '2. 脏了可以水洗吗？如何清洗？',
        item: [{
          content: '1. 关机状态下用湿纸巾或消毒棉擦拭电极片和机身，并风干后再使用，切勿直接水洗，或开机状态下清洗，以免发生电路短路。',
        },
        {
          content: '2. 不可以使用带有腐蚀性的清洁剂清洁机身，否则导致掉色，龟裂，凹凸纹路。',
        }]
      },
      {
        listName: '3. 为什么按摩的时候一抽一抽的比较厉害？',
        item: [{
          content: '原因：按摩时出现抽的情况主要是按摩强度选择过大，或颈部肌肉紧张劳损状态严重引起，是在帮你缓解肌肉疲劳。',
        },
        {
          content: '解决方法：选择合适按摩的强度进行按摩，不受力者可以先从小力度开始适应，逐渐增大按摩强度；颈部肌肉紧张劳损状态严重者，可以先行热毛巾热敷舒缓后再同步进行脉冲电按摩。',
        }]
      },
      {
        listName: '4. 可以摸精油吗？',
        item: [{
          content: '不建议涂抹油脂类精油进行脉冲电按摩，因为油脂物质大部分导电效果不佳或者不导电，影响产品的脉冲电按摩。',
        }]
      },
      {
        listName: '5. 可以多人使用同一个机器吗？',
        item: [{
          content: '产品建议一个用户使用。交叉用户使用时，请清洁产品上的电极片后使用。使用产品时应将电极片紧密贴合在皮肤上，均匀接触本产品电极片。使用中或使用后出现身体不适用请暂停使用，清向医生询问后使用。',
        }]
      },
      {
        listName: '6. 为什么用的过程在突然感觉没有那么强烈和明显？',
        item: [{
          content: '可能是不够贴合：可以用手按下脖子贴合部位，如果还是没有改善，建议可以增加按摩档位。',
        }]
      },
      {
        listName: '7. 如果出现使用过程在按摩仪不工作的情况，怎么办？',
        item: [{
          content: '可能是在使用的过程中，按摩仪没有贴合脖子，机器在30秒后自动关机；所以在使用前和过程中，注意按摩仪是否与脖子贴合。',
        }]
      },
      {
        listName: '8. 每天使用多久？',
        item: [{
          content: '根据自己的情况调节，敏感者建议一天使用不超过2次脉冲按摩，每次15分钟，15分钟内如有更改模式或调节档位，时间重新计算；默认开机后15分钟后自动关机；若30秒未佩戴或电极片未贴于人体皮肤，语音提示“滴”三声，产品自动关机。',
        }]
      }
    ]
  },
  //点击最外层列表展开收起
  listTap(e){
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex,//获取点击的下标值
        list=this.data.list;
    list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态
    if (list[Index].show){//如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list,Index);
    }

    this.setData({
      list
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e){
    let parentindex = e.currentTarget.dataset.parentindex,//点击的内层所在的最外层列表下标
        Index=e.currentTarget.dataset.index,//点击的内层下标
        list=this.data.list;
    console.log(list[parentindex].item,Index);
    list[parentindex].item[Index].show = !list[parentindex].item[Index].show||false;//变换其打开、关闭的状态
    if (list[parentindex].item[Index].show){//如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].item.length;i<len;i++ ){
        if(i!=Index){
          list[parentindex].item[i].show=false;
        }

      }
    }
    this.setData({list});
  },
  //让所有的展开项，都变为收起
  packUp(data,index){
    for (let i = 0, len = data.length; i < len; i++) {//其他最外层列表变为关闭状态
      if(index!=i){
        data[i].show = false;
        for (let j=0;j<data[i].item.length;j++){//其他所有内层也为关闭状态
            data[i].item[j].show=false;
        }
      }
    }
  },
  onLoad: function () {
    console.log('logs')
  }
})
