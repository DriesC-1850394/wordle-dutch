import { getDailyWords } from "../../daily_words"
import { data } from "../../data"
import { getCookies, setCookies } from "../../Modules/CookiesFunctions"
import { countInArray, countInString } from "../../Modules/CountFunctions"

export const __STATUS_OK__ = 0
export const __WORD_NOT_FOUND__ = 1
export const __INVALID_INPUT__ = 2
export const __STATUS_END__ = 3

export class Game {
    private words: Array<Array<Array<{ char: string, color: string, animate: boolean }>>> = []
    private wordIndex: number = 0

    private endWords: Array<string>
    private isCorrectArray: Array<boolean>

    // Defines the gametype
    // Ex. Classic Wordle = (5, 5, 1)
    // Ex. Duordle = (5, 5, 2)
    private rowLength: number
    private columnLength: number
    private dimension: number

    private beta: boolean
    private title: string

    private isEnd: boolean = false

    constructor(rowLength: number, columnLenth: number, dimension: number, beta: boolean, title: string) {
        this.rowLength = rowLength;
        this.columnLength = columnLenth
        this.dimension = dimension

        this.beta = beta
        this.title = title

        this.endWords = getDailyWords(dimension)

        let cookies = undefined

        if (this.dimension === 1) cookies = getCookies('wData')

        if (cookies) {
            this.words = cookies.words
            this.wordIndex = cookies.wordIndex
            this.isEnd = cookies.end
            this.isCorrectArray = cookies.correctGuess

            return;
        }

        this.isCorrectArray = []

        this.initWords();
        this.initArrays();
    }

    private initWords(): void {
        for (let dim = 0; dim < this.dimension; dim++) {
            this.words.push([])

            for (let idx = 0; idx < this.rowLength; idx++) {
                this.words[dim].push([])

                for (let jdx = 0; jdx < this.columnLength; jdx++) {
                    this.words[dim][idx].push({ char: "", color: "#3d3939", animate: false })
                }
            }
        }
    }

    private initArrays() {
        for (let dim = 0; dim < this.dimension; dim++)
            this.isCorrectArray.push(false)
    }

    onKeyPress(char: string): void {
        if (!"abcdefghijklmnopqrstuvwxyz".includes(char)) return;

        for (let dim = 0; dim < this.dimension; dim++) {
            // Words will have the same input, so we can search on dimension-index = 0
            let cIndex: number = this.findIndex('', this.words[dim][this.wordIndex])

            if (cIndex === this.columnLength || cIndex === -1) continue;

            if (!this.isCorrectArray[dim]) {
                this.words[dim][this.wordIndex][cIndex].char = char
                this.words[dim][this.wordIndex][cIndex].animate = true
            }
        }
    }

    onDelete(): void {
        for (let dim = 0; dim < this.dimension; dim++) {
            if (this.isCorrectArray[dim]) continue;

            let cIndex: number = this.findIndex('', this.words[dim][this.wordIndex]) - 1

            if (cIndex === -1) continue;
            if (cIndex === -2) cIndex = this.columnLength - 1

            this.words[dim][this.wordIndex][cIndex].char = ''
        }
    }

    onEnter(keyboard: Array<Array<{ char: string, color: string }>>): number {
        let cIndex: number = 0

        for (let dim = 0; dim < this.dimension; dim++)
            if (!this.isCorrectArray[dim]) cIndex = this.findIndex("", this.words[dim][this.wordIndex])

        if (cIndex !== -1) return __INVALID_INPUT__;

        let cArray: Array<{ char: string, color: string, animate: boolean }> = []

        for (let dim = 0; dim < this.dimension; dim++)
            if (!this.isCorrectArray[dim]) cArray = this.words[dim][this.wordIndex]

        let word: string = cArray.map(cElem => cElem.char).join("")

        if (!data.includes(word)) return __WORD_NOT_FOUND__;

        let lettersFound: Array<Array<string>> = []
        let isCorrectArray: Array<boolean> = this.checkCorrectLetters(lettersFound, keyboard)

        if (!isCorrectArray.includes(false)) return __STATUS_END__

        this.checkMisplacedLetters(lettersFound, keyboard)

        if ((this.wordIndex += 1) === this.rowLength) return __STATUS_END__

        setCookies('wData', {
            words: this.words,
            wordIndex: this.wordIndex,
            end: false,
            correctGuess: this.isCorrectArray,
        }, true)

        return __STATUS_OK__
    }

