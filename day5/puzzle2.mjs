import {
    getInput,
    reduce,
    textToArray,
    tail,
    head,
    split,
    map,
    filter,
    slice,
    each,
    objValuesToArr,
    flat,
    join,
} from "../utils/index.mjs"

const testData = [
'    [D]',
'[N] [C]',
'[Z] [M] [P]',
' 1   2   3 ',
'',
'move 1 from 2 to 1',
'move 3 from 1 to 3',
'move 2 from 2 to 1',
'move 1 from 1 to 2',
];

function format(acc, curr, idx) {
    if (curr.length <= 0) return [...acc, []];
    const [t, rest] = tail(acc);
    const copy = [...t, curr];
    return [...rest, copy];
}

function formatSteps(step) {
    return {
        [step[0]]: +step[1],
        [step[2]]: +step[3],
        [step[4]]: +step[5],
    };
}

function interate(arr, output = []) {
    if (arr.length <= 0) return output;
    const [h, rest] = head(arr);
    const o = formatPlan(h, []);

    return interate(rest, [...output, o]);
}

function formatPlan(ele, output = []) {
    if (ele.length <= 0) return output;

    const [container, rest] = slice(ele, 0, 4);
    const o = [...output, container.join('').trim()];
    
    return formatPlan(rest, o);
}

function createColumns(cols) {
    const colArr = map(filter(split(' ')(cols), (x) => x.length), (x) => +x);
    const output = reduce((acc, curr) => ({ [curr]: [], ...acc }), {})(colArr);
    return output;
}

function temp(acc, curr) {
    const copy = { ...acc };
    each(curr, (ele, idx) => { 
        if (ele.length) {
            const c = [...copy[idx + 1]];
            copy[idx + 1] = [ele[1], ...c];
        }
    })

    return copy;
}

function createPlan(plan) {
    const [columns, containers] = tail(plan);
    const cols = createColumns(columns);
    const containersAsArr = map(containers, split(''));
    const formatedPlan = interate(containersAsArr);
    const x = reduce(temp, cols)(formatedPlan)

    return x;
}

function exacuteStep(plan, step) {
    const from = [...plan[step.from]];
    const to = [...plan[step.to]];
    const toMove = from.slice(-step.move);
    const rest = from.slice(0, -step.move);
    return {
        ...plan,
        [step.from]: rest,
        [step.to]: [...to, ...toMove],
    };
}

function exacute(plan, steps) {
    const output = reduce(exacuteStep, plan)(steps)
    return output; 
}

const input = await getInput('./day5/input.txt');
const inputAsArr = textToArray(input, false);
const [plan, steps] = reduce(format, [[]])(inputAsArr);
const formatedSteps = map(map(steps, split(' ')), formatSteps);
const formatedPlan = createPlan(plan);
const finshedPlan = objValuesToArr(exacute(formatedPlan, formatedSteps));
const output = join('')(flat(map(finshedPlan, (arr) => arr.slice(-1))));
console.log(output)
