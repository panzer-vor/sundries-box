//数组类型 数组中只允许存在指定类型
let arr1:number[]=[1,2,3]   //number
let arr2:(number|string)[]=[1,2,3,'4']  //联合类型
//用接口表示数组
interface arr3{
    [index:number]:number
}
let arr4:arr3 = [12,3,4,56,7]

