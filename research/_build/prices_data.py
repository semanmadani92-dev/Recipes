# ===== US =====
C("US","USD")
GF = "https://getfoodfacts.com/prices/ (BLS average price data, U.S. city average, Aug 2026)"
R("US","rice",1.11,LB,"g",None,"Rice, white, long grain, uncooked, per lb (BLS)",GF,"2026-08")
R("US","butter",4.02,LB,"g",None,"Butter, salted, grade AA, stick, per lb (BLS)",GF,"2026-08")
R("US","milk",4.23,GAL,"ml",None,"Milk, fresh, whole, per gallon (BLS)",GF,"2026-08")
R("US","potatoes",0.98,LB,"g",None,"Potatoes, white, per lb (BLS)",GF,"2026-08")
R("US","bananas",0.65,LB,"g",None,"Bananas, per lb (BLS)",GF,"2026-08",note="sold by weight; ~120 g per banana")
R("US","tomatoes",1.98,LB,"g",None,"Tomatoes, field grown, per lb (BLS)",GF,"2026-08")
R("US","sugar",1.02,LB,"g",None,"Sugar, white, per lb (BLS)",GF,"2026-08")
R("US","eggs",2.27,12,"pc",None,"Eggs, grade A, large, per dozen (BLS)",GF,"2026-08")
R("US","beef_mince",6.92,LB,"g",None,"Ground beef, 100% beef, per lb (BLS)",GF,"2026-08")
R("US","chicken_breast",4.17,LB,"g",None,"Chicken breast, boneless, per lb (BLS)",GF,"2026-08")
R("US","flour",0.549,LB,"g",None,"Flour, white, all purpose, per lb (BLS)","https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandwest_table.htm","2026-02")
R("US","rice",1.77,907,"g","walmart","Great Value Long Grain Enriched Rice, 32 oz","https://www.walmart.com/ip/10315357","2026-11 (undated listing)")

# ===== DE =====
C("DE","EUR")
R("DE","butter",1.15,250,"g","disc","Milsani Deutsche Markenbutter 250 g (Aldi; same price at Lidl)","https://ms-aktuell.de/welt/lidl-butterpreis-gesenkt-31-10-2026/","2026-10-31")

# ===== IN =====
C("IN","INR")
R("IN","onion",205,5000,"g","bigbasket","fresho Onion 5 kg (loose, offer price)","https://www.bigbasket.com/pc/potato-onion-tomato/","2026-11 (undated listing)")
R("IN","potatoes",87.67,1000,"g","bigbasket","fresho Potato Ooty 1 kg (offer price)","https://www.bigbasket.com/pc/potato-onion-tomato/","2026-11 (undated listing)")

# ===== NG =====
C("NG","NGN")
BS = "https://www.bearsavings.com/cost-of-living/nigeria/ (July 2026 update, USD, converted at 1,338 NGN/USD)"
R("NG","milk",2.78*1338,1000,"ml",None,"Milk 1 L (average, converted from USD 2.78)",BS,"2026-07")
R("NG","rice",2.36*1338,1000,"g",None,"White rice 1 kg (average, converted from USD 2.36)",BS,"2026-07")
R("NG","eggs",1.89*1338,12,"pc",None,"Eggs 12 (average, converted from USD 1.89)",BS,"2026-07")
R("NG","chicken_breast",4.33*1338,1000,"g",None,"Chicken breast 1 kg (average, converted from USD 4.33)",BS,"2026-07")
R("NG","tomatoes",1.99*1338,1000,"g",None,"Tomatoes 1 kg (average, converted from USD 1.99)",BS,"2026-07")
EA = "https://expatarrivals.com/nigeria/cost-of-living-in-nigeria"
R("NG","eggs",2800,12,"pc",None,"Eggs, dozen (Lagos average, expat guide)",EA,"2026-09")
R("NG","milk",3500,1000,"ml",None,"Milk 1 litre (Lagos average, expat guide)",EA,"2026-09")
R("NG","rice",2000,1000,"g",None,"Rice 1 kg (Lagos average, expat guide)",EA,"2026-09")
R("NG","chicken_breast",5500,1000,"g",None,"Chicken breasts 1 kg (Lagos average, expat guide)",EA,"2026-09")

# ===== BearSavings (Numbeo-style national averages, USD, converted at Nov 2026 rate) =====
def BEAR(cc, cur, usdrate, url, date, items):
    C(cc, cur)
    labels = {"milk":("Milk 1 L",1000,"ml"),"rice":("White rice 1 kg",1000,"g"),"eggs":("Eggs, 12",12,"pc"),
      "cheddar":("Local cheese 1 kg",1000,"g"),"chicken_breast":("Chicken breast 1 kg",1000,"g"),
      "apples":("Apples 1 kg",1000,"g"),"bananas":("Bananas 1 kg",1000,"g"),"tomatoes":("Tomatoes 1 kg",1000,"g"),
      "potatoes":("Potatoes 1 kg",1000,"g"),"onion":("Onions 1 kg",1000,"g"),"white_loaf":("Fresh white bread 500 g",1,"pc"),
      "lettuce":("Lettuce, 1 head",1,"pc"),"oranges":("Oranges 1 kg",1000,"g")}
    for k, usd in items.items():
        n, q, u = labels[k]
        note = {"cheddar":"local everyday cheese, not cheddar","bananas":"sold by weight; ~120 g per banana","white_loaf":"500 g loaf"}.get(k)
        R(cc, k, usd*usdrate, q, u, None, n+" (avg, USD %.2f converted at %.4g/USD)" % (usd, usdrate), url, date, note=note)

BEAR("IN","INR",93.08,"https://www.bearsavings.com/cost-of-living/india/","2026-07",
  {"milk":0.71,"rice":0.72,"eggs":0.98,"chicken_breast":3.17,"apples":2.17,"bananas":0.74,"tomatoes":0.56})
BEAR("JP","JPY",158.5,"https://www.bearsavings.com/cost-of-living/japan/","2026-07",
  {"milk":1.56,"white_loaf":1.59,"rice":4.51,"eggs":2.24,"cheddar":12.14,"chicken_breast":6.92,"apples":5.37,"bananas":2.62,
   "tomatoes":4.84,"potatoes":2.85,"onion":2.65})
BEAR("BR","BRL",5.518,"https://www.bearsavings.com/cost-of-living/brazil/","2026-07",{"milk":0.96,"rice":1.17,"eggs":2.02,"chicken_breast":3.64})
BEAR("MX","MXN",18.54,"https://www.bearsavings.com/cost-of-living/mexico/","2026-07",{"milk":1.47,"rice":1.71,"eggs":2.38,"chicken_breast":7.53,"tomatoes":1.79})
BEAR("CN","CNY",6.59,"https://www.bearsavings.com/cost-of-living/china/","2026-07",{"milk":1.81,"rice":0.94,"eggs":1.60,"chicken_breast":3.29})
BEAR("PK","PKR",284.8,"https://www.bearsavings.com/cost-of-living/pakistan/","2026-07",{"milk":0.79,"rice":1.19,"eggs":1.18,"chicken_breast":2.91,"tomatoes":0.52})
EXM = "https://www.expatarrivals.com/node/1282 (Mexico City list, June 2026)"
R("MX","milk",35,1000,"ml",None,"Milk 1 L (Mexico City)",EXM,"2026-06")
R("MX","rice",35,1000,"g",None,"Rice 1 kg (Mexico City)",EXM,"2026-06")
R("MX","eggs",55,12,"pc",None,"Eggs, dozen (Mexico City)",EXM,"2026-06")
R("MX","chicken_breast",170,1000,"g",None,"Chicken 1 kg (Mexico City)",EXM,"2026-06")
NS = "https://www.nsave.com/pakistan/cost-of-living (June 2026)"
R("PK","milk",241,1000,"ml",None,"Milk 1 L",NS,"2026-06")
R("PK","rice",333,1000,"g",None,"Rice 1 kg",NS,"2026-06")
R("PK","eggs",331,12,"pc",None,"Eggs, 12",NS,"2026-06")
R("PK","chicken_breast",786,1000,"g",None,"Chicken fillets 1 kg",NS,"2026-06")
R("PK","tomatoes",143,1000,"g",None,"Tomatoes 1 kg",NS,"2026-06")
PB = "https://www.policybazaar.com/investment-plans/cost-of-living/india/ (2026 update)"
for id_,p,q,u,n in [("rice",61,1000,"g","Rice 1 kg"),("chicken_breast",268,1000,"g","Chicken 1 kg"),("eggs",85,12,"pc","Eggs, dozen"),
    ("tomatoes",47,1000,"g","Tomatoes 1 kg"),("potatoes",34,1000,"g","Potatoes 1 kg"),("milk",61,1000,"ml","Milk 1 L")]:
    R("IN",id_,p,q,u,None,n,PB,"2026")
BT = "https://www.businesstoday.in/latest/trends/story/indias-cost-of-living-2026-with-rs-27k-monthly-base-rent-for-singles-mumbai-burns-your-wallet-kolkata-lets-you-breathe-521293-2026-03-19"
R("IN","milk",61,1000,"ml",None,"Milk 1 L",BT,"2026-03")
R("IN","rice",56,1000,"g",None,"Rice 1 kg",BT,"2026-03")
R("IN","white_loaf",39,1,"pc",None,"Bread 500 g",BT,"2026-03",note="500 g loaf")
R("IN","milk",72,1000,"ml",None,"Amul / Mother Dairy full-cream milk 1 L (MRP after 14 May 2026 hike)","https://www.sahi.com/blogs/india-inflation-milk-price-hike-2026","2026-05",kind="list")
CC_ = "https://citycost.org/india/ (updated 2026-07-12)"
R("IN","milk",70,1000,"ml",None,"Milk 1 L",CC_,"2026-07")
R("IN","rice",70,1000,"g",None,"White rice 1 kg",CC_,"2026-07")
R("IN","eggs",91,12,"pc",None,"Eggs, dozen",CC_,"2026-07")
R("IN","chicken_breast",299,1000,"g",None,"Chicken fillets 1 kg",CC_,"2026-07")

C("EG","EGP")
NB = "https://www.numbeo.com/cost-of-living/in/New-Cairo-Egypt"
R("EG","milk",49.33,1000,"ml",None,"Milk (regular) 1 L, New Cairo",NB,"2026")
R("EG","rice",17,LB,"g",None,"White rice 1 lb, New Cairo",NB,"2026")
R("EG","eggs",77.28,12,"pc",None,"Eggs, 12 large, New Cairo",NB,"2026")
R("EG","tomatoes",9,LB,"g",None,"Tomatoes 1 lb, New Cairo",NB,"2026")
R("EG","potatoes",10,LB,"g",None,"Potatoes 1 lb, New Cairo",NB,"2026")
R("EG","onion",13,LB,"g",None,"Onions 1 lb, New Cairo",NB,"2026")
EXE = "https://k2.expatarrivals.com/node/1280"
R("EG","eggs",70,12,"pc",None,"Eggs, dozen",EXE,"undated")
R("EG","milk",50,1000,"ml",None,"Milk 1 L",EXE,"undated")
R("EG","rice",40,1000,"g",None,"Rice 1 kg",EXE,"undated")
R("EG","chicken_breast",250,1000,"g",None,"Chicken breasts 1 kg",EXE,"undated")
MLE = "https://www.mylifeelsewhere.com:443/cost-of-living/egypt"
R("EG","eggs",69.78,12,"pc",None,"Eggs, dozen",MLE,"undated")
R("EG","chicken_breast",90.55,LB,"g",None,"Boneless chicken breast 1 lb",MLE,"undated")
R("EG","onion",13.71,LB,"g",None,"Onions 1 lb",MLE,"undated")

C("BD","BDT")
NSB = "https://www.nsave.com/bangladesh/cost-of-living (Numbeo averages, March 2026)"
for id_,p,q,u,n in [("milk",90.51,1000,"ml","Milk 1 L"),("rice",73.56,1000,"g","White rice 1 kg"),("eggs",142.28,12,"pc","Eggs, 12 large"),
    ("chicken_breast",319.31,1000,"g","Chicken fillets 1 kg"),("tomatoes",69.80,1000,"g","Tomatoes 1 kg"),("potatoes",39.50,1000,"g","Potatoes 1 kg"),
    ("onion",66.77,1000,"g","Onions 1 kg")]:
    R("BD",id_,p,q,u,None,n,NSB,"2026-03")
IT_ = "https://en.ittefaq.com.bd/17982/high-food-prices-keep-rising (Dhaka markets)"
R("BD","eggs",150,12,"pc","kacha","Eggs, dozen (Dhaka kitchen market)",IT_,"2026-09")
R("BD","onion",52.5,1000,"g","kacha","Onions 1 kg (Tk 50-55)",IT_,"2026-09")
R("BD","potatoes",27.5,1000,"g","kacha","Potatoes 1 kg (Tk 25-30)",IT_,"2026-09")
NAI = "https://nm-stag.nairametrics.com/abuja-families-spend-n300000-monthly-to-maintain-healthy-diet-in-may/ (Abuja markets, May 2026)"
R("NG","eggs",7250,30,"pc","market","Eggs, crate of 30 (N6,000-8,500)",NAI,"2026-05")
R("NG","rice",60000,50000,"g","market","Imported rice, 50 kg bag (N55,000-65,000)",NAI,"2026-05")
R("NG","rice",50000,50000,"g","market","Local rice, 50 kg bag (N45,000-55,000)",NAI,"2026-05")
R("NG","chicken_breast",6000,1000,"g","market","Chicken 1 kg (N5,500-6,500 by area)","https://guardian.ng/?p=2855335","2026 (undated)",note="whole chicken pieces, not fillet")

