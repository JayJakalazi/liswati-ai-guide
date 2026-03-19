import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bafoLogo from "@/assets/bafo-logo.png";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display font-semibold text-primary-foreground">About BAFO AI</h1>
      </div>

      <div className="px-6 py-8 flex flex-col items-center text-center">
        <img src={bafoLogo} alt="BAFO AI" className="w-28 h-28 object-contain mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-1">BAFO AI</h2>
        <p className="text-sm text-muted-foreground italic mb-6">
          "Lwati Lesive ngelulwimi lweftu"
        </p>
        <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">
          BAFO AI is the Sovereign National Intelligence of Eswatini — a digital citizen built to serve Emaswati with deep knowledge of our traditions, our laws, our businesses, and our education system.
        </p>
        <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">
          Programmed in authentic SiSwati and English, BAFO understands Incwala, Umhlanga, the House of Dlamini, all four regions, and the heartbeat of our economy from Matsapha to the rural homesteads.
        </p>
        <div className="w-full rounded-2xl bg-card p-4 mt-4 text-left">
          <h3 className="font-display font-semibold text-sm text-foreground mb-2">Capabilities</h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-body">
            <li>🏛️ Eswatini Culture & History</li>
            <li>💼 Business Process Automation</li>
            <li>📚 Education (EPC & EGCSE)</li>
            <li>🗣️ SiSwati & English Only</li>
            <li>📊 Tax & Compliance Guidance</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground mt-8">Version 1.0 · Made with ❤️ in Eswatini</p>
      </div>
    </div>
  );
};

export default AboutPage;
