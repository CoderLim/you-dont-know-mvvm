let uid = 0;

export default class Dep {
    static target;

    constructor() {
        this.subs = [];
        this.id = uid++;
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        const idx = this.subs.indexOf(sub);
        this.subs.splice(idx, 1);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].run();
        }
    }
}

Dep.target = null

export function pushTarget(_target) {
    Dep.target = _target;
}

export function popTarget() {
    Dep.target = null;
}