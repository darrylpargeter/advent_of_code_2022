import {
    getInput,
    textToArray,
    map,
    split,
    join,
    head,
} from '../utils/index.mjs';

const testData = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

function format(line) {
    const [direction, move] = split(' ')(line);
    return { direction, move };
}

function isOverlap(coords) {
    const { head, tail } = coords;
    return head[0] === tail[0] && head[1] === tail[1];
}

function coordsRange(coords) {
    // todo - return all coord ranges that would touch
    const [row, col] = coords;
    return [
        [row - 1, col], // UP
        [row + 1, col], // DOWN
        [row, col - 1], // LEFT
        [row, col + 1], // RIGHT

        [row - 1, col + 1], // UP RIGHT
        [row + 1, col + 1], // DOWN RIGHT

        [row - 1, col - 1], // UP LEFT
        [row + 1, col - 1], // DOWN LEFT 
        [row, col], // OVERLAP
    ]
}

function isTouching(coords) {
    const { head, tail } = coords;
    const overlaped = isOverlap(coords);
    const range = coordsRange(head);
    const nextDoors = range.some(([row, col]) => row === tail[0] && col === tail[1]);
    return overlaped || nextDoors;
}

const headUpdater = {
    U: ([row, col]) => [row - 1, col],
    D: ([row, col]) => [row + 1, col],
    R: ([row, col]) => [row, col + 1],
    L: ([row, col]) => [row, col - 1],
}

const tailUpdater = {
    U: ([row, col]) => [row + 1, col],
    D: ([row, col]) => [row - 1, col],
    R: ([row, col]) => [row, col - 1],
    L: ([row, col]) => [row, col + 1],
}

function takeStep(step, total,  direction, state) {
    if (step >= total) return state;
    const copy = { ...state, currentCoords: { ...state.currentCoords } };
    const newHeadPos = headUpdater[direction](copy.currentCoords.head);
    const touching = isTouching({ head: newHeadPos, tail: copy.currentCoords.tail });
    const newTailPos = touching ? copy.currentCoords.tail : tailUpdater[direction](newHeadPos);
    const newPosForTail = !copy.tailMovement.has(join(':')(newTailPos));

    const newState = {
        ...copy,
        currentCoords: {
            ...copy.currentCoords,
            head: newHeadPos,
            tail: newTailPos,
        },
        tailMovement: newPosForTail ? copy.tailMovement.add(join(':')(newTailPos)) : copy.tailMovement,
    }

    return takeStep(step + 1, total, direction, newState);
}

function model(arr, state) {
    if (!arr.length) return state;
    const [h, rest] = head(arr);
    const newState = takeStep(0, +h.move, h.direction, state);
    // console.dir({ coords: newState.currentCoords, old: state.currentCoords })
    return model(rest, newState)
}

const data = await getInput('./day9/input.txt');
// const data = await getInput('./day9/matthew-input.txt');
const input = textToArray(data);
// const input = textToArray(testData);
const formated = map(input, format);
const state = {
    currentCoords: {
        head: [4,0],
        tail: [4,0],
    },
    tailMovement: new Set(),
}
console.log(input)
const grid = model(formated, state);
// console.log(grid);
console.log(grid.tailMovement);
console.log(grid.tailMovement.size);
