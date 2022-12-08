import {
    getInput,
    textToArray,
    head,
} from '../utils/index.mjs';

const testInput = [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd ..',
    '$ cd ..',
    '$ cd ..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k',
]

const data = await getInput('./day7/input.txt');
const input = textToArray(data);
const COMMAND_REGEX = /^\$\s(?<command>cd)\s(?<dir>[\w|//|\.])/;
const FILE_REGEX = /^(?<memory>[0-9]+)\s(?<name>(.*))/;
const MAX_MEMORY_SIZE = 100000;

function testRegex(line, regex) {
    return line.match(regex);
}

function isCommand(line) {
    const test = testRegex(line, COMMAND_REGEX);
    return test !== null;
}

function isFile(line) {
    const test = testRegex(line, FILE_REGEX);
    return test !== null;
}

function getCurrentDir(curr, dir, output) {
    if (dir === '.') { 
        const o = output[curr];
        // console.log({ curr, dir })
        return o;
    }
    return { dir, };
}

function updateParent(output, current, currDir) {
    const parent = output[currDir];
    if (current?.dir === undefined) {
        console.log(current.dir)
        console.log({ current, currDir, parent })
    }
    if (!parent?.id || !current?.dir) return {};
    return {
        [parent.id]: {
            ...parent,
            children: [...parent.children, current.dir]
        }
    };
}

function createFolder(arr, output, currDir) {

    if (arr.length <= 0) {
        return output;
    }
    const [h, rest] = head(arr);
    const isCommandStr = isCommand(h);
    const isFileStr = isFile(h);
    if (isCommandStr) {
        const { groups: { command, dir } } = testRegex(h, COMMAND_REGEX);

        if (command === 'cd') {
            // console.log({ currDir, dir })
            const currentDir = currDir.length ? currDir : '/'; 
            const current = getCurrentDir(currentDir, dir, output);
            // console.log({ current })
            const id = current?.parent ?? current?.dir ?? '/';
            if (!output?.[id]) {
                const o = {
                    ...output,
                    [id]: {
                        parent: currentDir,
                        children: [],
                        id: dir,
                        files: [],
                        filesMemTotal: 0,
                    },
                    ...updateParent(output, current, currentDir),
                };

                return createFolder(rest, o, id);
            }
            return createFolder(rest, output, id);
        }
    }

    if (isFileStr) {
        const { groups: { memory, name } } = testRegex(h, FILE_REGEX);
        const parent = output[currDir];
        const o = {
            ...output,
            [parent.id]: {
                ...parent,
                files: [...parent.files, { name, memory }],
                filesMemTotal: parent.filesMemTotal + parseInt(memory),
            }
        }

        return createFolder(rest, o, currDir);
    }
    

    return createFolder(rest, output, currDir);
}

function getTotals(root, fileSystem) {
    // console.log('*******START*******')
    if (!root?.children) {
        // console.log({ root })
    }
    if (!root?.children?.length) return root?.filesMemTotal ?? 0
    const [h, rest] = head(root?.children);
    // console.log({ h, rest, root });
    return root.filesMemTotal + getTotals(fileSystem[h], fileSystem) + getTotals({ children: rest, filesMemTotal: 0 }, fileSystem);
}

const fileSystem = createFolder(input, {}, '',);
const memoryTotal = Object.values(fileSystem)
    .map((arr) => getTotals(arr, fileSystem))
    .filter(x => x <= MAX_MEMORY_SIZE)
    .reduce((acc, curr) => acc + curr, 0)
console.log(fileSystem);
console.log(memoryTotal);
