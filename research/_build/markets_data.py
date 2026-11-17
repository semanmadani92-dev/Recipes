# ---------------- EUROPE ----------------
add("DE","276","Germany","EUR",1,1,{}, [
  ["disc","Aldi · Lidl · Penny · Netto","discount",1],["kaufland","Kaufland","hyper",1.08],["rewe","Rewe","super",1.3],
  ["edeka","Edeka","super",1.32],["ethnic","Turkish & Asian grocers","ethnic",1.05],WM(1.35),["bio","Denns · Alnatura","organic",1.85]],
  "high", EUN, "https://en.wikipedia.org/wiki/List_of_supermarket_chains_in_Germany")
add("AT","040","Austria","EUR",1,1.12,{"Meat":1.05,"Dairy & eggs":1.05}, [
  ["disc","Hofer · Lidl · Penny","discount",1],["spar","Spar","super",1.22],["billa","Billa","super",1.25],
  ["ethnic","Turkish & Asian grocers","ethnic",1.05],["bio","Denns","organic",1.8]], "high", EST, EUN)
add("CH","756","Switzerland","CHF",0.925,1.65,{"Meat":1.3,"Dairy & eggs":0.95}, [
  ["disc","Aldi Suisse · Lidl","discount",1],["denner","Denner","discount",1.05],["migros","Migros","super",1.22],
  ["coop","Coop","super",1.28],["bio","Coop Naturaplan · Migros Bio","organic",1.65]], "high", BI, EUN)
add("FR","250","France","EUR",1,1.06,{"Bakery":0.9,"Meat":1.08,"Dairy & eggs":0.95}, [
  ["disc","Lidl · Aldi","discount",1],["leclerc","E.Leclerc","hyper",1.02],["auchan","Auchan · Intermarché","hyper",1.07],
  ["carrefour","Carrefour","hyper",1.12],["monoprix","Monoprix","premium",1.35],["market","Weekly market","market",1.25],
  ["bio","Biocoop","organic",1.75]], "high", EST, EUN)
add("BE","056","Belgium","EUR",1,1.08,{}, [
  ["disc","Aldi · Lidl","discount",1],["colruyt","Colruyt","discount",1.04],["carrefour","Carrefour","hyper",1.15],
  ["delhaize","Delhaize","super",1.25],["bio","Bio-Planet","organic",1.7]], "high", EST)
add("NL","528","Netherlands","EUR",1,1.0,{"Dairy & eggs":0.9}, [
  ["disc","Aldi · Lidl","discount",1],["dirk","Dirk","discount",1.03],["jumbo","Jumbo","super",1.15],
  ["ah","Albert Heijn","super",1.2],["ethnic","Turkish & Asian grocers","ethnic",1.05],["bio","Ekoplaza","organic",1.75]], "high", EST)
add("LU","442","Luxembourg","EUR",1,1.12,{}, [
  ["disc","Aldi · Lidl","discount",1],["auchan","Auchan","hyper",1.08],["delhaize","Delhaize","super",1.2],
  ["cactus","Cactus","super",1.25]], "medium", EST)
add("ES","724","Spain","EUR",1,0.85,{"Fish":0.85,"Oils & vinegar":0.85,"Vegetables":0.85,"Fruit":0.85,"Meat":0.95}, [
  ["disc","Lidl · Aldi · Dia","discount",1],["mercadona","Mercadona","super",1.02],["carrefour","Carrefour","hyper",1.08],
  ["mercado","Fresh market","market",1.1],["eci","El Corte Inglés","premium",1.4]], "high", EUN, EST)
add("IT","380","Italy","EUR",1,0.99,{"Grains & pasta":0.8,"Oils & vinegar":0.85,"Vegetables":0.9,"Fruit":0.9}, [
  ["disc","Eurospin · Lidl","discount",1],["carrefour","Carrefour","hyper",1.15],["conad","Conad · Coop","super",1.18],
  ["esselunga","Esselunga","super",1.22],["mercato","Fresh market","market",1.15],["bio","NaturaSì","organic",1.75]], "high", EUN)
add("PT","620","Portugal","EUR",1,0.88,{"Fish":0.8,"Oils & vinegar":0.85}, [
  ["disc","Lidl · Aldi","discount",1],["pingodoce","Pingo Doce","super",1.07],["continente","Continente","hyper",1.1],
  ["eci","El Corte Inglés","premium",1.4]], "high", EST)
add("GR","300","Greece","EUR",1,0.98,{"Oils & vinegar":0.75,"Vegetables":0.85,"Fruit":0.85,"Dairy & eggs":1.1,"Fresh herbs":0.7}, [
  ["lidl","Lidl","discount",1],["mymarket","My Market","super",1.05],["sklavenitis","Sklavenitis","super",1.06],
  ["ab","AB Vassilopoulos","super",1.12],["laiki","Weekly market","market",0.95]], "medium", EST,
  "https://en.wikipedia.org/wiki/List_of_supermarket_chains_in_Greece")
add("CY","196","Cyprus","EUR",1,1.02,{"Vegetables":0.9,"Fruit":0.9,"Dairy & eggs":1.1}, [
  ["lidl","Lidl","discount",1],["alphamega","Alphamega","super",1.1],["sklavenitis","Sklavenitis","super",1.08],
  ["metro","Metro","super",1.1]], "medium", EST)
add("IE","372","Ireland","EUR",1,1.08,{}, [
  ["disc","Aldi · Lidl","discount",1],["tesco","Tesco · Dunnes","super",1.12],["supervalu","SuperValu","super",1.18]], "high", EST)
add("GB","826","United Kingdom","GBP",0.836,0.97,{"Dairy & eggs":0.95,"Spices":0.9}, [
  ["disc","Aldi · Lidl","discount",1],["asda","Asda","hyper",1.06],["tesco","Tesco","super",1.12],
  ["sainsburys","Sainsbury's · Morrisons","super",1.15],["ethnic","Asian & world food grocers","ethnic",1.04],
  ["premium","Waitrose · M&S","premium",1.45]], "high", BI, EUN)
add("SE","752","Sweden","SEK",11.05,1.05,{"Fish":0.9,"Meat":1.1}, [
  ["willys","Willys · Lidl","discount",1],["coop","Coop","super",1.15],["ica","ICA","super",1.2]], "high", BI, EST)
add("NO","578","Norway","NOK",10.61,1.38,{"Fish":0.85,"Meat":1.35,"Dairy & eggs":1.15,"Vegetables":1.2}, [
  ["disc","Rema 1000 · Kiwi · Extra","discount",1],["coop","Coop Mega · Obs","super",1.08],["meny","Meny","super",1.18]],
  "medium", BI, EST)
add("DK","208","Denmark","DKK",7.4755,1.14,{"Meat":1.05}, [
  ["disc","Netto · Lidl · 365discount","discount",1],["rema","Rema 1000","discount",1.02],["foetex","Føtex · Bilka","hyper",1.08],
  ["superbrugsen","SuperBrugsen · Meny","super",1.18],["irma","Irma","premium",1.35]], "high", BI, EST)
add("FI","246","Finland","EUR",1,1.08,{"Fish":0.9,"Meat":1.1}, [
  ["lidl","Lidl","discount",1],["prisma","Prisma · S-market","hyper",1.06],["kcitymarket","K-Citymarket","hyper",1.1],
  ["ksuper","K-Supermarket","super",1.18]], "high", EST)
