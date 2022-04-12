export function findIndex(char: string, array: any): number {
    let index: number = 0

    for (index; index < array.length; index++)
        if (array[index].char.localeCompare(char) === 0) return index

    return index
}

export function pop(array: any): any {
    if (findIndex("", array) === 0) return array;

    let eIndex: number = findIndex("", array) - 1

    if (eIndex === -1) eIndex = 4

    array[eIndex].char = "";

    return array
}