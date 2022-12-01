import { readFile } from 'node:fs/promises';

export async function getInput(path) {
    return readFile(path, { encoding: 'utf8' });
}

function splitLinesToArray(file) {
    return file.trim().split(/\r?\n/);
}

export function textToArray(file) {
    const array = splitLinesToArray(file);
    return array;
}

// gen functions
export function sum(a, c) {
    return a + c;
}

export function strToInt(str) {
    return parseInt(str);
}

export function higestToLowest(a,b) {
    return b - a;
}

// Arr function
export function tail(arr) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');

    return arr[arr.length - 1];
}

export function pop(arr) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');

    return arr.slice(0, arr.length - 1);
}

export function push(arr, value) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');

    return [...arr, value];
}

export function map(arr, fn) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');
    return arr.map(fn);
}

export function reduce(fn, base) {
    return arr => {
        if (!Array.isArray(arr)) throw new Error('Type is not an array');
        return arr.reduce(fn, base);
    }
}

export function max(arr) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');
    return Math.max(...arr);
}

export function sort(arr, fn) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');
    return arr.sort(fn);
}

export function get(arr, limit) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');
    return arr.slice(0, limit);
}

export function flatMap(arr) {
    if (!Array.isArray(arr)) throw new Error('Type is not an array');

    return fn => arr.flatMap(fn);
}
