let calResultObj = {}


exports.processFileResult = function processFileResult(fileResult) {
  let dataArray = fileResult.split(/\r?\n/)
  console.log('line num:' + dataArray.length)
  let machPattern = /MACH NO\s*=\s*(\d+\.?\d*)/
  let resTitlePattern = /-+ LONGITUDINAL -+/
  let spaceLinePattern = /^\s*$/
  let currentMach = 0

  let isEnterDataArea = false
  let isEnterDataSection = false
  let dataSectionNum = 0

  dataArray.forEach(function (lineData, index, array) {
    let machRegExpResult = machPattern.exec(lineData)
    if (machRegExpResult !== null) {
      currentMach = machRegExpResult[1]


    } else if (resTitlePattern.test(lineData)) {
      //console.log('res Title:' + (index+1))
      isEnterDataArea = true
    } else if (spaceLinePattern.test(lineData)) {
      if (isEnterDataArea) {
        if(!isEnterDataSection){
          dataSectionNum += 1
          isEnterDataSection = true
          console.log('current mach:' + currentMach)
          console.log('space line:' + (index + 1))
        } else{
          isEnterDataSection = false
          // out of data section, set all variable false
          if(dataSectionNum===2) {
            dataSectionNum = 0
            isEnterDataArea = false
          }
        }
      }
    } else if(isEnterDataSection) {
      //console.log('space line:' + (index + 1))
    }
  })

}