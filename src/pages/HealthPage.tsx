import { ArrowLeft, HeartPulse, Stethoscope, Activity, Brain, Baby, Pill, Syringe, ShieldPlus, FileText, ExternalLink, Search, X, Frown, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface HealthCategory {
  name: string;
  icon: React.ReactNode;
  conditions: { name: string; where: string }[];
}

const healthCategories: HealthCategory[] = [
  {
    name: "Communicable Diseases",
    icon: <Syringe className="w-5 h-5" />,
    conditions: [
      { name: "HIV / AIDS", where: "Free ART, testing & PrEP at all government clinics, RFM Hospital (Manzini), Mbabane Govt Hospital, Baylor Children's Clinic (Mbabane), MSF Shiselweni, NERCHA partner sites." },
      { name: "Tuberculosis (TB)", where: "Free diagnosis & treatment at Good Shepherd Hospital (Siteki – national TB referral), all government clinics, MSF Matsapha & Nhlangano TB clinics." },
      { name: "Malaria", where: "Lubombo & Hhohho lowveld clinics, Good Shepherd Hospital, Hlathikhulu Govt Hospital, National Malaria Programme (MoH)." },
      { name: "COVID-19 / Flu", where: "Any public clinic, Mbabane Govt Hospital, RFM Hospital, private GPs, Mbabane Clinic, Manzini Clinic." },
      { name: "STIs (Gonorrhoea, Syphilis, etc.)", where: "Free at all public clinics & STI clinics, Family Life Association of Eswatini (FLAS) – Mbabane, Manzini, Nhlangano, Siteki." },
      { name: "Hepatitis B & C", where: "Mbabane Govt Hospital, RFM Hospital, private labs (Lancet, Ampath)." },
      { name: "Cholera / Diarrhoea", where: "Nearest clinic immediately; Mbabane Govt Hospital, RFM Hospital for severe cases." },
      { name: "Bilharzia (Schistosomiasis)", where: "Public clinics in lowveld areas, Good Shepherd Hospital, Hlane area clinics." },
    ],
  },
  {
    name: "Non-Communicable Diseases",
    icon: <HeartPulse className="w-5 h-5" />,
    conditions: [
      { name: "Hypertension (High BP)", where: "All public clinics (free screening), Mbabane Govt Hospital NCD clinic, RFM Hospital, Mbabane Clinic." },
      { name: "Diabetes (Type 1 & 2)", where: "Mbabane Govt Hospital diabetic clinic, RFM Hospital, Good Shepherd, Hlathikhulu; Eswatini Diabetes Association." },
      { name: "Heart Disease & Stroke", where: "Mbabane Govt Hospital, Mbabane Clinic; complex cases referred to South Africa (Pretoria/Johannesburg)." },
      { name: "Asthma & COPD", where: "All public clinics, Mbabane Govt Hospital respiratory clinic, private GPs." },
      { name: "Cancer (screening & care)", where: "Mbabane Govt Hospital oncology clinic, Cancer Association of Eswatini (Mbabane); advanced treatment usually referred to SA." },
      { name: "Kidney Disease", where: "Mbabane Govt Hospital, RFM Hospital; dialysis at private centres & referral to SA." },
    ],
  },
  {
    name: "Maternal & Child Health",
    icon: <Baby className="w-5 h-5" />,
    conditions: [
      { name: "Antenatal Care (Pregnancy)", where: "Free at all public clinics, RFM Hospital, Mbabane Govt Hospital, Good Shepherd, Hlathikhulu, Pigg's Peak Hospital." },
      { name: "Childhood Immunisations (EPI)", where: "Free at every public clinic – follow EPI schedule from birth." },
      { name: "Child Malnutrition", where: "Public clinics, Baylor Children's Clinic, World Vision & UNICEF supported sites." },
      { name: "Childhood Illnesses (fever, diarrhoea)", where: "Nearest clinic, Mbabane Govt Hospital paediatric ward, RFM Paediatrics." },
      { name: "Family Planning & Contraception", where: "Free at public clinics, FLAS clinics (Mbabane, Manzini, Nhlangano, Siteki), PSI Lusweti outreach." },
    ],
  },
  {
    name: "Mental Health",
    icon: <Brain className="w-5 h-5" />,
    conditions: [
      { name: "Depression & Anxiety", where: "National Psychiatric Referral Hospital (Manzini), Mbabane Govt Hospital mental health unit, SWAGAA counselling." },
      { name: "Substance Abuse (alcohol/drugs)", where: "Psychiatric Hospital Manzini, Mbabane Clinic, Salvation Army programmes." },
      { name: "Stress & Burnout", where: "Private counsellors in Mbabane/Manzini, church-based counselling, Lifeline Eswatini." },
      { name: "Severe Mental Illness", where: "National Psychiatric Referral Hospital (Manzini) – main in-patient facility." },
    ],
  },
  {
    name: "Sexual & Reproductive Health",
    icon: <ShieldPlus className="w-5 h-5" />,
    conditions: [
      { name: "HIV Testing & PrEP", where: "All public clinics (free), FLAS, PSI Lusweti, Baylor (youth-friendly), MSF sites." },
      { name: "Cervical & Breast Cancer Screening", where: "Mbabane Govt Hospital, RFM, Cancer Association of Eswatini, FLAS clinics." },
      { name: "Male Medical Circumcision (VMMC)", where: "Free at public clinics, FLAS, Litsemba Letfu / PSI sites." },
      { name: "Gender-Based Violence (GBV) Support", where: "SWAGAA (Manzini HQ + regional offices), Childline 116, One-Stop Centres at RFM & Mbabane Govt Hospital, Police DVCPU." },
    ],
  },
  {
    name: "Emergencies & Injuries",
    icon: <Activity className="w-5 h-5" />,
    conditions: [
      { name: "Road Accidents & Trauma", where: "Call 977 (ambulance). Mbabane Govt Hospital & RFM Hospital trauma units. Private: Mbabane Clinic, MRI / Swazi Med." },
      { name: "Burns", where: "Mbabane Govt Hospital, RFM Hospital burns unit." },
      { name: "Snake Bites", where: "Nearest hospital immediately – Good Shepherd (Siteki), Hlathikhulu, RFM, Mbabane Govt Hospital." },
      { name: "Poisoning", where: "Nearest hospital ER; call 977." },
      { name: "Heart Attack / Stroke", where: "Call 977. Mbabane Clinic, Mbabane Govt Hospital, RFM Hospital." },
    ],
  },
  {
    name: "General & Primary Care",
    icon: <Stethoscope className="w-5 h-5" />,
    conditions: [
      { name: "Colds, Flu & Fever", where: "Any public clinic, private GPs in Mbabane / Manzini / Matsapha / Ezulwini." },
      { name: "Dental Care", where: "Mbabane Govt Hospital dental clinic, RFM dental, private dentists in Mbabane & Manzini." },
      { name: "Eye Care & Spectacles", where: "Mbabane Govt Hospital eye clinic, Good Shepherd eye unit, private optometrists." },
      { name: "Skin Conditions", where: "Public clinics, Mbabane Govt Hospital dermatology referrals, private GPs." },
      { name: "Pharmacies & Medication", where: "Central Medical Stores (public), private pharmacies: Clicks, Dis-Chem, Medirite, local pharmacies in Mbabane, Manzini, Matsapha, Nhlangano, Siteki." },
    ],
  },
  {
    name: "Traditional Medicine",
    icon: <Pill className="w-5 h-5" />,
    conditions: [
      { name: "Tinyanga (Herbalists)", where: "Registered traditional healers via Traditional Healers Organisation of Eswatini." },
      { name: "Tangoma (Diviners)", where: "Registered traditional healers; often work with MoH on HIV / TB referrals." },
      { name: "Kufemba (Spiritual healing)", where: "Traditional healers in all regions; consult registered practitioners." },
    ],
  },
];

interface HealthLink {
  name: string;
  url?: string;
  description: string;
  phone?: string;
  email?: string;
  hours?: string;
  address?: string;
}

const healthServiceLinks: HealthLink[] = [
  { name: "Ministry of Health – Eswatini", url: "https://www.gov.sz/index.php/ministries-departments/ministry-of-health", description: "Official MoH portal – policies, facilities & programmes" },
  { name: "Ambulance / Emergency – 977", description: "Call 977 (national emergency) for ambulance & trauma" },
  { name: "Childline Eswatini / GBV – 116", description: "Call 116 (toll-free) for child protection & GBV support" },
  { name: "NERCHA (HIV/AIDS Council)", url: "https://www.nercha.org.sz", description: "National HIV/AIDS response & partner directory" },
  { name: "Mbabane Government Hospital", description: "National referral hospital – Mbabane. +268 2404 2431" },
  { name: "Raleigh Fitkin Memorial (RFM)", description: "Main mission hospital in Manzini" },
  { name: "Good Shepherd Hospital (Siteki)", description: "Lubombo referral – TB & general care" },
  { name: "National Psychiatric Hospital", description: "Manzini – national mental health referral" },
  { name: "Family Life Association (FLAS)", url: "https://www.flas.org.sz", description: "SRH, HIV testing, family planning – nationwide" },
  { name: "SWAGAA (GBV support)", url: "https://www.swagaa.org.sz", description: "Counselling & shelter for survivors of GBV" },
  { name: "Baylor Children's Clinic", description: "Paediatric HIV & adolescent care – Mbabane" },
  { name: "Cancer Association of Eswatini", description: "Screening, awareness & patient support – Mbabane" },
  {
    name: "The Luke Commission (TLC)",
    url: "https://lukecommission.org",
    description: "Miracle Campus – free comprehensive healthcare, HIV, surgery & maternal care",
    phone: "+268 2417 0024",
    email: "info@lukecommission.org",
    hours: "Mon–Fri: 7:00 AM – 5:00 PM (Emergencies 24/7)",
    address: "Miracle Campus, Sidvokodvo, Manzini Region, Eswatini",
  },
];

const HealthPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase().trim();
  const isSearching = q.length > 0;

  const filteredCategories = useMemo(() => {
    if (!isSearching) return healthCategories;
    return healthCategories
      .map((c) => ({
        ...c,
        conditions: c.conditions.filter(
          (x) => x.name.toLowerCase().includes(q) || x.where.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.name.toLowerCase().includes(q) || c.conditions.length > 0);
  }, [q, isSearching]);

  const filteredLinks = useMemo(() => {
    if (!isSearching) return healthServiceLinks;
    return healthServiceLinks.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }, [q, isSearching]);

  // Auto-expand categories when searching
  useEffect(() => {
    if (isSearching && filteredCategories.length > 0) {
      setExpanded(filteredCategories[0].name);
    } else if (!isSearching) {
      setExpanded(null);
    }
  }, [isSearching, filteredCategories]);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <HeartPulse className="w-5 h-5 text-primary-foreground" />
        <h1 className="font-display font-semibold text-primary-foreground">Health Services</h1>
      </div>

      {/* Intro */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-lg text-foreground mb-1">Imphilo Yakho ❤️</h2>
        <p className="text-sm text-muted-foreground font-body">
          Tfola lwati ngetimphawu, tindlela tekwelapha kanye netindzawo lapho ungatfola lusito eSwatini.
        </p>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-5 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sesha sifo, indzawo, noma lusito..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {isSearching && (
          <p className="text-xs text-muted-foreground font-body mt-1.5">
            {filteredCategories.length} category(s) · {filteredLinks.length} contact(s) found
          </p>
        )}
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-3">
        {filteredCategories.map((category) => (
          <div key={category.name} className="rounded-2xl bg-card border border-border overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === category.name ? null : category.name)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {category.icon}
              </div>
              <span className="flex-1 font-display font-semibold text-sm text-foreground">{category.name}</span>
              <span className="text-xs text-muted-foreground font-body">{category.conditions.length}</span>
            </button>

            <AnimatePresence>
              {expanded === category.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {category.conditions.map((condition) => (
                      <button
                        key={condition.name}
                        onClick={() => {
                          const prompt = `Ngichazele nge ${condition.name} (${category.name}) eSwatini: timphawu, lokungentiwa, kanye netindzawo lapho ngingatfola lusito noma kwelashwa.`;
                          navigate(`/?q=${encodeURIComponent(prompt)}`);
                          setTimeout(() => {
                            toast("Sengikutfumelele kuchat", {
                              description: prompt,
                              duration: 5000,
                              action: {
                                label: "Copy",
                                onClick: () => {
                                  navigator.clipboard.writeText(prompt);
                                  toast.success("Copied to clipboard");
                                },
                              },
                            });
                          }, 0);
                        }}
                        className="w-full flex flex-col items-start gap-1 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="text-sm font-body text-foreground">{condition.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-body pl-5">
                          {condition.where}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* No results */}
        {isSearching && filteredCategories.length === 0 && filteredLinks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Frown className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-display text-muted-foreground">Akukho miphumela ifunyenwe</p>
            <p className="text-xs text-muted-foreground/70 font-body mt-1">Sesha ngelinye igama noma indzawo.</p>
          </div>
        )}

        {/* Services & Contacts */}
        {(!isSearching || filteredLinks.length > 0) && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <ShieldPlus className="w-4 h-4 text-primary" />
              <h3 className="font-display font-bold text-sm text-foreground">Health Services & Contacts</h3>
            </div>
            <p className="text-xs text-muted-foreground font-body mb-3">
              ⚠️ Lokunikwa la kungelusito lwekwati kuphela. Kutindzaba telimphilo, vakashela inesi noma dokotela. Lusito loluphutfumako: <strong>977</strong>.
            </p>
            <div className="space-y-2">
              {filteredLinks.map((link) => {
                const Wrapper: any = link.url ? "a" : "div";
                const props = link.url
                  ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <Wrapper
                    key={link.name}
                    {...props}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {link.url ? <ExternalLink className="w-4 h-4" /> : <HeartPulse className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-display font-semibold text-foreground">{link.name}</span>
                      <span className="block text-xs text-muted-foreground font-body">{link.description}</span>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthPage;
