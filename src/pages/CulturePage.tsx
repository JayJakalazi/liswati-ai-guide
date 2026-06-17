import { ArrowLeft, Crown, Drum, Flame, Users, Sparkles, MapPin, Calendar, FileText, Search, X, Frown, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface CultureCategory {
  name: string;
  icon: React.ReactNode;
  topics: { name: string; details: string }[];
}

const cultureCategories: CultureCategory[] = [
  {
    name: "Imicimbi Yesive (National Ceremonies)",
    icon: <Crown className="w-5 h-5" />,
    topics: [
      { name: "Umhlanga (Reed Dance)", details: "Umcimbi wetintfombi letingakendzi, wenteka nyaka ngenyaka eLudzidzini Royal Residence ngaTingolweni / Inyoni." },
      { name: "iNcwala (Kingship Ceremony)", details: "Lomkhulu umcimbi wesive, ubungiswa eLudzidzini ngaBhimbidvwane, ubonga tilimo nekuvuselela bukhosi." },
      { name: "Buganu (Marula Festival)", details: "Umcimbi wetjwala lebuganu ngaBhimbidvwane / iNdlovana, eHlane neBuhleni; bafati labadzala bephatsa." },
      { name: "Lutsango Day", details: "Lilanga lebafati besive labakhonta eNkhosini, bayohlanganela eLudzidzini." },
    ],
  },
  {
    name: "Sigcamu Nemvunulo (Traditional Attire)",
    icon: <Sparkles className="w-5 h-5" />,
    topics: [
      { name: "Lihiya / Sidvwashi", details: "Linwele lemibalabala lelimbatfwa ngemadvodza nebafati emicimbini." },
      { name: "Emajobo / Sigcebesha", details: "Imvunulo yebadzala – emajobo etinyamatane, sigcebesha sekuhlobisa." },
      { name: "Indlamu / Sicholo", details: "Sihloko lesihloniphekile sebafati labendzile noma labadzala." },
      { name: "Lugcebesha lwetintfombi (Umhlanga)", details: "Tintfombi tembatsa indvwangu lembovu, ligcebesha, neminyaka yeligcebesha." },
    ],
  },
  {
    name: "Sintu Nemasiko (Customs & Rituals)",
    icon: <Flame className="w-5 h-5" />,
    topics: [
      { name: "Lobola (Bridewealth)", details: "Sivumelwane semindeni lapho umkhwenyana akhokhela tinkhomo emndenini wamakoti." },
      { name: "Kuteka (Traditional Marriage)", details: "Sento sesintu lapho umakoti angeniswa emndenini wemkhwenyana." },
      { name: "Umhlambiso", details: "Sipho lesiphiwa emndenini wemkhwenyana ngumndeni wamakoti." },
      { name: "Umemulo / Kungenisa intfombi", details: "Umcimbi wekutfutfukisa intfombi kuya ebudzaleni." },
      { name: "Sidvudvu / Sangoma rites", details: "Imisebenti yesintu yekutsintsana nemadloti." },
    ],
  },
  {
    name: "Tindzawo Tembali (Heritage Sites)",
    icon: <MapPin className="w-5 h-5" />,
    topics: [
      { name: "Ludzidzini Royal Village", details: "Likhaya leNdlovukati naseSive – lapho kwentelwa khona iNcwala neMhlanga." },
      { name: "Lobamba", details: "Likomidi lesive – Parliament, Somhlolo Stadium, National Museum." },
      { name: "Mantenga Cultural Village (Ezulwini)", details: "Bonisa umuti wesintu wakaSwati, indlamu, nekudla kwesintu." },
      { name: "Sibebe Rock (Mbabane)", details: "Lidvwala lelikhulu kunawo onkhe emhlabeni – sibalo sebukhosi nemvelo." },
      { name: "King Sobhuza II Memorial Park", details: "Lobamba – kukhumbula iNkhosi Sobhuza II, lowakhulula iNgwane." },
      { name: "Ngwenya Mine", details: "Imayini yendzala kunato tonkhe emhlabeni – ematje ebumvula." },
    ],
  },
  {
    name: "Kudla Kwesintu (Traditional Food)",
    icon: <Drum className="w-5 h-5" />,
    topics: [
      { name: "Sishwala / Liphalishi", details: "Lifa lemmbila, lidliwa nesitjebo, sitfubi, noma inyama." },
      { name: "Sitfubi / Emasi", details: "Lubisi lolutsele, ludliwa nelibhontjisi noma sishwala." },
      { name: "Buganu", details: "Tjwala lebenta ngetihlahla teMaganu (marula) – ehlobo." },
      { name: "Tinkhobe / Tjwala beSwati", details: "Tjwala lebenta ngemmbila, sento sesintu emicimbini." },
      { name: "Inyama yenkhomo / yembuti emnyakeni", details: "Lihlukaniswa ngendlela yesintu emicimbini lemikhulu." },
    ],
  },
  {
    name: "Lulwimi Nemibhalo (Language & Idioms)",
    icon: <FileText className="w-5 h-5" />,
    topics: [
      { name: "Tisho TesiSwati", details: "Imisho yebadzala: 'Indlela ibutwa kulabaphambili', 'Ingwe idla ngemabala'." },
      { name: "Tinanatelo (Praise poetry)", details: "Imibongo lehlonipha boKhokho, eMaKhosi, nesive saka Ngwane." },
      { name: "Imitsetfo yekuhlonipha", details: "Indlela yekukhuluma nalabadzala, kuhlonipha umakoti emakhweni." },
      { name: "Tinganekwane", details: "Tindzaba tesintu letibalelwa bantfwana ebusuku – Mvubu, Mfutfwa, Sangcobo." },
    ],
  },
  {
    name: "Bukhosi Naka Ngwane (Royalty & History)",
    icon: <Crown className="w-5 h-5" />,
    topics: [
      { name: "INkhosi Mswati III", details: "INkhosi yanyalo yeSive seSwati, yabekwa esihlalweni nga-1986." },
      { name: "INdlovukati LaMatsebula", details: "Make weSive – uhlala eLudzidzini." },
      { name: "INkhosi Sobhuza II", details: "INkhosi yebuse iminyaka lengu-82, yatfola inkhululeko nga-1968." },
      { name: "Dlamini Dynasty", details: "Bukhosi baka Dlamini, kusukela kuNgwane III." },
      { name: "Tikhulu / Tindvuna", details: "Bahloli betigodzi nemiphakatsi ngephansi kweNkhosi." },
    ],
  },
  {
    name: "Imidlalo Nekuvakasha (Sports & Recreation)",
    icon: <Users className="w-5 h-5" />,
    topics: [
      { name: "Sibhaca / Indlamu", details: "Kugida kwesintu, kuvame ekuhlonipheni emadloti nakumicimbi." },
      { name: "Umtsimba", details: "Kugida kwemakoti emshadweni wesintu." },
      { name: "Lusekwane (Incwala)", details: "Kuhamba kwemajaha ayocosha tihlahla teNcwala." },
    ],
  },
];

interface CultureLink {
  name: string;
  url?: string;
  description: string;
}

const cultureLinks: CultureLink[] = [
  { name: "Eswatini National Trust Commission", url: "https://www.entc.org.sz", description: "Heritage sites, museums & nature reserves" },
  { name: "Eswatini National Museum (Lobamba)", description: "History, artefacts & cultural exhibits" },
  { name: "Mantenga Cultural Village", description: "Traditional Swazi homestead & dance – Ezulwini" },
  { name: "Bushfire Festival (House on Fire)", url: "https://www.bush-fire.com", description: "Annual arts, music & culture festival – Malkerns" },
  { name: "Eswatini Tourism Authority", url: "https://www.thekingdomofeswatini.com", description: "Official tourism & heritage portal" },
  { name: "Ludzidzini Royal Residence", description: "Site of Umhlanga & iNcwala ceremonies" },
];

const CulturePage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase().trim();
  const isSearching = q.length > 0;

  const [activeChip, setActiveChip] = useState<string | null>(null);

  const chips: { label: string; match: string }[] = [
    { label: "Ceremonies", match: "Imicimbi" },
    { label: "Attire", match: "Sigcamu" },
    { label: "Customs", match: "Sintu" },
    { label: "Heritage Sites", match: "Tindzawo" },
    { label: "Food", match: "Kudla" },
    { label: "Language", match: "Lulwimi" },
    { label: "Royalty", match: "Bukhosi" },
    { label: "Sports", match: "Imidlalo" },
  ];

  const filteredCategories = useMemo(() => {
    let cats = cultureCategories;
    if (activeChip) {
      cats = cats.filter((c) => c.name.includes(activeChip));
    }
    if (!isSearching) return cats;
    return cats
      .map((c) => ({
        ...c,
        topics: c.topics.filter(
          (x) => x.name.toLowerCase().includes(q) || x.details.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.name.toLowerCase().includes(q) || c.topics.length > 0);
  }, [q, isSearching, activeChip]);

  const filteredLinks = useMemo(() => {
    if (!isSearching) return cultureLinks;
    return cultureLinks.filter(
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
        <Crown className="w-5 h-5 text-primary-foreground" />
        <h1 className="font-display font-semibold text-primary-foreground">Culture & Heritage</h1>
      </div>

      <div className="px-5 pt-6 pb-4">
        <h2 className="font-display font-bold text-lg text-foreground mb-1">Emasiko Etfu 👑</h2>
        <p className="text-sm text-muted-foreground font-body">
          Funda ngemasiko, imicimbi, nemilandvo yesive saka Ngwane.
        </p>
      </div>

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-5 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sesha sintfu, umcimbi, noma indzawo..."
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
                          const prompt = `Ngichazele ngalokujulile nge ${topic.name} (${category.name}) eSwatini: umlandvo, indlela lokwentiwa ngayo, nekubaluleka kwako emasikweni etfu.`;
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
                          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
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
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-display font-bold text-sm text-foreground">Culture Resources & Links</h3>
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
                      <MapPin className="w-4 h-4" />
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

export default CulturePage;