add("IS","352","Iceland","ISK",145,1.45,{"Fish":0.8,"Vegetables":1.35,"Fruit":1.3,"Meat":1.15}, [
  ["bonus","Bónus","discount",1],["kronan","Krónan","discount",1.02],["hagkaup","Hagkaup","super",1.15],
  ["10-11","10-11","convenience",1.45]], "medium", EST)
add("EE","233","Estonia","EUR",1,1.0,"EEU", [
  ["lidl","Lidl","discount",1],["maxima","Maxima","super",1.03],["rimi","Rimi","super",1.06],
  ["prisma","Prisma","hyper",1.05],["selver","Selver","super",1.1]], "medium", EST)
add("LV","428","Latvia","EUR",1,0.95,"EEU", [
  ["lidl","Lidl","discount",1],["maxima","Maxima","super",1.03],["rimi","Rimi","super",1.06],["top","Top!","super",1.05]],
  "medium", EST)
add("LT","440","Lithuania","EUR",1,0.92,"EEU", [
  ["lidl","Lidl","discount",1],["maxima","Maxima","super",1.02],["iki","Iki","super",1.05],["rimi","Rimi","super",1.06],
  ["norfa","Norfa","discount",1.0]], "medium", EST)
add("PL","616","Poland","PLN",4.40,0.70,{"Vegetables":0.85,"Meat":0.9,"Fish":1.1,"Sauces":1.15}, [
  ["disc","Biedronka · Lidl · Aldi","discount",1],["kaufland","Kaufland · Auchan","hyper",1.05],["carrefour","Carrefour","hyper",1.12],
  ["zabka","Żabka","convenience",1.38]], "high", BI, EST)
add("CZ","203","Czechia","CZK",24.38,0.92,"EEU", [
  ["lidl","Lidl","discount",1],["penny","Penny","discount",1.02],["kaufland","Kaufland","hyper",1.03],
  ["albert","Albert","super",1.08],["tesco","Tesco","hyper",1.08],["billa","Billa","super",1.12]], "high", BI, EST)
add("SK","703","Slovakia","EUR",1,0.95,"EEU", [
  ["lidl","Lidl","discount",1],["kaufland","Kaufland","hyper",1.03],["tesco","Tesco","hyper",1.06],["billa","Billa","super",1.1],
  ["coop","COOP Jednota","super",1.12]], "medium", EST)
add("HU","348","Hungary","HUF",365.1,0.92,"EEU", [
  ["disc","Aldi · Lidl","discount",1],["penny","Penny","discount",1.02],["auchan","Auchan","hyper",1.05],
  ["tesco","Tesco","hyper",1.06],["spar","Spar","super",1.1],["coop","CBA · Coop","super",1.12]], "high", BI, EST)
add("SI","705","Slovenia","EUR",1,1.0,"EEU", [
  ["disc","Hofer · Lidl","discount",1],["mercator","Mercator","super",1.12],["spar","Spar","super",1.1],
  ["tus","Tuš","super",1.1]], "medium", EST)
add("HR","191","Croatia","EUR",1,0.97,{"Fish":0.95,"Vegetables":0.9,"Fruit":0.9}, [
  ["lidl","Lidl","discount",1],["kaufland","Kaufland","hyper",1.03],["plodine","Plodine","super",1.06],
  ["konzum","Konzum","super",1.1],["spar","Spar","super",1.08],["trznica","Fresh market","market",1.0]], "medium", EST)
add("RO","642","Romania","RON",5.345,0.66,{"Vegetables":0.85,"Fruit":0.9,"Fish":1.1,"Sauces":1.15}, [
  ["disc","Lidl · Penny","discount",1],["kaufland","Kaufland","hyper",1.02],["auchan","Auchan · Carrefour","hyper",1.06],
  ["profi","Profi","super",1.08],["mega","Mega Image","super",1.15],["piata","Fresh market","market",0.95]], "high", BI, EUN)
add("BG","100","Bulgaria","EUR",1,0.75,"EEU", [
  ["lidl","Lidl","discount",1],["kaufland","Kaufland","hyper",1.02],["billa","Billa","super",1.1],
  ["fantastico","Fantastico","super",1.12],["pazar","Fresh market","market",0.95]], "medium",
  "Bulgaria adopted the euro on 2026-01-01", EST)
add("RS","688","Serbia","RSD",117.2,0.66,"EEU", [
  ["lidl","Lidl","discount",1],["maxi","Maxi · Tempo","super",1.06],["univerexport","Univerexport","super",1.05],
  ["idea","Idea · Roda","super",1.08],["pijaca","Fresh market","market",0.92]], "medium", EUN, EST)
add("BA","070","Bosnia and Herzegovina","BAM",1.95583,0.64,"EEU", [
  ["bingo","Bingo","hyper",1],["konzum","Konzum","super",1.06],["amko","Amko","super",1.05],["pijaca","Fresh market","market",0.92]],
  "medium", FIX, EUN)
add("ME","499","Montenegro","EUR",1,0.82,"EEU", [
  ["voli","Voli","super",1],["idea","Idea","super",1.04],["hd","HDL","super",1.02],["pijaca","Fresh market","market",0.92]],
  "low", EST)
add("MK","807","North Macedonia","MKD",61.5,0.56,"EEU", [
  ["ramstore","Ramstore","hyper",1],["vero","Vero","super",1.03],["tinex","Tinex","super",1.05],["kam","KAM","super",1.0],
  ["pazar","Fresh market","market",0.9]], "medium", EUN, EST)
add("AL","008","Albania","ALL",97,0.72,{"Vegetables":0.8,"Fruit":0.8,"Fresh herbs":0.6,"Fish":1.0,"Sauces":1.2,"Cans & jars":1.15}, [
  ["spar","Spar","super",1.05],["conad","Conad","super",1.06],["big","Big Market","super",1],["pazar","Fresh market","market",0.88]],
  "low", EST)
add("MD","498","Moldova","MDL",19.6,0.52,"EEU", [
  ["linella","Linella","super",1],["nr1","Nr.1","super",1.04],["kaufland","Kaufland","hyper",1.0],["piata","Fresh market","market",0.88]],
  "medium", EUN, EST)
add("UA","804","Ukraine","UAH",48.5,0.52,{"Vegetables":0.8,"Meat":0.95,"Sauces":1.3,"Spices":1.2}, [
  ["atb","ATB","discount",1],["auchan","Auchan","hyper",1.05],["silpo","Silpo · Novus","super",1.15],["rynok","Fresh market","market",1]],
  "medium", EST)
add("BY","112","Belarus","BYN",3.5,0.5,{"Vegetables":0.8,"Dairy & eggs":0.85,"Fish":1.2,"Sauces":1.3,"Spices":1.2,"Fruit":1.05}, [
  ["euroopt","Euroopt","discount",1],["santa","Santa","super",1.05],["gippo","Gippo","hyper",1.02],["korona","Korona","hyper",1.08],
  ["rynok","Fresh market","market",0.95]], "low", EST)
