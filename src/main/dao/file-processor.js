const exec = require('child_process').execFile;
const fs = require('fs')
const controller = require('../controllers/controller')

exports.readFile = function (filePath) {
  return fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
      console.log('error:' + err)
      return ''
    }
    return data
  })
}

exports.readFileSync = function (filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

exports.writeFile = function (filePath, data) {
  console.log('file-processor : writeFile.')
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('write successfully:')
    }
  })
}

exports.appendFile = function (filePath, data) {
  fs.appendFile(filePath, data, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('append successfully')
    }
  })
}


exports.appendFileSync = function (filePath, data) {
  console.log('file-processor: appendFileSync.')
  try {
    fs.appendFileSync(filePath, data)
    console.log('The "data to append" was appended to file!')
  } catch (err) {
    console.log('error:' + err)
  }
}

exports.unlink = function (filePath) {
  console.log('file-processor: unlink.' + filePath)
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err)
      return false
    } else {
      console.log('unlink ' + filePath + ' successfully')
      controller.appendDefaultData(filePath)
      return true
    }
  })
}

exports.execFile = function(filePath){
  console.log("execFile() start")
  exec(filePath, (error, stdout, stderr) => {
      if (error) {
        throw error
      }
      console.log(stdout)
    }
  )
}