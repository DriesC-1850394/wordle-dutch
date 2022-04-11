import { useState } from 'react';
import './App.css';
import { data } from './data'

import InputSection from './InputSection/InputSection';
import KeyboardSection from './KeyboardSection/KeyboardSection';

const App = () => {
  const [words, updateWords] = useState<Array<Array<{ char: string, color: string }>>>([
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }],
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }],
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }],
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }],
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }],
    [{ char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }, { char: "", color: "#3d3939" }]
  ])

  const [activeWordIndex, setActiveWordIndex] = useState<number>(0)
  const [correctWord, setCorrectWord] = useState(getRandomWord)

  return (
    <div className="App">
      <div className="InDevelopment">In Development</div>
      <InputSection activeWords={words} activeWordIndex={activeWordIndex} />
      <KeyboardSection onClick={onKeyPress} />
    </div>
  );

  function onKeyPress(char: string) {
    if (char.localeCompare("delete") == 0) popLast()

    else if (char.localeCompare("enter") == 0) enterWord()

    else {
      let eIndex: number = findIndex("")

      if (eIndex == 5) return;

      words[activeWordIndex][eIndex].char = char

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

    for (let idx = 0; idx < words[activeWordIndex].length; idx++) {
      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) == 0)
        words[activeWordIndex][idx].color = "#70a64c"

      else if (correctWord.includes(words[activeWordIndex][idx].char))
        words[activeWordIndex][idx].color = "#a6944c"

      if (words[activeWordIndex][idx].char.localeCompare(correctWord[idx]) != 0) correct = false
    }

    // TODO Win or Lose
    if (activeWordIndex + 1 == 6 || correct) end()
    setActiveWordIndex(activeWordIndex + 1)
  }

  function end() {
    console.log("wooohoooo")
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
