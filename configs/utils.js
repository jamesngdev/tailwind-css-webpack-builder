const fs = require('fs');
const path = require('path');
const {src} = require("./paths");

function findHtmlFiles(dir) {
    let htmls = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // If it's a directory, recursively search it
            const _htmls = findHtmlFiles(filePath);
            htmls = [...htmls, ..._htmls];
        } else if (path.extname(file) === '.html') {
            // If it's an HTML file, print its path
            htmls.push(filePath.replace(src, ""));
        }
    }
    return htmls;
}

module.exports = {
    findHtmlFiles
}