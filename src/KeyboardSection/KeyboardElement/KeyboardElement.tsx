const KeyboardElement = ({ char, onClick }: { char: string, onClick: Function }) => {
    const className: string = (char.localeCompare('enter') == 0 || char.localeCompare('delete') == 0) ?
        'KeyboardSpecial' : "KeyboardElement"

    return (
        <div className={className} onClick={() => onClick(char)}>
            {char}
        </div>
    )
}

export default KeyboardElement