import {
    getInput,
    textToArray,
    reduce,
    slice,
    map,
    filter,
    flat,
    sum,
} from '../utils/index.mjs';

const testData = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
];

function format(acc, curr) {
    const length = Math.floor(curr.length / 2);
    const firstHalf = slice(curr, 0, length);
    const secondHalf = slice(curr, length, curr.length);

    return [...acc, [firstHalf, secondHalf]];
}

function hasDups(uniqueElements) {
    return (ele) => uniqueElements.has(ele);
}

function getDups(pack) {
    const uniqueElements = new Set(pack[0]);
    const dups = new Set(filter(pack[1], hasDups(uniqueElements)));

    return Array.from(dups);
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
const splitIntoContainers = reduce(format, [])(inputAsArr);
const dups = flat(map(splitIntoContainers, getDups));
const prioritizeArr = map(dups, getPrioritize);
const output = reduce(sum, 0)(prioritizeArr);
console.log(output);
