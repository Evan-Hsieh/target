exports.inputTag = 'input-'


const lengthRootChord = 'length-root-chord'
exports.lengthRootChord = lengthRootChord

const distanceRootChord = 'distance-root-chord'
exports.distanceRootChord = distanceRootChord

const lengthTipChord = 'length-tip-chord'
exports.lengthTipChord = lengthTipChord

const distanceTipChord = 'distance-tip-chord'
exports.distanceTipChord = distanceTipChord

const sweepBackType = 'sweep-back-type'
exports.sweepBackType = sweepBackType
const sweepBack = 'sweep-back'
exports.sweepBack = sweepBack
const angleFrontEdge = 'angle-front-edge'
exports.angleFrontEdge = angleFrontEdge
const angleRearEdge = 'angle-rear-edge'
exports.angleRearEdge = angleRearEdge
const numGroupWings = 'num-group-wings'
exports.numGroupWings = numGroupWings
const fsValueRef = 'fs-value-ref'
exports.fsValueRef = fsValueRef
const posWings = 'pos-wings'
exports.posWings = posWings
const layoutAngleWings = 'layout-angle-wings'
exports.layoutAngleWings = layoutAngleWings
const machFlight = 'mach-flight'
exports.machFlight = machFlight
const angleFlight = 'angle-flight'
exports.angleFlight = angleFlight
const typeWingsProfile = 'type-wings-profile'
exports.typeWingsProfile = typeWingsProfile
const typeWarhead = 'type-warhead'
exports.typeWarhead = typeWarhead
const typeStern = 'type-stern'
exports.typeStern = typeStern


let missileModel = new Map()
//exports.missileModel = missileModel

exports.setMissileModelValue = function (mKey, mValue) {
  console.log('entity-model:setMissileModelValue. key:' + mKey + ' value:' + mValue)
  missileModel.set(mKey, mValue)
}

exports.getMissileModelValue = function (mKey) {
  if (missileModel.has(mKey)) {
    return missileModel.get(mKey)
  }
}

exports.getMissileModel = function () {
  if (missileModel) {
    return missileModel
  }
}

exports.setMissileModel = function (mModel) {
  missileModel = mModel
}


let predefineModel = [
  {
    'para-item-id': typeWarhead,
    'para-item-name': '头部曲线类型',
    'para-item-value': 'undefined',
    'para-item-units': 'undefined',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'length-warhead',
    'para-item-name': '头部长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'diameter-warhead',
    'para-item-name': '头部末端直径',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'diameter-column',
    'para-item-name': '圆柱段直径',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'length-column',
    'para-item-name': '圆柱段长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': typeStern,
    'para-item-name': '收缩尾部类型',
    'para-item-value': 'undefined',
    'para-item-units': 'undefined',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'length-stern',
    'para-item-name': '收缩尾部长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'diameter-tail',
    'para-item-name': '底部直径',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'diameter-nozzle',
    'para-item-name': '喷管出口直径',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': numGroupWings,
    'para-item-name': '弹翼组数',
    'para-item-value': 'undefined',
    'para-item-units': '组',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': posWings,
    'para-item-name': '弹翼位置',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': layoutAngleWings,
    'para-item-name': '布局(周向角度)',
    'para-item-value': 'undefined',
    'para-item-units': '角度',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': lengthRootChord,
    'para-item-name': '根弦长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': distanceRootChord,
    'para-item-name': '根弦到弹轴的距离',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'thickness-root-chord',
    'para-item-name': '根弦厚度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': lengthTipChord,
    'para-item-name': '梢弦长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': distanceTipChord,
    'para-item-name': '梢弦到弹轴距离',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'thickness-tip-chord',
    'para-item-name': '梢弦厚度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': angleFrontEdge,
    'para-item-name': '前缘后掠角',
    'para-item-value': 'undefined',
    'para-item-units': '角度',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': angleRearEdge,
    'para-item-name': '后缘后掠角',
    'para-item-value': 'undefined',
    'para-item-units': '角度',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': typeWingsProfile,
    'para-item-name': '弹翼剖面类型',
    'para-item-value': 'undefined',
    'para-item-units': 'undefined',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'height-flight',
    'para-item-name': '飞行高度(海拔)',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': machFlight,
    'para-item-name': '飞行马赫数',
    'para-item-value': 'undefined',
    'para-item-units': '马赫',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': angleFlight,
    'para-item-name': '攻角',
    'para-item-value': 'undefined',
    'para-item-units': '角度',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'barycenter-ref',
    'para-item-name': '质心',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'length-ref',
    'para-item-name': '参考长度',
    'para-item-value': 'undefined',
    'para-item-units': '米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': 'area-ref',
    'para-item-name': '参考面积',
    'para-item-value': 'undefined',
    'para-item-units': '平方米',
    'para-item-remarks': 'undefined'
  },
  {
    'para-item-id': fsValueRef,
    'para-item-name': 'fs值',
    'para-item-value': 'undefined',
    'para-item-units': 'undefined',
    'para-item-remarks': 'undefined'
  }
]

exports.getPredefineModel = function () {
  if (predefineModel !== null) {
    return predefineModel
  }
}