add("RU","643","Russia","RUB",90,0.56,{"Vegetables":0.85,"Spices":1.2,"Sauces":1.25,"Cans & jars":1.15,"Fish":1.05}, [
  ["disc","Pyaterochka · Magnit","discount",1],["lenta","Lenta","hyper",1.04],["perekrestok","Perekrestok","super",1.12],
  ["vkusvill","VkusVill","super",1.18],["rynok","Fresh market","market",1.05],["azbuka","Azbuka Vkusa","premium",1.55]], "medium",
  "https://cbonds.pl/indexes/161347/ (EUR/RUB 89.66 on 2026-10-31)", EST)
add("TR","792","Turkey","TRY",55.7,0.6,{"Meat":1.45,"Dairy & eggs":1.05,"Spices":0.55,"Nuts & dried fruit":0.7,"Vegetables":0.75,"Fruit":0.75,"Fresh herbs":0.5,"Sauces":1.3,"Fish":1.1}, [
  ["disc","BİM · A101 · ŞOK","discount",1],["migros","Migros","super",1.15],["carrefour","CarrefourSA","super",1.15],
  ["pazar","Fresh market","market",1],["macro","Macrocenter","premium",1.45]], "high", BI, EST)

# ---------------- CAUCASUS / CENTRAL ASIA ----------------
add("GE","268","Georgia","GEL",3.02,0.6,"CAS", [
  ["agrohub","Agrohub","super",1.06],["carrefour","Carrefour","hyper",1.02],["spar","Spar","super",1.06],["nikora","Nikora","super",1],
  ["2nabiji","2 Nabiji","discount",0.97],["bazari","Fresh market","market",0.88]], "medium", EST)
add("AM","051","Armenia","AMD",432,0.62,"CAS", [
  ["sas","SAS","super",1.08],["yerevan_city","Yerevan City","super",1],["carrefour","Carrefour","hyper",1.02],
  ["shuka","Fresh market","market",0.88]], "medium", EST)
add("AZ","031","Azerbaijan","AZN",1.904,0.55,"CAS", [
  ["bazarstore","Bazarstore","super",1],["araz","Araz","super",1.0],["bravo","Bravo","hyper",1.03],["bazar","Fresh market","market",0.88]],
  "medium", FIX + " (AZN 1.70/USD)", EST)
add("KZ","398","Kazakhstan","KZT",585,0.55,"CAS", [
  ["magnum","Magnum","hyper",1],["small","Small","super",1.03],["galmart","Galmart","premium",1.25],["bazar","Fresh market","market",0.92]],
  "medium", EST)
add("UZ","860","Uzbekistan","UZS",13500,0.42,"CAS", [
  ["korzinka","Korzinka","super",1.05],["makro","Makro","super",1.0],["havas","Havas","discount",0.97],["bozor","Fresh market","market",0.85]],
  "low", EST)
add("KG","417","Kyrgyzstan","KGS",98,0.45,"CAS", [
  ["globus","Globus","super",1.04],["frunze","Frunze","super",1.05],["narodny","Narodny","super",1],["bazar","Fresh market","market",0.85]],
  "low", FIX + " (KGS ~87.5/USD)", EST)
add("TJ","762","Tajikistan","TJS",10.4,0.45,"CAS", [
  ["auchan","Auchan","hyper",1],["paikar","Paikar","super",1.02],["bozor","Fresh market","market",0.85]], "low", EST)
add("TM","795","Turkmenistan","TMT",3.92,0.6,"CAS", [
  ["bazar","Fresh market","market",0.9],["grocers","Local grocers","super",1],["yimpas","Yimpaş","super",1.15]],
  "low", "Official peg 3.5 TMT/USD; the street rate is several times higher", EST)
add("MN","496","Mongolia","MNT",4010,0.55,{"Meat":0.7,"Vegetables":1.05,"Fruit":1.2,"Fish":1.5,"Sauces":1.3,"Spices":1.3,"Cans & jars":1.3}, [
  ["nomin","Nomin","super",1],["emart","Emart","hyper",1.05],["sansar","Sansar","super",1.03],["cu","CU · GS25","convenience",1.3],
  ["zakh","Fresh market","market",0.88]], "low", EST)

# ---------------- MIDDLE EAST ----------------
add("SA","682","Saudi Arabia","SAR",4.20,0.82,"GULF", [
  ["othaim","Othaim","super",1],["lulu","Lulu · Panda","hyper",1.03],["carrefour","Carrefour","hyper",1.08],
  ["danube","Danube · Tamimi","premium",1.22]], "high", FIX + " (SAR 3.75/USD)", EST)
add("AE","784","United Arab Emirates","AED",4.113,0.98,"GULF", [
  ["unioncoop","Union Coop · Lulu","hyper",1],["carrefour","Carrefour","hyper",1.08],["spinneys","Spinneys · Waitrose","premium",1.42]],
  "high", FIX + " (AED 3.6725/USD)", EST)
add("QA","634","Qatar","QAR",4.077,1.0,"GULF", [
  ["lulu","Lulu","hyper",1],["almeera","Al Meera","super",1.04],["carrefour","Carrefour","hyper",1.06],["monoprix","Monoprix","premium",1.3]],
  "medium", FIX + " (QAR 3.64/USD)", EST)
add("KW","414","Kuwait","KWD",0.344,0.92,"GULF", [
  ["coop","Co-op societies","super",1],["lulu","Lulu","hyper",1.02],["carrefour","Carrefour","hyper",1.06],["sultan","Sultan Center","premium",1.25]],
  "medium", FIX + " (KWD ~0.307/USD)", EST)
add("OM","512","Oman","OMR",0.431,0.85,"GULF", [
  ["lulu","Lulu","hyper",1],["carrefour","Carrefour","hyper",1.05],["almeera","Al Meera","super",1.04],["sultan","Sultan Center","premium",1.2]],
  "medium", FIX + " (OMR 0.3845/USD)", EST)
add("JO","400","Jordan","JOD",0.794,0.72,"MENA", [
  ["carrefour","Carrefour","hyper",1.04],["safeway","Safeway","super",1.06],["cozmo","Cozmo","premium",1.15],
  ["civil","Civil Consumer Corporation","discount",0.95],["souq","Fresh market","market",0.88]], "medium", FIX + " (JOD 0.709/USD)", EST)
add("LB","422","Lebanon","LBP",100240,0.95,"MENA", [
  ["spinneys","Spinneys","super",1.1],["carrefour","Carrefour","hyper",1.05],["fahed","Fahed","super",1],
  ["souq","Fresh market","market",0.88]], "low", "Banque du Liban rate 89,500 LBP/USD; prices widely quoted in USD", EST)
add("SY","760","Syria","SYP",168,0.45,"MENA", [
  ["souq","Fresh market","market",0.9],["grocers","Local grocers","super",1],["sorouh","Al-Sorouh","super",1.1]], "low",
  "https://english.enabbaladi.net/archives/2026/11/dollar-tops-150-syrian-pounds-expert-explains-why/ (new Syrian pound ~150/USD parallel, 122.5 official, 2026-11-15)", EST)
add("IQ","368","Iraq","IQD",1467,0.62,"MENA", [
  ["carrefour","Carrefour","hyper",1.08],["family","Family Mall · Lulu","hyper",1.05],["souq","Fresh market","market",0.88],
  ["grocers","Local grocers","super",1]], "low", FIX + " (IQD 1,310/USD official)", EST)
