import {
    getInput,
    textToArray,
    tail,
    pop,
    push,
    reduce,
    map,
    sum,
    sort,
    get,
    strToInt,
    flatMap,
    higestToLowest,
} from "../utils/index.mjs";

function format(data) {
    return reduce((acc, curr) => {
        if (!curr.length) return [...acc, []];
        
        return [
            ...pop(acc),
            push(tail(acc), curr),
        ]
    }, [[]])(data);
}

function convert(data) {
    return map(data, arr => map(arr, strToInt));
}

function sums(data) {
    return flatMap(data)(reduce(sum, 0));
}

const data = await getInput('./day1/input.txt');
const input = convert(format(textToArray(data)));
const sorted = get(sort(sums(input), higestToLowest), 3);
const output = reduce(sum, 0)(sorted);

console.log(output)
