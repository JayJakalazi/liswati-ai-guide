import { ArrowLeft, BookOpen, FileText, GraduationCap, Calculator, Globe, FlaskConical, Languages, MapPin, Landmark, Sprout, Palette, Monitor, ExternalLink, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Subject {
  name: string;
  icon: React.ReactNode;
  topics: string[];
}

const epcSubjects: Subject[] = [
  { name: "SiSwati", icon: <Languages className="w-5 h-5" />, topics: ["Kubhala indzaba", "Kuhlaziya inkondlo", "Sivakatfo", "Kuhumusha", "Bala ucondze"] },
  { name: "English", icon: <Globe className="w-5 h-5" />, topics: ["Comprehension", "Creative Writing", "Grammar & Vocabulary", "Summary Writing"] },
  { name: "Mathematics", icon: <Calculator className="w-5 h-5" />, topics: ["Fractions & Decimals", "Geometry", "Measurement", "Data Handling", "Algebra Basics"] },
  { name: "Science", icon: <FlaskConical className="w-5 h-5" />, topics: ["Living Things", "Matter & Materials", "Energy & Forces", "Earth & Space"] },
  { name: "Geography", icon: <MapPin className="w-5 h-5" />, topics: ["Emave eMhlaba", "Tintaba neMifula", "Simo Selitulu", "Kusetjentiswa Kwemhlaba"] },
  { name: "History", icon: <Landmark className="w-5 h-5" />, topics: ["Umlandvo weSwatini", "Emakhosi eSwatini", "Inchubo yeMakoloni", "Kukhululeka kweAfrika"] },
  { name: "Agriculture", icon: <Sprout className="w-5 h-5" />, topics: ["Kulima Kudla", "Kufuya Tinkhomo", "Inhlanyelo neMbewu", "Umhlaba neMvula"] },
];

const egcseSubjects: Subject[] = [
  { name: "SiSwati", icon: <Languages className="w-5 h-5" />, topics: ["Umlandvo weSiSwati", "Inchubo yekubhala", "Tinkondlo", "Kuhumusha lokujulile", "Umsebenti welulwimi"] },
  { name: "English Language", icon: <Globe className="w-5 h-5" />, topics: ["Directed Writing", "Composition", "Comprehension", "Summary", "Language Usage"] },
  { name: "Mathematics", icon: <Calculator className="w-5 h-5" />, topics: ["Algebra", "Trigonometry", "Statistics", "Calculus", "Probability", "Vectors"] },
  { name: "Biology", icon: <FlaskConical className="w-5 h-5" />, topics: ["Cell Biology", "Human Physiology", "Plant Biology", "Ecology", "Genetics"] },
  { name: "Geography", icon: <MapPin className="w-5 h-5" />, topics: ["Map Skills", "Population", "Settlement", "Weather & Climate", "Physical Geography", "Economic Activities"] },
  { name: "History", icon: <Landmark className="w-5 h-5" />, topics: ["Eswatini History", "Southern African History", "Colonialism", "Independence Movements", "World Wars"] },
  { name: "Agriculture", icon: <Sprout className="w-5 h-5" />, topics: ["Crop Production", "Animal Husbandry", "Soil Science", "Farm Management", "Agricultural Economics"] },
  { name: "Commerce", icon: <FileText className="w-5 h-5" />, topics: ["Business Organisation", "Banking", "Insurance", "Trade", "Marketing"] },
  { name: "Computer Studies", icon: <Monitor className="w-5 h-5" />, topics: ["Hardware & Software", "Programming Basics", "Databases", "Networking", "Cyber Security"] },
  { name: "Art & Design", icon: <Palette className="w-5 h-5" />, topics: ["Drawing & Painting", "Eswatini Traditional Art", "Design Principles", "Mixed Media"] },
];

interface PastPaperLink {
  name: string;
  url: string;
  description: string;
  level: "epc" | "egcse" | "all";
}

const pastPaperLinks: PastPaperLink[] = [
  {
    name: "Examinations Council of Eswatini",
    url: "https://www.examscouncil.org.sz",
    description: "Official past papers, syllabi & examiner reports",
    level: "all",
  },
  {
    name: "Eswatini Papers",
    url: "https://www.eswatinipapers.com",
    description: "EPC, JC & EGCSE past exam papers library",
    level: "all",
  },
  {
    name: "MTN Educare (Khanyisa)",
    url: "https://www.khanyisa.online/educare/exampapers/",
    description: "Free past papers from the Ministry of Education",
    level: "all",
  },
  {
    name: "EGCSE Past Papers",
    url: "https://www.eswatinipapers.com/egcse",
    description: "EGCSE/SGCSE papers — all subjects",
    level: "egcse",
  },
];

const ScholarPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"epc" | "egcse">("epc");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const subjects = activeTab === "epc" ? epcSubjects : egcseSubjects;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <BookOpen className="w-5 h-5 text-primary-foreground" />
        <h1 className="font-display font-semibold text-primary-foreground">BAFO Scholar</h1>
      </div>

      {/* Intro */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-lg text-foreground mb-1">Tfola Lwati 📚</h2>
        <p className="text-sm text-muted-foreground font-body">
          Khetsa sigaba sakho utfole tincwadzi tekufundza, imibuzo yakadzeni, kanye nelusito lwekutilungiselela tiviwo.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 mb-4">
        <button
          onClick={() => { setActiveTab("epc"); setExpandedSubject(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
            activeTab === "epc"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <GraduationCap className="w-4 h-4 inline mr-1.5" />
          EPC
        </button>
        <button
          onClick={() => { setActiveTab("egcse"); setExpandedSubject(null); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
            activeTab === "egcse"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <GraduationCap className="w-4 h-4 inline mr-1.5" />
          EGCSE / SGCSE
        </button>
      </div>

      {/* Subjects */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {subjects.map((subject) => (
              <div key={subject.name} className="rounded-2xl bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedSubject(expandedSubject === subject.name ? null : subject.name)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {subject.icon}
                  </div>
                  <span className="flex-1 font-display font-semibold text-sm text-foreground">{subject.name}</span>
                  <span className="text-xs text-muted-foreground font-body">{subject.topics.length} topics</span>
                </button>

                <AnimatePresence>
                  {expandedSubject === subject.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {subject.topics.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => navigate(`/?q=${encodeURIComponent(`Ngifundzise nge ${topic} (${subject.name})`)}`)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-left transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="text-sm font-body text-foreground">{topic}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScholarPage;
