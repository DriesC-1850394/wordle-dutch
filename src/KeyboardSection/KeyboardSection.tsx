import KeyboardElement from "./KeyboardElement/KeyboardElement"

const KeyboardSection = ({ onClick }: { onClick: Function }) => {
    const firstRow: Array<string> = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const secondRow: Array<string> = ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm']
    const thirdRow: Array<string> = ['w', 'x', 'c', 'v', 'b', 'n']

    return (
        <div className="KeyboardSection">
            <div className="KeyboardElements">
                {firstRow.map((element) => <KeyboardElement key={element} onClick={onClick} char={element} />)}
            </div>
            <div className="KeyboardElements">
                {secondRow.map((element) => <KeyboardElement key={element} onClick={onClick} char={element} />)}
            </div>
            <div className="KeyboardElements">
                <KeyboardElement onClick={onClick} char="enter" />
                {thirdRow.map((element) => <KeyboardElement key={element} onClick={onClick} char={element} />)}
                <KeyboardElement onClick={onClick} char="delete" />
            </div>
        </div>
    )
}

export default KeyboardSection