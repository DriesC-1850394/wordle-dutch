import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Game, __STATUS_END__, __STATUS_OK__, __WORD_NOT_FOUND__ } from './Classes/Game/Game';
import Time from './Classes/Time';
import InputSection from './Components/InputSection/InputSection';
import KeyboardSection from './Components/KeyboardSection/KeyboardSection';
import ResultSection from './Components/ResultSection/ResultSection';
import { getCookies } from './Modules/CookiesFunctions';

// TODO Change layotu on 1000px


const App = () => {
  const time: Time = new Time()

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


  const [invalid, setInvalid] = useState(false)

  const [game, update] = useState<Game | undefined>()

  const [words, updateWords] = useState<Array<Array<Array<{ char: string, color: string, animate: boolean }>>>>([])
  const [showResult, setShowResult] = useState(false)

  const [keylistener, changeKeyListener] = useState(false)

  useEffect(() => {
    let tempGame: Game = new Game(6, 5, 1, false, "Wordle")
    update(tempGame)
    updateWords(tempGame.getWords())
    setShowResult(tempGame.ended())
  }, [])

  var keypress = useCallback((event: { keyCode: number; key: string; }) => {
    if (game === undefined) return;

    if (game.ended() || event.keyCode === undefined) return;

    if (event.keyCode === 8) { game.onDelete(); setInvalid(false) }

    else if (event.keyCode === 13) {
      const statusCode: number = game.onEnter(keyboard)

      if (statusCode === __WORD_NOT_FOUND__) setInvalid(true)
      if (statusCode === __STATUS_END__) { game.end(keyboard); setShowResult(true) }
      if (statusCode === __STATUS_OK__) changeKeyListener(true)
    }

    else game.onKeyPress(event.key)

    updateWords([...game.getWords()])
    setKeyboard([...keyboard])
  }, [game, keyboard])

  useEffect(() => {

    if (showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(time.timeleft());
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', keypress)

    return () => window.removeEventListener('keydown', keypress)
  }, [keylistener, game, keypress])

  return (
    <div className="App">
      <div className="TopSection">
        <div className="Title">{game?.getTitle()}</div>
        {(game?.isBeta() ?? false) && <div className="Beta"> Beta </div>}
      </div>

      {(game?.ended() ?? false) && <div className="ShowRresult" onClick={() => setShowResult(true)}>
        <FontAwesomeIcon icon={faSquarePollVertical} size="2x"></FontAwesomeIcon>
      </div>}
      <div className={invalid ? "WordUnknown" : "DisplayNone"}>Woord is niet gekend</div>
      <ResultSection
        showResult={showResult} timeLeft={time.format(timeLeft)} correctWords={game?.getEndWords() ?? []} onClose={() => setShowResult(false)}
        correctGuess={game?.getCorrectGuesses() ?? []} copy={game?.copy() ?? (() => { })}
      />

      <div className="InputWrapper">
        {game !== undefined &&
          words.map((element, index) => <InputSection activeWords={element} key={index} />)
        }
      </div>

      <KeyboardSection onClick={keypress} keyboard={keyboard} disabled={game?.ended() ?? false} />
    </div>
  );

  // function end(correct: boolean) {

  //   setCookies(gameMode.localeCompare('wordle') == 0 ? 'wData' : 'duordle', {
  //     words: words,
  //     activeWordIndex: activeWordIndex,
  //     end: true,
  //     correctGuess: correct,
  //   }, true)


  // }
}

export default App;
