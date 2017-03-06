import Watcher from './src/watcher';
import Observer from './src/Observer';

let obj = {
    name: 'glm',
    sex: 'male'
};
let observer = new Observer(obj);

const watcher = new Watcher(() => {
    console.log('-读取过的属性会与watcher建立联系-');
    console.log(obj.name);
    console.log('-----------------------------');
}, () => {
    console.log('Watcher回调函数');
});

console.log('设置name');
obj.name = 'zwr';
console.log('设置sex');
obj.sex = 'female';