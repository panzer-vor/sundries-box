//函数声明
function sum(a:number,b:number):number{
    return a+b
}
//命名函数声明 =>命名函数也需要声明数值类型
let sum2:(a:number,b:number)=>number=function (a:number,b:number):number {
    return a+b
}
//接口定义函数
interface Isum{
    (a:number,b:number):number
}
let sum3:Isum=function (a:number,b:number){
    return a+b
}
//可选参数
function sum4(a:number,b?:number):number{
    return a+b
}
sum4(1)
sum4(2,4)
//参数默认值
function sum5(a:number,b:number=1):number{
    return a+b
}
sum5(1)
//参数拓展
function sum6(a:number,...items:any[]):number{
    items.forEach(function (v) {
        a+=v
    })
    return a
}
console.log(sum6(1,1,1,1,1,2,3,4,5,6,7,8,9))
//重载 number转number string转string
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//类型断言 有时候需要获取字符串和数组时进行分别处理
function sub(str:number|string):number{
    if((<string>str).length){   //如果是字符串时断言成字符串处理
        return (<string>str).length
    }else {                       //如果是数字时转为字符串处理
        return str.toString().length
    }
}



