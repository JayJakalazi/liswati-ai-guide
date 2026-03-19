import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, CreditCard, Info, BookOpen } from "lucide-react";
import bafoLogo from "@/assets/bafo-logo.png";
import { useNavigate } from "react-router-dom";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu = ({ open, onClose }: SideMenuProps) => {
  const navigate = useNavigate();

  const items = [
    { icon: MessageSquare, label: "New Chat", action: () => { onClose(); } },
    { icon: BookOpen, label: "BAFO Scholar", action: () => { onClose(); } },
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
            <div className="flex-1 py-4">
              {items.map(({ icon: Icon, label, action }) => (
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
