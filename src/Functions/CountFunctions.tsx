/**
 * Returns the number of occurences of a character in a given word
 *
 * @param {string} word - The word to iterate over
 * @param {string} char - The character that must be count
 * 
 * @example
 * // returns 3
 * formatUnit("banana", "a")
 * 
 * @returns {number} The number of occurences of the parameter char
 *
 */
export function countInString(word: string, char: string): number {
    let count: number = 0;

    for (const c of word)
        count = c.localeCompare(char) === 0 ? count + 1 : count

    return count
}

/**
 * Returns the number of occurences of a character in a given array
 *
 * @param {Array<string>} array - The array to iterate over
 * @param {string} char - The character that must be count
 * 
 * @example
 * // returns 3
 * formatUnit(["b", "a", "n", "a", "n", "a"], "a")
 * 
 * @returns {number} The number of occurences of the parameter char
 *
 */
export function countInArray(array: Array<string>, char: string): number {
    let count: number = 0

    for (const c of array)
        count = c.localeCompare(char) === 0 ? count + 1 : count

    return count
}