import KeyboardElement from "./KeyboardElement/KeyboardElement"

const KeyboardSection = ({ onClick, disabled, keyboard }: { onClick: Function, keyboard: Array<Array<{ char: string, color: string }>>, disabled: boolean }) => {

    return (
        <div className="KeyboardSection">
            {
                keyboard.map((e, index) =>
                    <div key={index} className="KeyboardElements">
                        {index === 2 && <KeyboardElement disabled={disabled} color="#3d3939" onClick={onClick} char="enter" />}
                        {e.map((element) => <KeyboardElement disabled={disabled} key={element.char} onClick={onClick} color={element.color} char={element.char} />)}
                        {index === 2 && <KeyboardElement disabled={disabled} color="#3d3939" onClick={onClick} char="verwijder" />}
                    </div>
                )
            }
        </div>
    )
}

export default KeyboardSection