
const utils = require('../../shared/utils')


let resEntities = {}
resEntities.alpha = []
resEntities.mach = []
resEntities.currentMachIndex = -1
resEntities.cn = []
resEntities.cm = []
resEntities.ca = []
resEntities.cy = []
resEntities.cln = []
resEntities.cll = []

resEntities.cl = []
resEntities.cd = []
resEntities.cl_cd = []
resEntities.x_cp = []

let isNeedUpdateAlpha = true

exports.processFileResult = function processFileResult(fileResult) {
  parseCalculationResult(fileResult)
}

function parseCalculationResult(fileResult) {
  let dataArray = fileResult.split(/\r?\n/)
  console.log('line num:' + dataArray.length)
  let inputNumPattern = /NALPHA=(\d+\.?\d*),.*NMACH=(\d+\.?\d*)/
  let machPattern = /MACH NO\s*=\s*(\d+\.?\d*)/
  let resTitlePattern = /-+ LONGITUDINAL -+/
  let spaceLinePattern = /^\s*$/
  let currentMach = -1


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
      resEntities.currentMachIndex++
      resEntities.mach.push(currentMach)
      initForNewRow()
    } else if (spaceLinePattern.test(lineData)) {
      if (isEnterDataArea) {
        if (!isEnterDataSection) {
          dataSectionNum += 1
          isEnterDataSection = true
        } else {
          isEnterDataSection = false
          isNeedUpdateAlpha = false
          // out of data section, set all variable false
          if (dataSectionNum === 2) {
            dataSectionNum = 0
            isEnterDataArea = false
          }
        }
      }
    } else if (isEnterDataSection) {
      lineData = utils.trimStr(lineData)
      let lineDataArray = lineData.split(/\s+/)
      // The first section of data
      if (dataSectionNum === 1) {
        setFirstSectionData(lineDataArray)
      } else if(dataSectionNum === 2) {
        setSecondSectionData(lineDataArray)
      }
    }
  })

  // console.log('alpha:')
  // console.log(resEntities.alpha.toString())
  // console.log('mach')
  // console.log(resEntities.mach.toString())
  // console.log('data:cl:')
  // console.log(resEntities.cl[0])
  // console.log(resEntities.cl[1])
}

function initForNewRow() {
  // first section
  resEntities.cn[resEntities.currentMachIndex] = []
  resEntities.cm[resEntities.currentMachIndex] = []
  resEntities.ca[resEntities.currentMachIndex] = []
  resEntities.cy[resEntities.currentMachIndex] = []
  resEntities.cln[resEntities.currentMachIndex] = []
  resEntities.cll [resEntities.currentMachIndex] = []


  // second section
  resEntities.cl[resEntities.currentMachIndex] = []
  resEntities.cd[resEntities.currentMachIndex] = []
  resEntities.cl_cd[resEntities.currentMachIndex] = []
  resEntities.x_cp[resEntities.currentMachIndex] = []
}

function setFirstSectionData(lineDataArray) {
  if(isNeedUpdateAlpha) {
    resEntities.alpha.push(lineDataArray[0])
  }
  resEntities.cn[resEntities.currentMachIndex].push(lineDataArray[1])
  resEntities.cm[resEntities.currentMachIndex].push(lineDataArray[2])
  resEntities.ca[resEntities.currentMachIndex].push(lineDataArray[3])
  resEntities.cy[resEntities.currentMachIndex].push(lineDataArray[4])
  resEntities.cln[resEntities.currentMachIndex].push(lineDataArray[5])
  resEntities.cll [resEntities.currentMachIndex].push(lineDataArray[6])
}

function setSecondSectionData(lineDataArray) {
  resEntities.cl[resEntities.currentMachIndex].push(lineDataArray[1])
  resEntities.cd[resEntities.currentMachIndex].push(lineDataArray[2])
  resEntities.cl_cd[resEntities.currentMachIndex].push(lineDataArray[3])
  resEntities.x_cp[resEntities.currentMachIndex].push(lineDataArray[4])
}

function setResultEntity(dataArray) {


}

