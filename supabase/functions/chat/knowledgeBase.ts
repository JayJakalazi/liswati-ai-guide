// Knowledge base built from the Health, Culture and Business pages of the app.
// Used to ground Bafo's answers in real, local Eswatini content.

export interface KBEntry {
  domain: "HEALTH" | "CULTURE" | "BUSINESS";
  category: string;
  title: string;
  body: string;
}

export const KNOWLEDGE_BASE: KBEntry[] = [
  // ---------------- HEALTH: conditions & where to get help ----------------
  { domain: "HEALTH", category: "Communicable Diseases", title: "HIV / AIDS", body: "Free ART, testing & PrEP at all government clinics, RFM Hospital (Manzini), Mbabane Govt Hospital, Baylor Children's Clinic (Mbabane), MSF Shiselweni, NERCHA partner sites." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "Tuberculosis (TB)", body: "Free diagnosis & treatment at Good Shepherd Hospital (Siteki – national TB referral), all government clinics, MSF Matsapha & Nhlangano TB clinics." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "Malaria", body: "Lubombo & Hhohho lowveld clinics, Good Shepherd Hospital, Hlathikhulu Govt Hospital, National Malaria Programme (MoH)." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "COVID-19 / Flu", body: "Any public clinic, Mbabane Govt Hospital, RFM Hospital, private GPs, Mbabane Clinic, Manzini Clinic." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "STIs (Gonorrhoea, Syphilis)", body: "Free at all public clinics & STI clinics, Family Life Association of Eswatini (FLAS) – Mbabane, Manzini, Nhlangano, Siteki." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "Hepatitis B & C", body: "Mbabane Govt Hospital, RFM Hospital, private labs (Lancet, Ampath)." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "Cholera / Diarrhoea", body: "Nearest clinic immediately; Mbabane Govt Hospital, RFM Hospital for severe cases." },
  { domain: "HEALTH", category: "Communicable Diseases", title: "Bilharzia (Schistosomiasis)", body: "Public clinics in lowveld areas, Good Shepherd Hospital, Hlane area clinics." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Hypertension (High BP)", body: "All public clinics (free screening), Mbabane Govt Hospital NCD clinic, RFM Hospital, Mbabane Clinic." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Diabetes (Type 1 & 2)", body: "Mbabane Govt Hospital diabetic clinic, RFM Hospital, Good Shepherd, Hlathikhulu; Eswatini Diabetes Association." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Heart Disease & Stroke", body: "Mbabane Govt Hospital, Mbabane Clinic; complex cases referred to South Africa (Pretoria/Johannesburg)." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Asthma & COPD", body: "All public clinics, Mbabane Govt Hospital respiratory clinic, private GPs." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Cancer (screening & care)", body: "Mbabane Govt Hospital oncology clinic, Cancer Association of Eswatini (Mbabane); advanced treatment usually referred to SA." },
  { domain: "HEALTH", category: "Non-Communicable Diseases", title: "Kidney Disease", body: "Mbabane Govt Hospital, RFM Hospital; dialysis at private centres & referral to SA." },
  { domain: "HEALTH", category: "Maternal & Child Health", title: "Antenatal Care (Pregnancy)", body: "Free at all public clinics, RFM Hospital, Mbabane Govt Hospital, Good Shepherd, Hlathikhulu, Pigg's Peak Hospital." },
  { domain: "HEALTH", category: "Maternal & Child Health", title: "Childhood Immunisations (EPI)", body: "Free at every public clinic – follow EPI schedule from birth." },
  { domain: "HEALTH", category: "Maternal & Child Health", title: "Child Malnutrition", body: "Public clinics, Baylor Children's Clinic, World Vision & UNICEF supported sites." },
  { domain: "HEALTH", category: "Maternal & Child Health", title: "Childhood Illnesses (fever, diarrhoea)", body: "Nearest clinic, Mbabane Govt Hospital paediatric ward, RFM Paediatrics." },
  { domain: "HEALTH", category: "Maternal & Child Health", title: "Family Planning & Contraception", body: "Free at public clinics, FLAS clinics (Mbabane, Manzini, Nhlangano, Siteki), PSI Lusweti outreach." },
  { domain: "HEALTH", category: "Mental Health", title: "Depression & Anxiety", body: "National Psychiatric Referral Hospital (Manzini), Mbabane Govt Hospital mental health unit, SWAGAA counselling." },
  { domain: "HEALTH", category: "Mental Health", title: "Substance Abuse (alcohol/drugs)", body: "Psychiatric Hospital Manzini, Mbabane Clinic, Salvation Army programmes." },
  { domain: "HEALTH", category: "Mental Health", title: "Stress & Burnout", body: "Private counsellors in Mbabane/Manzini, church-based counselling, Lifeline Eswatini." },
  { domain: "HEALTH", category: "Mental Health", title: "Severe Mental Illness", body: "National Psychiatric Referral Hospital (Manzini) – main in-patient facility." },
  { domain: "HEALTH", category: "Sexual & Reproductive Health", title: "HIV Testing & PrEP", body: "All public clinics (free), FLAS, PSI Lusweti, Baylor (youth-friendly), MSF sites." },
  { domain: "HEALTH", category: "Sexual & Reproductive Health", title: "Cervical & Breast Cancer Screening", body: "Mbabane Govt Hospital, RFM, Cancer Association of Eswatini, FLAS clinics." },
  { domain: "HEALTH", category: "Sexual & Reproductive Health", title: "Male Medical Circumcision (VMMC)", body: "Free at public clinics, FLAS, Litsemba Letfu / PSI sites." },
  { domain: "HEALTH", category: "Sexual & Reproductive Health", title: "Gender-Based Violence (GBV) Support", body: "SWAGAA (Manzini HQ + regional offices), Childline 116, One-Stop Centres at RFM & Mbabane Govt Hospital, Police DVCPU." },
  { domain: "HEALTH", category: "Emergencies & Injuries", title: "Road Accidents & Trauma", body: "Call 977 (ambulance). Mbabane Govt Hospital & RFM Hospital trauma units. Private: Mbabane Clinic, MRI / Swazi Med." },
  { domain: "HEALTH", category: "Emergencies & Injuries", title: "Burns", body: "Mbabane Govt Hospital, RFM Hospital burns unit." },
  { domain: "HEALTH", category: "Emergencies & Injuries", title: "Snake Bites", body: "Nearest hospital immediately – Good Shepherd (Siteki), Hlathikhulu, RFM, Mbabane Govt Hospital." },
  { domain: "HEALTH", category: "Emergencies & Injuries", title: "Poisoning", body: "Nearest hospital ER; call 977." },
  { domain: "HEALTH", category: "Emergencies & Injuries", title: "Heart Attack / Stroke", body: "Call 977. Mbabane Clinic, Mbabane Govt Hospital, RFM Hospital." },
  { domain: "HEALTH", category: "General & Primary Care", title: "Colds, Flu & Fever", body: "Any public clinic, private GPs in Mbabane / Manzini / Matsapha / Ezulwini." },
  { domain: "HEALTH", category: "General & Primary Care", title: "Dental Care", body: "Mbabane Govt Hospital dental clinic, RFM dental, private dentists in Mbabane & Manzini." },
  { domain: "HEALTH", category: "General & Primary Care", title: "Eye Care & Spectacles", body: "Mbabane Govt Hospital eye clinic, Good Shepherd eye unit, private optometrists." },
  { domain: "HEALTH", category: "General & Primary Care", title: "Skin Conditions", body: "Public clinics, Mbabane Govt Hospital dermatology referrals, private GPs." },
  { domain: "HEALTH", category: "General & Primary Care", title: "Pharmacies & Medication", body: "Central Medical Stores (public), private pharmacies: Clicks, Dis-Chem, Medirite, local pharmacies in Mbabane, Manzini, Matsapha, Nhlangano, Siteki." },
  { domain: "HEALTH", category: "Traditional Medicine", title: "Tinyanga (Herbalists)", body: "Registered traditional healers via Traditional Healers Organisation of Eswatini." },
  { domain: "HEALTH", category: "Traditional Medicine", title: "Tangoma (Diviners)", body: "Registered traditional healers; often work with MoH on HIV / TB referrals." },
  { domain: "HEALTH", category: "Traditional Medicine", title: "Kufemba (Spiritual healing)", body: "Traditional healers in all regions; consult registered practitioners." },

  // ---------------- HEALTH: services & contacts ----------------
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Ministry of Health – Eswatini", body: "Official MoH portal – policies, facilities & programmes. https://www.gov.sz/index.php/ministries-departments/ministry-of-health" },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Ambulance / Emergency – 977", body: "Call 977 (national emergency) for ambulance & trauma." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Childline Eswatini / GBV – 116", body: "Call 116 (toll-free) for child protection & GBV support." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "NERCHA (HIV/AIDS Council)", body: "National HIV/AIDS response & partner directory. https://www.nercha.org.sz" },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Mbabane Government Hospital", body: "National referral hospital – Mbabane. +268 2404 2431" },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Raleigh Fitkin Memorial (RFM)", body: "Main mission hospital in Manzini." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Good Shepherd Hospital (Siteki)", body: "Lubombo referral – TB & general care." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "National Psychiatric Hospital", body: "Manzini – national mental health referral." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Family Life Association (FLAS)", body: "SRH, HIV testing, family planning – nationwide. https://www.flas.org.sz" },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "SWAGAA (GBV support)", body: "Counselling & shelter for survivors of GBV. https://www.swagaa.org.sz" },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Baylor Children's Clinic", body: "Paediatric HIV & adolescent care – Mbabane." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "Cancer Association of Eswatini", body: "Screening, awareness & patient support – Mbabane." },
  { domain: "HEALTH", category: "Health Services & Contacts", title: "The Luke Commission (TLC)", body: "Miracle Campus, Sidvokodvo, Manzini Region – free comprehensive healthcare, HIV, surgery & maternal care. Phone +268 2417 0024, email info@lukecommission.org, hours Mon–Fri 7:00 AM – 5:00 PM (emergencies 24/7). https://lukecommission.org" },

  // ---------------- CULTURE ----------------
  { domain: "CULTURE", category: "Imicimbi Yesive (National Ceremonies)", title: "Umhlanga (Reed Dance)", body: "Umcimbi wetintfombi letingakendzi, wenteka nyaka ngenyaka eLudzidzini Royal Residence ngaTingolweni / Inyoni." },
  { domain: "CULTURE", category: "Imicimbi Yesive (National Ceremonies)", title: "iNcwala (Kingship Ceremony)", body: "Lomkhulu umcimbi wesive, ubungiswa eLudzidzini ngaBhimbidvwane, ubonga tilimo nekuvuselela bukhosi." },
  { domain: "CULTURE", category: "Imicimbi Yesive (National Ceremonies)", title: "Buganu (Marula Festival)", body: "Umcimbi wetjwala lebuganu ngaBhimbidvwane / iNdlovana, eHlane neBuhleni; bafati labadzala bephatsa." },
  { domain: "CULTURE", category: "Imicimbi Yesive (National Ceremonies)", title: "Lutsango Day", body: "Lilanga lebafati besive labakhonta eNkhosini, bayohlanganela eLudzidzini." },
  { domain: "CULTURE", category: "Sigcamu Nemvunulo (Traditional Attire)", title: "Lihiya / Sidvwashi", body: "Linwele lemibalabala lelimbatfwa ngemadvodza nebafati emicimbini." },
  { domain: "CULTURE", category: "Sigcamu Nemvunulo (Traditional Attire)", title: "Emajobo / Sigcebesha", body: "Imvunulo yebadzala – emajobo etinyamatane, sigcebesha sekuhlobisa." },
  { domain: "CULTURE", category: "Sigcamu Nemvunulo (Traditional Attire)", title: "Indlamu / Sicholo", body: "Sihloko lesihloniphekile sebafati labendzile noma labadzala." },
  { domain: "CULTURE", category: "Sigcamu Nemvunulo (Traditional Attire)", title: "Lugcebesha lwetintfombi (Umhlanga)", body: "Tintfombi tembatsa indvwangu lembovu, ligcebesha, neminyaka yeligcebesha." },
  { domain: "CULTURE", category: "Sintu Nemasiko (Customs & Rituals)", title: "Lobola (Bridewealth)", body: "Sivumelwane semindeni lapho umkhwenyana akhokhela tinkhomo emndenini wamakoti." },
  { domain: "CULTURE", category: "Sintu Nemasiko (Customs & Rituals)", title: "Kuteka (Traditional Marriage)", body: "Sento sesintu lapho umakoti angeniswa emndenini wemkhwenyana." },
  { domain: "CULTURE", category: "Sintu Nemasiko (Customs & Rituals)", title: "Umhlambiso", body: "Sipho lesiphiwa emndenini wemkhwenyana ngumndeni wamakoti." },
  { domain: "CULTURE", category: "Sintu Nemasiko (Customs & Rituals)", title: "Umemulo / Kungenisa intfombi", body: "Umcimbi wekutfutfukisa intfombi kuya ebudzaleni." },
  { domain: "CULTURE", category: "Sintu Nemasiko (Customs & Rituals)", title: "Sidvudvu / Sangoma rites", body: "Imisebenti yesintu yekutsintsana nemadloti." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "Ludzidzini Royal Village", body: "Likhaya leNdlovukati naseSive – lapho kwentelwa khona iNcwala neMhlanga." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "Lobamba", body: "Likomidi lesive – Parliament, Somhlolo Stadium, National Museum." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "Mantenga Cultural Village (Ezulwini)", body: "Bonisa umuti wesintu wakaSwati, indlamu, nekudla kwesintu." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "Sibebe Rock (Mbabane)", body: "Lidvwala lelikhulu kunawo onkhe emhlabeni – sibalo sebukhosi nemvelo." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "King Sobhuza II Memorial Park", body: "Lobamba – kukhumbula iNkhosi Sobhuza II, lowakhulula iNgwane." },
  { domain: "CULTURE", category: "Tindzawo Tembali (Heritage Sites)", title: "Ngwenya Mine", body: "Imayini yendzala kunato tonkhe emhlabeni – ematje ebumvula." },
  { domain: "CULTURE", category: "Kudla Kwesintu (Traditional Food)", title: "Sishwala / Liphalishi", body: "Lifa lemmbila, lidliwa nesitjebo, sitfubi, noma inyama." },
  { domain: "CULTURE", category: "Kudla Kwesintu (Traditional Food)", title: "Sitfubi / Emasi", body: "Lubisi lolutsele, ludliwa nelibhontjisi noma sishwala." },
  { domain: "CULTURE", category: "Kudla Kwesintu (Traditional Food)", title: "Buganu (tjwala)", body: "Tjwala lebenta ngetihlahla teMaganu (marula) – ehlobo." },
  { domain: "CULTURE", category: "Kudla Kwesintu (Traditional Food)", title: "Tinkhobe / Tjwala beSwati", body: "Tjwala lebenta ngemmbila, sento sesintu emicimbini." },
  { domain: "CULTURE", category: "Kudla Kwesintu (Traditional Food)", title: "Inyama yenkhomo / yembuti", body: "Lihlukaniswa ngendlela yesintu emicimbini lemikhulu." },
  { domain: "CULTURE", category: "Lulwimi Nemibhalo (Language & Idioms)", title: "Tisho TesiSwati", body: "Imisho yebadzala: 'Indlela ibutwa kulabaphambili', 'Ingwe idla ngemabala'." },
  { domain: "CULTURE", category: "Lulwimi Nemibhalo (Language & Idioms)", title: "Tinanatelo (Praise poetry)", body: "Imibongo lehlonipha boKhokho, eMaKhosi, nesive saka Ngwane." },
  { domain: "CULTURE", category: "Lulwimi Nemibhalo (Language & Idioms)", title: "Imitsetfo yekuhlonipha", body: "Indlela yekukhuluma nalabadzala, kuhlonipha umakoti emakhweni." },
  { domain: "CULTURE", category: "Lulwimi Nemibhalo (Language & Idioms)", title: "Tinganekwane", body: "Tindzaba tesintu letibalelwa bantfwana ebusuku – Mvubu, Mfutfwa, Sangcobo." },
  { domain: "CULTURE", category: "Bukhosi Naka Ngwane (Royalty & History)", title: "INkhosi Mswati III", body: "INkhosi yanyalo yeSive seSwati, yabekwa esihlalweni nga-1986." },
  { domain: "CULTURE", category: "Bukhosi Naka Ngwane (Royalty & History)", title: "INdlovukati LaMatsebula", body: "Make weSive – uhlala eLudzidzini." },
  { domain: "CULTURE", category: "Bukhosi Naka Ngwane (Royalty & History)", title: "INkhosi Sobhuza II", body: "INkhosi yebuse iminyaka lengu-82, yatfola inkhululeko nga-1968." },
  { domain: "CULTURE", category: "Bukhosi Naka Ngwane (Royalty & History)", title: "Dlamini Dynasty", body: "Bukhosi baka Dlamini, kusukela kuNgwane III." },
  { domain: "CULTURE", category: "Bukhosi Naka Ngwane (Royalty & History)", title: "Tikhulu / Tindvuna", body: "Bahloli betigodzi nemiphakatsi ngephansi kweNkhosi." },
  { domain: "CULTURE", category: "Imidlalo Nekuvakasha (Sports & Recreation)", title: "Sibhaca / Indlamu", body: "Kugida kwesintu, kuvame ekuhlonipheni emadloti nakumicimbi." },
  { domain: "CULTURE", category: "Imidlalo Nekuvakasha (Sports & Recreation)", title: "Umtsimba", body: "Kugida kwemakoti emshadweni wesintu." },
  { domain: "CULTURE", category: "Imidlalo Nekuvakasha (Sports & Recreation)", title: "Lusekwane (Incwala)", body: "Kuhamba kwemajaha ayocosha tihlahla teNcwala." },
  { domain: "CULTURE", category: "Culture Resources", title: "Tindzawo tekuvakashela nemitfombi", body: "Eswatini National Trust Commission (entc.org.sz), Eswatini National Museum (Lobamba), Mantenga Cultural Village (Ezulwini), Bushfire Festival (Malkerns, bush-fire.com), Eswatini Tourism Authority (thekingdomofeswatini.com), Ludzidzini Royal Residence." },

  // ---------------- BUSINESS ----------------
  { domain: "BUSINESS", category: "Kubhalisa Inkampani (Company Registration)", title: "Private Company (Pty) Ltd", body: "Bhalisa ku-Registrar of Companies (Mbabane). Kudzinga emagama lamatsatfu, ID, ne-MOI." },
  { domain: "BUSINESS", category: "Kubhalisa Inkampani (Company Registration)", title: "Business Name (Sole Trader)", body: "Lula kakhulu – bhalisa libito leliphucwetiwe kuRegistrar; lulungele bantfu labanye." },
  { domain: "BUSINESS", category: "Kubhalisa Inkampani (Company Registration)", title: "Non-Profit / Association", body: "Bhalisa njenge-Section 21 noma NGO ngeMinistry of Tinsway Tangaphandle." },
  { domain: "BUSINESS", category: "Kubhalisa Inkampani (Company Registration)", title: "Co-operative", body: "Bhalisa kuMinistry of Agriculture / Commerce – kahle kubalimi, betintfombi nemasayensi." },
  { domain: "BUSINESS", category: "Imitsetfo Yenshintjo (Tax & ERS)", title: "Taxpayer Identification Number (TIN)", body: "Yenta i-account ku-ERS (Eswatini Revenue Service) ku-ers.org.sz." },
  { domain: "BUSINESS", category: "Imitsetfo Yenshintjo (Tax & ERS)", title: "VAT Registration (15%)", body: "Kudzingekile uma turnover idlula E500,000/year. Bhalisa ku-ERS." },
  { domain: "BUSINESS", category: "Imitsetfo Yenshintjo (Tax & ERS)", title: "PAYE (Pay As You Earn)", body: "Bhadala intela yebasebenti njalo ngenyanga ku-ERS." },
  { domain: "BUSINESS", category: "Imitsetfo Yenshintjo (Tax & ERS)", title: "Provisional Tax / Income Tax", body: "Faka i-return ngenyaka, bhadala kabili (Aug & Feb)." },
  { domain: "BUSINESS", category: "Imitsetfo Yenshintjo (Tax & ERS)", title: "Customs & Import Duty", body: "ERS Customs eNgwenya, Mananga, Lavumisa, Mhlumeni borders." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "FINCORP", body: "Eswatini Development Finance Corporation – tikweletu tema-SME, agribusiness, nebomake; +268 2404 0944; fincorp.co.sz." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "SEDCO", body: "Small Enterprise Development Company – lusito lwekucala libhizinisi, training, factory shells; eMatsapha; sedco.co.sz." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "Imbita Women's Finance Trust", body: "Tikweletu letincane tabomake bemabhizinisi." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "Inhlanyelo Fund", body: "Imali yekucala libhizinisi yebantfwana baka Sive (under Tibiyo)." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "Emabhange (Banks)", body: "Standard Bank, Nedbank, FNB, SwaziBank – SME loans, overdrafts, ne-business accounts." },
  { domain: "BUSINESS", category: "Imali Yekucala (Funding & Loans)", title: "Royal Science & Tech Park (RSTP)", body: "Innovation hub & incubator – Phocweni; lusito kuma-tech startup; rstp.org.sz." },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "Eswatini Stock Exchange (ESE)", body: "Thenga emasheshi e-Eswatini; ESE All Share Index, listing requirements, ne-dividends. www.ese.co.sz" },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "Eswatini C-Trade", body: "Indlela lesebentiswa ngayo ku-ese.co.sz – live quotes ne-order placement." },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "Listed Companies (Major)", body: "FNBE, NED, SBC, SEL, SWP, GRYS, INALA, NPC, RSC, AGS – tine ticker codes nge-ESE." },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "Stockbroking ngemabhange", body: "FNB Eswatini Stockbroking, Nedbank Eswatini Online Share Trading, Standard Bank Eswatini Private Banking share trading (ESE ne-JSE)." },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "Unit Trusts & Asset Managers", body: "Coronation, Allan Gray, Stanlib, Old Mutual – tiyatsengiswa ngemabhange laseSwatini." },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "EasyEquities", body: "Thenga emasheshi e-JSE, NYSE, NASDAQ nge fractional investing – app iyafumaneka eSwatini. easyequities.co.za" },
  { domain: "BUSINESS", category: "Imakethe yemali (Stock Exchange & Financial Platforms)", title: "FSRA", body: "Financial Services Regulatory Authority – ilawula tinsimbi temali eSwatini: kubhalisa, imitsetfo, ne-consumer protection. fsra.co.sz" },
  { domain: "BUSINESS", category: "Tincwadzi Telicense (Licenses & Permits)", title: "Trading License", body: "Tfola ku-City Council (Mbabane/Manzini) noma kuMasipala wakho." },
  { domain: "BUSINESS", category: "Tincwadzi Telicense (Licenses & Permits)", title: "Health & Safety Certificate", body: "Kudzingwa ngutindlu tekudla – Ministry of Health inspector." },
  { domain: "BUSINESS", category: "Tincwadzi Telicense (Licenses & Permits)", title: "Liquor License", body: "Faka i-application ku-Liquor Licensing Board – Mbabane." },
  { domain: "BUSINESS", category: "Tincwadzi Telicense (Licenses & Permits)", title: "Tourism License", body: "Bhalisa ne-Eswatini Tourism Authority kuma-lodges, tour operators." },
  { domain: "BUSINESS", category: "Tincwadzi Telicense (Licenses & Permits)", title: "Import / Export Permit", body: "Ministry of Commerce + ERS Customs; e-SADC trade certificate." },
  { domain: "BUSINESS", category: "Lipulani Lebhizinisi (Business Plan)", title: "Executive Summary", body: "Sifinyezo selibhizinisi, umkhicito, market, ne-financials." },
  { domain: "BUSINESS", category: "Lipulani Lebhizinisi (Business Plan)", title: "Market Research (Eswatini)", body: "Sebentisa Central Statistical Office (CSO) data, ERS reports." },
  { domain: "BUSINESS", category: "Lipulani Lebhizinisi (Business Plan)", title: "Financial Projections", body: "3–5 year cashflow, P&L, balance sheet – kudzingwa nguma-funders." },
  { domain: "BUSINESS", category: "Lipulani Lebhizinisi (Business Plan)", title: "SWOT Analysis", body: "Strengths, Weaknesses, Opportunities, Threats – kubuke libhizinisi lakho." },
  { domain: "BUSINESS", category: "Lipulani Lebhizinisi (Business Plan)", title: "Marketing Strategy", body: "Indlela yekutsengisa: digital (FB/IG/TikTok), radio (SBIS, VOC), word-of-mouth." },
  { domain: "BUSINESS", category: "Bantfu Bekusebenta (HR & Labour)", title: "Employment Act 1980", body: "Imitsetfo yebasebenti – contracts, leave, dismissals." },
  { domain: "BUSINESS", category: "Bantfu Bekusebenta (HR & Labour)", title: "Minimum Wage", body: "Ihluka ngemkhakha – funa i-Wages Council order yemkhakha wakho." },
  { domain: "BUSINESS", category: "Bantfu Bekusebenta (HR & Labour)", title: "Eswatini National Provident Fund (ENPF)", body: "Bhalisa basebenti, bhadala 10% (5% employer + 5% employee)." },
  { domain: "BUSINESS", category: "Bantfu Bekusebenta (HR & Labour)", title: "Workmen's Compensation", body: "Insurance yekulimala emsebentini – Ministry of Labour." },
  { domain: "BUSINESS", category: "Bantfu Bekusebenta (HR & Labour)", title: "CMAC", body: "Conciliation, Mediation & Arbitration Commission – lapho kuxazululwa khona tinkinga tebasebenti." },
  { domain: "BUSINESS", category: "E-commerce & Digital", title: "MoMo (MTN) / eMali (Eswatini Mobile)", body: "Mobile money payments – kuvulela emabhizinisi lamancane." },
  { domain: "BUSINESS", category: "E-commerce & Digital", title: "Payment Gateways", body: "Cellulant, DPO, Stripe (via SA); accept Visa/Mastercard online." },
  { domain: "BUSINESS", category: "E-commerce & Digital", title: "Domain & Hosting (.sz)", body: "Bhalisa i-.co.sz ku-SZNIC; hosting locally noma eSouth Africa." },
  { domain: "BUSINESS", category: "E-commerce & Digital", title: "Social Commerce", body: "Tsengisa nga-Facebook Marketplace, WhatsApp Business, Instagram Shop." },
  { domain: "BUSINESS", category: "Imikhakha Lebalulekile (Key Sectors)", title: "Agriculture (Sugar, Beef, Citrus)", body: "RES, Eswatini Sugar Association, SWADE projects – Lubombo & Hhohho." },
  { domain: "BUSINESS", category: "Imikhakha Lebalulekile (Key Sectors)", title: "Tourism & Hospitality", body: "Ezulwini Valley, Hlane, Mlilwane, Mkhaya – ETA support." },
  { domain: "BUSINESS", category: "Imikhakha Lebalulekile (Key Sectors)", title: "Manufacturing (Matsapha)", body: "Textiles, food processing – SEDCO factory shells, EIPA incentives." },
  { domain: "BUSINESS", category: "Imikhakha Lebalulekile (Key Sectors)", title: "ICT & Fintech", body: "Royal Science & Tech Park, Eswatini Communications Commission." },
  { domain: "BUSINESS", category: "Imikhakha Lebalulekile (Key Sectors)", title: "Mining (Coal, Quarry)", body: "Ministry of Natural Resources – mining permits & royalties." },
  { domain: "BUSINESS", category: "Business Resources", title: "Tinhlangano tekusita emabhizinisi", body: "Registrar of Companies (Mbabane), ERS (ers.org.sz), EIPA (investeswatini.org.sz), ESE (ese.co.sz), FSRA (fsra.co.sz), EasyEquities, SEDCO (sedco.co.sz), FINCORP (fincorp.co.sz), Royal Science & Tech Park (rstp.org.sz), Ministry of Commerce Industry & Trade, Central Bank of Eswatini (centralbank.org.sz), Business Eswatini / FSE&CC (business-eswatini.co.sz)." },
];