C("PH","PHP")
CCP = "https://citycost.org/philippines/ (last update Oct 2026)"
R("PH","milk",110,1000,"ml",None,"Milk 1 L (Manila)",CCP,"2026-10")
R("PH","rice",58.30,1000,"g",None,"White rice 1 kg",CCP,"2026-10")
WC = "https://wagecentre.com/immigration/life/prices-in-the-philippines"
R("PH","rice",56.19,1000,"g",None,"White rice 1 kg",WC,"2026")
R("PH","eggs",120,12,"pc",None,"Eggs, 12",WC,"2026")
R("PH","chicken_breast",255,1000,"g",None,"Chicken fillets 1 kg",WC,"2026")
NBD = "https://www.numbeo.com/cost-of-living/in/Dumaguete"
R("PH","milk",102.50,1000,"ml",None,"Milk 1 L (Dumaguete)",NBD,"2026")
R("PH","eggs",112,12,"pc",None,"Eggs, 12 (Dumaguete)",NBD,"2026")
TZP = "https://trek.zone/en/philippines/prices"
R("PH","chicken_breast",280,1000,"g",None,"Chicken fillets 1 kg",TZP,"undated")
R("PH","tomatoes",132,1000,"g",None,"Tomatoes 1 kg",TZP,"undated")

C("ID","IDR")
CCI = "https://citycost.org/indonesia/ (Oct 2026; USD converted at its 18,000 IDR/USD)"
R("ID","milk",1.23*18000,1000,"ml",None,"Milk 1 L (avg, USD 1.23)",CCI,"2026-10")
R("ID","rice",0.87*18000,1000,"g",None,"White rice 1 kg (avg, USD 0.87)",CCI,"2026-10")
R("ID","eggs",1.48*18000,12,"pc",None,"Eggs, 12 (avg, USD 1.48)",CCI,"2026-10")
BEAR("ID","IDR",18480,"https://www.bearsavings.com/cost-of-living/indonesia/","2026-07",{"milk":1.28,"rice":0.91,"eggs":1.60,"chicken_breast":3.29,"tomatoes":1.29})

C("VN","VND")
EXH = "https://expatarrivals.com/asia-pacific/vietnam/hanoi/cost-living-hanoi (Hanoi averages, June 2026)"
R("VN","eggs",38000,12,"pc",None,"Eggs, dozen (Hanoi)",EXH,"2026-06")
R("VN","milk",38000,1000,"ml",None,"Milk 1 L (Hanoi)",EXH,"2026-06")
R("VN","rice",22000,1000,"g",None,"Rice 1 kg (Hanoi)",EXH,"2026-06")
R("VN","chicken_breast",100000,1000,"g",None,"Chicken breasts 1 kg (Hanoi)",EXH,"2026-06")
VS = "https://vietnamspot.ru/en/blog/ho-chi-minh-prices (HCMC, April 2026; midpoint of range)"
R("VN","milk",42500,1000,"ml",None,"Milk 1 L (33,000-52,000)",VS,"2026-04")
R("VN","rice",27500,1000,"g",None,"Rice 1 kg (20,000-35,000)",VS,"2026-04")
R("VN","eggs",39000,12,"pc",None,"Eggs, 12 (30,000-48,000)",VS,"2026-04")
R("VN","chicken_breast",80000,1000,"g",None,"Chicken breast 1 kg (50,000-110,000)",VS,"2026-04")
VS2 = "https://vietnamspot.ru/en/blog/vietnam-prices (Big C / WinMart / Co.opmart, 2026; midpoint of range)"
R("VN","milk",34000,1000,"ml","winmart","Milk 1 L (30,000-38,000)",VS2,"2026")
R("VN","rice",22500,1000,"g","winmart","Rice 1 kg (15,000-30,000)",VS2,"2026")
R("VN","eggs",26000,10,"pc","winmart","Eggs, 10 (22,000-30,000)",VS2,"2026")

C("KE","KES")
TZK = "https://trek.zone/en/kenya/prices"
for id_,p,q,u,n in [("rice",198,1000,"g","White rice 1 kg"),("milk",116,1000,"ml","Milk 1 L"),("chicken_breast",869,1000,"g","Chicken fillet 1 kg"),
    ("eggs",216,12,"pc","Eggs, 12"),("tomatoes",133,1000,"g","Tomatoes 1 kg"),("onion",143,1000,"g","Onions 1 kg")]:
    R("KE",id_,p,q,u,None,n,TZK,"undated")
R("KE","potatoes",113.46,1000,"g",None,"Potatoes 1 kg, national average retail price (KNBS)","https://www.kenyans.co.ke/news/125773-july-inflation-hits-65-electricity-transport-and-food-costs-rise","2026-07")

C("GB","GBP")
MG = "https://www.mylifeelsewhere.com/cost-of-living/united-kingdom (average of 191 UK cities)"
for id_,p,q,u,n in [("potatoes",0.53,LB,"g","Potatoes 1 lb"),("onion",0.53,LB,"g","Onions 1 lb"),("apples",0.98,LB,"g","Apples 1 lb"),
    ("bananas",0.54,LB,"g","Bananas 1 lb"),("tomatoes",1.11,LB,"g","Tomatoes 1 lb"),("eggs",2.87,12,"pc","Eggs, dozen"),
    ("chicken_breast",2.87,LB,"g","Boneless chicken breast 1 lb"),("milk",4.59,GAL,"ml","Milk 1 gallon"),("cheddar",3.49,8*OZ,"g","Local cheese 8 oz")]:
    R("GB",id_,p,q,u,None,n,MG,"undated")
R("GB","chicken_breast",5.45,1000,"g",None,"Chicken breast fillets 1 kg","https://uk.finance.yahoo.com/news/bread-milk-iphones-retail-prices-rising-uk-050011594.html","undated")
R("GB","potatoes",1.76,2500,"g","disc","Aldi bag of potatoes 2.5 kg","https://www.aldipresscentre.co.uk/?p=2016","undated")

C("TR","TRY")
CCT = "https://citycost.org/turkey/ (last update 2026-09-06)"
R("TR","milk",49.54,1000,"ml",None,"Milk 1 L",CCT,"2026-09")
R("TR","rice",108,1000,"g",None,"White rice 1 kg",CCT,"2026-09")
EXI = "https://expatarrivals.com/europe/turkey/istanbul/cost-living-istanbul (Istanbul, Nov 2025)"
R("TR","eggs",90,12,"pc",None,"Eggs, dozen (Istanbul)",EXI,"2025-11",note="a year old; Turkish food inflation ~30%/yr")
R("TR","milk",45,1000,"ml",None,"Milk 1 L (Istanbul)",EXI,"2025-11",note="a year old")
R("TR","rice",85,1000,"g",None,"Rice 1 kg (Istanbul)",EXI,"2025-11",note="a year old")
R("TR","chicken_breast",240,1000,"g",None,"Chicken breasts 1 kg (Istanbul)",EXI,"2025-11",note="a year old")
R("TR","cheddar",220,500,"g",None,"Cheese 500 g (Istanbul; beyaz peynir/kaşar)",EXI,"2025-11",note="local cheese; a year old")

C("FR","EUR")
MF = "https://mylifeelsewhere.com/cost-of-living/france (national average)"
R("FR","chicken_breast",5.54,LB,"g",None,"Chicken breast 1 lb",MF,"undated")
R("FR","tomatoes",1.40,LB,"g",None,"Tomatoes 1 lb",MF,"undated")
R("FR","potatoes",0.86,LB,"g",None,"Potatoes 1 lb",MF,"undated")
R("FR","onion",0.92,LB,"g",None,"Onions 1 lb",MF,"undated")
BEAR("FR","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/france/","2026-07",{"rice":2.59,"chicken_breast":13.86})

C("TH","THB")
EXB = "https://www.expatica.com/th/cost-of-living/bangkok/ (Bangkok averages)"
for id_,p,q,u,n in [("milk",63.18,1000,"ml","Milk 1 L"),("eggs",88.05,12,"pc","Eggs, 12 large"),("chicken_breast",109,1000,"g","Chicken fillets 1 kg"),
    ("rice",47.38,1000,"g","White rice 1 kg"),("tomatoes",70.91,1000,"g","Tomatoes 1 kg"),("potatoes",55.11,1000,"g","Potatoes 1 kg"),("onion",49.06,1000,"g","Onions 1 kg")]:
    R("TH",id_,p,q,u,None,n,EXB,"undated")

EXD = "https://www.expatica.com/de/moving/about/cost-of-living-in-germany-1085100/ (2026; midpoint of typical range)"
for id_,lo,hi,q,u,n in [("apples",1.8,3.0,1000,"g","Apples 1 kg"),("potatoes",0.75,2.4,1000,"g","Potatoes 1 kg"),("milk",1.0,1.5,1000,"ml","Milk 1 L"),
    ("cheddar",9,23,1000,"g","Cheese 1 kg (local, e.g. Gouda)"),("rice",1.7,4.6,1000,"g","Rice 1 kg"),("eggs",2.4,4.2,12,"pc","Eggs, 12 large"),("tomatoes",1.9,5.0,1000,"g","Tomatoes 1 kg")]:
    R("DE",id_,(lo+hi)/2,q,u,None,n+" (range %.2f-%.2f)"%(lo,hi),EXD,"2026")

C("ES","EUR")
EXS = "https://www.expatica.com/es/about/basics/cost-of-living-1159118/ (Numbeo 2026-01-14; midpoint of range)"
for id_,lo,hi,q,u,n in [("milk",0.85,1.35,1000,"ml","Milk 1 L"),("eggs",1.8,4.0,12,"pc","Eggs, dozen"),("rice",1.0,2.2,1000,"g","Rice 1 kg"),
    ("tomatoes",1.3,3.0,1000,"g","Tomatoes 1 kg"),("potatoes",0.8,2.2,1000,"g","Potatoes 1 kg"),("apples",1.2,3.0,1000,"g","Apples 1 kg"),
    ("cheddar",7,24,1000,"g","Cheese 1 kg (local)"),("chicken_breast",4,10,1000,"g","Chicken 1 kg")]:
    R("ES",id_,(lo+hi)/2,q,u,None,n+" (range %.2f-%.2f)"%(lo,hi),EXS,"2026-01")

C("IT","EUR")
FGI = "https://www.foyerglobalhealth.com/?p=24302 (Italy averages)"
for id_,p,q,u,n in [("eggs",3.38,12,"pc","Eggs, 12"),("chicken_breast",10.50,1000,"g","Chicken fillets 1 kg"),("tomatoes",2.80,1000,"g","Tomatoes 1 kg"),
    ("onion",1.55,1000,"g","Onions 1 kg"),("potatoes",1.60,1000,"g","Potatoes 1 kg"),("apples",2.0,1000,"g","Apples 1 kg"),("milk",1.45,1000,"ml","Milk 1 L")]:
    R("IT",id_,p,q,u,None,n,FGI,"undated")

C("ZA","ZAR")
EXJ = "https://www.expatica.com/za/cost-of-living/johannesburg/ (Numbeo snapshot 2026-06-01)"
R("ZA","milk",21.31,1000,"ml",None,"Milk 1 L (Johannesburg)",EXJ,"2026-06")
R("ZA","eggs",38.20,12,"pc",None,"Eggs, 12 large (Johannesburg)",EXJ,"2026-06")
R("ZA","chicken_breast",90.83,1000,"g",None,"Chicken fillets 1 kg (Johannesburg)",EXJ,"2026-06")
EXP = "https://www.expatica.com/za/cost-of-living/pretoria/"
R("ZA","milk",20.49,1000,"ml",None,"Milk 1 L (Pretoria)",EXP,"2026")
R("ZA","eggs",40.00,12,"pc",None,"Eggs, 12 large (Pretoria)",EXP,"2026")
EXC = "https://www.expatica.com/za/cost-of-living/cape-town/"
R("ZA","eggs",46.89,12,"pc",None,"Eggs, 12 large (Cape Town)",EXC,"2026")
R("ZA","chicken_breast",97.88,1000,"g",None,"Chicken fillets 1 kg (Cape Town)",EXC,"2026")
EXZ = "https://www.expatica.com/za/moving/about/cost-of-living-in-south-africa-1167470 (midpoint of typical range)"
R("ZA","rice",33,1000,"g",None,"Rice 1 kg (R20-46)",EXZ,"2026")
R("ZA","tomatoes",27.5,1000,"g",None,"Tomatoes 1 kg (R15-40)",EXZ,"2026")
R("ZA","potatoes",25,1000,"g",None,"Potatoes 1 kg (R10-40)",EXZ,"2026")

