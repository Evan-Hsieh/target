const fileProcessor = require('../dao/file-processor')

const entityModel  = require('../models/entity-model')

exports.readFile = function readFile(path){
  //fileProcessor.readFile(path)
  console.log('controller: readFile()')
  let value = entityModel.getMissileModelValue('length-warhead')
  console.log(value)
}