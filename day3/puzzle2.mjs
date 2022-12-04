import {
    getInput,
    reduce,
    slice,
    flat,
    sum,
    map,
    textToArray,
    split,
    filter,
} from '../utils/index.mjs';

const testData = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
];

function getSlice(arr, start, end) {
    const window = slice(arr, start, end);
    const rest = slice(arr, end, arr.length);

    return [window, rest];
}

function format(arr, output, start = 0, end = 3) {
    if (arr.length <= 0) return output;
    const [window, xs] = getSlice(arr, start, end)
    const newArr = map(map(window, split('')), x => new Set(x));
    const copy = [...output, map(newArr, x => Array.from(x))];

    return format(xs, copy, start, end);
}

function hasDups(uniqueElements) {
    return (ele) => uniqueElements.has(ele);
}

function checkForDups(uniqueElements, arr) {
    return Array.from(
        new Set(filter(arr, hasDups(uniqueElements)))
    )
}

function getDups(arr) {
    const uniqueElements = new Set(arr[0]);
    const first = checkForDups(uniqueElements, arr[1]);
    const second = checkForDups(uniqueElements, arr[2]);
    const firstUniqueElements = new Set(first);
    const inAll = checkForDups(firstUniqueElements, second)
    return inAll;
}

function isUppercase(char) {
    return char.toUpperCase() === char;
}

function getPrioritize(ele) {
    if (isUppercase(ele)) {
        return (parseInt(ele, 36) - 9) + 26;
    }

    return parseInt(ele, 36) - 9;
}

const input = await getInput('./day3/input.txt');
const inputAsArr = textToArray(input);
const data = format(inputAsArr, []);
const dups = flat(map(data, getDups));
const prioritizeArr = map(dups, getPrioritize);
const output = reduce(sum, 0)(prioritizeArr);
console.log(output);
