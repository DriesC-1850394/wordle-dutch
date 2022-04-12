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
import { findIndex, removeLast } from './Modules/ArrayFunctions';
import { getCookies, setCookies } from './Modules/CookiesFunctions';
import { countInArray, countInString } from './Modules/CountFunctions';

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

  const [keyboard, setKeyboard] = useState<Array<Array<{ char: string, color: string }>>>(
    getCookies("keyboard") === undefined ?
      [
        [{ char: 'a', color: "#3d3939" }, { char: 'z', color: "#3d3939" }, { char: 'e', color: "#3d3939" }, { char: 'r', color: "#3d3939" }, { char: 't', color: "#3d3939" }, { char: 'y', color: "#3d3939" }, { char: 'u', color: "#3d3939" }, { char: 'i', color: "#3d3939" }, { char: 'o', color: "#3d3939" }, {
          char: 'p', color: "#3d3939"
        }],
        [{ char: 'q', color: "#3d3939" }, { char: 's', color: "#3d3939" }, { char: 'd', color: "#3d3939" }, { char: 'f', color: "#3d3939" }, { char: 'g', color: "#3d3939" }, { char: 'h', color: "#3d3939" }, { char: 'j', color: "#3d3939" }, { char: 'k', color: "#3d3939" }, { char: 'l', color: "#3d3939" }, {
          char: 'm', color: "#3d3939"
        }],
        [{ char: 'w', color: "#3d3939" }, { char: 'x', color: "#3d3939" }, { char: 'c', color: "#3d3939" }, { char: 'v', color: "#3d3939" }, { char: 'b', color: "#3d3939" }, { char: 'n', color: "#3d3939" }]
      ] : getCookies("keyboard"))

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
      <ResultSection
        showResult={showResult} timeLeft={time.format(timeLeft)} correctWord={correctWord} onClose={() => setShowResult(false)}
        activeWordIndex={activeWordIndex} words={words} correctGuess={correctGuess}
      />
      <InputSection activeWords={words} />
      <KeyboardSection onClick={onKeyPress} keyboard={keyboard} disabled={disabled} />
    </div>
  );

  function onDelete() {
    setInvalid(false);
    words[activeWordIndex] = removeLast(words[activeWordIndex]);
  }

  function onEnter() {
    const lastLetterIndex: number = findIndex("", words[activeWordIndex])

    if (lastLetterIndex < 5 || lastLetterIndex === 0) return;

    let word: string = words[activeWordIndex].map(o => o.char).join("")

    // Handle faulty words
    if (!data.includes(word)) {
      setInvalid(true); return;
    }

    const lettersFound: Array<string> = []

    // Check for correct letters
    let correct: boolean = checkCorrectLetters(lettersFound)
    if (correct) { end(correct); return; }

    // Check for misplaced letters
    checkMisplacedLetters(lettersFound)



    setCookies("wData", {
      words: words,
      activeWordIndex: activeWordIndex,
      end: false
    }, true)

    setCookies("keyboard", keyboard, true)

    setActiveWordIndex(activeWordIndex + 1)

    if (activeWordIndex + 1 === 6) end(correct)
  }

  function checkCorrectLetters(lettersFound: Array<string>): boolean {
    let correct: boolean = true

    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      const char: string = words[activeWordIndex][idx].char

      if (char.localeCompare(correctWord[idx]) === 0) {
        setInputLetterColor(words[activeWordIndex][idx], "#70a64c")
        setKeyboardLetterColor(char, "#70a64c")

        lettersFound.push(char)
      }

      else correct = false
    }

    return correct
  }

  function checkMisplacedLetters(lettersFound: Array<string>) {
    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      const char: string = words[activeWordIndex][idx].char

      if (!correctWord.includes(char)) { setKeyboardLetterColor(char, "#221e1e"); continue; }
      else setKeyboardLetterColor(char, "#a6944c")

      const tCharInString: number = countInString(correctWord, char)
      const tCharInArray: number = countInArray(lettersFound, char)

      if (!lettersFound.includes(char) && tCharInArray < tCharInString) {
        words[activeWordIndex][idx].color = "#a6944c"
        lettersFound.push(char)
      }
    }
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
    if (char.localeCompare('delete') === 0) { onDelete(); }
    else if (char.localeCompare('enter') === 0) { onEnter(); }
    else {
      if (!"abcdefghijklmnopqrstuvwxyz".includes(char)) return;

      let eIndex: number = findIndex("", words[activeWordIndex])

      if (eIndex === 5) return;

      words[activeWordIndex][eIndex].char = char
      words[activeWordIndex][eIndex].animate = true
    }

    updateWords([...words])
    setKeyboard([...keyboard])
  }

  function end(correct: boolean) {
    setShowResult(true)
    setDisabled(true)
    setCorrectGuess(correct)

    setCookies("wData", {
      words: words,
      activeWordIndex: activeWordIndex,
      end: true,
      correctGuess: correct
    }, true)

    setCookies("keyboard", keyboard, true)

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
