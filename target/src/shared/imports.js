const links = document.querySelectorAll('link[rel="import"]')

/*
// Import and add each page to the DOM
Array.prototype.forEach.call(links, function (link) {
    let template = link.import.querySelector('.content-template')
    let clone = document.importNode(template.content, true)
    document.querySelector('.content').appendChild(clone)

})
*/

exports.importTemplate = function importTemplate(tagClassForImport, objectTagClass){
    Array.prototype.forEach.call(links, function (link) {
        let template = link.import.querySelector(tagClassForImport)
        let clone = document.importNode(template.content, true)
        document.querySelector(objectTagClass).appendChild(clone)
    })
}
