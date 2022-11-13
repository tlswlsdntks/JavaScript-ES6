// log
const log = console.log;

// curry
const curry = fn => (a, ..._) => _.length ? fn(a, ..._) : (..._) => fn(a, ..._);

// map
const map = curry((fn, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(fn(a));
    }
    return res;
});

// filter
const filter = curry((fn, iter) => {
    let res = [];
    for (const a of iter) if (fn(a)) res.push(a);
    return res;
});

// reduce
const reduce = curry((fn, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        // { value: 1, done: false }
        acc = iter.next().value;
    }
    for (const a of iter) acc = fn(acc, a);
    return acc;
});

// go
const go = (...args) => reduce((a, fn) => fn(a), args);

// pipe
const pipe = (fn, ...fns) => (...as) => go(fn(...as), ...fns);