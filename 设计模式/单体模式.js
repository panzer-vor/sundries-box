const sum = {
    attribute:true,
    add(...arr){
        let sum = 0
        for(let v of arr){
            sum += v
        }
        return sum
    },
    avange(a,b){
        if(attribute){
            attribute = false
            return
        }else {
            return (a+b)/a
        }
    }
}

console.log(sum.add(1,2,3,4,5))

/* *
概念：
　　单体是一个用来划分命名空间并将一批相关的属性和方法组织在一起的对象，如果他可以被实例化，那么他只能被实例化一次。
特点：　
1 可以来划分命名空间，从而清除全局变量所带来的危险。
2 利用分支技术来来封装浏览器之间的差异。
3 可以把代码组织的更为一体，便于阅读和维护。
* */