add("IR","364","Iran","IRR",2300000,0.4,"MENA", [
  ["refah","Refah","super",1],["hyperstar","Hyperstar","hyper",1.02],["ofogh","Ofogh Kourosh","discount",0.97],
  ["shahrvand","Shahrvand","super",1.05],["bazaar","Fresh market","market",0.9]], "low",
  "https://intellinews.com/iran-s-rial-slides-past-2mn-per-dollar-on-open-market-463093 (open market ~2.03M IRR/USD, Aug 2026; very volatile)", EST)
add("IL","376","Israel","ILS",3.65,1.25,{"Vegetables":0.85,"Fruit":0.9,"Dairy & eggs":1.25,"Meat":1.3,"Fresh herbs":0.6,"Spices":0.7}, [
  ["rami","Rami Levy","discount",1],["osher","Osher Ad · Yochananof","discount",1.03],["shufersal","Shufersal","super",1.12],
  ["victory","Victory","super",1.06],["shuk","Fresh market","market",0.9]], "medium", EST)
add("YE","887","Yemen","YER",1810,0.55,"MENA", [
  ["souq","Fresh market","market",0.9],["grocers","Local grocers","super",1],["hayel","Hayel Saeed hypermarkets","hyper",1.05]], "low",
  "Split currency: Aden ~1,600 YER/USD, Sanaa ~535 YER/USD; Aden rate used", EST)

# ---------------- NORTH AFRICA ----------------
add("EG","818","Egypt","EGP",59.0,0.32,{"Bakery":0.5,"Vegetables":0.65,"Fruit":0.7,"Fresh herbs":0.4,"Spices":0.6,"Meat":1.4,"Dairy & eggs":1.2,"Cans & jars":1.3,"Sauces":1.4}, [
  ["kazyon","Kazyon","discount",1],["hyperone","Hyper One","hyper",1.02],["carrefour","Carrefour","hyper",1.1],
  ["souq","Fresh market","market",0.9],["seoudi","Seoudi · Gourmet","premium",1.25]], "medium",
  "https://exchangerate.guru/eur/egp/ (59.31 on 2026-11-14)", EST)
add("MA","504","Morocco","MAD",10.6,0.5,"MENA", [
  ["bim","BIM","discount",1],["marjane","Marjane","hyper",1.05],["carrefour","Carrefour","hyper",1.06],
  ["souk","Fresh market","market",0.85]], "medium", EST)
add("DZ","012","Algeria","DZD",151,0.48,"MENA", [
  ["uno","Uno","hyper",1],["ardis","Ardis","hyper",1.02],["souk","Fresh market","market",0.88],["grocers","Local grocers","super",1.02]],
  "low", "Official rate ~151 DZD/EUR; parallel market ~260", EST)
add("TN","788","Tunisia","TND",3.4,0.45,"MENA", [
  ["aziza","Aziza","discount",0.97],["monoprix","Monoprix","super",1.05],["carrefour","Carrefour","hyper",1],["geant","Géant","hyper",1.0],
  ["souk","Fresh market","market",0.85]], "medium", EST)
add("LY","434","Libya","LYD",6.1,0.45,"MENA", [
  ["souq","Fresh market","market",0.9],["grocers","Local grocers","super",1],["alwaha","Al Waha","super",1.08]], "low",
  "Official ~5.4 LYD/USD after 2025-26 devaluations; parallel higher", EST)
add("SD","729","Sudan","SDG",3000,0.5,{"Vegetables":0.8,"Spices":0.6,"Dairy & eggs":1.3,"Cans & jars":1.5,"Sauces":1.5,"Meat":0.9}, [
  ["souq","Fresh market","market",0.9],["grocers","Local grocers","super",1]], "low", "War economy; parallel ~2,700 SDG/USD, highly volatile", EST)

# ---------------- WEST & CENTRAL AFRICA ----------------
X = "XOF fixed at 655.957 per EUR"
Y = "XAF fixed at 655.957 per EUR"
add("NG","566","Nigeria","NGN",1499,0.42,{"Spices":0.6,"Vegetables":0.8,"Grains & pasta":1.05,"Dairy & eggs":1.5,"Cans & jars":1.4,"Sauces":1.4,"Meat":1.1,"Frozen":1.4}, [
  ["market","Fresh market","market",0.9],["justrite","Justrite","super",1],["shoprite","Shoprite","super",1.15],["spar","Spar","super",1.18]],
  "medium", "https://exchangerate.guru/eur/ngn/ (1,499 on 2026-11-15; CBN 1,496 on 2026-11-13)", EST)
add("GH","288","Ghana","GHS",12.9,0.55,"WAF", [
  ["market","Fresh market","market",0.9],["melcom","Melcom","super",1.05],["shoprite","Shoprite","super",1.1],["maxmart","MaxMart","premium",1.3],
  ["china_mall","China Mall","super",1.0]], "low", EST)
add("CI","384","Côte d'Ivoire","XOF",655.957,0.55,"WAF", [
  ["marche","Fresh market","market",0.9],["prosuma","Casino · Leader Price","super",1.05],["carrefour","Carrefour","hyper",1.1],
  ["cdci","CDCI","super",1.0]], "medium", X, EST)
add("SN","686","Senegal","XOF",655.957,0.6,"WAF", [
  ["marche","Fresh market","market",0.9],["auchan","Auchan","super",1.0],["carrefour","Carrefour","hyper",1.06],
  ["casino","Casino","super",1.1]], "medium", X, EST)
add("BJ","204","Benin","XOF",655.957,0.5,"WAF", [
  ["marche","Fresh market","market",0.88],["erevan","Erevan","super",1.05],["grocers","Local grocers","super",1]], "low", X, EST)
add("BF","854","Burkina Faso","XOF",655.957,0.48,"WAF", [
  ["marche","Fresh market","market",0.88],["marina","Marina Market","super",1.05],["grocers","Local grocers","super",1]], "low", X, EST)
add("ML","466","Mali","XOF",655.957,0.48,"WAF", [
  ["marche","Fresh market","market",0.88],["azar","Azar","super",1.06],["grocers","Local grocers","super",1]], "low", X, EST)
add("NE","562","Niger","XOF",655.957,0.48,"WAF", [
  ["marche","Fresh market","market",0.88],["grocers","Local grocers","super",1]], "low", X, EST)
add("TD","148","Chad","XAF",655.957,0.55,"WAF", [
  ["marche","Fresh market","market",0.88],["grocers","Local grocers","super",1]], "low", Y, EST)
add("CM","120","Cameroon","XAF",655.957,0.52,"WAF", [
  ["marche","Fresh market","market",0.88],["carrefour","Carrefour","hyper",1.08],["mahima","Mahima","super",1.0],
  ["casino","Casino","super",1.06]], "medium", Y, EST)
add("GA","266","Gabon","XAF",655.957,0.8,"WAF", [
  ["marche","Fresh market","market",0.9],["geant","Géant Casino","hyper",1.05],["prix_import","Prix Import","discount",1],
  ["mbolo","Mbolo","super",1.1]], "low", Y, EST)
add("GN","324","Guinea","GNF",9750,0.5,"WAF", [
  ["marche","Fresh market","market",0.88],["prima","Prima Center","super",1.05],["grocers","Local grocers","super",1]], "low", EST)
