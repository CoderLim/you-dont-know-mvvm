import Dep, { pushTarget, popTarget } from './dep'

export default class Watcher {

    constructor(expOrFn, cb) {
        this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.cb = cb;
        this.getter = expOrFn; // 只考虑expOrFn是函数的情况
        this.value = this.get(); // 这里value其实没用到
    }

    /**
     * 重新收集依赖
     */
    get() {
        pushTarget(this);
        const value = this.getter(); // 这里value其实没用到
        popTarget();
        this.cleanupDeps();
        return value;
    }

    /**
     * 添加一个依赖
     */
    addDep(dep) {
        const id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    }

    /**
     * 整理新依赖和旧依赖
     */
    cleanupDeps() {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    }

    /**
     * 当依赖有变化时就会执行这里
     */
    run() {
        const value = this.get(); // value其实没用到
        this.cb();
    }

    /**
     * Depend on all deps collected by this watcher.
     */
    depend() {
        let i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    }
}