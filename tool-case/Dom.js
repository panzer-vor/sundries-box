/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return pos
}
/**
 *
 * @desc  DOM移入时触发点击事件（可用于锚链接跳转）
 * @param {HTMLElement} el
 */
function addClick(el) {
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    el.dispatchEvent(e)
}
/**
 * 将对象数据放入表单对象中
 * @desc  input[file]文件转成页面链接引用
 * @param {HTMLEllement} el {var}data
 */
function getFileUrl(el,data){
    var reader =new FileReader();
    reader.readAsDataURL(el.files[0]);
    reader.onload =function(e){
        data =e.target.result;
    }
}
/**
 * @desc  将表单数据对象放入表单对象中
 * @param {Object} obj
 */
function setFormData(obj) {
    var formObj = new FormData();
    for (var key in obj){
        formObj.append(key,obj[key])
    }
    return formObj
}
/**
 * @desc  回到顶部的缓动算法
 * @param
 * A是起始位置；B是目标位置；rate是缓动速率；callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；
 * eg:
 * var doc = document.body.scrollTop? document.body : document.documentElement;
    Math.easeout(doc.scrollTop, 0, 4, function (value) {
        doc.scrollTop = value;
    });
 */
Math.easeout = function (A, B, rate, callback) {
    if (A == B || typeof A != 'number') {
        return;
    }
    B = B || 0;
    rate = rate || 2;

    var step = function () {
        A = A + (B - A) / rate;

        if (A < 1) {
            callback(B, true);
            return;
        }
        callback(A, false);
        requestAnimationFrame(step);
    };
    step();
};