add("LR","430","Liberia","LRD",202,0.6,"WAF", [
  ["market","Fresh market","market",0.9],["abi_jaoudi","Abi Jaoudi","super",1.05],["grocers","Local grocers","super",1]], "low",
  "USD circulates widely (LRD ~180/USD)", EST)
add("SL","694","Sierra Leone","SLE",25.8,0.55,"WAF", [
  ["market","Fresh market","market",0.88],["grocers","Local grocers","super",1],["monoprix","Monoprix","super",1.12]], "low", EST)
add("CD","180","DR Congo","CDF",2460,0.7,"WAF", [
  ["marche","Fresh market","market",0.9],["kin_marche","Kin Marché","super",1.05],["shoprite","Shoprite","super",1.08],
  ["grocers","Local grocers","super",1]], "low", "USD used widely in shops", EST)
add("AO","024","Angola","AOA",1030,0.6,"WAF", [
  ["mercado","Fresh market","market",0.88],["kero","Kero","hyper",1.02],["shoprite","Shoprite","super",1.0],
  ["candando","Candando","super",1.1]], "low", EST)

# ---------------- EAST & SOUTHERN AFRICA ----------------
add("ET","231","Ethiopia","ETB",174,0.5,"EAF", [
  ["gebeya","Fresh market","market",0.88],["shoa","Shoa","super",1.05],["queens","Queens","super",1.08],["grocers","Local grocers","super",1]],
  "low", "ETB floated July 2024; ~155 ETB/USD late 2026 (estimate)", EST)
add("ER","232","Eritrea","ERN",16.8,0.6,"EAF", [["market","Fresh market","market",0.9],["grocers","Local grocers","super",1]], "low",
  "Official peg 15 ERN/USD", EST)
add("SO","706","Somalia","SOS",640,0.55,"EAF", [["market","Fresh market","market",0.9],["grocers","Local grocers","super",1],
  ["hayat","Hayat Market","super",1.05]], "low", "Prices usually in USD; SOS ~571/USD", EST)
add("KE","404","Kenya","KES",144.5,0.55,{"Vegetables":0.75,"Fruit":0.7,"Spices":0.65,"Dairy & eggs":1.2,"Cans & jars":1.35,"Sauces":1.35}, [
  ["naivas","Naivas · Quickmart","super",1],["carrefour","Carrefour","hyper",1.08],["market","Fresh market","market",0.88],
  ["chandarana","Chandarana","premium",1.25]], "medium", FIX + " (KES ~129/USD, stable)", EST)
add("UG","800","Uganda","UGX",3980,0.48,"EAF", [
  ["market","Fresh market","market",0.88],["carrefour","Carrefour","hyper",1.06],["capital","Capital Shoppers","super",1.0],
  ["quality","Quality Supermarket","super",1.03]], "medium", EST)
add("TZ","834","Tanzania","TZS",2750,0.5,"EAF", [
  ["soko","Fresh market","market",0.88],["shoppers","Shoppers","super",1.05],["village","Village Supermarket","premium",1.2],
  ["grocers","Local grocers","super",1]], "low", EST)
add("RW","646","Rwanda","RWF",1635,0.55,"EAF", [
  ["market","Fresh market","market",0.88],["simba","Simba","super",1.05],["sawa","Sawa City","super",1.02],["grocers","Local grocers","super",1]],
  "low", EST)
add("MG","450","Madagascar","MGA",5040,0.45,"EAF", [
  ["tsena","Fresh market","market",0.85],["shoprite","Shoprite","super",1.05],["leader","Leader Price","discount",1],["jumbo","Jumbo Score","hyper",1.1]],
  "low", EST)
add("MW","454","Malawi","MWK",1960,0.6,"EAF", [
  ["market","Fresh market","market",0.88],["shoprite","Shoprite","super",1.06],["chipiku","Chipiku","super",1],["sana","Sana","super",1.05]],
  "low", "Official 1,750 MWK/USD; parallel rate roughly double", EST)
add("MZ","508","Mozambique","MZN",71.6,0.6,"SAF", [
  ["mercado","Fresh market","market",0.88],["shoprite","Shoprite","super",1.0],["spar","Spar","super",1.08],["game","Game","hyper",1.02]],
  "low", FIX + " (MZN ~63.9/USD)", EST)
add("ZM","894","Zambia","ZMW",25.8,0.55,"SAF", [
  ["market","Fresh market","market",0.88],["shoprite","Shoprite","super",1.0],["pnp","Pick n Pay","super",1.06],["spar","Spar","super",1.08]],
  "low", EST)
add("ZW","716","Zimbabwe","USD",1.12,0.75,"SAF", [
  ["market","Fresh market","market",0.9],["ok","OK Zimbabwe","super",1.0],["tm","TM Pick n Pay","super",1.05],["spar","Spar","super",1.08]],
  "low", "Most shop prices are in USD; ZiG is the local currency", EST)
add("ZA","710","South Africa","ZAR",18.52,0.6,{"Meat":0.9,"Fruit":0.8,"Dairy & eggs":1.1}, [
  ["shoprite","Shoprite · Boxer","discount",1],["checkers","Checkers","super",1.08],["pnp","Pick n Pay · Spar","super",1.1],
  ["woolworths","Woolworths","premium",1.4]], "high", "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261112 (ZAR 18.5219)", EST)
add("NA","516","Namibia","NAD",18.52,0.62,"SAF", [
  ["shoprite","Shoprite","discount",1],["checkers","Checkers","super",1.06],["woermann","Woermann Brock","super",1.05],
  ["pnp","Pick n Pay","super",1.08],["spar","Spar","super",1.1]], "medium", "NAD pegged 1:1 to ZAR", EST)
add("BW","072","Botswana","BWP",15.0,0.65,"SAF", [
  ["choppies","Choppies","discount",1],["sefalana","Sefalana","super",1.02],["spar","Spar","super",1.08],["woolworths","Woolworths","premium",1.35]],
  "medium", EST)

# ---------------- SOUTH ASIA ----------------
add("IN","356","India","INR",104.25,0.34,{"Spices":0.5,"Fresh herbs":0.35,"Vegetables":0.8,"Grains & pasta":0.85,"Nuts & dried fruit":0.9,"Dairy & eggs":1.15,"Meat":1.3,"Fish":1.05,"Sauces":1.4,"Cans & jars":1.5,"Frozen":1.4,"Oils & vinegar":1.2,"Bakery":1.2}, [
  ["dmart","DMart","discount",1],["reliance","Reliance Fresh · Smart","super",1.05],["more","More · Spencer's","super",1.1],
  ["kirana","Kirana · sabzi mandi","market",0.95],["bigbasket","BigBasket","super",1.06],["natures","Nature's Basket","premium",1.5]],
  "high", BI, EST)
add("PK","586","Pakistan","PKR",319,0.32,{"Spices":0.5,"Fresh herbs":0.35,"Vegetables":0.8,"Meat":1.15,"Dairy & eggs":1.15,"Sauces":1.4,"Cans & jars":1.5,"Frozen":1.4}, [
  ["imtiaz","Imtiaz","super",1],["metro","Metro","bulk",0.98],["carrefour","Carrefour","hyper",1.08],["alfatah","Al-Fatah","super",1.1],
  ["bazaar","Fresh market","market",0.95]], "high", "https://www.fxleaders.com/currency-converter/euro-exchange-rates (PKR ~319)", EST)
