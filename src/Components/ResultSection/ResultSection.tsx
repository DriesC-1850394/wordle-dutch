const ResultSection = ({ showResult, onClose, timeLeft, correctWord, activeWordIndex, words }: { showResult: boolean, onClose: Function, timeLeft: string, correctWord: string, activeWordIndex: number, words: Array<Array<{ char: string, color: string, animate: boolean }>> }) => {
    return (
        <div className={showResult ? 'Result' : 'DisplayNone'}>
            <div className="Close" onClick={() => onClose(false)}>X</div>
            <div className="ClosingWord">
                Meer is onderweg!
            </div>
            <div className="ResultWord">
                {correctWord}
            </div>
            <div className="BottomSection">
                <div className="TimeLeft">
                    {timeLeft}
                </div>
                <button className="ShareButton" onClick={() => copy()}>Resultaat Kopieren</button>
            </div>
        </div>
    )

    function copy() {
        let string = "https://wordle-dutch.herokuapp.com/ " + (activeWordIndex) + "/6\n\n"

        for (let idx = 0; idx < activeWordIndex; idx++) {
            for (let jdx = 0; jdx < 5; jdx++) {
                if (words[idx][jdx].color.localeCompare("#a6944c") === 0) string += "🟨"
                else if (words[idx][jdx].color.localeCompare("#70a64c") === 0) string += "🟩"
                else string += "⬛️"
            }
            string += "\n"
        }

        navigator.clipboard.writeText(string)
    }
}

export default ResultSection