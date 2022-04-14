import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import Time from "../../Classes/Time"
import { daily } from "../../daily_words"
import { data } from "../../data"
import { removeLast, findIndex } from "../../Modules/ArrayFunctions"
import { getCookies, setCookies } from "../../Modules/CookiesFunctions"
import { countInString, countInArray } from "../../Modules/CountFunctions"
import InputSection from "../InputSection/InputSection"
import KeyboardSection from "../KeyboardSection/KeyboardSection"
import ResultSection from "../ResultSection/ResultSection"

const Duordle = () => {
    const time: Time = new Time()
    const wordData: any | undefined = getCookies('duordle')
    const keyboardData: any | undefined = getCookies('keyboard_duordle')

    const endGame: boolean = wordData === undefined ? false : wordData.end

    const [words, updateWords] = useState<Array<Array<Array<{ char: string, color: string, animate: boolean }>>>>(
        wordData === undefined ?
            [
                [
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }]
                ],
                [
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
                    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }]
                ]
            ] : wordData.words)

    const [timeLeft, setTimeLeft] = useState<{ hour: number, minutes: number, seconds: number }>(time.timeleft())

    const [keyboard, setKeyboard] = useState<Array<Array<{ char: string, color: string }>>>(
        keyboardData === undefined ?
            [
                [{ char: 'a', color: "#3d3939" }, { char: 'z', color: "#3d3939" }, { char: 'e', color: "#3d3939" }, { char: 'r', color: "#3d3939" }, { char: 't', color: "#3d3939" }, { char: 'y', color: "#3d3939" }, { char: 'u', color: "#3d3939" }, { char: 'i', color: "#3d3939" }, { char: 'o', color: "#3d3939" }, {
                    char: 'p', color: "#3d3939"
                }],
                [{ char: 'q', color: "#3d3939" }, { char: 's', color: "#3d3939" }, { char: 'd', color: "#3d3939" }, { char: 'f', color: "#3d3939" }, { char: 'g', color: "#3d3939" }, { char: 'h', color: "#3d3939" }, { char: 'j', color: "#3d3939" }, { char: 'k', color: "#3d3939" }, { char: 'l', color: "#3d3939" }, {
                    char: 'm', color: "#3d3939"
                }],
                [{ char: 'w', color: "#3d3939" }, { char: 'x', color: "#3d3939" }, { char: 'c', color: "#3d3939" }, { char: 'v', color: "#3d3939" }, { char: 'b', color: "#3d3939" }, { char: 'n', color: "#3d3939" }]
            ] : keyboardData)

    const [correctWord] = useState(daily)
    const [correctGuess, setCorrectGuess] = useState<boolean>(wordData === undefined ? false : wordData.correctGuess)
    const [activeWordIndex, setActiveWordIndex] = useState<number>(wordData === undefined ? 0 : wordData.correctGuess ? wordData.activeWordIndex : wordData.activeWordIndex + 1)

    const [disabled, setDisabled] = useState(endGame)
    const [invalid, setInvalid] = useState(false)
    const [showResult, setShowResult] = useState(endGame)

    var keypress = (event: { keyCode: number; key: string; }) => {
        if (disabled || event.keyCode === undefined) return;

        if (event.keyCode === 8) onDelete()
        else if (event.keyCode == 13) onEnter()
        else onKeyPress(event.key)

        updateWords([...words])
        setKeyboard([...keyboard])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(time.timeleft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    useEffect(() => {
        window.addEventListener('keydown', keypress)

        return () => window.removeEventListener('keydown', keypress)
    }, [activeWordIndex])

    return (
        <div className="App">
            {disabled && <div className="ShowRresult" onClick={() => setShowResult(true)}>
                <FontAwesomeIcon icon={faSquarePollVertical} size="2x"></FontAwesomeIcon>
            </div>}
            <div className={invalid ? "WordUnknown" : "DisplayNone"}>Woord is niet gekend</div>

            <div className="DuordleInput">
                <InputSection activeWords={words[0]} />
                <InputSection activeWords={words[1]} />
            </div>

            <KeyboardSection onClick={onKeyPress} keyboard={keyboard} disabled={disabled} />
        </div>
    );

    function onDelete() {
        setInvalid(false);
        words[activeWordIndex] = removeLast(words[activeWordIndex]);
    }

    function onEnter() {

    }

    function checkCorrectLetters(lettersFound: Array<string>): boolean {
        let correct: boolean = false

        return correct
    }

    function checkMisplacedLetters(lettersFound: Array<string>) {

    }

    function setInputLetterColor(element: { char: string, color: string, animate: boolean }, color: string) {
        element.color = color
    }

    function setKeyboardLetterColor(char: string, color: string) {
        keyboard.forEach(element => element.forEach(key => {
            if (key.char.localeCompare(char) === 0 && key.color.localeCompare("#70a64c") !== 0) key.color = color
        }))
    }

    function onKeyPress(char: string) {

    }

    function end(correct: boolean) {

    }
}

export default Duordle