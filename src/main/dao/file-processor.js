const fs = require('fs')

exports.readFile = function (filePath) {
  fs.readFile(filePath, 'utf-8', function (err, data) {

  })
}


exports.writeFile = function (filePath) {
  fs.writeFile(filePath, data, function (err) {

  })
}

exports.appendFile = function (filePath) {
  fs.appendFile(filePath, data, function (err) {

  })
}