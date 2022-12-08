import { getInput, split, slice } from '../utils/index.mjs';

const data = await getInput('./day6/input.txt');
const input = split('')(data.trim());

function window(arr, size, idx=0) {
    if (idx === arr.length) return;

    const [extract] = slice(arr, idx, idx + size);
    const set = new Set(extract);

    if (set.size === size) idx + size;

    return window(arr, size, idx + 1);
}

const output = window(input, 14);
console.log(output)