C("SA","SAR")
EXR = "https://www.expatica.com/sa/cost-of-living/riyadh/ (Numbeo snapshot 2026-06-01)"
R("SA","milk",6.19,1000,"ml",None,"Milk 1 L (Riyadh)",EXR,"2026-06")
R("SA","eggs",10.73,12,"pc",None,"Eggs, 12 large (Riyadh)",EXR,"2026-06")
R("SA","chicken_breast",38.22,1000,"g",None,"Chicken fillets 1 kg (Riyadh)",EXR,"2026-06")

C("CA","CAD")
EXT = "https://www.expatica.com/ca/cost-of-living/toronto/ (Numbeo 2026-06-01)"
R("CA","milk",3.95,1000,"ml",None,"Milk 1 L (Toronto)",EXT,"2026-06")
R("CA","eggs",5.11,12,"pc",None,"Eggs, 12 large (Toronto)",EXT,"2026-06")
R("CA","chicken_breast",14.00,1000,"g",None,"Chicken breast 1 kg (Toronto)","https://wealthvieu.com/ca/cost-of-living-toronto/","2026")

C("AE","AED")
EXDU = "https://www.expatica.com/ae/cost-of-living/dubai/ (Numbeo 2026-06-01)"
for id_,p,q,u,n in [("milk",6.76,1000,"ml","Milk 1 L"),("eggs",13.08,12,"pc","Eggs, 12 large"),("chicken_breast",30.96,1000,"g","Chicken fillets 1 kg"),
    ("rice",9.51,1000,"g","White rice 1 kg"),("tomatoes",5.03,1000,"g","Tomatoes 1 kg")]:
    R("AE",id_,p,q,u,None,n+" (Dubai)",EXDU,"2026-06")
DM = "https://dmcc.ae/cost-of-living-in-dubai-for-expats (Numbeo 2026)"
R("AE","milk",6.61,1000,"ml",None,"Milk 1 L (Dubai)",DM,"2026")
R("AE","eggs",12.30,12,"pc",None,"Eggs, dozen (Dubai)",DM,"2026")
R("AE","chicken_breast",32.65,1000,"g",None,"Chicken fillets 1 kg (Dubai)",DM,"2026")
EXDA = "https://expatarrivals.com/dubai/cost-of-living-in-dubai (Feb 2026 averages)"
R("AE","eggs",13.30,12,"pc",None,"Eggs, dozen (Dubai)",EXDA,"2026-02")
R("AE","milk",6.60,1000,"ml",None,"Milk 1 L (Dubai)",EXDA,"2026-02")
R("AE","rice",9.0,1000,"g",None,"Rice 1 kg (Dubai)",EXDA,"2026-02")

C("KR","KRW")
TZKR = "https://trek.zone/en/south-korea/prices"
R("KR","milk",2985,1000,"ml",None,"Milk 1 L",TZKR,"undated")
EXK = "https://expatarrivals.com/south-korea/cost-of-living-in-south-korea"
R("KR","milk",2800,1000,"ml",None,"Milk 1 L",EXK,"undated")
R("KR","eggs",5000,12,"pc",None,"Eggs, dozen",EXK,"undated")
R("KR","chicken_breast",14000,1000,"g",None,"Chicken breast 1 kg",EXK,"undated")
R("KR","rice",5700,1000,"g",None,"Rice 1 kg",EXK,"undated")

C("PL","PLN")
EXW = "https://www.expatarrivals.com/node/2143 (Warsaw averages, March 2026)"
R("PL","milk",4,1000,"ml",None,"Milk 1 L (Warsaw)",EXW,"2026-03")
R("PL","rice",7,1000,"g",None,"Rice 1 kg (Warsaw)",EXW,"2026-03")
R("PL","chicken_breast",28,1000,"g",None,"Chicken breast 1 kg (Warsaw)",EXW,"2026-03")
FW = "https://freenance-landing.pages.dev/cost-of-living/cost-of-living-warsaw-2026/ (midpoint of range)"
R("PL","eggs",10,10,"pc",None,"Eggs, 10 (8-12 PLN)",FW,"2026")
R("PL","potatoes",3,1000,"g",None,"Potatoes 1 kg (2-4 PLN)",FW,"2026")
R("PL","tomatoes",9,1000,"g",None,"Tomatoes 1 kg (6-12 PLN)",FW,"2026")
R("PL","milk",4.25,1000,"ml",None,"Milk 1 L (3.50-5 PLN)",FW,"2026")
NT = "https://www.navthemes.com/?p=57444 (2026; midpoint of range)"
R("PL","eggs",13.5,12,"pc",None,"Eggs, 12 (12-15 PLN)",NT,"2026")
R("PL","chicken_breast",28.5,1000,"g",None,"Chicken breast 1 kg (25-32 PLN)",NT,"2026")
R("PL","potatoes",4,1000,"g",None,"Potatoes 1 kg (3-5 PLN)",NT,"2026")
R("PL","milk",7,1000,"ml",None,"Whole-fat milk 1 L (Warsaw, 8 price points)","https://expatistan.com/price/milk/warsaw","2026-05")

C("AR","ARS")
EXA = "https://expatarrivals.com/americas/argentina/cost-living-argentina"
R("AR","eggs",4450,12,"pc",None,"Eggs, dozen",EXA,"2026")
R("AR","milk",2200,1000,"ml",None,"Milk 1 L",EXA,"2026")
R("AR","rice",2350,1000,"g",None,"Rice 1 kg",EXA,"2026")
R("AR","chicken_breast",14400,1000,"g",None,"Chicken breasts 1 kg",EXA,"2026")
R("AR","eggs",3827,12,"pc",None,"Eggs, 12 large (Buenos Aires)","https://expatistan.com/price/eggs/buenos-aires","2026-07")
R("AR","rice",2243,1000,"g",None,"White rice 1 kg (Buenos Aires)","https://expatistan.com/price/rice/buenos-aires/EUR","2026-07")
R("AR","chicken_breast",7387,500,"g",None,"Boneless chicken breast 500 g (Buenos Aires)","https://expatistan.com/price/chicken/buenos-aires","2026-07")

C("CO","COP")
CCB = "https://citycost.org/bogota/ (last update Oct 2026)"
R("CO","milk",5284,1000,"ml",None,"Milk 1 L (Bogota)",CCB,"2026-10")
R("CO","rice",5436,1000,"g",None,"Rice 1 kg (Bogota)",CCB,"2026-10")
R("CO","eggs",10900,12,"pc",None,"Eggs, 12 (Bogota)",CCB,"2026-10")
R("CO","chicken_breast",23200,1000,"g",None,"Chicken fillets 1 kg (Bogota)",CCB,"2026-10")
WW = "https://www.whereandwhen.net/budget/colombia/bogota/ (2026)"
R("CO","milk",5299,1000,"ml",None,"Milk 1 L (Bogota)",WW,"2026")
R("CO","rice",4820,1000,"g",None,"Rice 1 kg (Bogota)",WW,"2026")
R("CO","eggs",10671,12,"pc",None,"Eggs, dozen (Bogota)",WW,"2026")
R("CO","chicken_breast",22152,1000,"g",None,"Chicken 1 kg (Bogota)",WW,"2026")
EXBO = "https://demosite1.expatarrivals.com/node/13405 (Bogota)"
R("CO","eggs",10500,12,"pc",None,"Eggs, dozen (Bogota)",EXBO,"undated")
R("CO","milk",5300,1000,"ml",None,"Milk 1 L (Bogota)",EXBO,"undated")
R("CO","rice",4800,1000,"g",None,"Rice 1 kg (Bogota)",EXBO,"undated")
R("CO","chicken_breast",22000,1000,"g",None,"Chicken breast 1 kg (Bogota)",EXBO,"undated")

C("RU","RUB")
R("RU","milk",132,1000,"ml","disc","Milk 1 L at Pyaterochka (Moscow Times survey)","https://www.pravda.com.ua/eng/news/2026/02/10/8020310","2026-02")
R("RU","milk",98,1000,"ml",None,"Milk 1 L, Rosstat national average","https://www.pravda.com.ua/eng/news/2026/02/10/8020310","2026-02")
R("RU","chicken_breast",469,1000,"g",None,"Chicken fillet 1 kg (Moscow)","https://trek.zone/en/russia/prices","2025-07",note="a year old")

C("AU","AUD")
EXAU = "https://www.expatarrivals.com/australia/cost-of-living-in-australia"
R("AU","eggs",8,12,"pc",None,"Eggs, dozen",EXAU,"2026")
R("AU","milk",2.60,1000,"ml",None,"Milk 1 L",EXAU,"2026")
R("AU","rice",3.50,1000,"g",None,"Rice 1 kg",EXAU,"2026")
R("AU","chicken_breast",13.70,1000,"g",None,"Chicken breasts 1 kg",EXAU,"2026")
EXSY = "https://www.expatica.com/au/cost-of-living/sydney/ (Numbeo 2026-06-01)"
R("AU","milk",2.72,1000,"ml",None,"Milk 1 L (Sydney)",EXSY,"2026-06")
R("AU","eggs",8.25,12,"pc",None,"Eggs, 12 large (Sydney)",EXSY,"2026-06")
R("AU","chicken_breast",14.01,1000,"g",None,"Chicken fillets 1 kg (Sydney)",EXSY,"2026-06")
R("AU","eggs",9,12,"pc",None,"Eggs, 12 large (Sydney)","https://expatistan.com/price/eggs/sydney/EUR","2026-05")

WGV = "https://www.walmart.com/browse/food/great-value/976759_976794_3338831_7676332"
R("US","spaghetti",0.98,LB,"g","walmart","Great Value Spaghetti 16 oz",WGV,"2026 (undated listing)")
R("US","chopped_tomatoes",0.96,1,"pc","walmart","Great Value Diced Tomatoes in Tomato Juice 14.5 oz can",WGV,"2026 (undated listing)",note="411 g can")
R("US","peanut_butter",1.98,LB,"g","walmart","Great Value Creamy Peanut Butter 16 oz",WGV,"2026 (undated listing)")
R("US","peanut_butter",3.88,40*OZ,"g","walmart","Great Value Creamy Peanut Butter 40 oz",WGV,"2026 (undated listing)")
R("US","oats",4.18,42*OZ,"g","walmart","Great Value Old Fashioned Oats 42 oz","https://www.wealthysinglemommy.com/?p=64465","2026")
R("US","oats",4.38,42*OZ,"g","walmart","Great Value Old Fashioned Oats 42 oz (online)","https://www.aol.com/articles/30-affordable-walmart-buys-fill-142542728.html","2026-02")
WF = "https://www.walmart.com/tp/flour"
R("US","flour",2.38,5*LB,"g","walmart","Great Value All Purpose Flour 5 lb",WF,"2026 (undated listing)")
R("US","flour",1.97,5*LB,"g","walmart","Great Value All Purpose Flour 5 lb (rollback, was 2.43)",WF,"2026 (undated listing)")
WGD = "https://www.walmart.com/cp/great-value-deals/9442036"
R("US","sugar",2.97,4*LB,"g","walmart","Great Value Pure Granulated Sugar 4 lb",WGD,"2026 (undated listing)")
R("US","sugar",2.89,4*LB,"g","walmart","Great Value Pure Granulated Sugar 4 lb (was 3.07)",WGD,"2026 (undated listing)")
R("US","vegetable_oil",3.57,48*FLOZ,"ml","walmart","Great Value Vegetable Oil 48 fl oz (rollback)",WGD,"2026 (undated listing)")

R("DE","basmati_rice",2.49,1000,"g","disc","BON-RI Basmati-Reis 1 kg (Aldi Süd, reduced from 2.99)","https://www.aldi-sued.de/newsroom/alle-pressemitteilungen/marke-und-produkte/2026/gutes-fuer-alle-auch-im-neuen-Jahr-aldi-setzt-neuen-tiefpreis-fuer-grundnahrungsmittel","2026-01")

C("NL","EUR")
R("NL","milk",1.85,1500,"ml","ah","AH Halfvolle melk 1.5 L","https://www.ah.nl/?merk=Spa","undated listing")

def EXA4(cc, cur, url, date, eggs, milk, rice, chicken, city=""):
    C(cc, cur)
    sfx = (" (" + city + ")") if city else ""
    if eggs is not None: R(cc,"eggs",eggs,12,"pc",None,"Eggs, dozen"+sfx,url,date)
    if milk is not None: R(cc,"milk",milk,1000,"ml",None,"Milk 1 L"+sfx,url,date)
    if rice is not None: R(cc,"rice",rice,1000,"g",None,"Rice 1 kg"+sfx,url,date)
    if chicken is not None: R(cc,"chicken_breast",chicken,1000,"g",None,"Chicken breasts 1 kg"+sfx,url,date)

