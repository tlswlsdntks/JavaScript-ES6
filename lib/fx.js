// log
const log = console.log;

// map
const map = (fn, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(fn(a));
    }
    return res;
}

// filter
const filter = (fn, iter) => {
    let res = [];
    for (const a of iter) if (fn(a)) res.push(a);
    return res;
}

// reduce
const reduce = (fn, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        // { value: 1, done: false }
        acc = iter.next().value;
    }
    for (const a of iter) acc = fn(acc, a);
    return acc;
}