const STOP_WORDS = new Set([
  "ngicela","ngifuna","ngingatfola","kuphi","yini","njani","ngani","nini","ngiyabonga",
  "what","where","which","when","about","tell","please","need","want","help","with","from",
  "that","this","there","have","does","kanye","nge","kwe","ku","la","the","and","for","you",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOP_WORDS.has(w));
}

const DOMAIN_HINTS: Record<KBEntry["domain"], string[]> = {
  HEALTH: ["health","clinic","hospital","sick","umtsatsi","umphilo","tempilo","sibhedlela","doctor","dokotela","medicine","muti","hiv","tb","malaria","cancer","pregnan","mental","emergency","ambulance","gbv","pharmacy","umkhuhlane","kugula","kwelapha"],
  CULTURE: ["culture","masiko","umcimbi","incwala","umhlanga","lobola","kuteka","heritage","imvunulo","sintu","bukhosi","inkhosi","ndlovukati","tinganekwane","kudla","sibebe","ludzidzini","emasiko","siko"],
  BUSINESS: ["business","bhizinisi","company","inkampani","register","bhalisa","tax","intela","vat","paye","loan","sikweletu","imali","funding","stock","emasheshi","exchange","invest","license","layisensi","employ","msebenti","market","ers","sedco","fincorp","bank","libhange"],
};

