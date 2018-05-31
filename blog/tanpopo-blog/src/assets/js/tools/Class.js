function hasClass(ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
}
//addClass 先调用hasClass判断Class是否存在，在进行添加，参数：元素，class
function addClass(ele, cls) {
    if (!hasClass(ele, cls))
        ele.className += ' ' + cls;
}
//remvoeClass 先调用hasClass判断Class是否存在，在进行删除，参数：元素，class
function removeClass(ele, cls) {
    if (hasClass(ele, cls))
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');ele.className = ele.className.replace(reg, ' ');
}