add("BD","050","Bangladesh","BDT",142,0.4,{"Spices":0.55,"Fresh herbs":0.4,"Fish":0.7,"Vegetables":0.8,"Grains & pasta":0.85,"Dairy & eggs":1.2,"Sauces":1.4,"Cans & jars":1.5,"Frozen":1.4}, [
  ["shwapno","Shwapno","super",1],["meena","Meena Bazar · Agora","super",1.06],["unimart","Unimart","premium",1.2],
  ["kacha","Kacha bazar","market",0.95]], "high", "https://www.fxleaders.com/currency-converter/euro-exchange-rates (BDT ~142)", EST)
add("LK","144","Sri Lanka","LKR",336,0.45,"SAS", [
  ["keells","Keells","super",1.03],["cargills","Cargills Food City","super",1],["arpico","Arpico","hyper",1.02],
  ["glomark","Glomark","premium",1.12],["pola","Fresh market","market",0.88]], "medium", EST)
add("NP","524","Nepal","NPR",166.8,0.4,"SAS", [
  ["bhatbhateni","Bhat-Bhateni","super",1],["bigmart","Big Mart","super",1.02],["salesberry","Salesberry","super",1.04],
  ["tarkari","Fresh market","market",0.88]], "medium", "NPR pegged at 1.6 per INR", EST)
add("BT","064","Bhutan","BTN",104.25,0.5,"SAS", [["market","Fresh market","market",0.9],["grocers","Local grocers","super",1],
  ["7eleven","7-Eleven","convenience",1.2]], "low", "BTN pegged 1:1 to INR", EST)
add("AF","004","Afghanistan","AFN",74,0.4,"SAS", [["bazaar","Fresh market","market",0.9],["grocers","Local grocers","super",1],
  ["finest","Finest","super",1.15]], "low", "AFN ~66/USD (managed)", EST)

# ---------------- EAST ASIA ----------------
add("CN","156","China","CNY",7.38,0.6,{"Sauces":0.55,"Spices":0.6,"Vegetables":0.7,"Fish":0.75,"Grains & pasta":0.85,"Dairy & eggs":1.45,"Bakery":1.2,"Cans & jars":1.3,"Oils & vinegar":1.05}, [
  ["rtmart","RT-Mart · Yonghui","hyper",1],["walmart","Walmart · Sam's Club","hyper",1.03],["hema","Hema","super",1.15],
  ["wet","Fresh market","market",0.9],["ole","Ole'","premium",1.5]], "high",
  "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261113 (CNY 7.3738)", EST)
add("TW","158","Taiwan","TWD",34.2,0.95,{"Fish":0.8,"Sauces":0.65,"Fruit":1.1,"Dairy & eggs":1.35,"Vegetables":0.9,"Bakery":1.15}, [
  ["pxmart","PX Mart","super",1],["carrefour","Carrefour","hyper",1.02],["costco","Costco","bulk",0.93],["7eleven","7-Eleven · FamilyMart","convenience",1.3],
  ["market","Fresh market","market",0.88]], "medium", "https://udn.com/news/story/6811/9323613 (Numbeo grocery sub-index 64.6, 2026)", EST)
add("JP","392","Japan","JPY",177.5,0.95,{"Fish":0.7,"Sauces":0.65,"Grains & pasta":1.3,"Fruit":1.6,"Vegetables":1.15,"Dairy & eggs":1.3,"Meat":1.15,"Spices":1.2,"Oils & vinegar":1.1}, [
  ["gyomu","Gyomu Super","discount",1],["aeon","Aeon","hyper",1.08],["life","Life · Ito-Yokado","super",1.12],
  ["konbini","7-Eleven · Lawson","convenience",1.35],["seijo","Seijo Ishii","premium",1.4]], "high",
  "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261104 (JPY 178.30)", EST)
add("KR","410","South Korea","KRW",1487.6,1.3,{"Fruit":1.6,"Vegetables":1.2,"Meat":1.2,"Dairy & eggs":1.25,"Fish":0.85,"Sauces":0.65,"Spices":0.9}, [
  ["emart","Emart · Homeplus","hyper",1],["lotte","Lotte Mart","hyper",1.03],["costco","Costco","bulk",0.93],
  ["market","Fresh market","market",0.9],["cvs","GS25 · CU","convenience",1.35]], "high", BI, EST)
add("KP","408","North Korea","KPW",3300,0.6,{"Vegetables":0.8,"Dairy & eggs":1.5,"Meat":1.3,"Sauces":0.8}, [
  ["jangmadang","Fresh market","market",1]], "low",
  "No reliable market data; market rate assumed ~3,000 KPW/USD (official ~100). Treat as illustrative only.", EST)

# ---------------- SOUTHEAST ASIA ----------------
add("TH","764","Thailand","THB",37.47,0.62,"SEA", [
  ["makro","Makro","bulk",0.95],["lotus","Lotus's","hyper",1],["bigc","Big C","hyper",1.02],["tops","Tops","super",1.15],
  ["7eleven","7-Eleven","convenience",1.35],["market","Fresh market","market",0.9]], "high",
  "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261112 (THB 37.470)", EST)
add("VN","704","Vietnam","VND",30250,0.5,{"Fish":0.7,"Sauces":0.6,"Fresh herbs":0.35,"Spices":0.6,"Vegetables":0.75,"Grains & pasta":0.8,"Dairy & eggs":1.5,"Bakery":1.2,"Cans & jars":1.3}, [
  ["bhx","Bách Hóa Xanh","discount",1],["winmart","WinMart · Co.opmart","super",1.04],["cho","Fresh market","market",0.9],
  ["aeon","Aeon · Lotte Mart","hyper",1.12]], "high", "https://www.fxleaders.com/currency-converter/euro-exchange-rates (VND ~30,250)", EST)
add("ID","360","Indonesia","IDR",20700,0.5,{"Fish":0.7,"Sauces":0.6,"Spices":0.55,"Fresh herbs":0.4,"Vegetables":0.8,"Dairy & eggs":1.5,"Bakery":1.2,"Cans & jars":1.3,"Meat":1.1}, [
  ["hypermart","Hypermart · Transmart","hyper",1],["mini","Indomaret · Alfamart","convenience",1.06],["superindo","Superindo","super",1.08],
  ["pasar","Fresh market","market",0.88],["ranch","Ranch Market","premium",1.35]], "high",
  "https://www.fxleaders.com/currency-converter/euro-exchange-rates (IDR ~20,700)", EST)
add("PH","608","Philippines","PHP",70.3,0.62,"SEA", [
  ["sm","SM Supermarket · SM Hypermarket","hyper",1],["puregold","Puregold","discount",0.98],["robinsons","Robinsons Supermarket","super",1.04],
  ["landers","S&R · Landers","bulk",0.97],["palengke","Fresh market","market",0.88],["rustans","Rustan's","premium",1.3]], "medium",
  "https://www.fxleaders.com/currency-converter/euro-exchange-rates (PHP ~70.3)", EST)
add("MY","458","Malaysia","MYR",4.65,0.55,"SEA", [
  ["lotus","Lotus's","hyper",1],["mydin","Mydin","hyper",0.98],["aeon","Aeon","hyper",1.04],["giant","Giant","hyper",1.02],
  ["jaya","Jaya Grocer · Village Grocer","premium",1.25],["pasar","Fresh market","market",0.88]], "medium", EST)
