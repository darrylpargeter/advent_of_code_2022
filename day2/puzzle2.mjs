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

const conditions = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
}

const shapeMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}

const shapes = {
    rock: {
        shape: 'rock',
        win: 'paper',
        lose: 'scissors',
        points: 1,
    },
    paper: {
        shape: 'paper',
        win: 'scissors',
        lose: 'rock',
        points: 2,
    },
    scissors: {
        shape: 'scissors',
        win: 'rock',
        lose: 'paper',
        points: 3,
    },
}

function getShapeScore(shape, condition) {
    if (condition === 'draw') return shape.points;

    return shapes[shape[condition]].points
}

function format(acc, curr) {
    const [elf, own] = split(' ')(curr);
    const shape = shapes[shapeMap[elf]];
    const condition = conditions[own];
    const conditionPoints = points[condition];
    const shapeScore = getShapeScore(shape, condition)

    const output = {
        elf: shape,
        condition,
        shapeScore,
        total: sum(conditionPoints, getShapeScore(shape, conditions[own])),
    }

    return [...acc, output];
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
console.log(rounds)
const score = reduce(getScore, 0)(rounds);
console.log(score);
