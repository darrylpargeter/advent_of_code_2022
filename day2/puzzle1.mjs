import {
    getInput,
    textToArray,
    reduce,
    map,
    sum,
    split,
    copy,
} from "../utils/index.mjs";

const points = {
    win: 6,
    lose: 0,
    draw: 3,
}

const shapes = {
    A: {
        shape: 'rock',
        defeats: 'scissors',
        points: 1,
    },
    B: {
        shape: 'paper',
        defeats: 'rock',
        points: 2,
    },
    C: {
        shape: 'scissors',
        defeats: 'paper',
        points: 3,
    },
    X: {
        shape: 'rock',
        defeats: 'scissors',
        points: 1,
    },
    Y: {
        shape: 'paper',
        defeats: 'rock',
        points: 2,
    },
    Z: {
        shape: 'scissors',
        defeats: 'paper',
        points: 3,
    },
}

function format(acc, curr) {
    const [elf, own] = split(' ')(curr);

    const output = {
        elf: shapes[elf],
        mine: shapes[own],
        total: shapes[own].points,
    }

    return [...acc, output];
}

function isDraw({ elf, mine }) {
    return elf.shape === mine.shape; 
}

function isWin({ elf, mine }) {
    return mine.defeats === elf.shape;
}

function isLose({ elf, mine }) {
    return elf.defeats === mine.shape;
}

function updateTotal(fn, condition, points) {
    return round => {
        const dup = copy(round);
        const verdict = fn(round);
        if (!verdict) return dup;

        return {
            ...dup,
            total: sum(dup.total, points[condition]),
        }
    }
}

function getScore(acc, curr) {
    return sum(acc, curr.total);
}


const test = [
    'A Y',
    'B X',
    'C Z',
]
const data = await getInput('./day2/input.txt'); 
const rounds = reduce(format, [])(textToArray(data));
// const rounds = reduce(format, [])(test);
const updateDraws = map(rounds, updateTotal(isDraw, 'draw', points));
const updateWins = map(updateDraws, updateTotal(isWin, 'win', points));
const updateLoses = map(updateWins, updateTotal(isLose, 'lose', points));
const score = reduce(getScore, 0)(updateLoses);
console.log(score);