add("SG","702","Singapore","SGD",1.45,1.15,{"Fish":0.9,"Sauces":0.65,"Fresh herbs":0.7,"Spices":0.7,"Dairy & eggs":1.3,"Fruit":1.1}, [
  ["sheng","Sheng Siong","discount",1],["ntuc","FairPrice","super",1.03],["giant","Giant","hyper",1.0],["coldstorage","Cold Storage","premium",1.25],
  ["wet","Fresh market","market",0.9]], "medium", EST)
add("BN","096","Brunei","BND",1.45,0.85,"SEA", [["hua_ho","Hua Ho","super",1],["supasave","SupaSave","super",1.0],
  ["tamu","Fresh market","market",0.9]], "low", "BND pegged 1:1 to SGD", EST)
add("MM","104","Myanmar","MMK",4900,0.5,"SEA", [["citymart","City Mart","super",1.08],["ocean","Ocean","hyper",1.05],
  ["capital","Capital Hypermarket","hyper",1],["zay","Fresh market","market",0.88]], "low",
  "Official 2,100 MMK/USD; market ~4,400 used", EST)
add("KH","116","Cambodia","KHR",4490,0.6,"SEA", [["aeon","Aeon","hyper",1.06],["chip_mong","Chip Mong","super",1.02],["lucky","Lucky Supermarket","super",1.05],
  ["psar","Fresh market","market",0.88]], "medium", "KHR ~4,010/USD (managed); USD used in shops", EST)
add("LA","418","Laos","LAK",24300,0.55,"SEA", [["market","Fresh market","market",0.88],["jmart","J-Mart","super",1.05],
  ["grocers","Local grocers","super",1]], "low", EST)
add("TL","626","Timor-Leste","USD",1.12,0.75,"SEA", [["market","Fresh market","market",0.9],["leader","Leader","super",1],["lita","Lita","super",1.05]],
  "low", "Uses USD", EST)

# ---------------- NORTH & CENTRAL AMERICA, CARIBBEAN ----------------
USD = "https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20261110 (USD 1.1214)"
add("US","840","United States","USD",1.12,1.2,{"Dairy & eggs":1.15,"Meat":1.05,"Bakery":1.15,"Fruit":1.05,"Frozen":0.9,"Sauces":0.95}, [
  ["aldi","Aldi","discount",1],["walmart","Walmart","hyper",1.03],["costco","Costco","bulk",0.92],["kroger","Kroger","super",1.12],
  ["target","Target","super",1.12],["traderjoes","Trader Joe's","super",1.1],["ethnic","Asian & Latino grocers","ethnic",1],
  ["safeway","Safeway","super",1.3],["wholefoods","Whole Foods","premium",1.55]], "high", USD, EST)
add("CA","124","Canada","CAD",1.584,1.22,{"Dairy & eggs":1.25,"Meat":1.1,"Fruit":1.1}, [
  ["nofrills","No Frills · FreshCo","discount",1],["walmart","Walmart","hyper",1.02],["costco","Costco","bulk",0.92],
  ["loblaws","Loblaws · Metro","super",1.2],["sobeys","Sobeys","super",1.22]], "high", BI, EST)
add("MX","484","Mexico","MXN",20.76,0.78,{"Vegetables":0.75,"Fruit":0.7,"Fresh herbs":0.45,"Spices":0.8,"Dairy & eggs":1.1,"Sauces":1.15,"Fish":1.1}, [
  ["bodega","Bodega Aurrera","discount",1],["walmart","Walmart","hyper",1.05],["soriana","Soriana · Chedraui","hyper",1.07],
  ["mercado","Mercado / tianguis","market",0.95],["lacomer","La Comer · City Market","premium",1.3]], "high", BI, EST)
add("GT","320","Guatemala","GTQ",8.6,0.7,"LAT", [["despensa","La Despensa de Don Juan","discount",1],["paiz","Paiz","super",1.05],
  ["walmart","Walmart","hyper",1.03],["mercado","Fresh market","market",0.88]], "medium", FIX + " (GTQ ~7.67/USD, stable)", EST)
add("HN","340","Honduras","HNL",29.5,0.72,"LAT", [["despensa","La Despensa de Don Juan","discount",1],["paiz","Paiz","super",1.05],
  ["colonia","La Colonia","super",1.04],["mercado","Fresh market","market",0.88]], "medium", EST)
add("SV","222","El Salvador","USD",1.12,0.75,"LAT", [["despensa","La Despensa de Don Juan","discount",1],["selectos","Súper Selectos","super",1.04],
  ["walmart","Walmart","hyper",1.03],["mercado","Fresh market","market",0.88]], "medium", "Uses USD", EST)
add("NI","558","Nicaragua","NIO",41,0.62,"LAT", [["pali","Palí","discount",1],["launion","La Colonia · La Unión","super",1.08],
  ["mercado","Fresh market","market",0.88]], "medium", FIX + " (NIO 36.62/USD peg)", EST)
add("CR","188","Costa Rica","CRC",560,1.0,"LAT", [["pali","Palí","discount",1],["walmart","Walmart","hyper",1.05],["masxmenos","Más x Menos","super",1.1],
  ["automercado","Automercado","premium",1.3],["feria","Weekly market","market",0.88]], "medium", EST)
add("PA","591","Panama","USD",1.12,0.9,"LAT", [["super99","Super 99","super",1.05],["rey","Rey · Romero","super",1.04],["xtra","Super Xtra","discount",1],
  ["riba","Riba Smith","premium",1.25]], "medium", "Uses USD (PAB at par)", EST)
add("BZ","084","Belize","BZD",2.24,0.85,"CAR", [["brodies","Brodie's","super",1.1],["publics","Publics","super",1.05],["market","Fresh market","market",0.9],
  ["grocers","Local grocers","super",1]], "low", "BZD pegged 2/USD", EST)
add("CU","192","Cuba","CUP",504,0.8,"CAR", [["agro","Fresh market","market",0.9],["mipymes","Local grocers","super",1],
  ["tiendas_mlc","Tiendas en divisas","super",1.15]], "low", "Informal rate ~450 CUP/USD; official much lower; severe shortages", EST)
add("DO","214","Dominican Republic","DOP",71.7,0.72,"CAR", [["sirena","La Sirena","hyper",1],["bravo","Supermercados Bravo","super",1.04],
  ["nacional","Supermercados Nacional","super",1.12],["colmado","Corner shop","convenience",1.1],["mercado","Fresh market","market",0.88]], "medium", EST)
add("HT","332","Haiti","HTG",147,0.8,"CAR", [["marche","Fresh market","market",0.9],["caribbean","Caribbean Supermarket","super",1.15],
  ["grocers","Local grocers","super",1]], "low", EST)
add("JM","388","Jamaica","JMD",179,0.95,"CAR", [["hilo","Hi-Lo","super",1.05],["megamart","MegaMart","super",1.06],["pricesmart","PriceSmart","bulk",0.95],
  ["grocers","Local grocers","super",1],["market","Fresh market","market",0.88]], "medium", EST)
