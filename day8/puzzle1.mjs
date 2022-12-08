import { getInput, textToArray, map, split, each, filter } from '../utils/index.mjs';

const testData = `
30373
25512
65332
33549
35390
`

function createGrid(arr) {
    return split('')(arr);
}

function isEdge(coords, width, height) {
    const [x, y] = coords;
    return x === 0 || x === height || y === 0 || y === width;
}

function getCoords(x, y) {
    return Symbol.for(`${x},${y}`);
}

function format(input) {
    const grid = map(input, createGrid);
    const height = grid.length - 1;
    const width = grid[0].length -1 ;
    const visible = (width * 2) + (height - 2) * 2;
    console.log({ visible, height, width });
    const lookup = new Map();
    // lookup.set('height', height);
    // lookup.set('width', width);
    // lookup.set('visible', visible);

    each(grid, (rows, row) => {
        each(rows, (cols, column) => {
            const coords = [column, row];
            const edge = isEdge(coords, width, height);
            const output = {
                edge,
                coords,
                height: +cols,
                visible: edge,
                id: row + column,
            };
            const key = getCoords(column, row);
            lookup.set(key, output);
        });
    });
    return lookup;
}

function find(column, row, grid, root, type) {
    // console.log('*******START*******');
    const coords = getCoords(column, row);
    if (!grid.has(coords)) return false;
    const current = grid.get(coords);

    if (root.edge) return true;

    if (root.id !== current.id) {
        const isTaller = root.height > current.height;
        if (!isTaller) return false;
        if (isTaller && current.edge) return true;

    }

    const typeMap = {
        up: () => find(column, row - 1, grid, root, type),
        down: () => find(column, row + 1, grid, root, type),
        right: () => find(column + 1, row, grid, root, type),
        left: () => find(column - 1, row, grid, root, type),
    }
    return typeMap[type]();
}

const data = await getInput('./day8/input.txt');
const input = textToArray(data);
// const input = textToArray(testData);
const grid = format(input);
const list = Array.from(grid.values());
const test = map(list, (value) => {
    const [x, y] = value.coords;
    const up = find(x, y, grid, grid.get(getCoords(x, y)), 'up');
    const down = find(x, y, grid, grid.get(getCoords(x, y)), 'down');
    const left = find(x, y, grid, grid.get(getCoords(x, y)), 'left');
    const right = find(x, y, grid, grid.get(getCoords(x, y)), 'right');
    return up || down || left || right;
})
console.log(test)
const total = filter(test, (x) => x).length
console.log(total);
