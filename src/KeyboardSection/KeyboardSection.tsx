import KeyboardElement from "./KeyboardElement/KeyboardElement"

const KeyboardSection = ({ onClick, fRow, sRow, tRow, disabled }: { onClick: Function, fRow: Array<{ char: string, color: string }>, sRow: Array<{ char: string, color: string }>, tRow: Array<{ char: string, color: string }>, disabled: boolean }) => {

    return (
        <div className="KeyboardSection">
            {
                [fRow, sRow, tRow].map((e, index) =>
                    <div key={index} className="KeyboardElements">
                        {index == 2 && <KeyboardElement disabled={disabled} color="#3d3939" onClick={onClick} char="enter" />}
                        {e.map((element) => <KeyboardElement disabled={disabled} key={element.char} onClick={onClick} color={element.color} char={element.char} />)}
                        {index == 2 && <KeyboardElement disabled={disabled} color="#3d3939" onClick={onClick} char="delete" />}
                    </div>
                )
            }
        </div>
    )
}

export default KeyboardSection