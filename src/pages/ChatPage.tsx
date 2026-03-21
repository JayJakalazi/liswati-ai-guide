import { useState, useRef, useEffect, useCallback } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import SideMenu from "@/components/SideMenu";
import { toast } from "sonner";
import {
  Message,
  Conversation,
  WELCOME_MESSAGE,
  migrateOldHistory,
  getConversations,
  getActiveId,
  getConversation,
  saveConversation,
  deleteConversation,
  createNewConversation,
} from "@/lib/chatStorage";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// Migrate old single-conversation history on first load
migrateOldHistory();

const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const existing = getConversations();
    if (existing.length > 0) return existing;
    const c = createNewConversation();
    saveConversation(c);
    return [c];
  });
  const [activeId, setActiveId] = useState<string | null>(() => {
    const id = getActiveId();
    if (id && getConversation(id)) return id;
    const convos = getConversations();
    if (convos.length > 0) {
      setActiveId(convos[0].id);
      return convos[0].id;
    }
    return null;
  });

  const activeConvo = conversations.find((c) => c.id === activeId);
  const messages = activeConvo?.messages ?? [WELCOME_MESSAGE];

  const [menuOpen, setMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const refreshConversations = useCallback(() => {
    setConversations(getConversations());
  }, []);

  const setMessages = useCallback(
    (updater: Message[] | ((prev: Message[]) => Message[])) => {
      setConversations((prevConvos) => {
        const updated = prevConvos.map((c) => {
          if (c.id !== activeId) return c;
          const newMsgs = typeof updater === "function" ? updater(c.messages) : updater;
          // Update title from first user message
          const firstUser = newMsgs.find((m) => m.role === "user");
          const title = firstUser ? firstUser.content.slice(0, 40) : c.title;
          const updatedConvo = { ...c, messages: newMsgs, title, updatedAt: Date.now() };
          saveConversation(updatedConvo);
          return updatedConvo;
        });
        return updated.sort((a, b) => b.updatedAt - a.updatedAt);
      });
    },
    [activeId]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const history = [...messages.filter((m) => m.id !== "welcome"), userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let assistantSoFar = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error("BAFO is busy right now. Please try again in a moment.");
        } else if (resp.status === 402) {
          toast.error("AI credits have been used up. Please add more credits.");
        } else {
          toast.error(errorData.error || "Something went wrong. Please try again.");
        }
        setIsTyping(false);
        return;
      }

      if (!resp.body) throw new Error("No response stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.id === assistantId) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                  );
                }
                return [...prev, { id: assistantId, role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 && m.id === assistantId
                    ? { ...m, content: assistantSoFar }
                    : m
                )
              );
            }
          } catch {}
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      toast.error("Failed to connect to BAFO. Please check your connection.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const c = createNewConversation();
    saveConversation(c);
    setActiveId(c.id);
    refreshConversations();
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    localStorage.setItem("bafo-active-conversation", id);
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    if (id === activeId) {
      const remaining = getConversations();
      if (remaining.length > 0) {
        setActiveId(remaining[0].id);
      } else {
        const c = createNewConversation();
        saveConversation(c);
        setActiveId(c.id);
      }
    }
    refreshConversations();
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader onMenuClick={() => setMenuOpen(true)} onNewChat={handleNewChat} />
      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        conversations={conversations}
        activeConversationId={activeId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
          <ChatMessage role="assistant" content="" isTyping />
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default ChatPage;
