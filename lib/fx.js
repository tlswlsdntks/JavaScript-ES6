// log
const log = console.log;

// curry
const curry = fn => (a, ..._) => _.length ? fn(a, ..._) : (..._) => fn(a, ..._);

// go
const go = (...args) => reduce((a, fn) => fn(a), args);

// pipe
const pipe = (fn, ...fns) => (...as) => go(fn(...as), ...fns);

// ### range, map, filter, take, reduce 중첩 사용
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

// take
const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length == l) return res;
    }
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

// ### L.range, L.map, L.filter, take, reduce 중첩 사용
// L.range
const L = {};
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        // log(i, 'L.range');
        yield i;
    }
}

// L.map
L.map = function* (fn, iter) {
    for (const a of iter) yield fn(a);
}

// L.filter
L.filter = function* (fn, iter) {
    for (const a of iter) if (fn(a)) yield a;
}