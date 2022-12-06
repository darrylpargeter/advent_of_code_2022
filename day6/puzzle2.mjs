import { getInput, split, slice, map } from '../utils/index.mjs';

const testData = [
    'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    'bvwbjplbgvbhsrlpgdmjqwftvncz',
    'nppdvjthqldpwncqszvftbrmjlhg',
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];

const data = await getInput('./day6/input.txt');
const input = split('')(data.trim());

function window(arr, idx=0, size) {
    if (idx === arr.length) return output;
    const [extract] = slice(arr, idx, idx + size);
    const set = new Set(extract);
    if (set.size === size) {
        return { idx, size: idx + size };
    }

    return window(arr, idx + 1, size);
}

const output = window(input, 0, 14);
console.log(output)
