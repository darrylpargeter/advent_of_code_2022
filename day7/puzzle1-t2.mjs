import { 
    getInput,
    textToArray,
    head,
    each,
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
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k',
]

const COMMAND_REGEX = /^\$\s(?<command>cd)\s(?<dir>.*)/;
const FILE_REGEX = /^(?<memory>[0-9]+)\s(?<name>(.*))/;
const MAX_MEMORY_SIZE = 100000;

const data = await getInput('./day7/input.txt');
// const input = textToArray(data);

function commandRegex(test) {
    return test.match(COMMAND_REGEX);
}

function isCommand(test) {
    return commandRegex(test);
}

function fileRegex(test) {
    return test.match(FILE_REGEX);
}

function isFile(test) {
    return fileRegex(test);
}

function buildTree(arr, tree, currentDir = null) {
    if (!arr.length) return tree;
    const [h, rest] = head(arr);
    if (isCommand(h)) {
        const { groups: { dir } } = commandRegex(h);
        if (dir !== '..' && !tree?.[dir]) {
            const newDir = {
                id: dir,
                children: [],
                files: [],
                parent: currentDir?.id || dir, 
            }

            const newTree = {
                ...tree,
                [currentDir?.id ?? dir]: {
                    ...currentDir,
                    children: [...currentDir?.children ?? [], dir]
                },
                [dir]: newDir,
            }

            return buildTree(rest, newTree, newDir)
        } else {
            return buildTree(rest, tree, tree[currentDir.parent]);
        }
    } 

    if (isFile(h)) {
        // console.log({ h, currentDir })
        const { groups: { memory, name } } = fileRegex(h);
        const updateDir = {
            ...currentDir,
            files: [...currentDir.files, { memory, name }]
        }
        const updatedTree = {
            ...tree,
            [currentDir.id]: updateDir,
        }
        return buildTree(rest, updatedTree, currentDir);
    }

    return buildTree(rest, tree, currentDir)
}
/*
 else if (isFile(h)) {
        const { groups: { memory, name } } = fileRegex(h);
        const dir = {
            ...currentDir,
            files: [...currentDir.files, { memory, name }],
        }

        const newTree = {
            ...tree,
            [currentDir.id]: dir,
        }
        console.log({tree});

        return buildTree(rest, newTree, currentDir);
    }
    */

const tree = buildTree(testInput, {})
console.log(tree.e.files)
