/**
 *
 * @desc 获取浏览器类型
 * @return {String}
 */
function getExplore() {
    var sys = {}, ua = navigator.userAgent.toLowerCase(), s;
    (s = ua.match(
        /rv:([\d.]+)\) like gecko/
    )) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                            (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0
// 根据关系进行判断
    if (sys.ie) return('IE')
    if (sys.edge) return('EDGE')
    if (sys.firefox) return('Firefox')
    if (sys.chrome) return('Chrome')
    if (sys.opera) return('Opera')
    if (sys.safari) return('Safari')
    return 'Unkonwn'
}