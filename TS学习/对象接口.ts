//必须填写
interface Cat{
    name:string
    color:string
}
let neko: Cat = {
    name :'cat',
    color :'white'
}
//可选属性
interface Cat2{
    name:string
    color?:string
}
let shironeko: Cat2 = {
    name :'cat',
}
//任意属性
interface Dog{
    name:string
    [propName:string]:any
}
//只读属性 readonly只能在初始化时被赋值一次
interface Bear{
    readonly id:number
    name:string
}
let bear:Bear={
    id:1,
    name:'ztj'
}

