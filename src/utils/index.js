function removeSlashUrl(url= "") {
    let newUrl = url;
    if(url[url.length - 1] === '/') {
        newUrl = url.slice(0, url.length - 1);
    }
    return newUrl;
}
function convertStringToNumber(str) {
    return Number(str.replace(/[^0-9]/g, ''));
}
function removeDollarsSign(str) {
    return parseFloat(str.replace('$', '').trim());
}

module.exports = {
    removeSlashUrl,
    convertStringToNumber,
    removeDollarsSign
}