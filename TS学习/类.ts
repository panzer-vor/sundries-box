class Pet{
    constructor(sort:string,color:string){
        this.sort = sort
        this.color = color
    }
    say():string{
        if(this.sort == 'cat'){
            return 'miao'
        }else if(this.sort == 'dog'){
            return 'wang'
        }
    }
}
class Cat extends Pet{
    //包含父类的所有方法与属性
    catSay():string{
         return `${this.color} cat say ${super.say()}`
    }
}
let a = new Cat('cat','white')
// console.log(a.catSay())

//ES7 实例直接在类里面定义
class Animal{
    name:'cat'
}
let dog = new Animal()
console.log(dog.name) //cat

//public private(不允许访问) 和 protected(子类可以访问)
class Animal2 {
    public name;
    public constructor(name) {
        this.name = name;
    }
}











