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


