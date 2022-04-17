const KeyboardElement = ({ char, color, disabled, onClick }: { char: string, color: string, disabled: boolean, onClick: Function }) => {
    const className: string = (char.localeCompare('enter') === 0 || char.localeCompare('delete') === 0) ?
        'KeyboardSpecial' : "KeyboardElement"

    const keyCode: number = char.localeCompare('enter') === 0 ? 13 : char.localeCompare('delete') === 0 ? 8 : 0

    return (
        <div className={className} style={{ backgroundColor: color, cursor: disabled ? 'unset' : 'pointer' }} onClick={disabled ? undefined : () => onClick({keyCode: keyCode, key: char})}>
            {char.localeCompare("delete") === 0 ? "verwijder" : char}
        </div>
    )
}

export default KeyboardElement