EXA4("GH","GHS","https://expatarrivals.com/africa/ghana/cost-living-ghana","2026-02",30,40,35,65,"Accra")
EXA4("GH","GHS","https://www.whereandwhen.net/budget/ghana/accra/","2026",30,42,38,84,"Accra")
R("GH","eggs",28,12,"pc",None,"Eggs, 12 large (Accra)","https://expatistan.com/cost-of-living/comparison/sofia/accra","2026")
R("GH","milk",30,1000,"ml",None,"Whole milk 1 L (Accra)","https://expatistan.com/cost-of-living/comparison/sofia/accra","2026")
R("GH","chicken_breast",59,500,"g",None,"Boneless chicken breast 500 g (Accra)","https://expatistan.com/cost-of-living/comparison/sofia/accra","2026")
AFG = "https://africarrieres.com/ghana/en/guide/decouvrir/cost-of-living (local markets; midpoint of range)"
R("GH","rice",10,1000,"g","market","Rice 1 kg, local market (GHS 8-12)",AFG,"2026")
R("GH","eggs",15,12,"pc","market","Eggs, 12, local market (GHS 12-18)",AFG,"2026")

EXA4("MA","MAD","https://www.riotimesonline.com/cost-of-living-casablanca-expats-2026/","2026-09",17.76,None,18.03,70.28,"Casablanca")
AFM = "https://africarrieres.com/maroc/pt/guide/decouvrir/cout-de-la-vie (Aug 2026; midpoint of range)"
R("MA","eggs",20,12,"pc",None,"Eggs, dozen (MAD 18-22)",AFM,"2026-08")
R("MA","milk",6.5,1000,"ml",None,"Milk 1 L (MAD 6-7)",AFM,"2026-08")
R("MA","rice",10,1000,"g",None,"Rice 1 kg (MAD 8-12)",AFM,"2026-08")
R("MA","eggs",14.23,12,"pc",None,"Eggs, dozen (Rabat)","https://www.mylifeelsewhere.com/cost-of-living/rabat-c1716","2026")

EXA4("PE","PEN","https://expatarrivals.com/peru/cost-of-living-in-peru","2026-09",10,5.50,4.65,20,"Lima")
R("PE","chicken_breast",12,500,"g",None,"Boneless chicken breast 500 g (Lima)","https://expatistan.com/cost-of-living/comparison/cuenca/lima","2026-08")
R("PE","milk",5.46,1000,"ml",None,"Whole milk 1 L (Lima)","https://expatistan.com/cost-of-living/comparison/cuenca/lima","2026-08")
R("PE","eggs",9,12,"pc",None,"Eggs, 12 large (Lima)","https://expatistan.com/cost-of-living/comparison/cuenca/lima","2026-08")

EXA4("MY","MYR","https://expatarrivals.com/malaysia/cost-of-living-in-malaysia","2026-10",10,9,7,20,"Kuala Lumpur")

AFE = "https://africarrieres.com/ethiopia/en/guide/decouvrir/cost-of-living (Feb 2026; midpoint of range)"
C("ET","ETB")
R("ET","eggs",80,12,"pc",None,"Eggs, dozen (ETB 60-100)",AFE,"2026-02")
R("ET","milk",45,1000,"ml",None,"Milk 1 L (ETB 30-60)",AFE,"2026-02")
R("ET","rice",60,1000,"g",None,"Local rice 1 kg (ETB 40-80)",AFE,"2026-02")
R("ET","chicken_breast",200,1000,"g",None,"Chicken 1 kg (ETB 150-250)",AFE,"2026-02",note="whole chicken; market price")
EXA4("ET","ETB","https://www.whereandwhen.net/budget/ethiopia/addis-ababa/","2026",285,174,347,1626,"Addis Ababa, supermarket")

EXA4("CL","CLP","https://expatarrivals.com/americas/chile/cost-living-chile","2026-05",4000,1200,1900,6800,"Santiago")
R("CL","white_loaf",1600,1,"pc",None,"White bread, loaf (Santiago)","https://expatarrivals.com/americas/chile/cost-living-chile","2026-05")
EXA4("CL","CLP","https://www.whereandwhen.net/budget/chile/santiago/","2026",4000,1256,1678,6522,"Santiago")
EXA4("CL","CLP","https://citycost.org/compare/santiago-vs-curico/ (updated 2026-09-28)","2026-09",4231,1266,1623,6545,"Santiago")

EXA4("IL","ILS","https://www.expatarrivals.com/middle-east/israel/cost-living-israel","2026-02",16,7,12,45,"Tel Aviv")
R("IL","rice",11,1000,"g",None,"Rice 1 kg","https://www.whereandwhen.net/budget/israel/","2026")
R("IL","eggs",16,12,"pc",None,"Eggs, 12","https://www.whereandwhen.net/budget/israel/","2026")

EXA4("UG","UGX","https://citycost.org/compare/kampala-vs-jinja/ (Kampala, updated 2026-07-25)","2026-07",6799,2799,5215,18300,"Kampala")
EXA4("UG","UGX","https://www.whereandwhen.net/budget/uganda/kampala/","2026",5448,3090,4976,18144,"Kampala")

C("LK","LKR")
EXA4("LK","LKR","https://citycost.org/compare/colombo-vs-kolonnawa/ (Colombo, updated 2026-07)","2026-07",731,595,293,1579,"Colombo")
EXA4("LK","LKR","https://trek.zone/en/sri-lanka/prices","undated",649,526,254,1430)
R("LK","eggs",724,12,"pc",None,"Eggs, 12 large (Colombo, 8 price points)","https://expatistan.com/price/eggs/colombo/USD","2026-06")

C("GR","EUR")
R("GR","rice",3,1000,"g",None,"Rice 1 kg","https://www.expatarrivals.com/europe/greece/cost-living-greece","2026")
R("GR","chicken_breast",10,1000,"g",None,"Chicken breasts 1 kg","https://www.expatarrivals.com/europe/greece/cost-living-greece","2026")
R("GR","eggs",4,12,"pc",None,"Eggs, dozen","https://k2.expatarrivals.com/node/25472","2026-04")
R("GR","milk",1.50,1000,"ml",None,"Milk 1 L","https://k2.expatarrivals.com/node/25472","2026-04")
R("GR","chicken_breast",9.95,1000,"g",None,"Fresh chicken breast fillet 1 kg (Greek supermarkets, summer 2026)","https://nikana.gr/en/tourist-guide/blog/shopping/1786/food-prices-in-greece","2026-07")
R("GR","milk",1.435,1000,"ml",None,"Milk 1 L (EUR 1.08-1.79, summer 2026)","https://nikana.gr/en/tourist-guide/blog/shopping/1786/food-prices-in-greece","2026-07")
R("GR","eggs",4,12,"pc",None,"Eggs, 12 (average)","https://www.whereandwhen.net/budget/greece/athens/","2026")
R("GR","chicken_breast",10,1000,"g",None,"Chicken breasts 1 kg (average)","https://www.whereandwhen.net/budget/greece/athens/","2026")

NBS = "https://nairametrics.com/2026/05/07/food-prices-beans-garri-eggs-record-sharp-declines-in-march-nbs/ (NBS Selected Food Prices Watch, March 2026)"
R("NG","eggs",6999,30,"pc",None,"Eggs, crate of 30 - highest state average (Taraba)",NBS,"2026-03")
R("NG","eggs",5610.04,30,"pc",None,"Eggs, crate of 30 - lowest state average (Niger State)",NBS,"2026-03")
R("NG","rice",112000,50000,"g",None,"Local rice, 50 kg bag, national average (NBS)","https://meiza.ng/cost-of-local-rice-rises-by-20-in-one-month-nbs/","2026-03")

JPS = "https://tokyointernationalmeetup.com/japan-food-prices-2026-expat-guide/ and https://e-housing.jp/post/grocery-prices-in-japan-2026-basket-comparison (Tokyo-area supermarkets 2026; midpoint of range)"
R("JP","rice",4750,5000,"g",None,"Domestic white rice 5 kg (JPY 4,500-5,000)",JPS,"2026")
R("JP","white_loaf",180,1,"pc",None,"Sliced white bread (shokupan) 350 g loaf",JPS,"2026",note="350 g loaf")
R("JP","milk",245,1000,"ml",None,"Milk 1 L (JPY 220-270)",JPS,"2026")
R("JP","eggs",315,10,"pc",None,"Eggs, 10 (JPY 280-350)",JPS,"2026")
R("JP","chicken_thighs",1450,1000,"g",None,"Chicken thigh (JPY 130-160 per 100 g)",JPS,"2026")
R("JP","chicken_breast",1000,1000,"g",None,"Chicken breast (JPY 80-120 per 100 g)",JPS,"2026")
R("JP","apples",750,1000,"g",None,"Apples 1 kg (JPY 600-900)",JPS,"2026")

R("TR","milk",47,1000,"ml",None,"Milk 1 L, supermarket average (min/max USD 0.7-1.4)","https://www.whereandwhen.net/budget/turkey/","2026")
OV = "https://openvan.camp/en/tools/vanbasket/netherlands (Open Food Facts data, updated 2026-01-01; USD converted at 1.12/EUR)"
R("NL","milk",1.49/1.12,1000,"ml",None,"Milk 1 L (USD 1.49)",OV,"2026-01")
R("NL","eggs",3.40/1.12,12,"pc",None,"Eggs, 12 (USD 3.40)",OV,"2026-01")

TT = "https://www.tastingtable.com/2189351/price-grocery-essentials-2026-aldi-costco-trader-joes-walmart/ (Boston area, June 2026)"
R("US","milk",2.89,GAL,"ml","aldi","Aldi whole milk, 1 gallon",TT,"2026-06")
R("US","milk",3.62,GAL,"ml","walmart","Great Value milk, 1 gallon",TT,"2026-06")
R("US","milk",3.69,GAL,"ml","costco","Kirkland Signature milk, 1 gallon",TT,"2026-06")
R("US","eggs",1.44,12,"pc","walmart","Great Value large eggs (18-count, per dozen)",TT,"2026-06")
R("US","eggs",1.47,12,"pc","aldi","Aldi large eggs, dozen",TT,"2026-06")
R("US","eggs",2.45,12,"pc","costco","Kirkland Signature eggs (per dozen)",TT,"2026-06")
R("US","eggs",5.99,12,"pc","traderjoes","Trader Joe's cheapest dozen eggs",TT,"2026-06")
R("US","white_loaf",2.49,1,"pc","traderjoes","Trader Joe's sliced white bread",TT,"2026-06",note="sliced sandwich loaf ~20 oz")
R("US","pasta",0.98,LB,"g","walmart","Great Value penne 1 lb",TT,"2026-06")
R("US","pasta",0.99,LB,"g","aldi","Aldi penne 1 lb",TT,"2026-06")

BB = "https://www.bigbasket.com/sp/2206616-daily-staples/?nc=nb (BigBasket listing)"
R("IN","salt",28,1000,"g","bigbasket","Tata Salt Vacuum Evaporated Iodised Salt 1 kg pouch",BB,"2026 (undated listing)")
R("IN","wholemeal_flour",263.50,5000,"g","bigbasket","Aashirvaad Atta whole wheat 5 kg (offer; MRP 306)",BB,"2026 (undated listing)",note="atta = Indian whole-wheat flour")
R("IN","sugar",54,1000,"g","bigbasket","Sugar 1 kg (BigBasket)",BB,"2026 (undated listing)")
R("IN","red_lentils",147.87,1000,"g","bigbasket","Fortune Unpolished Masoor Malka Desi Dal 1 kg",BB,"2026 (undated listing)")
R("IN","vegetable_oil",178,1000,"ml","bigbasket","Gold Winner Refined Sunflower Oil 1 L pouch",BB,"2026 (undated listing)")

R("ES","milk",0.96,1000,"ml","mercadona","Leche entera Hacendado 1 L","https://www.merca2.es/2026/10/20/hacendado-mercadona-rebaja-2477050/","2026-10")
R("ES","olive_oil",3.95,1000,"ml","mercadona","Aceite de oliva Hacendado 1 L (refined olive oil, not extra virgin)","https://www.merca2.es/2026/10/20/hacendado-mercadona-rebaja-2477050/","2026-10",note="ordinary olive oil, not EV")
R("ES","olive_oil",4.85,1000,"ml","mercadona","Aceite de oliva virgen extra Hacendado 1 L","https://www.moncloa.com/2026/03/02/mercadona-cena-no-engordar-3364087/","2026-03")
R("ES","olive_oil",4.95,1000,"ml","mercadona","Aceite de oliva virgen extra Hacendado 1 L","https://www.52spain.com/d/142953-Spanish-Olive-Oil-Prices-Continue-to-Fall-Extra-Virgin-AOVE-Now-Below-5","2026-05")

