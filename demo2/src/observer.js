import Dep from './dep';

export default class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.walk(value);
    }

    //遍历obj的所有属性，设置其setter和getter 
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

export function defineReactive(obj, key, val) {
    // obj中每个key都对应一个dep
    const dep = new Dep();
    // 将key对应的值保存在__key里，比如obj['name'] = 'glm'，则用obj['__name']来保存'glm'。
    obj[`__${key}`] = val;
    // 定制getter和setter
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // 当Watcher调其自身的get时，将Dep.target赋值为该Watcher。
            // 
            if (Dep.target) {
                // dep.depend作用是让watcher（即Dep.target）与此dep互相引用
                // 伪代码是酱的：
                // dep.depend() {
                //  target.addDep(dep) { 
                //    dep.addSub(target);
                //  }
                // }
                dep.depend();
            }
            return this[`__${key}`];
        },
        set: function reactiveSetter(newVal) {
            this.__value = newVal;
            // 
            dep.notify()
        }
    })
}