import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import './App.css';
import Time from './Classes/Time';
import InputSection from './Components/InputSection/InputSection';
import KeyboardSection from './Components/KeyboardSection/KeyboardSection';
import ResultSection from './Components/ResultSection/ResultSection';
import { daily } from './daily_words';
import { data } from './data';
import { findIndex, pop } from './Functions/ArrayFunctions';
import { getCookies, setCookies } from './Functions/CookiesFunctions';
import { countInArray, countInString } from './Functions/CountFunctions';

const App = () => {
  const time: Time = new Time()
  const wordData: any | undefined = getCookies("wData")
  const endGame: boolean = wordData === undefined ? false : wordData.end

  const [words, updateWords] = useState<Array<Array<{ char: string, color: string, animate: boolean }>>>(
    wordData === undefined ?
      [
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
        [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }]
      ] : wordData.words)

  const [timeLeft, setTimeLeft] = useState<{ hour: number, minutes: number, seconds: number }>(time.timeleft())

  const [keyboard, setKeyboard] = useState<Array<Array<{ char: string, color: string }>>>([
    [{ char: 'a', color: "#3d3939" }, { char: 'z', color: "#3d3939" }, { char: 'e', color: "#3d3939" }, { char: 'r', color: "#3d3939" }, { char: 't', color: "#3d3939" }, { char: 'y', color: "#3d3939" }, { char: 'u', color: "#3d3939" }, { char: 'i', color: "#3d3939" }, { char: 'o', color: "#3d3939" }, {
      char: 'p', color: "#3d3939"
    }],
    [{ char: 'q', color: "#3d3939" }, { char: 's', color: "#3d3939" }, { char: 'd', color: "#3d3939" }, { char: 'f', color: "#3d3939" }, { char: 'g', color: "#3d3939" }, { char: 'h', color: "#3d3939" }, { char: 'j', color: "#3d3939" }, { char: 'k', color: "#3d3939" }, { char: 'l', color: "#3d3939" }, {
      char: 'm', color: "#3d3939"
    }],
    [{ char: 'w', color: "#3d3939" }, { char: 'x', color: "#3d3939" }, { char: 'c', color: "#3d3939" }, { char: 'v', color: "#3d3939" }, { char: 'b', color: "#3d3939" }, { char: 'n', color: "#3d3939" }]
  ])

  const [activeWordIndex, setActiveWordIndex] = useState<number>(wordData === undefined ? 0 : wordData.activeWordIndex)
  const [correctWord] = useState(daily)

  const [disabled, setDisabled] = useState(endGame)
  const [invalid, setInvalid] = useState(false)
  const [showResult, setShowResult] = useState(endGame)

  var keypress = (event: { keyCode: number; key: string; }) => {
    if (disabled) return;

    if (event.keyCode === 8) onKeyPress("verwijder")
    else onKeyPress(event.key)
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
      <div className="InDevelopment">In Development</div>
      {disabled && <div className="ShowRresult" onClick={() => setShowResult(true)}>
        <FontAwesomeIcon icon={faSquarePollVertical} size="2x"></FontAwesomeIcon>
      </div>}
      <div className={invalid ? "WordUnknown" : "DisplayNone"}>Woord is niet gekend</div>
      <ResultSection
        showResult={showResult} timeLeft={time.format(timeLeft)} correctWord={correctWord} onClose={() => setShowResult(false)}
        activeWordIndex={activeWordIndex} words={words}
      />
      <InputSection activeWords={words} />
      <KeyboardSection onClick={onKeyPress} keyboard={keyboard} disabled={disabled} />
    </div>
  );

  function onKeyPress(char: string) {
    if (char === undefined) return;

    if (char.localeCompare("verwijder") === 0) {
      setInvalid(false); words[activeWordIndex] = pop(words[activeWordIndex]); updateWords([...words])
    }

    else if (char.toLocaleLowerCase().localeCompare("enter") === 0) enterWord()

    if (!"abcdefghijklmnopqrstuvwxyz".includes(char)) return;

    let eIndex: number = findIndex("", words[activeWordIndex])

    if (eIndex === 5) return;

    words[activeWordIndex][eIndex].char = char
    words[activeWordIndex][eIndex].animate = true

    updateWords([...words])
  }



  // TODO Refactor
  function enterWord() {
    if (words[activeWordIndex].length < 5 || findIndex("", words[activeWordIndex]) === 0) return;

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
      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) === 0) {
        words[activeWordIndex][idx].color = "#70a64c"

        lettersFound.push(words[activeWordIndex][idx].char)

        setUsedLetters(words[activeWordIndex][idx].char, "#70a64c")
      }

      else if (correctWord.includes(words[activeWordIndex][idx].char)) setUsedLetters(words[activeWordIndex][idx].char, "#a6944c")
      else setUsedLetters(words[activeWordIndex][idx].char, "#221e1e")

      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) !== 0) correct = false
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

    setCookies("wData", {
      words: words,
      activeWordIndex: activeWordIndex + 1,
      end: false
    }, true)

    if (activeWordIndex + 1 === 6 || correct) end(correct)
  }

  function setUsedLetters(char: string, color: string) {
    keyboard.forEach(element => element.forEach(key => {
      if (key.char.localeCompare(char) === 0 && key.color.localeCompare("#70a64c") !== 0) key.color = color
    }))

    setKeyboard([...keyboard])
  }

  function end(correct: boolean) {
    setShowResult(true)
    setDisabled(true)

    setCookies("wData", {
      words: words,
      activeWordIndex: activeWordIndex + 1,
      end: true
    }, true)

    let stats: {
      numCorrect: number,
      numGuesses: Array<number>
    } | undefined = getCookies("statistics")

    if (stats === undefined) setCookies("statistics", { numCorrect: correct ? 1 : 0, numGuesses: [activeWordIndex + 1] }, false)

    else {
      stats.numGuesses.push(activeWordIndex + 1)
      stats.numCorrect = correct ? stats.numCorrect + 1 : stats.numCorrect

      setCookies("statistics", stats, false)
    }
  }
}

export default App;