FR_ = "https://www.foodrepublic.com/2284930/aldi-items-price-cuts-october-2026/"
R("US","beef_mince",4.29,LB,"g","aldi","USDA 73% lean ground beef, 5 lb pack (per lb)",FR_,"2026-10")
R("US","chicken_breast",1.99,LB,"g","aldi","Kirkwood boneless skinless chicken breast family pack (per lb)","https://www.supermarketnews.com/company-news/aldi-cuts-prices-to-save-shoppers-86m","2026-09")
R("US","chicken_breast",8.36,4.2*LB,"g","aldi","Kirkwood boneless skinless chicken breast family pack ~4.2 lb",FR_,"2026-10")
R("US","apples",1.99,LB,"g","aldi","Honeycrisp apples per lb","https://www.kold.com/2026/09/23/aldi-is-lowering-prices-fall-heres-whats-cheaper/","2026-09")
R("DE","potatoes",1.89,3000,"g","disc","Lidl deutsche Speisekartoffeln 3 kg (temporary price cut)","https://www.topagrar.com/markt/news/lidl-senkt-preise-fur-deutsche-kartoffeln-und-will-absatz-ankurbeln-20020043","2026-11")

EXA4("PT","EUR","https://expatarrivals.com/europe/portugal/cost-living-portugal","2026-03",3.50,1.0,1.50,6.80,"Lisbon")
EXA4("PT","EUR","https://www.expatica.com/pt/cost-of-living/lisbon/ (Numbeo 2026-06-01)","2026-06",3.65,1.10,1.45,7.16,"Lisbon")
EXA4("PT","EUR","https://everycity-guide.pages.dev/journal/cost-of-living-lisbon-2026 (supermarket baselines May 2026)","2026-05",2.40,0.85,1.40,6.20,"Lisbon")
R("PT","eggs",4.69,12,"pc",None,"Eggs, 12 large (Lisbon)","https://expatistan.com/price/eggs/lisbon/EUR","2026-05")
R("PT","chicken_breast",3.85,500,"g",None,"Boneless chicken breast 500 g (Lisbon)","https://expatistan.com/price/chicken/lisbon/EUR","2026-05")

EXA4("CH","CHF","https://www.expatarrivals.com/europe/switzerland/cost-living-switzerland","2026-02",7,1.80,3,23,"Zurich")
R("CH","white_loaf",3,1,"pc",None,"Loaf of white bread (Zurich)","https://www.expatarrivals.com/europe/switzerland/cost-living-switzerland","2026-02")
EXA4("CH","CHF","https://www.expatica.com/ch/cost-of-living/zurich/ (Numbeo 2026-06-01)","2026-06",7.06,1.88,3.34,21.78,"Zurich")

EXA4("SE","SEK","https://k2.expatarrivals.com/node/18088 (Stockholm, Oct 2026)","2026-10",50,17,38,130,"Stockholm")
EXA4("SE","SEK","https://citycost.org/stockholm/ (Oct 2026)","2026-10",50,17,39,129,"Stockholm")
EXA4("SE","SEK","https://www.whereandwhen.net/budget/sweden/stockholm/","2026",49,17,38,134,"Stockholm")

EXA4("IE","EUR","https://www.expatarrivals.com/europe/ireland/cost-living-ireland","2026-07",4.50,1.50,2,10)

EXA4("TZ","TZS","https://www.whereandwhen.net/budget/tanzania/dar-es-salaam/","2026",5157,2258,2838,12360,"Dar es Salaam")
C("SN","XOF")
LA = "https://lesafriques.com/en/2026/11/cost-of-living-in-senegal-2026-what-a-monthly-budget-in-dakar-actually-looks-like/ (from Numbeo, Nov 2026)"
R("SN","rice",856,1000,"g",None,"Rice 1 kg (Dakar)",LA,"2026-11")
R("SN","eggs",1454,12,"pc",None,"Eggs, dozen (Dakar)",LA,"2026-11")
R("SN","chicken_breast",5275,1000,"g",None,"Chicken 1 kg (Dakar)",LA,"2026-11")
EXA4("SN","XOF","https://www.whereandwhen.net/budget/senegal/dakar/","2026",1352,1522,984,5282,"Dakar")
EXA4("CI","XOF","https://www.whereandwhen.net/budget/ivory-coast/abidjan/","2026",1333,1064,696,3704,"Abidjan")
R("CI","eggs",1449,12,"pc",None,"Eggs, 12 large (Abidjan)","https://expatistan.com/price/eggs/abidjan/EUR","2026")

C("SG","SGD")
R("SG","milk",4,1000,"ml",None,"Milk 1 L","https://www.expatarrivals.com/singapore/cost-of-living-in-singapore","2026-07")
R("SG","rice",3.50,1000,"g",None,"Rice 1 kg","https://www.expatarrivals.com/singapore/cost-of-living-in-singapore","2026-07")
R("SG","chicken_breast",14,1000,"g",None,"Chicken breasts 1 kg","https://www.expatarrivals.com/singapore/cost-of-living-in-singapore","2026-07")
EXA4("SG","SGD","https://www.expatica.com/sg/cost-of-living/singapore/ (Numbeo 2026-06-01)","2026-06",4.82,3.79,None,12.64)
EXA4("SG","SGD","https://wagecentre.com/immigration/life/prices-in-singapore","2026",4.59,3.92,3.09,13.33)
EXA4("SG","SGD","https://everycity-guide.pages.dev/journal/cost-of-living-singapore-2026 (supermarket baselines)","2026-05",4.20,3.40,None,12.50)

EXA4("TW","TWD","https://expatarrivals.com/asia-pacific/taiwan/taipei/cost-living-taipei","2025-11",90,95,93,300,"Taipei")
R("TW","eggs",110,12,"pc",None,"Eggs, 12 large (Taipei)","https://expatistan.com/price/eggs/taipei","2026")

EXA4("KZ","KZT","https://www.whereandwhen.net/budget/kazakhstan/almaty/","2026",1090,748,951,2869,"Almaty")
EXA4("KZ","KZT","https://expatarrivals.com/kazakhstan/cost-of-living-in-kazakhstan","2026-02",950,730,780,2500,"Almaty")
EXA4("UA","UAH","https://www.whereandwhen.net/budget/ukraine/kiev/","2026",94,59,67,None,"Kyiv")
R("UA","chicken_breast",244,1000,"g",None,"Fresh chicken fillet 1 kg, national average (Institute of Agrarian Economics)","https://ukranews.com/en/news/1123224-budget-version-of-new-year-s-table-2026-will-cost-ukrainians-uah-3-980-institute-of-agrarian","2025-12")
R("UA","rice",76.17,1000,"g",None,"White rice 1 kg","https://trek.zone/en/ukraine/prices","undated")
R("UA","milk",52.75,1000,"ml",None,"Milk 1 L","https://trek.zone/en/ukraine/prices","undated")
C("RO","RON")
R("RO","milk",7,1000,"ml",None,"Milk 1 L (supermarket average)","https://www.whereandwhen.net/budget/romania/","2026")
R("RO","eggs",15,12,"pc",None,"Eggs, box of 12 (supermarket average)","https://www.whereandwhen.net/budget/romania/","2026")
C("HU","HUF")
R("HU","milk",400,1000,"ml",None,"Milk 1 L (Budapest, Apr 2026)","https://www.expatarrivals.com/hungary/cost-of-living-in-hungary","2026-04")
R("HU","chicken_breast",2400,1000,"g",None,"Chicken breast 1 kg (Budapest, Apr 2026)","https://www.expatarrivals.com/hungary/cost-of-living-in-hungary","2026-04")
C("CZ","CZK")
R("CZ","milk",28,1000,"ml",None,"Milk 1 L","https://expatarrivals.com/czech-republic/cost-of-living-in-czech-republic","2026")
R("CZ","chicken_breast",200,1000,"g",None,"Chicken breast 1 kg","https://expatarrivals.com/czech-republic/cost-of-living-in-czech-republic","2026")

VQ = "https://vidala-166.pages.dev/guides/ecuador-quito-cost-of-living (Quito 2026; midpoint of range)"
C("EC","USD")
R("EC","eggs",2.0,12,"pc",None,"Eggs, 12 ($1.80-2.20)",VQ,"2026")
R("EC","milk",1.0,1000,"ml",None,"Whole milk 1 L ($0.90-1.10)",VQ,"2026")
R("EC","chicken_breast",4.25,1000,"g",None,"Chicken breast 1 kg ($3.50-5.00)",VQ,"2026")
BSE = "https://www.bearsavings.com/cost-of-living/compare/ecuador-vs-united-states/ (Numbeo-based, 2026)"
R("EC","rice",1.49,1000,"g",None,"White rice 1 kg",BSE,"2026-07")
R("EC","eggs",2.11,12,"pc",None,"Eggs, 12",BSE,"2026-07")
R("EC","chicken_breast",5.65,1000,"g",None,"Chicken breast 1 kg",BSE,"2026-07")

EXA4("JO","JOD","https://www.expatarrivals.com/middle-east/jordan/cost-living-jordan","2026-07",1.80,1.10,1.10,None,"Amman")
R("JO","eggs",1.694,12,"pc",None,"Eggs, 12 large (Amman)","https://expatistan.com/price/eggs/amman/EUR","2026")
C("LB","LBP")
TZL = "https://trek.zone/en/lebanon/prices (EUR, converted at 100,240 LBP/EUR)"
R("LB","rice",1.38*100240,1000,"g",None,"White rice 1 kg (EUR 1.38)",TZL,"undated")
R("LB","eggs",2.36*100240,12,"pc",None,"Eggs, 12 (EUR 2.36)",TZL,"undated")
R("LB","chicken_breast",7.27*100240,1000,"g",None,"Chicken fillets 1 kg (EUR 7.27)",TZL,"undated")

NWQ = "https://nomad.watch/cities/QA/doha/costs (Carrefour Qatar listings, updated Oct 2026)"
C("QA","QAR")
R("QA","milk",8,1000,"ml","carrefour","Baladna fresh milk 1 L (Carrefour Qatar)",NWQ,"2026-10")
R("QA","chicken_breast",32,2000,"g","carrefour","Sadia frozen chicken breast 2 kg (Carrefour Qatar)",NWQ,"2026-10",note="frozen")

EXA4("NZ","NZD","https://expatarrivals.com/asia-pacific/new-zealand/cost-living-new-zealand","2026-07",10.50,3.0,3.30,17,"Auckland")
R("NZ","milk",3.17,1000,"ml",None,"Milk 1 L (Auckland)","https://citiesinsider.com/country/new-zealand/auckland/cost-of-living/en","2026")
R("NZ","eggs",10.77,12,"pc",None,"Eggs, dozen (Numbeo, national)","https://goingnz.com/?p=1165","2026-07")

R("CA","milk",5.49,2000,"ml",None,"Milk 2 L, national average (Statistics Canada, scanner data)","https://www.statcan.gc.ca/en/topics-start/food-price","2026-08")
R("AU","eggs",5.75,12,"pc",None,"Cage-free eggs, dozen ($5.70-5.80 through 2026)","https://www.thenewdaily.com.au/finance/consumer/2026/06/11/supermarket-prices-inflation","2026-06")
R("AU","milk",4.65,2000,"ml","coles","Woolworths own-brand milk 2 L (after May 2026 rise)","https://www.thenewdaily.com.au/finance/consumer/2026/06/11/supermarket-prices-inflation","2026-06")
SB = "https://www.shopback.com.au/blog/savings/au-woolworths-vs-coles-vs-aldi-2026-weekly-grocery-family-of-4"
R("AU","eggs",8.50,12,"pc","coles","Coles free-range eggs 12",SB,"2026-09")
R("AU","milk",11.10/3,2000,"ml","coles","Coles milk 2 L (3 x 2 L for $11.10)",SB,"2026-09")
R("AU","rice",4.00,1000,"g","coles","Coles home-brand rice 1 kg","https://www.canstar.com.au/budgeting/which-supermarket-is-really-the-cheapest/","undated")
R("AU","milk",3.20,2000,"ml","coles","Coles home-brand milk 2 L","https://www.canstar.com.au/budgeting/which-supermarket-is-really-the-cheapest/","undated")

IDSC = "https://www.arabfinance.com/en/news/newdetails/basic-commodities-and-vegetables-mixed-on-november-9 (IDSC daily prices, 2026-11-09)"
R("EG","rice",34.7,1000,"g",None,"Rice 1 kg (IDSC national average)",IDSC,"2026-11-09")
R("EG","flour",27.2,1000,"g",None,"Packaged flour 1 kg (IDSC)",IDSC,"2026-11-09")
R("EG","sugar",33.2,1000,"g",None,"Packaged sugar 1 kg (IDSC)",IDSC,"2026-11-09")
R("EG","vegetable_oil",108.9,1090,"ml",None,"Sunflower oil 1 kg (~1.09 L) (IDSC)",IDSC,"2026-11-09",note="priced per kg")
R("EG","tomatoes",23.9,1000,"g",None,"Tomatoes 1 kg (IDSC)",IDSC,"2026-11-09")
R("EG","onion",19.9,1000,"g",None,"Onions 1 kg (IDSC)",IDSC,"2026-11-09")
R("EG","potatoes",19.6,1000,"g",None,"Potatoes 1 kg (IDSC)","https://arabfinance.com/en/news/newdetails/food-commodities-and-vegetables-prices-disclosed-on-july-12th","2026-07-12")
R("PK","tomatoes",193.81,1000,"g",None,"Tomatoes 1 kg, SPI national average (PBS), week ended 2026-11-05","https://www.techjuice.pk/?p=261567","2026-11-05")

