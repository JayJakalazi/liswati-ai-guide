import bafoLogo from "@/assets/bafo-logo.png";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const ChatMessage = ({ role, content, isTyping }: ChatMessageProps) => {
  const isBot = role === "assistant";

  return (
    <div className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      {isBot && (
        <img
          src={bafoLogo}
          alt="BAFO"
          className="w-8 h-8 rounded-full object-contain flex-shrink-0 mt-1 bg-card shadow-sm"
        />
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "bg-card text-card-foreground shadow-sm rounded-tl-md"
            : "gradient-primary text-primary-foreground rounded-tr-md"
        }`}
      >
        {isTyping ? (
          <div className="flex gap-1 py-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-glow" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-glow [animation-delay:0.3s]" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-glow [animation-delay:0.6s]" />
          </div>
        ) : isBot ? (
          <div className="prose prose-sm max-w-none text-card-foreground [&_p]:mb-1 [&_p:last-child]:mb-0">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
