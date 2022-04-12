export function countInString(word: string, char: string): number {
    let count: number = 0;

    for (const c of word)
        count = c.localeCompare(char) === 0 ? count + 1 : count

    return count
}

export function countInArray(array: Array<string>, char: string): number {
    let count: number = 0

    for (const c of array)
        count = c.localeCompare(char) === 0 ? count + 1 : count

    return count
}