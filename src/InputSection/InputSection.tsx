import InputElement from "./InputElement/InputElement"

const InputSection = ({ activeWords, activeWordIndex, }: { activeWords: Array<Array<{ char: string, color: string, animate: boolean }>>, activeWordIndex: number }) => {
    return (
        <div className="InputSection">
            {activeWords.map((e, idx) =>
                <div key={idx} className="InputRow">
                    {e.map((element, index) => <InputElement key={element.char + index + idx} animate={element.animate} char={element.char} color={element.color} />)}
                </div>
            )}
        </div>
    )
}

export default InputSection