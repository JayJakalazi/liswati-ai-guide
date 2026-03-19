import { motion } from "framer-motion";
import bafoLogo from "@/assets/bafo-logo.png";
import eswatiniFlag from "@/assets/eswatini-flag-horizontal.jpg";
import splashBg from "@/assets/splash-bg.jpg";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${splashBg})` }}
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
        className="mt-6 text-sm text-primary font-body tracking-wider font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Lwati Lesive ngelulwimi lweftu
      </motion.p>
      <motion.div
        className="mt-4 w-28 rounded-sm overflow-hidden shadow-lg border border-primary/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <img src={eswatiniFlag} alt="Eswatini Flag" className="w-full h-auto rounded-sm" />
      </motion.div>
      <motion.button
        onClick={onFinish}
        className="mt-10 px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm backdrop-blur-sm border border-primary/30 hover:bg-primary/90 transition-colors shadow-md"
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
