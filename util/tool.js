/*
* create by zhilong li
* @Mar 21, 2021
*/




/**
 *  日期转换方法
 *  @param YYYY-MM-DD hh:mm:ss
 */
 let dateFormat = (type, val) => {
    let date = val ? new Date(/^[0-9]*$/g.test(val) ? val * 1 : val) : new Date();
    let YYYY = date.getFullYear() + '';
    let m = date.getMonth() + 1;
    let MM = m > 9 ? m + '' : '0' + m;
    let d = date.getDate();
    let DD = d > 9 ? d + '' : '0' + d;
    let h = date.getHours();
    let hh = h > 9 ? h + '' : '0' + h;
    let $m = date.getMinutes();
    let mm = $m > 9 ? $m + '' : '0' + $m;
    let s = date.getSeconds();
    let ss = s > 9 ? s + '' : '0' + s;
    let obj = { YYYY, MM, DD, hh, mm, ss};

    return type.replace(/(YYYY)|(MM)|(DD)|(hh)|(mm)|(ss)/g, (key) => obj[key]);
};





export default {
    dateFormat
};