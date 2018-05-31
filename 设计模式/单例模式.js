const single = (()=>{
    let unique;
    function getInstance() {
        if(unique === void(0)){
            unique = new Sum()
        }
        return unique
    }
    function Sum() {
        console.log(666)
    }
    return{
        getInstance
    }
})()
single.getInstance()


/* *
使用场景：
    单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如全局缓存、浏览器的window对象。在js开发中，单例模式的用途同样非常广泛。试想一下，当我们
单击登录按钮的时候，页面中会出现一个登录框，而这个浮窗是唯一的，无论单击多少次登录按钮，这个浮窗只会被创建一次。因此这个登录浮窗就适合用单例模式。
总结一下它的使用场景：
　　1、可以用它来划分命名空间
    2、借助单例模式，可以把代码组织的更为一致，方便阅读与维护
* */