/**
 * Picks the most relevant knowledge-base entries for a user question and
 * formats them as a grounding context block for the model.
 */
export function retrieveKnowledge(query: string, maxEntries = 14): string {
  const tokens = tokenize(query);
  if (tokens.length === 0) return "";
  const lower = query.toLowerCase();

  const domainBoost: Partial<Record<KBEntry["domain"], number>> = {};
  (Object.keys(DOMAIN_HINTS) as KBEntry["domain"][]).forEach((d) => {
    if (DOMAIN_HINTS[d].some((h) => lower.includes(h))) domainBoost[d] = 3;
  });

  const scored = KNOWLEDGE_BASE.map((entry) => {
    const haystack = `${entry.category} ${entry.title} ${entry.body}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (haystack.includes(t)) score += entry.title.toLowerCase().includes(t) ? 3 : 1;
    }
    if (score > 0) score += domainBoost[entry.domain] ?? 0;
    return { entry, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxEntries);

  if (scored.length === 0) return "";

  const lines = scored.map(
    ({ entry }) => `- [${entry.domain} • ${entry.category}] ${entry.title}: ${entry.body}`
  );

  return [
    "BAFO KNOWLEDGE BASE (verified local content from the app's Health, Culture and Business pages).",
    "Use these facts as the primary source when they answer the question. Do not contradict them, do not invent extra phone numbers, prices or facilities.",
    "Explain them in PURE SiSwati (keep proper names, place names, phone numbers and websites exactly as written).",
    "If they do not cover the question, say so honestly and answer generally.",
    "",
    ...lines,
  ].join("\n");
}
