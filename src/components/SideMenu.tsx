import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, CreditCard, Info, BookOpen, Trash2, Plus } from "lucide-react";
import bafoLogo from "@/assets/bafo-logo.png";
import { useNavigate } from "react-router-dom";
import { Conversation } from "@/lib/chatStorage";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
}

const SideMenu = ({
  open,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
}: SideMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: BookOpen, label: "BAFO Scholar", action: () => { navigate("/scholar"); onClose(); } },
    { icon: CreditCard, label: "Subscription", action: () => { navigate("/pricing"); onClose(); } },
    { icon: Info, label: "About BAFO", action: () => { navigate("/about"); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-72 z-50 bg-card shadow-xl flex flex-col"
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-5 gradient-primary">
              <img src={bafoLogo} alt="BAFO" className="w-12 h-12 rounded-full object-contain bg-primary-foreground/20 p-1" />
              <div className="flex-1">
                <h2 className="font-display font-bold text-primary-foreground">BAFO AI</h2>
                <p className="text-xs text-primary-foreground/60">LUNTFU Plan</p>
              </div>
              <button onClick={onClose} className="text-primary-foreground/70">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* New Chat Button */}
            <button
              onClick={() => { onNewChat(); onClose(); }}
              className="flex items-center gap-3 mx-4 mt-4 mb-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto">
              {conversations.length > 0 && (
                <div className="px-4 pt-3 pb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chat History</p>
                </div>
              )}
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  className={`flex items-center gap-2 mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                    convo.id === activeConversationId
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <button
                    onClick={() => { onSelectConversation(convo.id); onClose(); }}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate font-body">{convo.title}</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteConversation(convo.id); }}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Menu Items */}
            <div className="border-t border-border py-2">
              {menuItems.map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-foreground hover:bg-muted transition-colors font-body"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5 border-t border-border">
              <p className="text-xs text-muted-foreground text-center font-body">
                🇸🇿 Made for Eswatini
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
