import { stringify } from 'querystring';
import { useState } from 'react';
import './App.css';
import { data } from './data'

import InputSection from './InputSection/InputSection';
import KeyboardSection from './KeyboardSection/KeyboardSection';

const App = () => {
  const [words, updateWords] = useState<Array<Array<{ char: string, color: string, animate: boolean }>>>([
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }],
    [{ char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }, { char: "", color: "#3d3939", animate: false }]
  ])

  const [firstRow, setFirstRow] = useState<Array<{ char: string, color: string }>>([{ char: 'a', color: "#3d3939" }, { char: 'z', color: "#3d3939" }, { char: 'e', color: "#3d3939" }, { char: 'r', color: "#3d3939" }, { char: 't', color: "#3d3939" }, { char: 'y', color: "#3d3939" }, { char: 'u', color: "#3d3939" }, { char: 'i', color: "#3d3939" }, { char: 'o', color: "#3d3939" }, {
    char: 'p', color: "#3d3939"
  }])
  const [secondRow, setSecondRow] = useState<Array<{ char: string, color: string }>>([{ char: 'q', color: "#3d3939" }, { char: 's', color: "#3d3939" }, { char: 'd', color: "#3d3939" }, { char: 'f', color: "#3d3939" }, { char: 'g', color: "#3d3939" }, { char: 'h', color: "#3d3939" }, { char: 'j', color: "#3d3939" }, { char: 'k', color: "#3d3939" }, { char: 'l', color: "#3d3939" }, {
    char: 'm', color: "#3d3939"
  }])
  const [thirdRow, setThirdRow] = useState<Array<{ char: string, color: string }>>([{ char: 'w', color: "#3d3939" }, { char: 'x', color: "#3d3939" }, { char: 'c', color: "#3d3939" }, { char: 'v', color: "#3d3939" }, { char: 'b', color: "#3d3939" }, { char: 'n', color: "#3d3939" }])

  const [activeWordIndex, setActiveWordIndex] = useState<number>(0)
  const [correctWord] = useState(getRandomWord)

  const [disabled, setDisabled] = useState(false)

  return (
    <div className="App">
      <div className="InDevelopment">In Development</div>
      <InputSection activeWords={words} activeWordIndex={activeWordIndex} />
      <KeyboardSection onClick={onKeyPress} fRow={firstRow} sRow={secondRow} tRow={thirdRow} disabled={disabled} />
    </div>
  );

  function onKeyPress(char: string) {
    if (char.localeCompare("delete") == 0) popLast()

    else if (char.localeCompare("enter") == 0) enterWord()

    else {
      let eIndex: number = findIndex("")

      if (eIndex == 5) return;

      words[activeWordIndex][eIndex].char = char
      words[activeWordIndex][eIndex].animate = true

      updateWords([...words])
    }

  }

  function popLast() {
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
    if (!data.includes(word)) return;

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
        setUsedLetters(words[activeWordIndex][idx].char, "#3d393979")
      }

      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) != 0) correct = false
    }
    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      if (correctWord.includes(words[activeWordIndex][idx].char) && !lettersFound.includes(words[activeWordIndex][idx].char)) {
        words[activeWordIndex][idx].color = "#a6944c"
      }
    }

    // TODO Win or Lose
    if (activeWordIndex + 1 == 6 || correct) end()
    setActiveWordIndex(activeWordIndex + 1)
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
    setDisabled(true)
  }

  function findIndex(char: string): number {
    let index: number = 0

    for (index; index < words[activeWordIndex].length; index++)
      if (words[activeWordIndex][index].char.localeCompare(char) == 0) return index

    return index
  }

  function getRandomWord(): string {
    let randInt: number = Math.floor(Math.random() * (data.length));

    console.log(data[randInt])

    return data[randInt]
  }
}

export default App;