R("EG","chicken_thighs",89.7,1000,"g",None,"White poultry (whole chicken) 1 kg (IDSC)","https://arabfinance.com/en/news/newdetails/idsc-records-rise-in-prices-on-poultry-meat-fish-on-october-14","2026-10-14",note="whole broiler, not fillet")
R("EG","beef_stew",445.60,1000,"g",None,"Meat (beef) 1 kg (IDSC)","https://www.zawya.com/en/economy/egypt-meat-poultry-fish-prices-unveiled-on-october-13-1626419","2026-10-13")
KT = "https://thekenyatimes.com/economy/headache-for-kenyans-as-prices-of-essential-commodities-hike/ (KNBS average retail prices, Oct 2026)"
R("KE","sugar",163.84,1000,"g",None,"Sugar 1 kg (KNBS national average)",KT,"2026-10")
R("KE","vegetable_oil",361.04,1000,"ml",None,"Cooking oil 1 L (KNBS national average)",KT,"2026-10")
R("KE","onion",122.37,1000,"g",None,"Onions 1 kg (KNBS national average)",KT,"2026-10")
R("KE","flour",184.88,2000,"g",None,"Wheat flour 2 kg (KNBS national average)",KT,"2026-10")

A1 = "https://www.timeturk.com/a101-5-eylul-aktuel-katalogu-komili-aycicek-yagi-caykur-cay-toz-seker-ucuzladi ; https://www.habergazetesi.com.tr/a101-1-eylul-2026-aktuel-katalogu-yayimlandi-sut-urunlerinden-temizlige-buyuk-eylul-firsatlari-basladi (A101 catalogues, Sept 2026)"
R("TR","vegetable_oil",509,5000,"ml","disc","Komili Ayçiçek Yağı 5 L (A101)",A1,"2026-09")
R("TR","vegetable_oil",395,5000,"ml","disc","Komili Ayçiçek Yağı 5 L (A101 catalogue price)",A1,"2026-09")
R("TR","sugar",52.50,1000,"g","disc","Toz şeker 1 kg (Irmak/Bal Küpü/Nar/Bor/Doğuş, A101)",A1,"2026-09")
R("TR","rice",73.50,1000,"g","disc","Ovadan Baldo pirinç 1 kg (A101)",A1,"2026-09")
R("TR","rice",159.50,2500,"g","disc","Ovadan Osmancık pirinç 2.5 kg (A101)","https://www.habergazetesi.com.tr/a101-20-eylul-2026-aktuel-katalog-a101de-bugun-neler-var-haftanin-yildizlari-indirimli-urunler-ve-fiyat-listesi","2026-09")
R("TR","milk",24.50,1000,"ml","disc","Birşah yarım yağlı süt 1 L (A101)","https://www.habergazetesi.com.tr/a101-30-agustos-5-eylul-indirim-katalogu-yayinlandi-mutfak-ve-temizlik-urunlerinde-buyuk-firsat","2026-08")

PF = "https://www.poresto.com/mexico/2026/10/12/profeco-revela-donde-canasta-basica-barata-gasolineras-venden-diesel-caro.amp.html (Profeco monitoring, 2026-10-12)"
R("MX","carrots",13.98,1000,"g",None,"Zanahoria 1 kg (Profeco average)",PF,"2026-10")
R("MX","tomatoes",24.92,1000,"g",None,"Jitomate 1 kg (Profeco average)",PF,"2026-10")
R("MX","onion",48.57,1000,"g",None,"Cebolla 1 kg (Profeco average)",PF,"2026-10")
R("MX","eggs",47.40,18,"pc",None,"Huevo, paquete de 18 (Profeco average)","https://www.poresto.com/mexico/2026/5/14/profeco-revela-donde-comprar-mas-barata-la-canasta-basica-y-pide-buscar-identificadores-en-supermercados.html","2026-05")

OK11 = "https://www.rctiplus.com/news/detail/okezone/5514082/harga-pangan-hari-ini-naik--cabai-rp97-100--daging-sapi-rp153-500-per-kg (Bank Indonesia PIHPS, 2026-11-11)"
OK13 = "https://www.rctiplus.com/news/detail/ekonomi/5515801/harga-pangan-hari-ini-naik--cabai-rp122-500--daging-sapi-rp158-150-per-kg (PIHPS, 2026-11-13)"
JA13 = "https://journalarta.com/news/2026/11/13/harga-pangan-pihps-cabai-rawit/ (PIHPS, 2026-11-13)"
R("ID","rice",16750,1000,"g",None,"Beras medium I 1 kg (PIHPS national average)",OK11,"2026-11-11")
R("ID","rice",16550,1000,"g",None,"Beras medium II 1 kg (PIHPS)",OK11,"2026-11-11")
R("ID","garlic",38450,1000,"g",None,"Bawang putih 1 kg (PIHPS)",OK11,"2026-11-11")
R("ID","garlic",41450,1000,"g",None,"Bawang putih 1 kg (PIHPS)",OK13,"2026-11-13")
R("ID","vegetable_oil",24700,1000,"ml",None,"Minyak goreng kemasan bermerek II 1 L (PIHPS)",OK11,"2026-11-11")
R("ID","beef_stew",153500,1000,"g",None,"Daging sapi 1 kg (PIHPS)",OK11,"2026-11-11")
R("ID","beef_stew",158150,1000,"g",None,"Daging sapi 1 kg (PIHPS)",OK13,"2026-11-13")
R("ID","eggs",28900,1000,"g",None,"Telur ayam ras per kg (PIHPS)",JA13,"2026-11-13",note="priced per kg of eggs (~16 eggs)")
R("ID","eggs",28400,1000,"g",None,"Telur ayam ras per kg (PIHPS)",OK11,"2026-11-11",note="priced per kg of eggs (~16 eggs)")
R("ID","fresh_chili",80700,1000,"g",None,"Cabai merah keriting 1 kg (PIHPS)",JA13,"2026-11-13")
R("ID","shallots",37650,1000,"g",None,"Bawang merah 1 kg (PIHPS)",OK11,"2026-11-11")
R("ID","shallots",45950,1000,"g",None,"Bawang merah 1 kg (PIHPS)",OK13,"2026-11-13")

R("JP","rice",2860,5000,"g",None,"Rice 5 kg, supermarket average incl. tax (MAFF POS survey, 28 Sep-4 Oct 2026)","https://www.nationthailand.com/news/world/40071221 ; https://www.nippon.com/en/japan-data/h02907/","2026-10")
SS = "https://www.sunsirs.com/commodity-news/petail-35233.html (Shanghai district monthly retail average, Aug 2026)"
R("CN","pork_shoulder",14.02*2,1000,"g",None,"Lean pork, per 500 g CNY 14.02 (Shanghai district retail)",SS,"2026-08",note="lean pork cut; per-500 g (jin) price doubled")
R("CN","eggs",5.41*2,1000,"g",None,"Fresh red-shell eggs, per 500 g CNY 5.41 (Shanghai district retail)",SS,"2026-08",note="priced per kg of eggs (~16 eggs)")

R("GB","olive_oil",7.00,1000,"ml","tesco","Tesco Extra Virgin Olive Oil 1 L","https://www.tesco.com/groceries/en-GB/products/254516076","2026 (undated listing)")
R("GB","olive_oil",6.75,1000,"ml","tesco","Tesco Olive Oil 1 L (not extra virgin)","https://www.tesco.com/shop/en-GB/products/254918424","2026 (undated listing)")
R("GB","olive_oil",11.50,1000,"ml","tesco","Napolina Extra Virgin Olive Oil 1 L","https://www.tesco.com/groceries/en-GB/products/255592838","2026 (undated listing)")
R("GB","olive_oil",12.50,1000,"ml","tesco","Filippo Berio Extra Virgin Olive Oil 1 L","https://www.tesco.com/shop/en-GB/products/253628953","2026 (undated listing)")
MM = "https://www.moneymagpie.com/save-money/food-inflation-expensive-foods-cheapest-supermarket (weekly basket, June 2026)"
R("GB","beef_mince",3.09,500,"g","disc","Aldi beef mince 500 g",MM,"2026-06")
R("GB","beef_mince",3.09,500,"g","asda","Asda beef mince 500 g",MM,"2026-06")
R("GB","beef_mince",3.25,500,"g","tesco","Tesco beef mince 500 g",MM,"2026-06")
R("GB","white_loaf",0.55,1,"pc","disc","Aldi white bread loaf",MM,"2026-06")
R("GB","baked_beans",0.27,1,"pc","disc","Aldi baked beans can",MM,"2026-06")
PW = "https://pocketwise.co.uk/personal-finance/supermarket-savings/cheapest-supermarket-uk-2026/"
R("GB","chicken_breast",5.49,1000,"g","disc","Aldi / Lidl chicken breast 1 kg",PW,"2026")
R("GB","chicken_breast",5.99,1000,"g","asda","Asda chicken breast 1 kg",PW,"2026")
R("GB","chicken_breast",5.75,1000,"g","tesco","Tesco chicken breast 1 kg (Clubcard price)",PW,"2026")
R("GB","chicken_breast",6.00,1000,"g","sainsburys","Sainsbury's chicken breast 1 kg",PW,"2026")

WP = "https://www.walmart.com/browse/food/produce/976759_1071964_976793 (Walmart produce listings, undated)"
R("US","onion",2.84,3*LB,"g","walmart","Yellow onions 3 lb bag",WP,"2026 (undated listing)")
R("US","potatoes",2.47,5*LB,"g","walmart","Fresh Farms russet potatoes 5 lb (rollback, was 3.47)",WP,"2026 (undated listing)")
R("US","tomatoes",0.85,LB,"g","walmart","Roma tomatoes (per lb; 0.21 each)",WP,"2026 (undated listing)")
R("US","avocado",0.55,1,"pc","walmart","Hass avocado, each (rollback, was 0.62)",WP,"2026 (undated listing)")
YS = "https://www.yahoo.com/news/stretch-dollar-avocado-prices-fluctuate-212327015.html (Florida store price check, Oct 2026)"
R("US","potatoes",4.44,5*LB,"g",None,"Russet potatoes 5 lb bag (Florida store check)",YS,"2026-10")
R("US","avocado",0.80,1,"pc",None,"Avocado, each (Florida store check)",YS,"2026-10")
R("US","carrots",1.32,LB,"g",None,"Baby carrots 1 lb bag (Florida store check)",YS,"2026-10")

R("DE","chicken_breast",6.79,600,"g","rewe","REWE ja! Hähnchenbrustfilet 600 g","https://www.heidelberg24.de/verbraucher/gag-produkte-laengst-wieder-teuer-dauerhafte-preissenkungen-bei-aldi-rewe-co-nur-pr-zr-93991504.html","undated")

TZR = "https://trek.zone/en/russia/prices (Moscow data, last updated July 2025)"
R("RU","rice",134,1000,"g",None,"White rice 1 kg (Moscow)",TZR,"2025-07",note="pre-2026 VAT rise; a year old")
R("RU","eggs",146,12,"pc",None,"Eggs, 12 (Moscow)",TZR,"2025-07",note="a year old")
R("RU","milk",103,1000,"ml",None,"Milk 1 L (Moscow)",TZR,"2025-07",note="a year old")
R("NL","chicken_breast",10,1000,"g",None,"Chicken fillet ~1 kg (Amsterdam supermarkets, checked May-June 2026)","https://amsterdam-explorer.com/prices-in-amsterdam/","2026-06")
C("BE","EUR")
R("BE","milk",1.20,1000,"ml",None,"Regular milk 1 L (EUR 0.80-1.60, midpoint)","https://www.expatica.com/be/about/basics/cost-of-living-in-belgium-how-much-do-you-need-1085097/","2026")
EXA4("NO","NOK","https://www.whereandwhen.net/budget/norway/oslo/","2026",57,24,45,151,"Oslo")
EXA4("NO","NOK","https://www.whereandwhen.net/budget/norway/","2026",49,23,35,None)
DKR = 7.4755/1.12
EXA4("DK","DKK","https://openvan.camp/en/tools/vanbasket/denmark (Nov 2026; USD converted at %.3f DKK/USD)" % DKR,"2026-11",4.85*DKR,1.94*DKR,1.85*DKR,13.19*DKR)
NPR = 166.8/1.12
EXA4("NP","NPR","https://www.whereandwhen.net/budget/nepal/kathmandu/ (USD converted at %.1f NPR/USD)" % NPR,"2026",1.7*NPR,0.8*NPR,0.9*NPR,2.9*NPR,"Kathmandu")
EXA4("KH","KHR","https://www.whereandwhen.net/budget/cambodia/phnom-penh/ (USD converted at 4,010 KHR/USD)","2026",1.7*4010,2.1*4010,None,4.2*4010,"Phnom Penh")

