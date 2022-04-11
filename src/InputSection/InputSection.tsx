import InputElement from "./InputElement/InputElement"

const InputSection = ({ activeWords, activeWordIndex, }: { activeWords: Array<Array<{ char: string, color: string }>>, activeWordIndex: number }) => {
    return (
        <div className="InputSection">
            <div className="InputRow">
                {activeWords[0].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
            <div className="InputRow">
                {activeWords[1].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
            <div className="InputRow">
                {activeWords[2].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
            <div className="InputRow">
                {activeWords[3].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
            <div className="InputRow">
                {activeWords[4].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
            <div className="InputRow">
                {activeWords[5].map((element, index) => <InputElement key={element.char + index} char={element.char} color={element.color} />)}
            </div>
        </div>
    )
}

export default InputSection