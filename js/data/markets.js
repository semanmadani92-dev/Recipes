/*
 * Where you shop: countries and stores for the price estimates.
 *
 * The ingredient prices in prices.js are German discounter prices in euros.
 * For any other country or store a price is estimated as
 *
 *   German price × country food price level × country shelf factor
 *                × store factor × store-type shelf factor × exchange rate
 *
 * - level: food prices compared with Germany (1 = same, in euros), rounded from
 *   Eurostat / World Bank / ICP food price level comparisons for 2024–2025.
 * - cat:   shelves that are notably cheaper or dearer there than the level says
 *          (rice and fish in Asia, spices in India, meat in Argentina, ...).
 * - rate:  approximate units of local currency per 1 euro (late 2025). People can
 *          change it in the app, because rates move.
 * - stores: [id, name, type, factor]. The factor compares the store with the
 *          cheapest discounter or hypermarket in that country (1 = cheapest).
 *
 * These are estimates to compare places, not quotes. Pack sizes stay German.
 */
window.STORE_TYPES = {
  discount: {},
  hyper: {},
  super: {},
  premium: {},
  organic: {},
  bulk: {},
  convenience: {},
  // fresh markets: produce, herbs and spices cheaper, packaged goods not
  market: { "Vegetables": 0.78, "Fruit": 0.78, "Fresh herbs": 0.6, "Spices": 0.75, "Fish": 0.9, "Cans & jars": 1.15, "Frozen": 1.2, "Sauces": 1.1 },
  // Turkish, Asian, Indian, Latin grocers abroad: spices, herbs, sauces and rice much cheaper
  ethnic: { "Spices": 0.6, "Fresh herbs": 0.55, "Sauces": 0.75, "Nuts & dried fruit": 0.75, "Grains & pasta": 0.9, "Vegetables": 0.9, "Dairy & eggs": 1.05 }
};

