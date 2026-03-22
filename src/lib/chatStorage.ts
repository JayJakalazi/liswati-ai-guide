export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const CONVERSATIONS_KEY = "bafo-conversations";
const ACTIVE_KEY = "bafo-active-conversation";

export const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Sanibonani! 🇸🇿 Ngingu **BAFO AI**, buhlakani besive saka-Ngwane.\n\nNgingakusita ngaloku:\n\n🏛️ **Emasiko & Umlandvo** – Incwala, Umhlanga, Sibaya\n\n💼 **Lusito Lwebhizinisi** – Kubhaliswa kwenkampani, intela, malayisensi\n\n📚 **BAFO Scholar** – Tinhlelo tekufundza EPC & EGCSE\n\nBhala umlayeto wakho ngesiSwati nobe nge-English!",
};

function loadAll(): Conversation[] {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    if (raw) return JSON.parse(raw) as Conversation[];
  } catch {}
  return [];
}

function saveAll(convos: Conversation[]) {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convos));
}

export function migrateOldHistory() {
  const old = localStorage.getItem("bafo-chat-history");
  if (!old) return;
  try {
    const msgs = JSON.parse(old) as Message[];
    if (msgs.length > 1) {
      const firstUser = msgs.find((m) => m.role === "user");
      const convo: Conversation = {
        id: Date.now().toString(),
        title: firstUser ? firstUser.content.slice(0, 40) : "Chat",
        messages: msgs,
        updatedAt: Date.now(),
      };
      const existing = loadAll();
      existing.unshift(convo);
      saveAll(existing);
      localStorage.setItem(ACTIVE_KEY, convo.id);
    }
  } catch {}
  localStorage.removeItem("bafo-chat-history");
}

export function getConversations(): Conversation[] {
  return loadAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getActiveId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveId(id: string) {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function getConversation(id: string): Conversation | undefined {
  return loadAll().find((c) => c.id === id);
}

export function saveConversation(convo: Conversation) {
  const all = loadAll().filter((c) => c.id !== convo.id);
  all.unshift({ ...convo, updatedAt: Date.now() });
  saveAll(all);
  setActiveId(convo.id);
}

export function deleteConversation(id: string) {
  const all = loadAll().filter((c) => c.id !== id);
  saveAll(all);
  if (getActiveId() === id) localStorage.removeItem(ACTIVE_KEY);
}

export function createNewConversation(): Conversation {
  const convo: Conversation = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [WELCOME_MESSAGE],
    updatedAt: Date.now(),
  };
  return convo;
}
