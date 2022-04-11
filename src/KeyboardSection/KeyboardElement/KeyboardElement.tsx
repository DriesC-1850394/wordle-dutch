const KeyboardElement = ({ char, color, disabled, onClick }: { char: string, color: string, disabled: boolean, onClick: Function }) => {
    const className: string = (char.localeCompare('enter') == 0 || char.localeCompare('delete') == 0) ?
        'KeyboardSpecial' : "KeyboardElement"

    return (
        <div className={className} style={{ backgroundColor: color, cursor: disabled ? 'unset' : 'pointer' }} onClick={disabled ? undefined : () => onClick(char)}>
            {char}
        </div>
    )
}

export default KeyboardElement