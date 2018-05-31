var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pet = (function () {
    function Pet(sort, color) {
        this.sort = sort;
        this.color = color;
    }
    Pet.prototype.say = function () {
        if (this.sort == 'cat') {
            return 'miao';
        }
        else if (this.sort == 'dog') {
            return 'wang';
        }
    };
    return Pet;
}());
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //包含父类的所有方法与属性
    Cat.prototype.catSay = function () {
        return this.color + " cat say " + _super.prototype.say.call(this);
    };
    return Cat;
}(Pet));
var a = new Cat('cat', 'white');
// console.log(a.catSay())
//ES7 实例直接在类里面定义
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var dog = new Animal();
console.log(dog.name); //cat
//public private(不允许访问) 和 protected(子类可以访问)
var Animal2 = (function () {
    function Animal2(name) {
        this.name = name;
    }
    return Animal2;
}());
