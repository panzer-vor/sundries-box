class Ball{
    constructor(r){
        this.r = r
    }
    area(){
        return Math.pow(this.r,2)*Math.PI
    }
}
class Balls extends Ball{
    constructor(r,color,size){
        super (r)
        this.color = color
        this.size = size
    }
    getBall(){
        console.log(`this ${this.color} ${this.size}Ball area is ${super.area()}`)
    }
}
const smallBall = new Balls(10,'white','small')
const bigBall = new Balls(20,'black','big')
smallBall.getBall()
bigBall.getBall()








/* *
概念：
    工厂模式的定义：提供创建对象的接口，意思就是根据领导（调用者）的指示（参数），生产相应的产品（对象）。
    创建一个对象常常需要复杂的过程，所以不适合在一个复杂的对象中。
    创建对象可能会导致大量的重复代码，也可能提供不了足够级别的抽象。
    工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合(也就是相互影响)
分类：
    简单工厂模式：使用一个类，通常为单体，来生成实例。
　　复杂工厂模式定义是：将其成员对象的实列化推到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型。
    父类只对创建过程中的一般性问题进行处理，这些处理会被子类继承，子类之间是相互独立的，具体的业务逻辑会放在子类中进行编写。
* */