import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "LUNTFU",
    subtitle: "Free",
    price: "SZL 0",
    period: "/month",
    features: [
      "Bilingual chat (SiSwati & English)",
      "Basic knowledge base",
      "BAFO logo interface",
      "Community support",
    ],
    cta: "Current Plan",
    active: true,
    style: "bg-card border-border",
  },
  {
    name: "SIVE",
    subtitle: "Scholar",
    price: "SZL 25",
    period: "/month",
    features: [
      "Everything in LUNTFU",
      "BAFO Scholar (Education module)",
      "2025–2027 EPC & EGCSE syllabus",
      "Study guides & past papers",
      "Homework assistance",
    ],
    cta: "Upgrade to SIVE",
    active: false,
    style: "bg-card border-primary",
  },
  {
    name: "INGWENYAMA",
    subtitle: "Premium",
    price: "SZL 40",
    period: "/month",
    features: [
      "Everything in SIVE",
      "Voice-to-Voice mode",
      "Business Automation tools",
      "Priority processing",
      "Draft business plans & contracts",
      "Tax & compliance guidance",
    ],
    cta: "Go INGWENYAMA",
    active: false,
    style: "gradient-primary text-primary-foreground",
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display font-semibold text-primary-foreground">Subscription Plans</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        <p className="text-sm text-muted-foreground text-center font-body">
          Choose the plan that fits your journey 🇸🇿
        </p>

        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border-2 p-5 ${tier.style}`}
          >
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-lg">{tier.name}</h3>
                <p className="text-xs opacity-70">{tier.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="font-display font-bold text-2xl">{tier.price}</span>
                <span className="text-xs opacity-70">{tier.period}</span>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
                tier.active
                  ? "bg-muted text-muted-foreground"
                  : tier.name === "INGWENYAMA"
                  ? "bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/30"
                  : "gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
              }`}
              disabled={tier.active}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
