import {
    getInput,
    textToArray,
    tail,
    pop,
    push,
    reduce,
    map,
    max,
} from "../utils/index.mjs";

function format(data) {
    return reduce(data, [[]], (acc, curr) => {
        if (!curr.length) return [...acc, []];
        
        return [
            ...pop(acc),
            push(tail(acc), curr),
        ]
    }, [[]]);
}

function convert(data) {
    return map(data, arr => map(arr, v => parseInt(v)));
}

function sums(data) {
    return data.flatMap((v) => {
        return reduce(v, 0, (a, c) => a + c);
    });
}

const data = await getInput('./day1/input.txt');
const input = convert(format(textToArray(data)));
const output = max(sums(input));
console.log(output)
