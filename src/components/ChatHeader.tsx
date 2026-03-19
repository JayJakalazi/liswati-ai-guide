import bafoLogo from "@/assets/bafo-logo.png";
import { Menu } from "lucide-react";

interface ChatHeaderProps {
  onMenuClick: () => void;
}

const ChatHeader = ({ onMenuClick }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
      <button onClick={onMenuClick} className="text-primary-foreground/80 hover:text-primary-foreground">
        <Menu className="w-5 h-5" />
      </button>
      <img src={bafoLogo} alt="BAFO" className="w-9 h-9 rounded-full object-contain bg-primary-foreground/20 p-0.5" />
      <div className="flex-1">
        <h1 className="text-sm font-display font-semibold text-primary-foreground">BAFO AI</h1>
        <p className="text-xs text-primary-foreground/60">Sovereign Intelligence of Eswatini</p>
      </div>
      <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
    </div>
  );
};

export default ChatHeader;
