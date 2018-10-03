
exports.trimStr = function trimStr(str) {
  return str.replace(/^\s*/, '').replace(/\s+$/, '')
}

exports.testSpaceLine = function testSpaceLine(input){
  let spaceLinePattern = /^\s*$/
  return spaceLinePattern.test(input)
}

exports.testNumber = function testNumber(input){
  let numberPattern = /^(-|\+)?\d+(\.|\.\d+)?$/
  return numberPattern.test(input)
}

exports.testNumberArray = function testNumberArray(input) {
  let testNumberArray = /^(-|\+)?\d+(\.|\.\d+)?(,(-|\+)?\d+(\.|\.\d+)?)*$/
  return testNumberArray.test(input)
}