window.MARKETS = {
  DE: { cur: "EUR", rate: 1, level: 1, cat: {}, stores: [
    ["de_disc", "Aldi · Lidl · Penny · Netto", "discount", 1],
    ["de_kaufland", "Kaufland", "hyper", 1.08],
    ["de_rewe", "Rewe", "super", 1.3],
    ["de_edeka", "Edeka", "super", 1.32],
    ["de_ethnic", "Turkish & Asian grocers", "ethnic", 1.05],
    ["de_market", "Weekly market", "market", 1.35],
    ["de_bio", "Denns · Alnatura", "organic", 1.85]] },
  AT: { cur: "EUR", rate: 1, level: 1.1, cat: { "Meat": 1.05 }, stores: [
    ["at_disc", "Hofer · Lidl · Penny", "discount", 1],
    ["at_spar", "Spar", "super", 1.22],
    ["at_billa", "Billa", "super", 1.25],
    ["at_ethnic", "Turkish & Asian grocers", "ethnic", 1.05],
    ["at_bio", "Denns", "organic", 1.8]] },
  CH: { cur: "CHF", rate: 0.94, level: 1.62, cat: { "Meat": 1.3, "Dairy & eggs": 0.95 }, stores: [
    ["ch_disc", "Aldi Suisse · Lidl", "discount", 1],
    ["ch_denner", "Denner", "discount", 1.05],
    ["ch_migros", "Migros", "super", 1.22],
    ["ch_coop", "Coop", "super", 1.28],
    ["ch_bio", "Coop Naturaplan · Migros Bio", "organic", 1.65]] },
  FR: { cur: "EUR", rate: 1, level: 1.06, cat: { "Bakery": 0.9, "Meat": 1.08, "Dairy & eggs": 0.95 }, stores: [
    ["fr_disc", "Lidl · Aldi", "discount", 1],
    ["fr_leclerc", "E.Leclerc", "hyper", 1.02],
    ["fr_auchan", "Auchan · Intermarché", "hyper", 1.07],
    ["fr_carrefour", "Carrefour", "super", 1.12],
    ["fr_monoprix", "Monoprix", "premium", 1.35],
    ["fr_market", "Marché", "market", 1.25],
    ["fr_bio", "Biocoop", "organic", 1.75]] },
  BE: { cur: "EUR", rate: 1, level: 1.08, cat: {}, stores: [
    ["be_disc", "Aldi · Lidl", "discount", 1],
    ["be_colruyt", "Colruyt", "hyper", 1.04],
    ["be_carrefour", "Carrefour", "super", 1.15],
    ["be_delhaize", "Delhaize", "super", 1.25],
    ["be_bio", "Bio-Planet", "organic", 1.7]] },
  NL: { cur: "EUR", rate: 1, level: 1.02, cat: { "Dairy & eggs": 0.9 }, stores: [
    ["nl_disc", "Aldi · Lidl", "discount", 1],
    ["nl_dirk", "Dirk", "discount", 1.03],
    ["nl_jumbo", "Jumbo", "super", 1.15],
    ["nl_ah", "Albert Heijn", "super", 1.2],
    ["nl_ethnic", "Turkish & Asian grocers", "ethnic", 1.05],
    ["nl_bio", "Ekoplaza", "organic", 1.75]] },
  ES: { cur: "EUR", rate: 1, level: 0.9, cat: { "Fish": 0.85, "Oils & vinegar": 0.85, "Vegetables": 0.85, "Fruit": 0.85, "Meat": 0.95 }, stores: [
    ["es_disc", "Lidl · Aldi · Dia", "discount", 1],
    ["es_mercadona", "Mercadona", "super", 1.02],
    ["es_carrefour", "Carrefour", "hyper", 1.08],
    ["es_market", "Mercado", "market", 1.1],
    ["es_eci", "El Corte Inglés", "premium", 1.4]] },
  IT: { cur: "EUR", rate: 1, level: 1, cat: { "Grains & pasta": 0.8, "Oils & vinegar": 0.85, "Vegetables": 0.9, "Fruit": 0.9 }, stores: [
    ["it_disc", "Eurospin · Lidl", "discount", 1],
    ["it_carrefour", "Carrefour", "super", 1.15],
    ["it_conad", "Conad · Coop", "super", 1.18],
    ["it_esselunga", "Esselunga", "super", 1.22],
    ["it_market", "Mercato", "market", 1.15],
    ["it_bio", "NaturaSì", "organic", 1.75]] },
  PT: { cur: "EUR", rate: 1, level: 0.88, cat: { "Fish": 0.8, "Oils & vinegar": 0.85 }, stores: [
    ["pt_disc", "Lidl · Aldi", "discount", 1],
    ["pt_pingo", "Pingo Doce", "super", 1.07],
    ["pt_continente", "Continente", "hyper", 1.1],
    ["pt_eci", "El Corte Inglés", "premium", 1.4]] },
  PL: { cur: "PLN", rate: 4.25, level: 0.72, cat: { "Vegetables": 0.85, "Meat": 0.9, "Fish": 1.1, "Sauces": 1.15 }, stores: [
    ["pl_disc", "Biedronka · Lidl · Aldi", "discount", 1],
    ["pl_kaufland", "Kaufland · Auchan", "hyper", 1.05],
    ["pl_carrefour", "Carrefour", "super", 1.12],
    ["pl_zabka", "Żabka", "convenience", 1.38]] },
  SE: { cur: "SEK", rate: 11.0, level: 1.1, cat: { "Fish": 0.9, "Meat": 1.1 }, stores: [
    ["se_disc", "Willys · Lidl", "discount", 1],
    ["se_coop", "Coop", "super", 1.15],
    ["se_ica", "ICA", "super", 1.2]] },
  GB: { cur: "GBP", rate: 0.86, level: 1.0, cat: { "Dairy & eggs": 0.95, "Spices": 0.9 }, stores: [
    ["gb_disc", "Aldi · Lidl", "discount", 1],
    ["gb_asda", "Asda", "super", 1.06],
    ["gb_tesco", "Tesco", "super", 1.12],
    ["gb_sainsburys", "Sainsbury's · Morrisons", "super", 1.15],
    ["gb_ethnic", "Asian & world food grocers", "ethnic", 1.04],
    ["gb_waitrose", "Waitrose · M&S", "premium", 1.45]] },
  IE: { cur: "EUR", rate: 1, level: 1.1, cat: {}, stores: [
    ["ie_disc", "Aldi · Lidl", "discount", 1],
    ["ie_tesco", "Tesco · Dunnes", "super", 1.12],
    ["ie_supervalu", "SuperValu", "super", 1.18]] },
  RU: { cur: "RUB", rate: 95, level: 0.58, cat: { "Vegetables": 0.85, "Spices": 1.2, "Sauces": 1.25, "Cans & jars": 1.15, "Fish": 1.05 }, stores: [
    ["ru_disc", "Pyaterochka · Magnit", "discount", 1],
    ["ru_lenta", "Lenta", "hyper", 1.04],
    ["ru_perek", "Perekrestok", "super", 1.12],
    ["ru_vkusvill", "VkusVill", "super", 1.18],
    ["ru_market", "Rynok", "market", 1.05],
    ["ru_azbuka", "Azbuka Vkusa", "premium", 1.55]] },
  UA: { cur: "UAH", rate: 48, level: 0.5, cat: { "Vegetables": 0.8, "Meat": 0.95, "Sauces": 1.3, "Spices": 1.2 }, stores: [
    ["ua_atb", "ATB", "discount", 1],
    ["ua_auchan", "Auchan", "hyper", 1.05],
    ["ua_silpo", "Silpo · Novus", "super", 1.15],
    ["ua_market", "Rynok", "market", 1.0]] },
  TR: { cur: "TRY", rate: 49, level: 0.62, cat: { "Meat": 1.45, "Dairy & eggs": 1.05, "Spices": 0.55, "Nuts & dried fruit": 0.7, "Vegetables": 0.75, "Fruit": 0.75, "Fresh herbs": 0.5, "Sauces": 1.3, "Fish": 1.1 }, stores: [
    ["tr_disc", "BİM · A101 · ŞOK", "discount", 1],
    ["tr_migros", "Migros", "super", 1.15],
    ["tr_carrefour", "CarrefourSA", "super", 1.15],
    ["tr_pazar", "Pazar", "market", 1.0],
    ["tr_macro", "Macrocenter", "premium", 1.45]] },
  US: { cur: "USD", rate: 1.16, level: 1.25, cat: { "Dairy & eggs": 1.15, "Meat": 1.05, "Bakery": 1.15, "Fruit": 1.05, "Frozen": 0.9, "Sauces": 0.95 }, stores: [
    ["us_aldi", "Aldi", "discount", 1],
    ["us_walmart", "Walmart", "hyper", 1.03],
    ["us_costco", "Costco", "bulk", 0.92],
    ["us_kroger", "Kroger", "super", 1.12],
    ["us_target", "Target", "super", 1.12],
    ["us_tj", "Trader Joe's", "super", 1.1],
    ["us_ethnic", "Asian & Latino grocers", "ethnic", 1.0],
    ["us_safeway", "Safeway", "super", 1.3],
    ["us_wf", "Whole Foods", "organic", 1.55]] },
  CA: { cur: "CAD", rate: 1.61, level: 1.25, cat: { "Dairy & eggs": 1.25, "Meat": 1.1, "Fruit": 1.1 }, stores: [
    ["ca_nofrills", "No Frills · FreshCo", "discount", 1],
    ["ca_walmart", "Walmart", "hyper", 1.02],
    ["ca_costco", "Costco", "bulk", 0.92],
    ["ca_loblaws", "Loblaws · Metro", "super", 1.2],
    ["ca_sobeys", "Sobeys", "super", 1.22]] },
  MX: { cur: "MXN", rate: 21.5, level: 0.78, cat: { "Vegetables": 0.75, "Fruit": 0.7, "Fresh herbs": 0.45, "Spices": 0.8, "Dairy & eggs": 1.1, "Sauces": 1.15, "Fish": 1.1 }, stores: [
    ["mx_bodega", "Bodega Aurrera", "discount", 1],
    ["mx_walmart", "Walmart", "hyper", 1.05],
    ["mx_soriana", "Soriana · Chedraui", "hyper", 1.07],
    ["mx_market", "Mercado / tianguis", "market", 0.95],
    ["mx_lacomer", "La Comer · City Market", "premium", 1.3]] },
  BR: { cur: "BRL", rate: 6.3, level: 0.62, cat: { "Meat": 0.8, "Fruit": 0.65, "Vegetables": 0.85, "Grains & pasta": 0.9, "Dairy & eggs": 1.1, "Cans & jars": 1.2, "Fish": 1.2, "Spices": 1.1 }, stores: [
    ["br_atac", "Atacadão · Assaí", "bulk", 1],
    ["br_carrefour", "Carrefour", "hyper", 1.12],
    ["br_feira", "Feira", "market", 1.0],
    ["br_pao", "Pão de Açúcar", "premium", 1.35]] },
  AR: { cur: "ARS", rate: 1550, level: 0.8, cat: { "Meat": 0.6, "Fruit": 0.8, "Fish": 1.3, "Sauces": 1.3, "Spices": 1.2 }, stores: [
    ["ar_dia", "Día", "discount", 1],
    ["ar_coto", "Coto", "hyper", 1.05],
    ["ar_carrefour", "Carrefour", "super", 1.1],
    ["ar_jumbo", "Jumbo", "premium", 1.22]] },
  IN: { cur: "INR", rate: 102, level: 0.34, cat: { "Spices": 0.5, "Fresh herbs": 0.35, "Vegetables": 0.8, "Grains & pasta": 0.85, "Nuts & dried fruit": 0.9, "Dairy & eggs": 1.15, "Meat": 1.3, "Fish": 1.05, "Sauces": 1.4, "Cans & jars": 1.5, "Frozen": 1.4, "Oils & vinegar": 1.2, "Bakery": 1.2 }, stores: [
    ["in_dmart", "DMart", "hyper", 1],
    ["in_reliance", "Reliance Fresh · Smart", "super", 1.05],
    ["in_more", "More · Spencer's", "super", 1.1],
    ["in_kirana", "Kirana · sabzi mandi", "market", 0.95],
    ["in_natures", "Nature's Basket", "premium", 1.5]] },
  PK: { cur: "PKR", rate: 328, level: 0.33, cat: { "Spices": 0.5, "Fresh herbs": 0.35, "Vegetables": 0.8, "Meat": 1.15, "Dairy & eggs": 1.15, "Sauces": 1.4, "Cans & jars": 1.5, "Frozen": 1.4 }, stores: [
    ["pk_imtiaz", "Imtiaz", "hyper", 1],
    ["pk_metro", "Metro", "bulk", 0.98],
    ["pk_carrefour", "Carrefour", "hyper", 1.08],
    ["pk_alfatah", "Al-Fatah", "super", 1.1],
    ["pk_market", "Local bazaar", "market", 0.95]] },
  BD: { cur: "BDT", rate: 141, level: 0.4, cat: { "Spices": 0.55, "Fresh herbs": 0.4, "Fish": 0.7, "Vegetables": 0.8, "Grains & pasta": 0.85, "Dairy & eggs": 1.2, "Sauces": 1.4, "Cans & jars": 1.5, "Frozen": 1.4 }, stores: [
    ["bd_shwapno", "Shwapno", "super", 1],
    ["bd_meena", "Meena Bazar · Agora", "super", 1.06],
    ["bd_unimart", "Unimart", "premium", 1.2],
    ["bd_market", "Kacha bazar", "market", 0.95]] },
  CN: { cur: "CNY", rate: 8.3, level: 0.62, cat: { "Sauces": 0.55, "Spices": 0.6, "Vegetables": 0.7, "Fish": 0.75, "Grains & pasta": 0.85, "Dairy & eggs": 1.45, "Bakery": 1.2, "Cans & jars": 1.3, "Oils & vinegar": 1.05 }, stores: [
    ["cn_rt", "RT-Mart · Yonghui", "hyper", 1],
    ["cn_walmart", "Walmart · Sam's Club", "hyper", 1.03],
    ["cn_hema", "Hema", "super", 1.15],
    ["cn_market", "Wet market", "market", 0.9],
    ["cn_ole", "Ole'", "premium", 1.5]] },
  JP: { cur: "JPY", rate: 175, level: 1.0, cat: { "Fish": 0.7, "Sauces": 0.65, "Grains & pasta": 1.3, "Fruit": 1.6, "Vegetables": 1.15, "Dairy & eggs": 1.3, "Meat": 1.15, "Spices": 1.2, "Oils & vinegar": 1.1 }, stores: [
    ["jp_gyomu", "Gyomu Super", "discount", 1],
    ["jp_aeon", "Aeon", "hyper", 1.08],
    ["jp_life", "Life · Ito-Yokado", "super", 1.12],
    ["jp_konbini", "7-Eleven · Lawson", "convenience", 1.35],
    ["jp_seijo", "Seijo Ishii", "premium", 1.4]] },
  KR: { cur: "KRW", rate: 1650, level: 1.35, cat: { "Fruit": 1.6, "Vegetables": 1.2, "Meat": 1.2, "Dairy & eggs": 1.25, "Fish": 0.85, "Sauces": 0.65, "Spices": 0.9 }, stores: [
    ["kr_emart", "Emart · Homeplus", "hyper", 1],
    ["kr_lotte", "Lotte Mart", "hyper", 1.03],
    ["kr_costco", "Costco", "bulk", 0.93],
    ["kr_market", "Traditional market", "market", 0.9],
    ["kr_conv", "GS25 · CU", "convenience", 1.35]] },
  VN: { cur: "VND", rate: 30500, level: 0.5, cat: { "Fish": 0.7, "Sauces": 0.6, "Fresh herbs": 0.35, "Spices": 0.6, "Vegetables": 0.75, "Grains & pasta": 0.8, "Dairy & eggs": 1.5, "Bakery": 1.2, "Cans & jars": 1.3 }, stores: [
    ["vn_bhx", "Bách Hóa Xanh", "discount", 1],
    ["vn_winmart", "WinMart · Co.opmart", "super", 1.04],
    ["vn_market", "Chợ", "market", 0.9],
    ["vn_aeon", "Aeon · Lotte Mart", "hyper", 1.12]] },
  ID: { cur: "IDR", rate: 19300, level: 0.5, cat: { "Fish": 0.7, "Sauces": 0.6, "Spices": 0.55, "Fresh herbs": 0.4, "Vegetables": 0.8, "Dairy & eggs": 1.5, "Bakery": 1.2, "Cans & jars": 1.3, "Meat": 1.1 }, stores: [
    ["id_hyper", "Hypermart · Transmart", "hyper", 1],
    ["id_mini", "Indomaret · Alfamart", "convenience", 1.06],
    ["id_superindo", "Superindo", "super", 1.08],
    ["id_pasar", "Pasar", "market", 0.88],
    ["id_ranch", "Ranch Market", "premium", 1.35]] },
  EG: { cur: "EGP", rate: 56, level: 0.33, cat: { "Bakery": 0.5, "Vegetables": 0.65, "Fruit": 0.7, "Fresh herbs": 0.4, "Spices": 0.6, "Meat": 1.4, "Dairy & eggs": 1.2, "Cans & jars": 1.3, "Sauces": 1.4 }, stores: [
    ["eg_kazyon", "Kazyon", "discount", 1],
    ["eg_hyperone", "Hyper One", "hyper", 1.02],
    ["eg_carrefour", "Carrefour", "hyper", 1.1],
    ["eg_souq", "Souq", "market", 0.9],
    ["eg_seoudi", "Seoudi · Gourmet", "premium", 1.25]] },
  SA: { cur: "SAR", rate: 4.35, level: 0.85, cat: { "Spices": 0.7, "Nuts & dried fruit": 0.8, "Fresh herbs": 0.8, "Grains & pasta": 0.85, "Dairy & eggs": 0.9 }, stores: [
    ["sa_othaim", "Othaim", "hyper", 1],
    ["sa_lulu", "Lulu · Panda", "hyper", 1.03],
    ["sa_carrefour", "Carrefour", "hyper", 1.08],
    ["sa_danube", "Danube · Tamimi", "premium", 1.22]] },
  AE: { cur: "AED", rate: 4.26, level: 1.0, cat: { "Spices": 0.7, "Nuts & dried fruit": 0.8, "Fresh herbs": 0.85, "Grains & pasta": 0.85 }, stores: [
    ["ae_union", "Union Coop · Lulu", "hyper", 1],
    ["ae_carrefour", "Carrefour", "hyper", 1.08],
    ["ae_spinneys", "Spinneys · Waitrose", "premium", 1.42]] },
  NG: { cur: "NGN", rate: 1700, level: 0.5, cat: { "Spices": 0.6, "Vegetables": 0.8, "Grains & pasta": 1.05, "Dairy & eggs": 1.5, "Cans & jars": 1.4, "Sauces": 1.4, "Meat": 1.1, "Frozen": 1.4 }, stores: [
    ["ng_market", "Open market", "market", 0.9],
    ["ng_justrite", "Justrite", "discount", 1],
    ["ng_shoprite", "Shoprite", "super", 1.15],
    ["ng_spar", "Spar", "super", 1.18]] },
  KE: { cur: "KES", rate: 150, level: 0.55, cat: { "Vegetables": 0.75, "Fruit": 0.7, "Spices": 0.65, "Dairy & eggs": 1.2, "Cans & jars": 1.35, "Sauces": 1.35 }, stores: [
    ["ke_naivas", "Naivas · Quickmart", "super", 1],
    ["ke_carrefour", "Carrefour", "hyper", 1.08],
    ["ke_market", "Open-air market", "market", 0.88],
    ["ke_chandarana", "Chandarana", "premium", 1.25]] },
  ZA: { cur: "ZAR", rate: 20.5, level: 0.62, cat: { "Meat": 0.9, "Fruit": 0.8, "Dairy & eggs": 1.1 }, stores: [
    ["za_shoprite", "Shoprite · Boxer", "discount", 1],
    ["za_checkers", "Checkers", "super", 1.08],
    ["za_pnp", "Pick n Pay · Spar", "super", 1.1],
    ["za_woolies", "Woolworths", "premium", 1.4]] },
  AU: { cur: "AUD", rate: 1.78, level: 1.2, cat: { "Meat": 0.95, "Fruit": 1.15, "Fish": 1.2, "Dairy & eggs": 1.05 }, stores: [
    ["au_aldi", "Aldi", "discount", 1],
    ["au_coles", "Coles · Woolworths", "super", 1.18],
    ["au_iga", "IGA", "super", 1.25],
    ["au_harris", "Harris Farm", "premium", 1.35]] },
  NZ: { cur: "NZD", rate: 1.95, level: 1.18, cat: { "Dairy & eggs": 1.15, "Fruit": 1.1 }, stores: [
    ["nz_paknsave", "Pak'nSave", "discount", 1],
    ["nz_woolworths", "Woolworths", "super", 1.15],
    ["nz_newworld", "New World", "super", 1.18]] }
};