add("PR","630","Puerto Rico","USD",1.12,1.25,{"Dairy & eggs":1.2,"Fruit":1.1,"Vegetables":1.1,"Meat":1.05}, [["econo","Econo","super",1.03],
  ["walmart","Walmart","hyper",1],["pueblo","Pueblo","super",1.08],["selectos","Selectos","super",1.06],["costco","Costco","bulk",0.94]],
  "medium", "Uses USD", EST)
add("TT","780","Trinidad and Tobago","TTD",7.6,0.95,"CAR", [["massy","Massy Stores","super",1.08],["pricesmart","PriceSmart","bulk",0.95],
  ["xtra","Xtra Foods","super",1.02],["jtas","JTA Supermarkets","super",1],["market","Fresh market","market",0.88]], "medium", EST)
add("BS","044","Bahamas","BSD",1.12,1.45,"CAR", [["superv","Super Value","super",1],["solomons","Solomon's","bulk",0.97],
  ["aid","AID","super",1.05]], "low", "BSD pegged 1:1 to USD", EST)

# ---------------- SOUTH AMERICA ----------------
add("BR","076","Brazil","BRL",6.18,0.6,{"Meat":0.8,"Fruit":0.65,"Vegetables":0.85,"Grains & pasta":0.9,"Dairy & eggs":1.1,"Cans & jars":1.2,"Fish":1.2,"Spices":1.1}, [
  ["atacadao","Atacadão · Assaí","bulk",1],["carrefour","Carrefour","hyper",1.12],["feira","Weekly market","market",1],
  ["paodeacucar","Pão de Açúcar","premium",1.35]], "high", BI, EST)
add("AR","032","Argentina","ARS",1710,0.85,{"Meat":0.6,"Fruit":0.8,"Fish":1.3,"Sauces":1.3,"Spices":1.2,"Dairy & eggs":1.05}, [
  ["dia","Día","discount",1],["coto","Coto","hyper",1.05],["carrefour","Carrefour","hyper",1.1],["jumbo","Jumbo","premium",1.22],
  ["chino","Corner shop","convenience",1.05]], "medium",
  "https://ca.investing.com/currencies/ars-eur (ARS/EUR 0.000585 on 2026-11-12 = ~1,709)", EST)
add("CO","170","Colombia","COP",4300,0.62,"LAT", [["d1","D1 · Ara","discount",1],["exito","Éxito","hyper",1.1],["olimpica","Olímpica","super",1.06],
  ["jumbo","Jumbo","hyper",1.1],["plaza","Fresh market","market",0.88],["carulla","Carulla","premium",1.3]], "medium", EST)
add("VE","862","Venezuela","VES",1009,0.9,"LAT", [["mercado","Fresh market","market",0.9],["central_madeirense","Central Madeirense","super",1.05],
  ["gama","Excelsior Gama","premium",1.15],["forum","Forum","super",1.0]], "low",
  "https://lapatilla.com/2026/11/12/el-dolar-bcv-sigue-sin-encontrar-techo-y-ya-amenaza-otra-barrera-historica/ (BCV: EUR 1,009.34 VES on 2026-11-13; prices often quoted in USD; high inflation)")
add("EC","218","Ecuador","USD",1.12,0.8,"LAT", [["tia","Tía","discount",1],["supermaxi","Supermaxi","super",1.12],["mi_comisariato","Mi Comisariato","super",1.05],
  ["aki","Akí","discount",0.98],["mercado","Fresh market","market",0.85]], "medium", "Uses USD", EST)
add("PE","604","Peru","PEN",3.8,0.62,"LAT", [["tottus","Tottus","hyper",1.02],["plazavea","Plaza Vea","hyper",1.03],["metro","Metro","super",1.0],
  ["wong","Wong","premium",1.2],["mercado","Fresh market","market",0.85],["mass","Mass","discount",0.98]], "medium", EST)
add("BO","068","Bolivia","BOB",11.2,0.6,"LAT", [["hipermaxi","Hipermaxi","super",1.05],["ketal","Ketal","super",1.08],["fidalga","Fidalga","super",1.04],
  ["mercado","Fresh market","market",0.85]], "low",
  "Currency under stress: official 6.96 BOB/USD, parallel ~10 BOB/USD (estimate); prices adjusted to parallel", EST)
add("CL","152","Chile","CLP",1040,0.85,"LAT", [["acuenta","aCuenta · Santa Isabel","discount",1],["lider","Lider","hyper",1.02],["unimarc","Unimarc","super",1.08],
  ["tottus","Tottus","hyper",1.03],["jumbo","Jumbo","premium",1.15],["feria","Weekly market","market",0.85]], "medium", EST)
add("PY","600","Paraguay","PYG",7950,0.6,"LAT", [["stock","Stock","super",1],["superseis","Superseis","super",1.06],["biggie","Biggie","discount",0.98],
  ["mercado","Fresh market","market",0.88]], "medium", EST)
add("UY","858","Uruguay","UYU",44.8,1.05,"LAT", [["tata","Tata","super",1],["disco","Disco · Devoto","super",1.12],["tiendainglesa","Tienda Inglesa","premium",1.2],
  ["feria","Weekly market","market",0.85]], "medium", EST)
add("GY","328","Guyana","GYD",234,0.85,"CAR", [["massy","Massy","super",1.08],["bounty","Bounty","super",1],["market","Fresh market","market",0.88]],
  "low", "GYD ~209/USD (managed)", EST)
add("SR","740","Suriname","SRD",42.6,0.75,"CAR", [["choi","Choi's","super",1.05],["tulip","Tulip","super",1.08],["market","Fresh market","market",0.88],
  ["grocers","Local grocers","super",1]], "low", EST)

# ---------------- OCEANIA ----------------
add("AU","036","Australia","AUD",1.622,1.15,{"Meat":0.95,"Fruit":1.15,"Fish":1.2,"Dairy & eggs":1.05}, [
  ["aldi","Aldi","discount",1],["coles","Coles · Woolworths","super",1.18],["iga","IGA","super",1.25],["harris","Harris Farm","premium",1.35]],
  "high", BI, EST)
add("NZ","554","New Zealand","NZD",1.95,1.18,{"Dairy & eggs":1.15,"Fruit":1.1}, [
  ["paknsave","Pak'nSave","discount",1],["woolworths","Woolworths","super",1.15],["newworld","New World","super",1.18]], "high", EST)
add("FJ","242","Fiji","FJD",2.52,0.85,"PAC", [["rb","RB Patel","super",1.03],["mh","MH","super",1.05],["newworld","New World","super",1.04],
  ["market","Fresh market","market",0.85]], "low", EST)
add("PG","598","Papua New Guinea","PGK",4.6,1.0,"PAC", [["rh","RH Hypermart","hyper",1],["stop_shop","Stop & Shop","super",1.1],
  ["market","Fresh market","market",0.85]], "low", EST)
add("VU","548","Vanuatu","VUV",134,1.3,"PAC", [["au_bon_marche","Au Bon Marché","super",1.05],["market","Fresh market","market",0.85],
  ["grocers","Local grocers","super",1]], "low", EST)
add("NC","540","New Caledonia","XPF",119.33,1.55,"PAC", [["leader","Leader Price","discount",1],["casino","Casino · Géant","hyper",1.08],
  ["carrefour","Carrefour","hyper",1.06],["marche","Fresh market","market",0.9]], "medium", "XPF fixed at 119.33 per EUR", EST)
