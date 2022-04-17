const ResultSection = ({ showResult, onClose, timeLeft, correctWords, correctGuess, copy }: { showResult: boolean, onClose: Function, timeLeft: string, correctWords: Array<string>, correctGuess: Array<boolean>, copy: Function }) => {
    return (
        <div className={showResult ? 'Result' : 'DisplayNone'}>
            <div className="Close" onClick={() => onClose(false)}>X</div>
            <div className="ClosingWord">
                Resultaat
            </div>
            <div className="Words">
                {correctWords.map((word, index) =>
                    <div className="ResultWord" style={{ border: "2px solid " + (correctGuess[index] ? "#70a64c" : "#a64c4c"), borderRadius: 4, padding: "10px 50px" }}>
                        {word}
                    </div>)}
            </div>

            <div className="BottomSection">
                <div className="TimeLeft">
                    {timeLeft}
                </div>
                <button className="ShareButton" onClick={copy()}>Resultaat Kopieren</button>
            </div>
        </div>
    )
}

export default ResultSection