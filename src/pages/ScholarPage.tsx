import { ArrowLeft, BookOpen, FileText, GraduationCap, Calculator, Globe, FlaskConical, Languages, MapPin, Landmark, Sprout, Palette, Monitor, ExternalLink, Download, Search, X, Dumbbell, Wrench, BookOpenText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Subject {
  name: string;
  icon: React.ReactNode;
  topics: string[];
}

interface JCSubject {
  name: string;
  icon: React.ReactNode;
  topicsByForm: {
    "Form 1": string[];
    "Form 2": string[];
    "Form 3": string[];
  };
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

const jcSubjectsWithForms: JCSubject[] = [
  { name: "SiSwati", icon: <Languages className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Kubhala indzaba", "Luhlelo lwelulwimi", "Kufundzisisa"],
    "Form 2": ["Kuhlaziya inkondlo", "Kuhumusha", "Kubhala incwadzi"],
    "Form 3": ["Kuhlaziya inkondlo lejulile", "Kubhala indzaba", "Luhlelo lwelulwimi", "Kuhumusha", "Kufundzisisa kucondza"],
  }},
  { name: "English Language", icon: <Globe className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Reading Comprehension", "Basic Grammar", "Vocabulary Building"],
    "Form 2": ["Composition Writing", "Summary Skills", "Grammar & Usage"],
    "Form 3": ["Comprehension", "Composition", "Grammar & Usage", "Summary Writing", "Letter Writing"],
  }},
  { name: "Mathematics", icon: <Calculator className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Number & Operations", "Basic Algebra", "Geometry Basics", "Measurement"],
    "Form 2": ["Algebra", "Geometry", "Statistics", "Ratio & Proportion"],
    "Form 3": ["Algebra", "Geometry", "Statistics", "Number & Operations", "Measurement", "Ratio & Proportion"],
  }},
  { name: "Science", icon: <FlaskConical className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Introduction to Science", "Living Things", "Matter"],
    "Form 2": ["Biology Basics", "Chemistry Basics", "Energy"],
    "Form 3": ["Biology Basics", "Chemistry Basics", "Physics Basics", "Scientific Investigation"],
  }},
  { name: "Geography", icon: <MapPin className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Map Reading Basics", "Weather", "Our Environment"],
    "Form 2": ["Climate", "Population", "Physical Landscape"],
    "Form 3": ["Map Reading", "Weather & Climate", "Population", "Settlement", "Physical Landscape"],
  }},
  { name: "History", icon: <Landmark className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Early African Societies", "Eswatini Origins"],
    "Form 2": ["Colonial Period", "Southern Africa"],
    "Form 3": ["Eswatini Pre-colonial History", "Colonial Period", "Southern Africa", "World History Basics"],
  }},
  { name: "Agriculture", icon: <Sprout className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Introduction to Farming", "Soil Basics", "Simple Tools"],
    "Form 2": ["Crop Farming", "Animal Farming", "Water Management"],
    "Form 3": ["Crop Farming", "Animal Farming", "Soil & Water", "Farm Tools & Equipment"],
  }},
  { name: "Commerce", icon: <FileText className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["What is Business?", "Needs & Wants", "Goods & Services"],
    "Form 2": ["Banking Basics", "Trade", "Money"],
    "Form 3": ["Business Basics", "Banking", "Trade", "Consumer Education"],
  }},
  { name: "Home Economics", icon: <BookOpen className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Basic Nutrition", "Kitchen Safety", "Simple Meals"],
    "Form 2": ["Food Preparation", "Textiles Basics", "Hygiene"],
    "Form 3": ["Nutrition", "Food Preparation", "Textiles", "Home Management"],
  }},
  { name: "Religious Education", icon: <BookOpen className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Introduction to Religion", "Moral Values"],
    "Form 2": ["Christianity", "African Traditional Religion"],
    "Form 3": ["Christianity", "African Traditional Religion", "Moral Education", "Ethics"],
  }},
  { name: "French", icon: <BookOpenText className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Salutations", "La Famille", "Les Nombres"],
    "Form 2": ["Vocabulaire", "Grammaire de base", "Expression Orale"],
    "Form 3": ["Grammaire", "Compréhension", "Expression Écrite", "Vocabulaire", "Conversation"],
  }},
  { name: "Design & Technology", icon: <Wrench className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Basic Materials", "Simple Design", "Safety in Workshop"],
    "Form 2": ["Technical Drawing", "Woodwork Basics", "Design Process"],
    "Form 3": ["Materials & Components", "Design Process", "Technical Drawing", "Woodwork", "Metalwork"],
  }},
  { name: "Physical Education", icon: <Dumbbell className="w-5 h-5" />, topicsByForm: {
    "Form 1": ["Basic Athletics", "Team Sports", "Warm-up & Stretching"],
    "Form 2": ["Ball Games", "Gymnastics Basics", "Health & Fitness"],
    "Form 3": ["Athletics", "Ball Games", "Health & Fitness", "Gymnastics", "Swimming"],
  }},
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
  level: "epc" | "jc" | "egcse" | "all";
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
  {
    name: "Mathematics Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=46&programme=EGCSE",
    description: "EGCSE Mathematics papers & marking schemes",
    level: "egcse",
  },
  {
    name: "EPC Mathematics Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC Mathematics past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC English Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC English past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC SiSwati Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC SiSwati past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC Science Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC Science past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC Geography Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC Geography past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC History Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC History past papers — Grade 7",
    level: "epc",
  },
  {
    name: "EPC Agriculture Papers",
    url: "https://www.khanyisa.online/educare/exampapers/grade7/",
    description: "EPC Agriculture past papers — Grade 7",
    level: "epc",
  },
  {
    name: "Biology Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=38&programme=EGCSE",
    description: "EGCSE Biology papers & marking schemes",
    level: "egcse",
  },
  {
    name: "English Language Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=42&programme=EGCSE",
    description: "EGCSE English Language papers & marking schemes",
    level: "egcse",
  },
  {
    name: "SiSwati Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=57&programme=EGCSE",
    description: "EGCSE SiSwati papers & marking schemes",
    level: "egcse",
  },
  {
    name: "French Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=43&programme=EGCSE",
    description: "EGCSE French papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Religious Studies Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=55&programme=EGCSE",
    description: "EGCSE Religious Studies papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Design & Technology Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=41&programme=EGCSE",
    description: "EGCSE Design & Technology papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Physics Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=52&programme=EGCSE",
    description: "EGCSE Physics papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Chemistry Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=39&programme=EGCSE",
    description: "EGCSE Chemistry papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Literature in English Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=45&programme=EGCSE",
    description: "EGCSE Literature in English papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Accounts Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=36&programme=EGCSE",
    description: "EGCSE Accounts/Principles of Accounts papers",
    level: "egcse",
  },
  {
    name: "Economics Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=40&programme=EGCSE",
    description: "EGCSE Economics papers & marking schemes",
    level: "egcse",
  },
  {
    name: "History Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=44&programme=EGCSE",
    description: "EGCSE History papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Geography Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=43&programme=EGCSE",
    description: "EGCSE Geography papers & marking schemes",
    level: "egcse",
  },
  {
    name: "ICT Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=48&programme=EGCSE",
    description: "EGCSE Information & Communication Technology papers",
    level: "egcse",
  },
  {
    name: "Agriculture Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=37&programme=EGCSE",
    description: "EGCSE Agriculture papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Commerce Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=40&programme=EGCSE",
    description: "EGCSE Commerce papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Computer Studies Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=48&programme=EGCSE",
    description: "EGCSE Computer Studies papers & marking schemes",
    level: "egcse",
  },
  {
    name: "Art & Design Past Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=35&programme=EGCSE",
    description: "EGCSE Art & Design papers & marking schemes",
    level: "egcse",
  },
  {
    name: "JC Past Papers (All Subjects)",
    url: "https://www.eswatinipapers.com/jc",
    description: "JC past exam papers — all subjects",
    level: "jc",
  },
  {
    name: "JC Mathematics Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Mathematics past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC English Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC English Language past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC SiSwati Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC SiSwati past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Science Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Science past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Geography Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Geography past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC History Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC History past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Agriculture Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Agriculture past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Commerce Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Commerce past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC French Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=43&programme=JC",
    description: "JC French past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Design & Technology Papers",
    url: "https://www.examscouncil.org.sz/programmes/subject.php?id=41&programme=JC",
    description: "JC Design & Technology past papers — Form 3",
    level: "jc",
  },
  {
    name: "JC Physical Education Papers",
    url: "https://www.khanyisa.online/educare/exampapers/form3/",
    description: "JC Physical Education past papers — Form 3",
    level: "jc",
  },
];

