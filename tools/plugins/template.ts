export default function template(arr1: any, ...arr2: any) {
    return function (...args: any) {
        let tpl_str = '';
        for (let i = 0; i <= arr1.length; i++) {
            tpl_str += (arr1[i] || '') + (arr2[i] ? arr2[i](...args) : '');
        }
        return tpl_str;
    };
}