const inEl = document.querySelector('.up span'), //获取输入元素
outEl = document.querySelector('.down span'), //获取输入元素
del = document.querySelector('.del'), //获取删除元素
clearBtn = document.querySelector('.clear'), //清除
dot = document.querySelector('.dot'), //点号
btns = document.querySelectorAll('.buttons-wra>div:not(.del):not(.row):not(.dot)'), //获取按键表1
divide = document.querySelector('.divide'), //获取除号
multiply = document.querySelector('.multiply'), //获取乘号
minus = document.querySelector('.minus'), btnMarks = ['+', '-', '*', '/', '.'], plus = document.querySelector('.plus');
let countBtn = [], inputStr = '', inputValue = '0', countValue = 0, baseValue = 0, countSwitch = [true, false, false, false]; //加减乘除;
function getValue(el) {
    const value = el.querySelector('span').innerText;
    return value;
}
for (let i = 0; i < btns.length; i++) {
    let obj = {
        el: btns[i],
        val: getValue(btns[i])
    };
    countBtn.push(obj);
}
countBtn.forEach((v, i, arr) => {
    v.el.addEventListener('click', function () {
        inputEquatio(v.val);
    }, false);
});
function inputEquatio(val) {
    inputStr += val;
    inputValue += val;
    inEl.innerHTML = inputStr;
    compute();
}
function countSet(val) {
    switch (val) {
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
divide.onclick = () => {
    countSet('divide');
    reset('/');
};
multiply.onclick = () => {
    countSet('multiply');
    reset('*');
};
minus.onclick = () => {
    countSet('minus');
    reset('-');
};
plus.onclick = () => {
    countSet('plus');
    reset('+');
};
clearBtn.onclick = () => {
    resetAll();
};
del.onclick = () => {
    inputStr = inputStr.substring(0, inputStr.length - 1);
    inputValue = inputValue.substring(0, inputValue.length - 1);
    if (!inputValue.length) {
        resetAll();
    }
    else {
        inEl.innerHTML = inputStr;
        compute();
    }
};
dot.onclick = () => {
    let c = inputValue;
    c += '.';
    let f = 0;
    for (let i = 0; i < c.length; i++) {
        if (c[i].indexOf('.') != -1) {
            f++;
        }
    }
    if (f > 1) {
        c = c.substring(0, c.length - 1);
    }
    else {
        inputStr += '.';
        inEl.innerHTML = inputStr;
    }
    inEl.innerHTML = inputStr;
    inputValue = c;
};
function compute() {
    if (countSwitch[0]) {
        countValue = baseValue + parseFloat(inputValue);
    }
    else if (countSwitch[1]) {
        countValue = baseValue - parseFloat(inputValue);
    }
    else if (countSwitch[2]) {
        countValue = baseValue * parseFloat(inputValue);
    }
    else if (countSwitch[3]) {
        countValue = baseValue / parseFloat(inputValue);
    }
    outEl.innerHTML = String(countValue);
}
function reset(val) {
    inputValue = '';
    baseValue = countValue;
    inputStr = baseValue + val;
    inEl.innerHTML = inputStr;
}
function resetAll() {
    inputValue = '';
    baseValue = 0;
    countValue = 0;
    inputStr = '';
    inEl.innerHTML = inputStr;
    outEl.innerHTML = '';
    countSwitch.fill(false);
    countSwitch[0] = true;
}