type JCForm = "All" | "Form 1" | "Form 2" | "Form 3";

const ScholarPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"epc" | "jc" | "egcse">("epc");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jcForm, setJcForm] = useState<JCForm>("All");

  // Convert JC subjects based on selected form
  const jcSubjectsFiltered: Subject[] = useMemo(() => {
    return jcSubjectsWithForms.map((s) => {
      const topics = jcForm === "All"
        ? [...new Set([...s.topicsByForm["Form 1"], ...s.topicsByForm["Form 2"], ...s.topicsByForm["Form 3"]])]
        : s.topicsByForm[jcForm];
      return { name: s.name, icon: s.icon, topics };
    });
  }, [jcForm]);

  const allSubjects = activeTab === "epc" ? epcSubjects : activeTab === "jc" ? jcSubjectsFiltered : egcseSubjects;
  const filteredPaperLinks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return pastPaperLinks
      .filter((link) => link.level === "all" || link.level === activeTab)
      .filter((link) => !q || link.name.toLowerCase().includes(q) || link.description.toLowerCase().includes(q));
  }, [searchQuery, activeTab]);

  const subjects = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return allSubjects;
    return allSubjects.filter(
      (s) => s.name.toLowerCase().includes(q) || s.topics.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery, allSubjects]);

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
        {([
          { key: "epc" as const, label: "EPC" },
          { key: "jc" as const, label: "JC" },
          { key: "egcse" as const, label: "EGCSE" },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpandedSubject(null); setJcForm("All"); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <GraduationCap className="w-4 h-4 inline mr-1.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* JC Form Filter */}
      {activeTab === "jc" && (
        <div className="flex gap-1.5 px-5 mb-4">
          {(["All", "Form 1", "Form 2", "Form 3"] as JCForm[]).map((form) => (
            <button
              key={form}
              onClick={() => { setJcForm(form); setExpandedSubject(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-colors ${
                jcForm === form
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted/50 text-muted-foreground border border-transparent"
              }`}
            >
              {form === "All" ? "Tonkhe · All" : form}
            </button>
          ))}
        </div>
      )}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sesha sibodzve noma ithopiki..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
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
                            onClick={() => {
                              const ctx = activeTab === "jc" && jcForm !== "All"
                                ? `${subject.name} – ${jcForm}`
                                : subject.name;
                              const prompt = `Ngifundzise nge ${topic} (${ctx})`;
                              if (activeTab === "jc") {
                                toast("Sengikutfumelela kuchat", { description: prompt });
                              }
                              navigate(`/?q=${encodeURIComponent(prompt)}`);
                            }}
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

        {/* Past Papers Section */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Download className="w-4 h-4 text-primary" />
            <h3 className="font-display font-bold text-sm text-foreground">Past Exam Papers</h3>
          </div>
          <p className="text-xs text-muted-foreground font-body mb-3">
            Downloadisha emaphepha etiviwo takadzeni kuletisayithi:
          </p>
          <div className="space-y-2">
            {filteredPaperLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-display font-semibold text-foreground">{link.name}</span>
                    <span className="block text-xs text-muted-foreground font-body">{link.description}</span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarPage;
