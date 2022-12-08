import {
    getInput,
    textToArray,
    map,
    split,
    each,
    max,
} from '../utils/index.mjs';

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

function find(column, row, grid, root, type, view) {
    // console.log('*******START*******');
    const coords = getCoords(column, row);
    if (!grid.has(coords)) return view;
    const current = grid.get(coords);

    if (root.edge) return view;

    if (root.id !== current.id) {
        const isTaller = root.height > current.height;
        if (!isTaller) return view;
        if (isTaller && current.edge) return view;

    }

    const newView = view + 1;
    const typeMap = {
        up: () => find(column, row - 1, grid, root, type, newView),
        down: () => find(column, row + 1, grid, root, type, newView),
        right: () => find(column + 1, row, grid, root, type, newView),
        left: () => find(column - 1, row, grid, root, type, newView),
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
    const up = find(x, y, grid, grid.get(getCoords(x, y)), 'up', 0);
    const down = find(x, y, grid, grid.get(getCoords(x, y)), 'down', 0);
    const left = find(x, y, grid, grid.get(getCoords(x, y)), 'left', 0);
    const right = find(x, y, grid, grid.get(getCoords(x, y)), 'right', 0);
    console.log({ up, down, left, right })
    return up * down * left * right;
})
console.log(max(test))
