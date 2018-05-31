//深克隆
function deepClone(obj) {
    const o = {}.toString.call(obj);
    if (o == '[object Object]' || o == '[object Array]') {
        const returnValue = o == '[object Object]' ? {} : [];
        for (let i in obj) {
            if ({}.toString.call(obj[i]) == '[object Object]' || {}.toString.call(obj[i]) == '[object Array]') {
                deepClone(obj[i]);
                returnValue[i] = obj[i];
            } else {
                returnValue[i] = obj[i];
            }
        }
        return returnValue;
    }
    return obj;
}
