const fs = require('fs')

exports.readFile = function (filePath) {
  fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    }
    console.log(data)
  })
}


exports.writeFile = function (filePath,data) {
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}

exports.appendFile = function (filePath,data) {
  fs.appendFile(filePath, data, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}