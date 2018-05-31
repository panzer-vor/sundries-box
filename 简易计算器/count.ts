interface Count {
    el: Element;
    val: string;
}
const 
    inEl = document.querySelector('.up span'),  //获取输入元素
    outEl = document.querySelector('.down span'),    //获取输入元素
    del:any = document.querySelector('.del'),   //获取删除元素
    clearBtn:any = document.querySelector('.clear'),    //清除
    dot:any = document.querySelector('.dot'),    //点号
    btns:NodeListOf<Element> = document.querySelectorAll('.buttons-wra>div:not(.del):not(.row):not(.dot)'),  //获取按键表1
    divide:any = document.querySelector('.divide'),  //获取除号
    multiply:any = document.querySelector('.multiply'), //获取乘号
    minus:any = document.querySelector('.minus'),
    btnMarks:string[] = ['+','-','*','/','.'],
    plus:any = document.querySelector('.plus');
    
let countBtn:any[] = [],inputStr:string = '',inputValue:string = '0',countValue = 0,baseValue = 0,countSwitch:boolean[] = [true,false,false,false] //加减乘除;

function getValue(el):string{
    const value:string = el.querySelector('span').innerText;
    return value;
}

for(let i=0;i<btns.length;i++){
    let obj:Count = {
        el:btns[i],
        val:getValue(btns[i])
    };
    countBtn.push(obj);
}

countBtn.forEach((v,i,arr)=>{
    v.el.addEventListener('click',function(){
        inputEquatio(v.val)
    } ,false)
})

function inputEquatio (val){
    inputStr += val;
    inputValue += val;
    inEl.innerHTML = inputStr; 
    compute();
}

function countSet(val:string){
    switch (val){
        case 'divide':
            countSwitch.fill(false);
            countSwitch[3] = true;
            break;
        case 'multiply':
            countSwitch.fill(false);
            countSwitch[2] = true;
            break;
        case 'minus':
            countSwitch.fill(false);
            countSwitch[1] = true;
            break;    
        case 'plus':
            countSwitch.fill(false);
            countSwitch[0] = true;
            break;
    }
}
divide.onclick=()=>{
    countSet('divide');
    reset('/');
}
multiply.onclick=()=>{
    countSet('multiply');
    reset('*');
}
minus.onclick=()=>{
    countSet('minus');
    reset('-');
}
plus.onclick=()=>{
    countSet('plus');
    reset('+');
}
clearBtn.onclick=()=>{
    resetAll();
}
del.onclick=()=>{
    inputStr = inputStr.substring(0,inputStr.length-1);
    inputValue = inputValue.substring(0,inputValue.length-1);
    if(!inputValue.length){
        resetAll();
    }else{
        inEl.innerHTML = inputStr; 
        compute();
    }
}
dot.onclick=()=>{
    let c = inputValue;
    c += '.';
    let f = 0;
    for(let i = 0;i<c.length;i++){
        if(c[i].indexOf('.')!=-1){
            f++;
        }
    }
    if(f>1){
        c=c.substring(0,c.length-1);
    }else{
        inputStr += '.';
        inEl.innerHTML = inputStr; 
    }
    inEl.innerHTML = inputStr; 
    inputValue = c;
}

function compute(){
    if(countSwitch[0]){
        countValue = baseValue + parseFloat(inputValue);
    }else if(countSwitch[1]){
        countValue = baseValue - parseFloat(inputValue);
    }else if(countSwitch[2]){
        countValue = baseValue * parseFloat(inputValue);
    }else if(countSwitch[3]){
        countValue = baseValue / parseFloat(inputValue);
    }
    outEl.innerHTML = String(countValue);
}
function reset(val:string){
    inputValue = '';
    baseValue = countValue;
    inputStr = baseValue + val;
    inEl.innerHTML = inputStr; 
}
function resetAll(){
    inputValue = '';
    baseValue = 0;
    countValue = 0;
    inputStr = '';
    inEl.innerHTML = inputStr; 
    outEl.innerHTML = '';
    countSwitch.fill(false);
    countSwitch[0] = true;
}







