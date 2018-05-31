//函数声明
function sum(a, b) {
    return a + b;
}
//命名函数声明 =>命名函数也需要声明数值类型
var sum2 = function (a, b) {
    return a + b;
};
var sum3 = function (a, b) {
    return a + b;
};
//可选参数
function sum4(a, b) {
    return a + b;
}
sum4(1);
sum4(2, 4);
//参数默认值
function sum5(a, b) {
    if (b === void 0) { b = 1; }
    return a + b;
}
sum5(1);
//参数拓展
function sum6(a) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (v) {
        a += v;
    });
    return a;
}
console.log(sum6(1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9));
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//类型断言 有时候需要获取字符串和数组时进行分别处理
function sub(str) {
    if (str.length) {
        return str.length;
    }
    else {
        return str.toString().length;
    }
}
