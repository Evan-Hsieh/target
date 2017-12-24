let missileModel = new Map()
//exports.missileModel = missileModel

exports.setMissileModelValue = function(mKey, mValue){
  missileModel.set(mKey, mValue)
}

exports.getMissileModelValue = function(mKey){
  if(missileModel.has(mKey)) {
    return missileModel.get(mKey)
  }
}

exports.getMissileModel = function(){
  if(missileModel) {
    return missileModel
  }
}

exports.setMissileModel = function(mModel){
    missileModel = mModel
}


let predefineModel = [
  {
    'para-item-id':'type_warhead',
    'para-item-name':'头部曲线类型',
    'para-item-value':'undefined',
    'para-item-units':'undefined',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_warhead',
    'para-item-name':'头部长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'diameter_warhead',
    'para-item-name':'头部末端直径',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'diameter_column',
    'para-item-name':'圆柱段直径',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_column',
    'para-item-name':'圆柱段长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'type_stern',
    'para-item-name':'收缩尾部类型',
    'para-item-value':'undefined',
    'para-item-units':'undefined',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_stern',
    'para-item-name':'收缩尾部长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'diameter_tail',
    'para-item-name':'底部直径',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'diameter_nozzle',
    'para-item-name':'喷管出口直径',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'num_group_wings',
    'para-item-name':'弹翼组数',
    'para-item-value':'undefined',
    'para-item-units':'组',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'pos_wings',
    'para-item-name':'弹翼位置',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'num_wings_per_group',
    'para-item-name':'翼片数据',
    'para-item-value':'undefined',
    'para-item-units':'片',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'layout_angle_wings',
    'para-item-name':'布局(周向角度)',
    'para-item-value':'undefined',
    'para-item-units':'角度',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_root_chord',
    'para-item-name':'根弦长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'distance_root_chord',
    'para-item-name':'根弦到弹轴的距离',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'thickness_root_chord',
    'para-item-name':'根弦厚度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_tip_chord',
    'para-item-name':'梢弦长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'distance_tip_chord',
    'para-item-name':'梢弦到弹轴距离',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'thickness_tip_chord',
    'para-item-name':'梢弦厚度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'angle_front_edge',
    'para-item-name':'前缘后掠角',
    'para-item-value':'undefined',
    'para-item-units':'角度',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'angle_rear_edge',
    'para-item-name':'后缘后掠角',
    'para-item-value':'undefined',
    'para-item-units':'角度',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'type_wings_profile',
    'para-item-name':'弹翼剖面类型',
    'para-item-value':'undefined',
    'para-item-units':'undefined',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'height_flight',
    'para-item-name':'飞行高度(海拔)',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'mach_flight',
    'para-item-name':'飞行马赫数',
    'para-item-value':'undefined',
    'para-item-units':'马赫',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'angle_flight',
    'para-item-name':'攻角',
    'para-item-value':'undefined',
    'para-item-units':'角度',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'barycenter_ref',
    'para-item-name':'质心',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'length_ref',
    'para-item-name':'参考长度',
    'para-item-value':'undefined',
    'para-item-units':'米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'area_ref',
    'para-item-name':'参考面积',
    'para-item-value':'undefined',
    'para-item-units':'平方米',
    'para-item-remarks':'undefined'
  },
  {
    'para-item-id':'fs_value',
    'para-item-name':'fs值',
    'para-item-value':'undefined',
    'para-item-units':'undefined',
    'para-item-remarks':'undefined'
  }
]

exports.getPredefineModel = function(){
  if (predefineModel !== null){
    return predefineModel
  }
}



