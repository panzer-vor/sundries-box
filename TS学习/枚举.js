//自动从0赋值 也可以反向映射，增长值为+1
var Days;
(function (Days) {
    Days[Days["one"] = 0] = "one";
    Days[Days["two"] = 1] = "two";
    Days[Days["three"] = 2] = "three";
    Days[Days["four"] = 3] = "four";
    Days[Days["five"] = 4] = "five";
})(Days || (Days = {}));
Days['one']; //0
Days['two']; //1
Days[2]; //three
Days[3]; //four
//手动赋值       由于赋值，无法判断值是否重复，所以注意不要重复
//赋值后非常数项后如果后面的元素没有赋值则会报错
var Days1;
(function (Days1) {
    Days1[Days1["one"] = 4] = "one";
    Days1[Days1["two"] = 3] = "two";
    Days1[Days1["three"] = 4] = "three";
    Days1[Days1["four"] = 5] = "four";
    Days1[Days1["five"] = 'aaa'] = "five";
})(Days1 || (Days1 = {}));
Days1['one']; //4
Days1[3]; //two
Days1['three']; //4
var Days2;
(function (Days2) {
    Days2[Days2["one"] = 4] = "one";
    Days2[Days2["two"] = 3] = "two";
    Days2[Days2["three"] = 4] = "three";
    Days2[Days2["four"] = 5] = "four";
    Days2[Days2["five"] = 'aaa'.length] = "five";
})(Days2 || (Days2 = {}));
Days1['one']; //4
Days1[3]; //two
Days1['three']; //4
var days3 = [0 /* one */, 1 /* two */, 2 /* three */]; //[0,1,2]
