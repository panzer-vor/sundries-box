//自动从0赋值 也可以反向映射，增长值为+1
enum Days {one,two,three,four,five}
Days['one'] //0
Days['two'] //1
Days[2] //three
Days[3] //four
//手动赋值       由于赋值，无法判断值是否重复，所以注意不要重复
//赋值后非常数项后如果后面的元素没有赋值则会报错
enum Days1 {one=4,two=3,three,four,five=<any>'aaa'}
Days1['one'] //4
Days1[3] //two
Days1['three'] //4

enum Days2 {one=4,two=3,three,four,five='aaa'.length}
Days1['one'] //4
Days1[3] //two
Days1['three'] //4

//常数枚举 赋值必须为默认获数值
const enum Days3{one,two,three}
let days3 = [Days3.one,Days3.two,Days3.three] //[0,1,2]
