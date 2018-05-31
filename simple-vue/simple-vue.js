
class Vue {
    constructor(options){
        this._init(options);    //初始化函数
    }
    _init(options){ 
        this.$options = options;    //结构体 包括el,data,methods
        this.$el = document.querySelector(options.el);  //绑定元素
        this.$data = options.data;  //绑定数组
        this.$methods = options.methods;    //绑定方法
        this._binding = {}; //_binding保存着model与view的映射关系，也就是Watcher实例。当model改变时，我们触发其指令类更新，保证view实时更新。
        this._obverse(this.$data);  //处理data(设置对象响应)
        this._compile(this.$el);    //解析指令
    }
    _compile(root){
        const nodes = root.children;
        for(let i = 0;i<nodes.length;i++){
            const node = nodes[i];
            if(node.children.length){
                this._compile(node);
            }
            if(node.hasAttribute('v-click')){
                node.onclick = (()=>{
                    const attrVal = nodes[i].getAttribute('v-click');
                    return this.$methods[attrVal].bind(this.$data);
                })();
            }
            if(node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){
                node.addEventListener('input',(key=>{
                    const attrVal = node.getAttribute('v-model');
                    this._binding[attrVal]._directives.push(new Watcher(
                        'input',
                        node,
                        this,
                        attrVal,
                        'value',
                    ))
                    return ()=>{
                        this.$data[attrVal] = nodes[key].value;
                    }
                })(i));
            }
            if(node.hasAttribute('v-bind')){
                const attrVal = node.getAttribute('v-bind');
                this._binding[attrVal]._directives.push(new Watcher(
                    'text',
                    node,
                    this,
                    attrVal,
                    'innerHTML'
                )) 
            }
        }
    }
    _obverse(obj){  //处理data数据
        let value;              
        for(let key in obj){    //遍历data对象    
            if(obj.hasOwnProperty(key)){    //确保对象确实拥有该属性而不是原型继承而来
                this._binding[key] = {  //
                    _directives: []
                }
                value = obj[key];
                if(typeof value === 'object'){
                    this._obverse(value);
                }
            }
            let binding = this._binding[key];
            Object.defineProperty(this.$data,key,{
                enumerable:true,
                configurable:true,
                get(){
                    console.log(`获取到${value}`);
                    return value;
                },
                set(newVal){
                    console.log(`更新${newVal}`);
                    if(value !== newVal){
                        value = newVal;
                        binding._directives.forEach(item=>{
                            item.update();
                        })
                    }
                }
            })
        }
    }
}
class Watcher {
    constructor(name,el,vm,exp,attr){
        this.name = name;   //指令名称
        this.el = el;   //指令对应元素
        this.vm = vm;   //vue实例
        this.exp = exp; //对应data值
        this.attr = attr;   //绑定的属性值
        this.update();
    }
    update(){
        this.el[this.attr] = this.vm.$data[this.exp];
    }

}
