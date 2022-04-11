import { faCar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { time } from 'console';
import { useEffect, useState } from 'react';
import './App.css';
import { daily } from './daily_words';
import { data } from './data'
import { Cookies } from 'react-cookie'

import InputSection from './InputSection/InputSection';
import KeyboardSection from './KeyboardSection/KeyboardSection';

const App = () => {
  const cookies = new Cookies()

  const [words, updateWords] = useState<Array<Array<{ char: string, color: string, animate: boolean }>>>(
    cookies.get('wData') == undefined ?
      [
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }]
      ] : cookies.get('wData').words)


  const calculateTimeLeft = (): { hours: number, minutes: number, seconds: number } => {
    let tonight: Date = new Date();

    tonight.setHours(23)
    tonight.setMinutes(59)
    tonight.setSeconds(59)

    let difference = +tonight - +new Date()

    let timeLeft: { hours: number, minutes: number, seconds: number } = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number }>(calculateTimeLeft)

  const [firstRow, setFirstRow] = useState<Array<{ char: string, color: string }>>([{ char: 'a', color: "#3d3939" }, { char: 'z', color: "#3d3939" }, { char: 'e', color: "#3d3939" }, { char: 'r', color: "#3d3939" }, { char: 't', color: "#3d3939" }, { char: 'y', color: "#3d3939" }, { char: 'u', color: "#3d3939" }, { char: 'i', color: "#3d3939" }, { char: 'o', color: "#3d3939" }, {
    char: 'p', color: "#3d3939"
  }])
  const [secondRow, setSecondRow] = useState<Array<{ char: string, color: string }>>([{ char: 'q', color: "#3d3939" }, { char: 's', color: "#3d3939" }, { char: 'd', color: "#3d3939" }, { char: 'f', color: "#3d3939" }, { char: 'g', color: "#3d3939" }, { char: 'h', color: "#3d3939" }, { char: 'j', color: "#3d3939" }, { char: 'k', color: "#3d3939" }, { char: 'l', color: "#3d3939" }, {
    char: 'm', color: "#3d3939"
  }])
  const [thirdRow, setThirdRow] = useState<Array<{ char: string, color: string }>>([{ char: 'w', color: "#3d3939" }, { char: 'x', color: "#3d3939" }, { char: 'c', color: "#3d3939" }, { char: 'v', color: "#3d3939" }, { char: 'b', color: "#3d3939" }, { char: 'n', color: "#3d3939" }])

  const [activeWordIndex, setActiveWordIndex] = useState<number>(cookies.get('wData') == undefined ? 0 : cookies.get('wData').activeWordIndex)
  const [correctWord] = useState(daily)

  const [disabled, setDisabled] = useState(cookies.get("bData") == undefined ? false : true)
  const [invalid, setInvalid] = useState(false)
  const [showResult, setShowResult] = useState(cookies.get("bData") == undefined ? false : true)

  var keypress = (event: { keyCode: number; key: string; }) => {
    if (disabled) return;

    if (event.keyCode == 8) onKeyPress("verwijder")
    else onKeyPress(event.key)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    console.log(cookies.get("wData"))

    window.addEventListener('keydown', keypress)

    return () => window.removeEventListener('keydown', keypress)

  }, [activeWordIndex])

  return (
    <div className="App">
      <div className="InDevelopment">In Development</div>
      {disabled && <div className="ShowRresult" onClick={() => setShowResult(true)}>
        <FontAwesomeIcon icon={faSquarePollVertical} size="2x"></FontAwesomeIcon>
      </div>}
      <div className={invalid ? "WordUnknown" : "DisplayNone"}>Woord is niet gekend</div>
      <div className={showResult ? 'Result' : 'DisplayNone'}>
        <div className="Close" onClick={() => setShowResult(false)}>X</div>
        <div className="ClosingWord">
          Meer is onderweg!
        </div>
        <div className="ResultWord">
          {correctWord}
        </div>
        <div className="BottomSection">
          <div className="TimeLeft">
            {timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours}:
            {timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes}:
            {timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds}
          </div>
          <button className="ShareButton" onClick={() => copy()}>Resultaat Kopieren</button>
        </div>
      </div>
      <InputSection activeWords={words} />
      <KeyboardSection onClick={onKeyPress} fRow={firstRow} sRow={secondRow} tRow={thirdRow} disabled={disabled} />
    </div>
  );

  function copy() {
    let string = "https://wordle-dutch.herokuapp.com/ " + (activeWordIndex) + "/6\n\n"

    for (let idx = 0; idx < activeWordIndex; idx++) {
      for (let jdx = 0; jdx < 5; jdx++) {
        if (words[idx][jdx].color.localeCompare("#a6944c") == 0) string += "🟨"
        else if (words[idx][jdx].color.localeCompare("#70a64c") == 0) string += "🟩"
        else string += "⬛️"
      }
      string += "\n"
    }

    navigator.clipboard.writeText(string)
  }

  function onKeyPress(char: string) {
    if (char == undefined) return false;

    if (char.localeCompare("verwijder") == 0) popLast()

    else if (char.toLocaleLowerCase().localeCompare("enter") == 0) enterWord()

    if (!"abcdefghijklmnopqrstuvwxyz".includes(char)) return;

    let eIndex: number = findIndex("")

    if (eIndex == 5) return false;

    words[activeWordIndex][eIndex].char = char
    words[activeWordIndex][eIndex].animate = true

    updateWords([...words])
  }

  function popLast() {
    setInvalid(false)
    if (findIndex("") == 0) return;

    let eIndex: number = findIndex("") - 1

    if (eIndex == -1) eIndex = 4

    words[activeWordIndex][eIndex].char = ""; updateWords([...words])
  }

  function enterWord() {
    if (words[activeWordIndex].length < 5 || findIndex("") == 0) return;

    let word = ""

    words[activeWordIndex].forEach(element => {
      word += element.char
    })

    // Handle faulty words
    if (!data.includes(word)) {
      setInvalid(true)
      return;
    }

    let correct: boolean = true

    const lettersFound = []

    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) == 0) {
        words[activeWordIndex][idx].color = "#70a64c"

        lettersFound.push(words[activeWordIndex][idx].char)

        setUsedLetters(words[activeWordIndex][idx].char, "#70a64c")
      }

      else if (correctWord.includes(words[activeWordIndex][idx].char)) {
        setUsedLetters(words[activeWordIndex][idx].char, "#a6944c")
      }

      else {
        setUsedLetters(words[activeWordIndex][idx].char, "#221e1e")
      }

      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) != 0) correct = false
    }
    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      if (correctWord.includes(words[activeWordIndex][idx].char)) {

        if (!lettersFound.includes(words[activeWordIndex][idx].char) &&
          countInString(correctWord, words[activeWordIndex][idx].char) > countInArray(lettersFound, words[activeWordIndex][idx].char)) {
          words[activeWordIndex][idx].color = "#a6944c"
          lettersFound.push(words[activeWordIndex][idx].char)
        }
      }
    }

    setActiveWordIndex(activeWordIndex + 1)

    cookies.set("wData", {
      words: words,
      activeWordIndex: activeWordIndex
    })

    if (activeWordIndex + 1 == 6 || correct) end()
  }

  function countInString(word: string, char: string): number {
    let count: number = 0;

    for (const c of word)
      count = c.localeCompare(char) == 0 ? count + 1 : count

    return count
  }

  function countInArray(array: Array<string>, char: string): number {
    let count: number = 0

    for (const c of array)
      count = c.localeCompare(char) == 0 ? count + 1 : count

    return count
  }

  function setUsedLetters(char: string, color: string) {
    [firstRow, secondRow, thirdRow].forEach(element => element.forEach(key => {
      if (key.char.localeCompare(char) == 0 && key.color.localeCompare("#70a64c") != 0) key.color = color
    }))

    setFirstRow([...firstRow])
    setSecondRow([...secondRow])
    setThirdRow([...thirdRow])
  }

  function end() {
    setShowResult(true)
    setDisabled(true)

    cookies.set("wData", {
      words: words,
      activeWordIndex: activeWordIndex
    })

    cookies.set("bData", true)
  }

  function findIndex(char: string): number {
    let index: number = 0

    for (index; index < words[activeWordIndex].length; index++)
      if (words[activeWordIndex][index].char.localeCompare(char) == 0) return index

    return index
  }
}

export default App;
