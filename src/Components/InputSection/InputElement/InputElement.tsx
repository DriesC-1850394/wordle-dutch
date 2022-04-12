
const InputElement = ({ color, char, animate }: { color: string, char: string, animate: boolean }) => {
    return (
        <div className={animate ? "InputElement Animate" : "InputElement"} style={{ backgroundColor: color }}>
            {char}
        </div>
    )
}

export default InputElement