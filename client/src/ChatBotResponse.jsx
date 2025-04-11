export default function ChatBotResponse({text}) {
    return <p>
        {text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
        ))}
      </p>
}