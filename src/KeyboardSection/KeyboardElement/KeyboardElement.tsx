const KeyboardElement = ({ char, color, disabled, onClick }: { char: string, color: string, disabled: boolean, onClick: Function }) => {
    const className: string = (char.localeCompare('enter') == 0 || char.localeCompare('delete') == 0) ?
        'KeyboardSpecial' : "KeyboardElement"

    const disableKey: boolean = disabled ? disabled : color.localeCompare("#3d393979") == 0

    return (
        <div className={className} style={{ backgroundColor: color, cursor: disableKey ? 'unset' : 'pointer' }} onClick={disableKey ? undefined : () => onClick(char)}>
            {char}
        </div>
    )
}

export default KeyboardElement