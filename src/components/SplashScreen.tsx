import { motion } from "framer-motion";
import bafoLogo from "@/assets/bafo-logo.png";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-primary"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={bafoLogo}
        alt="BAFO AI"
        className="w-40 h-40 object-contain"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.p
        className="mt-6 text-sm text-primary-foreground/70 font-body tracking-wider"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Lwati lwelive, Ngelulwimi lwetfu
      </motion.p>
      <motion.button
        onClick={onFinish}
        className="mt-10 px-8 py-3 rounded-full bg-primary-foreground/20 text-primary-foreground font-display font-semibold text-sm backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Chubeka · Continue
      </motion.button>
    </motion.div>
  );
};

export default SplashScreen;