    // TODO Refactor code
    private checkCorrectLetters(lettersFound: Array<Array<string>>, keyboard: Array<Array<{ char: string, color: string }>>): Array<boolean> {
        let tempArray: Array<boolean> = []
        for (let dim = 0; dim < this.dimension; dim++) {
            lettersFound.push([])
            tempArray.push(true)

            if (this.isCorrectArray[dim]) continue;

            const cArray: Array<{ char: string, color: string, animate: boolean }> = this.words[dim][this.wordIndex]
            const cWord: string = this.endWords[dim]

            for (let idx = 0; idx < cArray.length; idx++) {
                const char: string = cArray[idx].char

                if (char.localeCompare(cWord[idx]) === 0) {
                    cArray[idx].color = "#70a64c"
                    lettersFound[dim].push(char)

                    if (this.dimension === 1) this.setKeyboardLetter("#70a64c", keyboard, char)
                }

                else tempArray[dim] = false
            }
        }

        this.isCorrectArray = tempArray

        return this.isCorrectArray
    }

    private checkMisplacedLetters(lettersFound: Array<Array<string>>, keyboard: Array<Array<{ char: string, color: string }>>): void {
        for (let dim = 0; dim < this.dimension; dim++) {
            if (this.isCorrectArray[dim]) continue;

            const cArray: Array<{ char: string, color: string, animate: boolean }> = this.words[dim][this.wordIndex]
            const cWord: string = this.endWords[dim]

            for (let idx = 0; idx < cArray.length; idx++) {

                const char: string = cArray[idx].char

                if (!cWord.includes(char)) {
                    this.setKeyboardLetter("#221e1e", keyboard, char)
                    continue;
                };

                const tCharInString: number = countInString(cWord, char)
                const tCharInArray: number = countInArray(lettersFound[dim], char)

                if (!lettersFound[dim].includes(char) && tCharInArray < tCharInString) {
                    cArray[idx].color = "#a6944c"
                    lettersFound[dim].push(char)

                    if (this.dimension === 1) this.setKeyboardLetter("#a6944c", keyboard, char)
                }
            }
        }
    }

    private setKeyboardLetter(color: string, keyboard: Array<Array<{ char: string, color: string }>>, char: string) {
        for (let idx = 0; idx < keyboard.length; idx++) {
            for (let jdx = 0; jdx < keyboard[idx].length; jdx++) {
                if (keyboard[idx][jdx].char.localeCompare(char) === 0) keyboard[idx][jdx].color = color
            }
        }
    }

    private findIndex(char: string, array: { char: string; color: string; animate: boolean; }[]): number {
        let index: number = 0
        for (index; index < this.columnLength; index++) {
            if (array[index].char.localeCompare(char) === 0) return index
        }

        return -1
    }

    getWords(): any { return this.words }

    getEndWords(): Array<string> { return this.endWords }

    getCorrectGuesses(): Array<boolean> { return this.isCorrectArray }

    getTitle(): string { return this.title }

    isBeta(): boolean { return this.beta }

    ended(): boolean { return this.isEnd }

    end(keyboard: any) {
        this.isEnd = true

        if (this.dimension > 1) return;

        const correct: boolean = this.isCorrectArray[0]

        setCookies('wData', {
            words: this.words,
            wordIndex: this.wordIndex,
            end: true,
            correctGuess: this.isCorrectArray,
        }, true)

        setCookies("keyboard", keyboard, true)

        let stats: {
            numCorrect: number,
            numGuesses: Array<number>
        } | undefined = getCookies("statistics")

        if (stats === undefined) setCookies("statistics", { numCorrect: correct ? 1 : 0, numGuesses: [this.wordIndex + 1] }, false)

        else {
            stats.numGuesses.push(this.wordIndex + 1)
            stats.numCorrect = correct ? stats.numCorrect + 1 : stats.numCorrect

            setCookies("statistics", stats, false)
        }
    }

    copy() {
        if (this.dimension > 1) return;

        let string = "https://wordle-dutch.herokuapp.com/ " + (this.wordIndex + 1) + "/6\n\n"

        for (let idx = 0; idx < this.wordIndex + 1; idx++) {
            for (let jdx = 0; jdx < 5; jdx++) {
                if (this.words[0][idx][jdx].color.localeCompare("#a6944c") === 0) string += "🟨"
                else if (this.words[0][idx][jdx].color.localeCompare("#70a64c") === 0) string += "🟩"
                else string += "⬛️"
            }
            string += "\n"
        }

        navigator.clipboard.writeText(string)
    }
}

export class Duordle extends Game {

}