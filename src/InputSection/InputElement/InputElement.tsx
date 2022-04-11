
const InputElement = ({ color, char }: { color: string, char: string }) => {
    return (
        <div className="InputElement" style={{ backgroundColor: color }}>
            {char}
        </div>
    )
}

export default InputElement