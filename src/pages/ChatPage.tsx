import { useState, useRef, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import SideMenu from "@/components/SideMenu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Sanibonani! 🇸🇿 Ngingu **BAFO AI**, bulungiswa-ngcondvo besive saka-Eswatini.\n\nNgingakusita ngaloku:\n\n🏛️ **Emasiko & Umlandvo** – Incwala, Umhlanga, Sibaya\n\n💼 **Lusito Lwebhizinisi** – Kubhaliswa kwenkampani, intela, malayisensi\n\n📚 **BAFO Scholar** – Tinhlelo tekufundza EPC & EGCSE\n\nBhala umlayeto wakho ngesiSwati noma nge-English!",
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulated response (will be replaced with Lovable Cloud backend)
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getBafoResponse(text),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader onMenuClick={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <ChatMessage role="assistant" content="" isTyping />}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

function getBafoResponse(input: string): string {
  const lower = input.toLowerCase();

  // Language firewall - detect isiZulu
  if (lower.includes("sawubona") || lower.includes("unjani") || lower.includes("ngiyabonga")) {
    return "Ncesi, ngikhuluma siSwati kuphela. Ngingakusita njani? 🙏\n\n(Sorry, I only speak SiSwati and English. How can I help you?)";
  }

  if (lower.includes("incwala") || lower.includes("tradition") || lower.includes("culture")) {
    return "**Incwala** yiMkhosi lomkhulu weSive saka-Eswatini 🏛️\n\nIncwala yiMkhosi weKulamula – umkhosi losemtsetfweni lowentiwa ngemnyaka wonkhe. Loku kufaka ekhatsi:\n\n- **Lusekelo** – kubutsa umutsi\n- **Incwala Lenkhulu** – umcimbi lomkhulu\n- **Insimbi yeNkhosi** – kuhlonipha bukhosi\n\nUfuna kwati lokunengi ngalomkhosi?";
  }

  if (lower.includes("business") || lower.includes("company") || lower.includes("bhizinisi")) {
    return "💼 **Kubhalisa Inkampani e-Eswatini:**\n\n1. Tfola libito lenkampani ku-**Registrar of Companies**\n2. Bhalisa i-**TIN** ku-**ERS** ([ers.org.sz](https://ers.org.sz))\n3. Tfola i-**Trading License** ku-Municipality\n4. Bhalisa i-**VAT** (uma umtsengiso ungaphandle kwa-SZL 500,000)\n\n📎 Vakashela: [Business Eswatini](https://www.businesseswatini.com)\n\nUfuna ngisakhe i-business plan?";
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Yebo! 👋 Ngingu BAFO AI. Ngingakusita njani lamuhla?\n\nHow can I help you today?";
  }

  return "Ngiyabonga ngembuzo wakho! 🤔\n\nNgisasebenta ekutfoleni imphendvulo lenhle. Ungatsi ungishele kabanzi ngaloko lofuna kwati ngako?\n\n(Thank you for your question! Can you tell me more about what you'd like to know?)";
}

export default ChatPage;