G = 3.02/1.12
EXA4("GE","GEL","https://www.whereandwhen.net/budget/georgia/tbilisi/ (USD converted at %.2f GEL/USD)" % G,"2026",2.7*G,2.1*G,1.6*G,None,"Tbilisi")
R("GE","chicken_breast",6.70*G,1000,"g",None,"Chicken breast 1 kg (USD 6.70)","https://pbservices.ge/blog/cost-of-living-georgia-2026","2026")
EXA4("AZ","AZN","https://openvan.camp/en/tools/vanbasket/azerbaijan (Nov 2026, USD converted at 1.70 AZN/USD)","2026-11",1.80*1.70,1.53*1.70,1.82*1.70,4.12*1.70)
EXA4("UZ","UZS","https://kun.uz/en/28347507 (Tashkent, Numbeo-based)","2026",19500,14000,21500,50500,"Tashkent")
C("KG","KGS")
WFP = "https://docs.wfp.org/api/documents/WFP-0000172392/download/ (WFP Kyrgyzstan market monitor, Feb 2026)"
R("KG","eggs",121,10,"pc",None,"Eggs, 10 (national average)",WFP,"2026-02")
R("KG","milk",72,1000,"ml",None,"Milk 1 L (national average)",WFP,"2026-02")
R("KG","rice",146,1000,"g",None,"Rice, medium, 1 kg (national average)",WFP,"2026-02")
R("KG","milk",76.49,1000,"ml",None,"Loose milk 1 L (Bishkek average)","https://www.akchabar.kg/en/news/v-kirgizstane-zafiksirovali-novie-roznichnie-tseni-na-produkti-toplivo-i-ugol-dannie-monitoringa-qbhaqikarafuwqid","2026-03")
EXA4("RS","RSD","https://wagecentre.com/immigration/life/prices-in-belgrade (Belgrade 2026)","2026",274.90,141.74,291.25,759.91,"Belgrade")
BG_ = 1.95583
C("BG","EUR")
EXS_ = "https://expatistan.com/cost-of-living/comparison/belgrade/sofia (Sofia; BGN converted at 1.95583/EUR)"
R("BG","eggs",8/BG_,12,"pc",None,"Eggs, 12 large (Sofia, BGN 8)",EXS_,"2026")
R("BG","milk",3.11/BG_,1000,"ml",None,"Whole milk 1 L (Sofia, BGN 3.11)",EXS_,"2026")
R("BG","chicken_breast",10/BG_,500,"g",None,"Chicken breast 500 g (Sofia, BGN 10)",EXS_,"2026")
T_ = 3.4/1.12
EXA4("TN","TND","https://openvan.camp/en/tools/vanbasket/tunisia (2026, USD converted at %.3f TND/USD)" % T_,"2026",2.01*T_,0.46*T_,2.74*T_,3.36*T_)
R("JO","milk",1.41*0.709,1000,"ml",None,"Milk 1 L (USD 1.41)","https://openvan.camp/en/tools/vanbasket/jordan","2026")
R("JO","eggs",2.54*0.709,12,"pc",None,"Eggs, dozen (USD 2.54)","https://openvan.camp/en/tools/vanbasket/jordan","2026")
C("DZ","DZD")
R("DZ","eggs",1.76*134.8,12,"pc",None,"Eggs, dozen (Algiers, USD 1.76 at 134.8 DZD/USD official)","https://mylifeelsewhere.com/cost-of-living/algiers-c8/tunis-c2395","2026")
Z_ = 25.8/1.12
C("ZM","ZMW")
R("ZM","milk",1.8*Z_,1000,"ml",None,"Milk 1 L (USD 1.8, converted at %.1f ZMW/USD)" % Z_,"https://www.whereandwhen.net/budget/zambia/","2026")
R("ZM","eggs",1.6*25.8,12,"pc",None,"Eggs, box of 12 (EUR 1.6, Numbeo-based)","https://www.combien-coute.net/oeufs/zambie/","2026")

C("CM","XAF")
R("CM","eggs",1044,12,"pc",None,"Eggs, 12 large (Douala; few data points)","https://expatistan.com/price/eggs/douala/USD","2026-02")
X_ = 655.957/1.12
R("CM","eggs",1.90*X_,12,"pc",None,"Eggs, dozen (Douala, USD 1.90)","https://www.mylifeelsewhere.com/cost-of-living/douala-c278","2026")
R("CM","chicken_breast",2.84*X_,LB,"g",None,"Boneless chicken breast 1 lb (Douala, USD 2.84)","https://www.mylifeelsewhere.com/cost-of-living/douala-c278","2026")
A_ = 1030/1.12
C("AO","AOA")
R("AO","eggs",2.16*A_,12,"pc",None,"Eggs, dozen (Luanda, USD 2.16)","https://www.mylifeelsewhere.com/cost-of-living/luanda-c66/kinshasa-c8188","2026-07")
R("AO","chicken_breast",2.71*A_,LB,"g",None,"Boneless chicken breast 1 lb (Luanda, USD 2.71)","https://www.mylifeelsewhere.com/cost-of-living/luanda-c66/kinshasa-c8188","2026-07")
C("CD","CDF")
R("CD","milk",3000,1000,"ml",None,"Milk 1 L (Kinshasa, CDF 2,500-3,500)","https://360nations.com/africa/dr-congo/cost-food-groceries.html","undated")
I_ = 2300000/1.12
EXA4("IR","IRR","https://www.whereandwhen.net/budget/iran/ (1-year average in USD, converted at %.0f IRR/USD; likely understates after 2026 inflation)" % I_,"2026",1.1*I_,0.6*I_,2.4*I_,2.9*I_)
R("IR","chicken_legs",3500000,1000,"g",None,"Whole chicken 1 kg, retail (350,000 tomans)","https://en.radiozamaneh.com/38038/","2026-04",note="whole chicken")
EXA4("MM","MMK","https://k2.expatarrivals.com/node/25550 (Expat Arrivals Yangon list, June 2026; URL as shown in search results)","2026-06",3800,3800,5100,9400,"Yangon")

R("US","cheddar",5.98,LB,"g",None,"Cheddar cheese, natural, per lb (BLS)",GF,"2026-08")
R("US","pork_shoulder",4.24,LB,"g",None,"Pork chops, per lb (BLS)",GF,"2026-08",note="pork chops, not shoulder")
BR_ = "https://basketreport.pages.dev/ (BLS average price data through May 2026)"
R("US","lemon",2.09,LB,"g",None,"Lemons, per lb (BLS)",BR_,"2026-05",note="sold by weight; ~110 g per lemon")
R("US","orange",1.54,LB,"g",None,"Oranges, navel, per lb (BLS)",BR_,"2026-05")
R("US","coffee",9.51,LB,"g",None,"Coffee, 100% ground roast, per lb (BLS)",BR_,"2026-05")
R("US","lettuce",1.96,LB,"g",None,"Lettuce, iceberg, per lb (BLS)","https://basketreport.pages.dev/prices/lettuce/","2026-05",note="per lb; a head ~ 1.25 lb")

R("DE","cheddar",12.90,1000,"g",None,"Cheese 1 kg (Berlin)","https://www.settle-in-berlin.com/cost-of-living-in-berlin/","undated",note="local cheese")
R("FR","milk",1.20,1000,"ml",None,"Milk 1 L (Paris)","https://blog.parisattitude.com/en/paris-cost-of-living","undated")
R("FR","pasta",1.50,1000,"g",None,"Pasta 1 kg (Paris)","https://blog.parisattitude.com/en/paris-cost-of-living","undated")
MXC = "https://www.mylifeelsewhere.com/cost-of-living/mexico/mexico-city-c3585 (Feb 2026)"
R("MX","tomatoes",15.64,LB,"g",None,"Tomatoes 1 lb (Mexico City)",MXC,"2026-02")
R("MX","potatoes",16.55,LB,"g",None,"Potatoes 1 lb (Mexico City)",MXC,"2026-02")
R("MX","onion",17.16,LB,"g",None,"Onions 1 lb (Mexico City)",MXC,"2026-02")
R("MX","cheddar",73.56,8*OZ,"g",None,"Local cheese 8 oz (Mexico average)",MXC,"2026-02",note="local cheese (queso)")
TU = 55.7/1.12
GCS = "https://www.globalcitizensolutions.com/cost-of-living-istanbul/ (2026, USD converted at %.1f TRY/USD)" % TU
R("TR","tomatoes",0.90*TU,1000,"g",None,"Tomatoes 1 kg (Istanbul, USD 0.90)",GCS,"2026")
R("TR","chicken_breast",3.00*TU,1000,"g",None,"Chicken fillets 1 kg (Istanbul, USD 3.00)",GCS,"2026")
R("TR","eggs",1.50*TU,12,"pc",None,"Eggs, dozen (Istanbul, USD 1.50)",GCS,"2026")

WCI = "https://wagecentre.com/immigration/life/prices-in-india (2026 averages)"
R("IN","cheddar",441.06,1000,"g",None,"Local cheese 1 kg",WCI,"2026",note="local cheese (paneer-style / processed)")
R("IN","orange",93.92,1000,"g",None,"Oranges 1 kg",WCI,"2026")
R("IN","onion",38.12,1000,"g",None,"Onions 1 kg",WCI,"2026")
R("IN","lettuce",43.98,1,"pc",None,"Lettuce, 1 head",WCI,"2026")
NBR = "https://www.numbeo.com/food-prices/in/Ratlam-India (updated 2026-05-18; per-kg from 0.10-0.30 kg units)"
R("IN","onion",20,1000,"g",None,"Onions (Ratlam)",NBR,"2026-05")
R("IN","orange",96,1000,"g",None,"Oranges (Ratlam)",NBR,"2026-05")
R("JP","white_cabbage",322,1,"pc",None,"Cabbage, 1 head (Shizuoka store, after rain-driven price rise)","https://www.freshplaza.com/asia/article/9879523/leafy-vegetable-prices-in-japan-rise-following-prolonged-rainfall/","2026-10")
R("JP","lettuce",322,1,"pc",None,"Lettuce, 1 head (Shizuoka store)","https://www.freshplaza.com/asia/article/9879523/leafy-vegetable-prices-in-japan-rise-following-prolonged-rainfall/","2026-10")
R("JP","onion",325,1000,"g",None,"Onions per kg (JPY 200-450, midpoint)","https://tokyointernationalmeetup.com/japan-food-prices-2026-expat-guide/","2026")
R("JP","tofu",75,300,"g",None,"Tofu block ~300 g (JPY 50-100, midpoint)","https://e-housing.jp/post/grocery-prices-in-japan-2026-basket-comparison","2026-01")
R("JP","soy_sauce",275,500,"ml",None,"Soy sauce 500 ml (JPY 200-350, midpoint)","https://e-housing.jp/post/grocery-prices-in-japan-2026-basket-comparison","2026-01")
NG10 = "https://nairametrics.com/2026/11/01/lagos-food-prices-maize-ogbono-and-garri-record-sharp-increases-in-october/ (Lagos markets survey, Oct 2026)"
C("NG","NGN")
R("NG","tomatoes",35000,50000,"g","market","Round tomatoes, big basket (~50 kg) (Lagos, Oct 2026)","https://www.finelib.com/knowledge/prices/products/Finelib-Prices-Fresh-Tomatoes-Nigeria-Reference-v1.html","2026-10",note="wholesale basket; weight approx 50 kg")
R("PK","tomatoes",325,1000,"g",None,"Tomatoes 1 kg, Lahore retail (Rs300-350; official Rs180-215)","https://tribune.com.pk/story/2639387/overcharging-nullifies-food-price-cuts","2026-11")
R("PK","garlic",310,1000,"g",None,"Garlic 1 kg, Lahore retail (Rs300-320)","https://tribune.com.pk/story/2639387/overcharging-nullifies-food-price-cuts","2026-11")

SV = "https://www.savings.com.au/statistics/grocery-price-index (July 2026)"
R("AU","onion",2.00,1000,"g","coles","Coles brown onions 1 kg",SV,"2026-07")
R("AU","onion",2.50,1000,"g","coles","Woolworths brown onions 1 kg",SV,"2026-07")
R("AU","bananas",4.90,1000,"g","coles","Coles bananas per kg",SV,"2026-07")
R("AU","bananas",5.35,1000,"g","coles","Woolworths bananas per kg",SV,"2026-07")
SCH = "https://www.statcan.gc.ca/en/topics-start/food-price (Statistics Canada Food Price Data Hub)"
R("CA","butter",5.68,454,"g",None,"Butter 454 g, national average",SCH,"2026-08")
R("CA","beef_mince",16.75,1000,"g",None,"Ground beef per kg, national average",SCH,"2026-08")
R("CA","chicken_breast",14.41,1000,"g",None,"Chicken breasts per kg, national average",SCH,"2026-08")
R("CA","eggs",4.83,12,"pc",None,"Eggs, 1 dozen, national average",SCH,"2026")
RC = "https://renardocuisine.pages.dev/reports/cost-of-cooking-2026 (Statistics Canada averages, July 2026)"
R("CA","white_loaf",3.60,1,"pc",None,"White bread 675 g, national average",RC,"2026-07",note="675 g loaf")
R("CA","butter",5.92,454,"g",None,"Butter 454 g, national average",RC,"2026-07")
R("CA","bananas",1.88,1000,"g",None,"Bananas per kg, national average",RC,"2026-07")
R("CA","potatoes",5.23,1000,"g",None,"Potatoes per kg, national average",RC,"2026-07")
R("CA","beef_mince",6.99*2.2046,1000,"g","nofrills","No Frills fresh ground beef ($6.99/lb flyer)","https://www.shopping-canada.com/flyers/no-frills/no-frills-weeklyflyer-from-september-3-to-september-9-2026","2026-09",kind="promo")

