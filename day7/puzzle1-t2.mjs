import { 
    getInput,
    textToArray,
    head
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

const COMMAND_REGEX = /^\$\s(?<command>cd)\s(?<dir>[\w|//|\.])/;
const FILE_REGEX = /^(?<memory>[0-9]+)\s(?<name>(.*))/;
const MAX_MEMORY_SIZE = 100000;

const data = await getInput('./day7/input.txt');
const input = textToArray(data);

function getCommand(line) {
    return line.match(COMMAND_REGEX);
}
function isCommand(line) {
    const test = line.match(COMMAND_REGEX);
    return test !== null;
}

function buildFileSystem(input, output, prevDir, state) {
    if (!input.length) return output;
    const [h, rest] = head(input);

    if (isCommand(h)) {
        const newState = [...state, { prevDir }]
        const { groups: { command, dir } } = getCommand(h);
        if (dir === '.') {
        console.log({ prevDir, dir })
            return buildFileSystem(rest, output, prevDir, newState)
        }
        const o = {
            ...output,
            [dir]: {
                parent: prevDir ? prevDir : '/',
            }
        }
        return buildFileSystem(rest, o, dir, newState)
    }

    return buildFileSystem(rest, output, prevDir, state)
}

const fileSystem = buildFileSystem(testInput, {}, '/', [])
console.log(fileSystem)
