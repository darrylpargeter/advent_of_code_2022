import { getInput, split, slice, map } from '../utils/index.mjs';

const testData = [
    'bvwbjplbgvbhsrlpgdmjqwftvncz',
    'nppdvjthqldpwncqszvftbrmjlhg',
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];

const data = await getInput('./day6/input.txt');
const input = split('')(data.trim());

function window(arr, idx=0, size) {
    if (idx === arr.length) return output;
    const [extract] = slice(arr, idx, size);
    const set = new Set(extract);
    if (set.size === 4) {
        return { idx, size };
    }
    const newIdx = idx + 1
    const newSize = newIdx + 4;

    return window(arr, newIdx, newSize);
}

const output = window(input, 0, 4);
console.log(output)