R("KR","napa_cabbage",10000/3,1,"pc","market","Napa cabbage (3 heads for 10,000 won, Gyeongdong market, Seoul)","https://newstomato.com/ReadNews.aspx?no=1319432","2026-11")
AG = "https://www.argaam.com/en/article/articledetail/id/1887066 (retail chain survey, Feb-Mar 2026; midpoint across chains)"
R("SA","chicken_legs",21.75,1000,"g",None,"Fresh chicken 1 kg (SAR 20.50-22.99 across chains)",AG,"2026-03",note="whole fresh chicken")
R("SA","eggs",22.7,30,"pc",None,"Al Wataniya eggs 30 pcs (SAR 21.50-23.95)",AG,"2026-03")
R("SA","basmati_rice",56,5000,"g",None,"AlWalimah rice 5 kg (SAR 50.65-61.40)",AG,"2026-03")

R("KE","maize_meal",167,2000,"g","naivas","Jogoo maize meal 2 kg (Naivas online)","https://naivas.online/jogoo-maize-meal-2kg","undated listing")
R("KE","maize_meal",180,2000,"g",None,"Maize flour 2 kg (Ksh150-210 across supermarkets, CBK survey)","https://www.money254.co.ke/post/5-food-items-set-for-price-increases-this-month---cbk-survey-news","2026-06")
R("KE","sugar",305,2000,"g",None,"Sugar 2 kg (average across supermarkets, CBK survey)","https://www.money254.co.ke/post/5-food-items-set-for-price-increases-this-month---cbk-survey-news","2026-06")
CN1 = "https://www.citinewsroom.com/2026/04/channel-one-tv-market-price-barometer-tomatoes-cassava-among-high-priced-staples/ (Accra market barometer, Apr 2026)"
R("GH","rice",73.50,5000,"g","market","Imported rice 5 kg bag (Accra markets average)",CN1,"2026-04")
R("GH","chicken_legs",33.40,1000,"g","market","Frozen chicken per kg (Accra markets average)",CN1,"2026-04",note="frozen chicken pieces")
PSA = "https://newswav.com/article/prices-of-rice-pork-drop-A2610_WNIhXI (PSA price situationer, mid-Oct 2026)"
R("PH","rice",56.25,1000,"g",None,"Well-milled rice 1 kg, national average retail (PSA)",PSA,"2026-10")
R("PH","pork_belly",342.97*0.5,500,"g",None,"Fresh pork liempo (belly), P342.97/kg national average (PSA)",PSA,"2026-10")

R("VN","rice",15700,1000,"g",None,"Gạo tẻ thường 1 kg (VND 14,600-16,800, national, Sep 2026)","https://www.nso.gov.vn/wp-content/uploads/2026/10/Tong-quan-CPI-chi-so-gia-vang-do-la-My-thang-9-QIII-va-9-thang-nam-2026.pdf","2026-09")
DS = "https://www.daily-sun.com/business/909039 (Dhaka kitchen markets, 2026-11-13)"
R("BD","eggs",132.5,12,"pc","market","Brown eggs, dozen (Tk 130-135, Shewrapara/Kazipara)",DS,"2026-11-13")
R("BD","beef_stew",800,1000,"g","market","Beef 1 kg (Dhaka)",DS,"2026-11-13")
R("BD","eggs",137.5,12,"pc","market","Brown eggs, dozen (Tk 135-140, Town Hall Market)","https://bdnews24.com/business/13snrxyj4f","2026-11-13")

EXA4("AT","EUR","https://expatarrivals.com/europe/austria/vienna/cost-living-vienna (Vienna, likely Nov 2025)","2025-11",4,1.50,2.70,13.50,"Vienna")
R("AT","white_loaf",2.50,1,"pc",None,"Loaf of white bread (Vienna)","https://expatarrivals.com/europe/austria/vienna/cost-living-vienna","2025-11")
R("AT","cheddar",9,500,"g",None,"Cheese 500 g (Vienna)","https://expatarrivals.com/europe/austria/vienna/cost-living-vienna","2025-11",note="local cheese")
EXA4("AT","EUR","https://www.expatica.com/at/cost-of-living/vienna/ (Numbeo 2026-06-01)","2026-06",4.42,1.60,2.33,12.87,"Vienna")
R("AT","eggs",5.42,12,"pc",None,"Eggs, 12 large (Vienna)","https://expatistan.com/price/eggs/vienna/EUR","2026-05")
U_ = 44.8/1.12
EXA4("UY","UYU","https://costliving.pages.dev/uruguay/ (2026; USD converted at %.0f UYU/USD)" % U_,"2026",2.50*U_,1.10*U_,None,6.0*U_)
EXA4("UY","UYU","https://www.bearsavings.com/cost-of-living/uruguay/ (mid-2026; USD converted at %.0f UYU/USD)" % U_,"2026-07",4.20*U_,1.15*U_,1.59*U_,10.47*U_)
C("PY","PYG")
R("PY","eggs",1.81*7950/1.12,12,"pc",None,"Eggs, dozen (USD 1.81)","https://mylifeelsewhere.com/cost-of-living/uruguay/paraguay","2026")
C("PY","PYG")
B_ = 11.2/1.12
C("BO","BOB")
R("BO","eggs",1.89*B_,12,"pc",None,"Eggs, dozen (USD 1.89)","https://livingcost.org/cost/bolivia/uruguay","2026")
R("BO","chicken_breast",4.72*B_,1000,"g",None,"Chicken breast 1 kg (USD 4.72)","https://livingcost.org/cost/bolivia/uruguay","2026")
EXA4("BW","BWP","https://expatarrivals.com/africa/botswana/cost-living-botswana (Gaborone, Oct 2026)","2026-10",33,20,27,67,"Gaborone")
EXA4("BW","BWP","https://www.riotimesonline.com/botswana-cost-of-living-2026/","2026",34.28,20.66,None,62.42)
EXA4("MZ","MZN","https://expatarrivals.com/mozambique/cost-of-living-in-mozambique (Maputo, July 2026)","2026-07",160,100,100,365,"Maputo")
AFN_ = "https://africarrieres.com/namibia/en/guide/decouvrir/cost-of-living (Feb 2026; midpoint of range)"
EXA4("NA","NAD",AFN_,"2026-02",37.5,16,20,75)
C("RW","RWF")
R("RW","eggs",2414,12,"pc",None,"Eggs, dozen","https://www.mylifeelsewhere.com/cost-of-living/namibia/rwanda","2026")
C("RW","RWF")

EXA4("OM","OMR","https://expatarrivals.com/middle-east/oman/cost-living-oman","undated",1.05,0.80,0.65,2.80,"Muscat")
EXA4("OM","OMR","https://citycost.org/compare/muscat-vs--ibri/ (Muscat, updated Jul 2026)","2026-07",0.93,0.76,0.66,1.88,"Muscat")
EXA4("KW","KWD","https://k2.expatarrivals.com/node/18320 (Kuwait City, Jan 2025)","2025-01",None,0.50,0.55,2.20,"Kuwait City")
R("KW","eggs",0.72,12,"pc",None,"Eggs, dozen (Kuwait City)","https://mylifeelsewhere.com/cost-of-living/kuwait-city-c7376/muscat-c7452","undated")
EXA4("LA","LAK","https://expatarrivals.com/asia-pacific/laos/cost-living-laos (Vientiane, July 2026)","2026-07",42000,45000,23000,139000,"Vientiane")
MNR = 4010/1.12
C("MN","MNT")
R("MN","eggs",2.21*MNR,12,"pc",None,"Eggs, dozen (Ulaanbaatar, USD 2.21)","https://mylifeelsewhere.com/cost-of-living/ulaanbaatar-c4711/vientiane-c4659","undated")
R("MN","chicken_breast",2.04*MNR,LB,"g",None,"Boneless chicken breast 1 lb (Ulaanbaatar, USD 2.04)","https://mylifeelsewhere.com/cost-of-living/ulaanbaatar-c4711/vientiane-c4659","undated")
AMR = 432/1.12
C("AM","AMD")
R("AM","eggs",2.73*AMR,12,"pc",None,"Eggs, dozen (Yerevan, USD 2.73)","https://livingcost.org/cost/vientiane/yerevan","2026")
R("AM","rice",2.26*AMR,1000,"g",None,"Rice 1 kg (Yerevan, USD 2.26)","https://livingcost.org/cost/vientiane/yerevan","2026")
LG_ = "https://livinginguatemala.com/food-prices/ (Numbeo-based, Feb 2026)"
C("GT","GTQ")
R("GT","eggs",18,12,"pc",None,"Eggs, dozen (Q18)",LG_,"2026-02")
R("GT","eggs",19.11,12,"pc",None,"Eggs, dozen (Q19.11)",LG_,"2026-02")
GTR = 8.6/1.12
EXA4("GT","GTQ","https://www.bearsavings.com/cost-of-living/guatemala/ (USD converted at %.2f GTQ/USD)" % GTR,"2026-07",2.32*GTR,1.98*GTR,1.85*GTR,7.96*GTR)
HNR = 29.5/1.12
EXA4("HN","HNL","https://www.bearsavings.com/cost-of-living/honduras/ (USD converted at %.1f HNL/USD)" % HNR,"2026-07",1.97*HNR,1.46*HNR,1.47*HNR,5.41*HNR)
EXA4("SV","USD","https://www.bearsavings.com/cost-of-living/el-salvador/","2026-07",2.61,1.88,1.60,5.74)
NIR = 41/1.12
EXA4("NI","NIO","https://foodtravelexplore.com/central-america/nicaragua/cost-of-living-guide-nicaragua/ (USD converted at %.1f NIO/USD)" % NIR,"2026",1.81*NIR,1.20*NIR,1.37*NIR,3.80*NIR)
C("MG","MGA")
R("MG","eggs",8482,12,"pc",None,"Eggs, dozen","https://mylifeelsewhere.com/cost-of-living/madagascar/zimbabwe","undated")
R("MG","chicken_breast",11794,1000,"g",None,"Chicken 1 kg","https://mylifeelsewhere.com/cost-of-living/madagascar/zimbabwe","undated")

BEAR("FI","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/finland/","2026-07",{"milk":1.28,"rice":2.73,"eggs":3.36,"chicken_breast":14.09})
R("FI","chicken_breast",12.25,1000,"g",None,"Chicken breast 1 kg","https://www.expatarrivals.com/europe/finland/cost-living-finland","2026")
R("FI","milk",1.35,1000,"ml",None,"Milk 1 L","https://www.expatarrivals.com/europe/finland/cost-living-finland","2026")
BEAR("HR","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/croatia/","2026-07",{"milk":1.24,"rice":2.99,"eggs":3.65,"chicken_breast":9.45})
BEAR("JM","JMD",179/1.12,"https://www.bearsavings.com/cost-of-living/jamaica/","2026-07",{"milk":3.42,"rice":1.44,"eggs":3.27,"chicken_breast":7.74})
BEAR("DO","DOP",71.7/1.12,"https://www.bearsavings.com/cost-of-living/dominican-republic/","2026-07",{"milk":1.27,"rice":1.27,"eggs":1.73,"chicken_breast":5.33})
BEAR("VE","VES",1009/1.12,"https://www.bearsavings.com/cost-of-living/venezuela/ (USD prices; converted at BCV rate)","2026",{"milk":1.86,"rice":1.31,"eggs":2.49,"chicken_breast":6.74})

BEAR("SK","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/slovakia/","2026-07",{"milk":1.11,"rice":1.96,"eggs":3.70,"chicken_breast":7.72})
BEAR("IQ","IQD",1467/1.12,"https://www.bearsavings.com/cost-of-living/iraq/","2026-07",{"milk":1.26,"rice":1.58,"eggs":1.77,"chicken_breast":4.24})
BEAR("ZW","USD",1.0,"https://www.bearsavings.com/cost-of-living/zimbabwe/","2026-08",{"milk":1.56,"rice":1.87,"eggs":2.11,"chicken_breast":5.65})
BEAR("TT","TTD",7.6/1.12,"https://www.bearsavings.com/cost-of-living/trinidad-and-tobago/","2026-07",{"milk":2.37,"rice":2.76,"eggs":4.19,"chicken_breast":9.03})

BEAR("EE","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/estonia/","2026-07",{"milk":1.19,"rice":2.58,"eggs":2.77,"chicken_breast":8.75})
BEAR("LT","EUR",1/1.12,"https://www.bearsavings.com/cost-of-living/lithuania/","2026-07",{"milk":1.49,"rice":2.53,"eggs":2.83,"chicken_breast":7.21})
