//数据类型取值
let s:string = "111"
let b:boolean = true
let o:object = {}
let v:void = null
let n:number = 555
let a:any = {}
//联合数据类型取值
let sb:string|boolean = '111'
sb = false
//数组
let arr:any[]=[]
//类型别名
type StrNum = string|number //使用StrNum代表string|number
//字符串字面量类型 只能使用声明的字符串值
type names = 'cat'|'dog'|'bear'
let pet:names = 'cat'