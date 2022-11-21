// log
const log = console.log;

// clear
const clear = console.clear;

// curry
const curry = fn => (a, ..._) => _.length ? fn(a, ..._) : (..._) => fn(a, ..._);

// go
const go = (...args) => reduce((a, fn) => fn(a), args);

// pipe
const pipe = (fn, ...fns) => (...as) => go(fn(...as), ...fns);

// ### range, map, filter, take, reduce 중첩 사용
// map
const map = curry((fn, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(fn(a));
    }
    return res;
});

// filter
const filter = curry((fn, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (fn(a)) res.push(a);
    }
    return res;
});

// reduce
const reduce = curry((fn, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        // { value: 1, done: false }
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = fn(acc, a);
    }
    return acc;
});

// range
const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        // log(i, 'range');
        res.push(i);
    }
    return res;
}

// take
const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length == l) return res;
    }
    return res;
});


// ### L.range, L.map, L.filter, take, reduce 중첩 사용
const L = {};

// L.map
L.map = curry(function* (fn, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield fn(a);
    }
});

// L.filter
L.filter = curry(function* (fn, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (fn(a)) yield a;
    }
});

// L.range
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        // log(i, 'L.range');
        yield i;
    }
}