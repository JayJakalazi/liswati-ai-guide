import { ArrowLeft, Briefcase, Building2, FileText, Landmark, TrendingUp, Coins, Users, Search, X, Frown, ExternalLink, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface BizCategory {
  name: string;
  icon: React.ReactNode;
  topics: { name: string; details: string }[];
}

const bizCategories: BizCategory[] = [
  {
    name: "Kubhalisa Inkampani (Company Registration)",
    icon: <Building2 className="w-5 h-5" />,
    topics: [
      { name: "Private Company (Pty) Ltd", details: "Bhalisa ku-Registrar of Companies (Mbabane). Kudzinga emagama lamatsatfu, ID, ne-MOI." },
      { name: "Business Name (Sole Trader)", details: "Lula kakhulu – bhalisa libito leliphucwetiwe kuRegistrar; lulungele bantfu labanye." },
      { name: "Non-Profit / Association", details: "Bhalisa njenge-Section 21 noma NGO ngeMinistry of Tinsway Tangaphandle." },
      { name: "Co-operative", details: "Bhalisa kuMinistry of Agriculture / Commerce – kahle kubalimi, betintfombi nemasayensi." },
    ],
  },
  {
    name: "Imitsetfo Yenshintjo (Tax & ERS)",
    icon: <Landmark className="w-5 h-5" />,
    topics: [
      { name: "Taxpayer Identification Number (TIN)", details: "Yenta i-account ku-ERS (Eswatini Revenue Service) ku-ers.org.sz." },
      { name: "VAT Registration (15%)", details: "Kudzingekile uma turnover idlula E500,000/year. Bhalisa ku-ERS." },
      { name: "PAYE (Pay As You Earn)", details: "Bhadala intela yebasebenti njalo ngenyanga ku-ERS." },
      { name: "Provisional Tax / Income Tax", details: "Faka i-return ngenyaka, bhadala kabili (Aug & Feb)." },
      { name: "Customs & Import Duty", details: "ERS Customs eNgwenya, Mananga, Lavumisa, Mhlumeni borders." },
    ],
  },
  {
    name: "Imali Yekucala (Funding & Loans)",
    icon: <Coins className="w-5 h-5" />,
    topics: [
      { name: "Eswatini Development Finance Corp (FINCORP)", details: "Tikweletu tema-SME, agribusiness, nebomake; +268 2404 0944." },
      { name: "SEDCO (Small Enterprise Development)", details: "Lusito lwekucala libhizinisi, training, factory shells; eMatsapha." },
      { name: "Imbita Women's Finance Trust", details: "Tikweletu letincane tabomake bemabhizinisi." },
      { name: "Inhlanyelo Fund", details: "Imali yekucala libhizinisi yebantfwana baka Sive (under Tibiyo)." },
      { name: "Standard Bank / Nedbank / FNB / SwaziBank", details: "Emabhange labe SME loans, overdrafts, ne-business accounts." },
      { name: "Royal Science & Tech Park (RSTP)", details: "Innovation hub & incubator – Phocweni; lusito kuma-tech startup." },
    ],
  },
  {
    name: "Imakethe yemali (Stock Exchange & Financial Platforms)",
    icon: <BarChart3 className="w-5 h-5" />,
    topics: [
      { name: "Eswatini Stock Exchange (ESE)", details: "Thenga emasheshi e-ESwatini; ESE All Share Index, listing requirements, ne-dividends. vakashela www.ese.co.sz." },
      { name: "Eswatini C-Trade", details: "Indlela lesebentiswa ngayo ku-ese.co.sz – live quotes ne-order placement." },
      { name: "Listed Companies (Major)", details: "FNBE, NED, SBC, SEL, SWP, GRYS, INALA, NPC, RSC, AGS – tine ticker codes nge-ESE." },
      { name: "FNB Eswatini Stockbroking", details: "Vula i-brokerage account, thenge emasheshi ne-bonds nge-FNB." },
      { name: "Nedbank Eswatini Online Share Trading", details: "Platform yekutreydisana nge-emasheshi e-ESE noma eJSE." },
      { name: "Standard Bank Eswatini Share Trading", details: "Access equity trading through Standard Bank Private Banking / stockbroking." },
      { name: "Unit Trusts & Asset Managers", details: "Coronation, Allan Gray, Stanlib, Old Mutual – tiyatsengiswa ngemabhange laseSwatini." },
      { name: "EasyEquities (SA / accessible in ESwatini)", details: "Thenga emasheshi e-JSE, NYSE, NASDAQ nge fractional investing – app i-fumaneka Eswatini." },
      { name: "Financial Services Regulatory Authority (FSRA)", details: "Umkhicito wezinsimbi zemali eSwatini – bhalisa, imitsetfo, ne-consumer protection." },
    ],
  },
  {
    name: "Tincwadzi Telicense (Licenses & Permits)",
    icon: <FileText className="w-5 h-5" />,
    topics: [
      { name: "Trading License", details: "Tfola ku-City Council (Mbabane/Manzini) noma kuMasipala wakho." },
      { name: "Health & Safety Certificate", details: "Kudzingwa ngutindlu tekudla – Ministry of Health inspector." },
      { name: "Liquor License", details: "Faka i-application ku-Liquor Licensing Board – Mbabane." },
      { name: "Tourism License", details: "Bhalisa ne-Eswatini Tourism Authority kuma-lodges, tour operators." },
      { name: "Import / Export Permit", details: "Ministry of Commerce + ERS Customs; e-SADC trade certificate." },
    ],
  },
  {
    name: "Lipulani Lebhizinisi (Business Plan)",
    icon: <TrendingUp className="w-5 h-5" />,
    topics: [
      { name: "Executive Summary", details: "Sifinyezo selibhizinisi, umkhicito, market, ne-financials." },
      { name: "Market Research (Eswatini)", details: "Sebentisa Central Statistical Office (CSO) data, ERS reports." },
      { name: "Financial Projections", details: "3–5 year cashflow, P&L, balance sheet – kudzingwa nguma-funders." },
      { name: "SWOT Analysis", details: "Strengths, Weaknesses, Opportunities, Threats – kubuke libhizinisi lakho." },
      { name: "Marketing Strategy", details: "Indlela yekutsengisa: digital (FB/IG/TikTok), radio (SBIS, VOC), word-of-mouth." },
    ],
  },
  {
    name: "Bantfu Bekusebenta (HR & Labour)",
    icon: <Users className="w-5 h-5" />,
    topics: [
      { name: "Employment Act 1980", details: "Imitsetfo yebasebenti – contracts, leave, dismissals." },
      { name: "Minimum Wage", details: "Ihluka ngemkhakha – funa i-Wages Council order yemkhakha wakho." },
      { name: "Eswatini National Provident Fund (ENPF)", details: "Bhalisa basebenti, bhadala 10% (5% employer + 5% employee)." },
      { name: "Workmen's Compensation", details: "Insurance yekulimala emsebentini – Ministry of Labour." },
      { name: "CMAC (Conciliation, Mediation & Arbitration)", details: "Lapho kuxazululwa khona tinkinga tebasebenti." },
    ],
  },
  {
    name: "E-commerce & Digital",
    icon: <Briefcase className="w-5 h-5" />,
    topics: [
      { name: "MoMo (MTN) / eMali (Eswatini Mobile)", details: "Mobile money payments – kuvulela emabhizinisi lamancane." },
      { name: "Payment Gateways", details: "Cellulant, DPO, Stripe (via SA); accept Visa/Mastercard online." },
      { name: "Domain & Hosting (.sz)", details: "Bhalisa i-.co.sz ku-SZNIC; hosting locally noma eSouth Africa." },
      { name: "Social Commerce", details: "Tsengisa nga-Facebook Marketplace, WhatsApp Business, Instagram Shop." },
    ],
  },
  {
    name: "Imikhakha Lebalulekile (Key Sectors)",
    icon: <TrendingUp className="w-5 h-5" />,
    topics: [
      { name: "Agriculture (Sugar, Beef, Citrus)", details: "RES, Eswatini Sugar Association, SWADE projects – Lubombo & Hhohho." },
      { name: "Tourism & Hospitality", details: "Ezulwini Valley, Hlane, Mlilwane, Mkhaya – ETA support." },
      { name: "Manufacturing (Matsapha)", details: "Textiles, food processing – SEDCO factory shells, EIPA incentives." },
      { name: "ICT & Fintech", details: "Royal Science & Tech Park, Eswatini Communications Commission." },
      { name: "Mining (Coal, Quarry)", details: "Ministry of Natural Resources – mining permits & royalties." },
    ],
  },
];

interface BizLink {
  name: string;
  url?: string;
  description: string;
}

const bizLinks: BizLink[] = [
  { name: "Registrar of Companies (Mbabane)", description: "Ministry of Commerce, Industry & Trade – company registration" },
  { name: "Eswatini Revenue Service (ERS)", url: "https://www.ers.org.sz", description: "Tax registration, VAT, PAYE, customs" },
  { name: "Eswatini Investment Promotion Authority (EIPA)", url: "https://www.investeswatini.org.sz", description: "Investor support, incentives, one-stop-shop" },
  { name: "Eswatini Stock Exchange (ESE)", url: "https://www.ese.co.sz", description: "Official ESE site – prices, listed companies, C-Trade" },
  { name: "Financial Services Regulatory Authority (FSRA)", url: "https://www.fsra.co.sz", description: "Regulator of securities & non-bank financial institutions" },
  { name: "EasyEquities", url: "https://www.easyequities.co.za", description: "JSE, US & other equities investing app accessible in Eswatini" },
  { name: "SEDCO", url: "https://www.sedco.co.sz", description: "Small enterprise development, training, factory shells" },
  { name: "FINCORP", url: "https://www.fincorp.co.sz", description: "SME loans & agribusiness finance" },
  { name: "Royal Science & Tech Park", url: "https://www.rstp.org.sz", description: "Innovation hub, incubator, biotech park" },
  { name: "Ministry of Commerce, Industry & Trade", description: "Trade policy, licensing, SADC/COMESA trade" },
  { name: "Central Bank of Eswatini", url: "https://www.centralbank.org.sz", description: "Forex, monetary policy, financial regulation" },
  { name: "Federation of Swaziland Employers & Chamber of Commerce (FSE&CC)", url: "https://www.business-eswatini.co.sz", description: "Business Eswatini – chamber & advocacy" },
];

const BusinessPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase().trim();
  const isSearching = q.length > 0;

  const filteredCategories = useMemo(() => {
    if (!isSearching) return bizCategories;
    return bizCategories
      .map((c) => ({
        ...c,
        topics: c.topics.filter(
          (x) => x.name.toLowerCase().includes(q) || x.details.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.name.toLowerCase().includes(q) || c.topics.length > 0);
  }, [q, isSearching]);

  const filteredLinks = useMemo(() => {
    if (!isSearching) return bizLinks;
    return bizLinks.filter(
      (l) => l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
    );
  }, [q, isSearching]);

  useEffect(() => {
    if (isSearching && filteredCategories.length > 0) {
      setExpanded(filteredCategories[0].name);
    } else if (!isSearching) {
      setExpanded(null);
    }
  }, [isSearching, filteredCategories]);

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 gradient-primary safe-top">
        <button onClick={() => navigate("/")} className="text-primary-foreground/80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Briefcase className="w-5 h-5 text-primary-foreground" />
        <h1 className="font-display font-semibold text-primary-foreground">Business & Enterprise</h1>
      </div>

      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-lg text-foreground mb-1">Libhizinisi Lakho 💼</h2>
        <p className="text-sm text-muted-foreground font-body">
          Indlela yekucala, kubhalisa, nekukhulisa libhizinisi eSwatini – kusukela ku-registration kuya emarketing.
        </p>
      </div>

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-5 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sesha license, tax, funding..."
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
            {filteredCategories.length} category(s) · {filteredLinks.length} link(s) found
          </p>
        )}
      </div>

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
              <span className="text-xs text-muted-foreground font-body">{category.topics.length}</span>
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
                    {category.topics.map((topic) => (
                      <button
                        key={topic.name}
                        onClick={() => {
                          const prompt = `Ngisite nge ${topic.name} (${category.name}) eSwatini: tinyatselo, tindleko, netindzawo lengingaya kuto kute ngitfole lusito ngelibhizinisi lami.`;
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
                          <span className="text-sm font-body text-foreground">{topic.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-body pl-5">{topic.details}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {isSearching && filteredCategories.length === 0 && filteredLinks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Frown className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-display text-muted-foreground">Akukho miphumela ifunyenwe</p>
          </div>
        )}

        {(!isSearching || filteredLinks.length > 0) && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Landmark className="w-4 h-4 text-primary" />
              <h3 className="font-display font-bold text-sm text-foreground">Business Resources & Contacts</h3>
            </div>
            <div className="space-y-2">
              {filteredLinks.map((link) => {
                const Wrapper: any = link.url ? "a" : "div";
                const props = link.url ? { href: link.url, target: "_blank", rel: "noopener noreferrer" } : {};
                return (
                  <Wrapper
                    key={link.name}
                    {...props}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {link.url ? <ExternalLink className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
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

export default BusinessPage;
