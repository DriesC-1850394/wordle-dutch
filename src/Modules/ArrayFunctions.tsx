/**
 * Finds the first index of a given element in an array
 *
 * @param {string} char - Character to look for
 * @param {any} array - The Array with characters in it
 * 
 * @example
 * // returns 1
 * formatUnit("2", ["1", "2", "3", "4"])
 * 
 * @returns {number} The index of parameter char
 *
 */
export function findIndex(char: string, array: any): number {
    let index: number = 0

    for (index; index < array.length; index++)
        if (array[index].char.localeCompare(char) === 0) return index

    return index
}

/**
 * Resets the last set element from an array to ""
 *
 * @param {any} array - The Array
 * 
 * @example
 * // returns ["1", "2", "", ""]
 * formatUnit(["1", "2", "3", ""])
 * 
 * @returns {any} An array with the last set element set to ""
 *
 */
export function removeLast(array: any): any {
    if (findIndex("", array) === 0) return array;

    let eIndex: number = findIndex("", array) - 1

    if (eIndex === -1) eIndex = 4

    array[eIndex].char = "";

    return array
}