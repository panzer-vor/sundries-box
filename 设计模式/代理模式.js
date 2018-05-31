{
    class User{ //想吃食物
        constructor(wantFood){
            this.wantFood = wantFood    //想吃的食物
        }
    }
    class Shop{ //从商店购买-结果
        constructor(wantFood){  //想吃的食物
            this.shopFood = wantFood    //商店里的食物
        }
        sellfood(){
            console.log(this.shopFood+'送到了购买者手中');  //结果-平安送到
        }
    }
    class Sender{ //通知外卖小哥去送
        constructor(shopFood){  //拿到商店食物
            this.sendFood = shopFood    //送的食物
        }
        arrive(){   //到达后加商店食物送到购买者手中
            (new Shop(this.sendFood)).sellfood()
        }
    }
    const send = new Sender(new User('hanbager').wantFood)
    send.arrive()
}



/* *
概念：
　　代理模式的中文含义就是帮别人做事，javascript的解释为：把对一个对象的访问, 交给另一个代理对象来操作.
* */