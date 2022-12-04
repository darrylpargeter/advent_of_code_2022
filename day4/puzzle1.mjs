import {
    getInput,
    textToArray,
    map,
    split,
    reduce,
    filter,
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
        {
            start: +curr[0],
            end: +curr[1],
        }
    ];
}

function format(str) {
    const arr = map(split(',')(str), split('-'));
    const output = reduce(formatToObj, [])(arr);
    return output;
}

function checkRange(first, second) {
    const inBoundLeft = second.start >= first.start;
    const inBoundRight = second.end <= first.end;
    
    return inBoundRight && inBoundLeft;
}

function withinRange(arr) {
    const [first, second] = arr;
    const x = checkRange(first, second);
    const y = checkRange(second, first);

    if (x || y) return true;

    return false;
}

const data = await getInput('./day4/input.txt');
const input = textToArray(data);
const formatted = map(input, format);
const output = filter(formatted, withinRange);
console.log(output.length);
