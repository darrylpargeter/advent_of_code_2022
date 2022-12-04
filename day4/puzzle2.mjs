import {
    getInput,
    textToArray,
    map,
    split,
    reduce,
    filter,
    range,
} from '../utils/index.mjs';

const testData = [
    '2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8',
];

function formatToObj(acc, curr) {
    return [
        ...acc,
        new Set(range(+curr[0], +curr[1])),
    ];
}

function format(str) {
    const arr = map(split(',')(str), split('-'));
    const output = reduce(formatToObj, [])(arr);
    return output;
}

function hasDups(uniqueElements) {
    return ele => uniqueElements.has(ele);
}

function hasOverlap(uniqueElements, arr) {
    const x = Array.from(arr);
    const dups = filter(x, hasDups(uniqueElements))
    return dups.length > 0;
}

function withinRange(arr) {
    const [first, second] = arr;
    const x = hasOverlap(first, second);
    const y = hasOverlap(second, first);

    if (x || y) return true;

    return false;
}

const data = await getInput('./day4/input.txt');
const input = textToArray(data);
const formatted = map(input, format);
const output = filter(formatted, withinRange);
console.log(output.length);
