/*
 * Approximate energy values for every ingredient, used for "kcal per serving".
 * For ingredients measured in g or ml: kcal per 100 g / 100 ml.
 * For everything else: kcal per unit of the price list (per egg, per can, per clove, ...).
 * Values are rounded averages from common food tables; treat results as estimates.
 */
window.KCAL = {
  // pantry, spices, baking
  salt: 0, black_pepper: 250, sugar: 400, brown_sugar: 380, flour: 345, cornstarch: 350, cocoa: 360, honey: 305,
  breadcrumbs: 360, cumin: 375, paprika: 280, smoked_paprika: 280, chili_flakes: 300, turmeric: 310, garam_masala: 380,
  curry_powder: 325, cinnamon: 250, oregano: 265, thyme: 275, bay_leaves: 310, ground_coriander: 300, cardamom: 310,
  nutmeg: 525, caraway: 330, allspice: 260, cloves: 275, star_anise: 340, sichuan_pepper: 300, saffron: 310,
  ras_el_hanout: 320, berbere: 300, sumac: 240, sesame_seeds: 575, white_pepper: 300, garlic_powder: 330, cayenne: 320,
  chili_powder: 300, kashmiri_chili: 300, fennel_seeds: 345, mustard_seeds: 500, fenugreek: 320, five_spice: 350,
  gochugaru: 300, poppy_seeds: 525, dried_mint: 280, coriander_seeds: 300, marjoram: 270, zaatar: 300, baharat: 300,
  pav_bhaji_masala: 300, nihari_masala: 300, ancho_chilies: 280, powdered_sugar: 400, pearl_sugar: 400,
  golden_syrup: 320, condensed_milk: 320, dulce_de_leche: 315, chocolate_sprinkles: 450, jam: 250, dark_chocolate: 550,
  desiccated_coconut: 660, coffee: 2, wholemeal_flour: 330, buckwheat_flour: 340, chickpea_flour: 380, rice_flour: 365,
  tapioca_starch: 355, panko: 370, custard_powder: 130, baking_powder: 15, dry_yeast: 25, vanilla_sugar: 32,
  baking_soda: 0, gelatin: 6,
  // grains, pasta, bread
  rice: 350, basmati_rice: 350, jasmine_rice: 350, sushi_rice: 350, risotto_rice: 350, glutinous_rice: 370,
  spaghetti: 355, pasta: 355, lasagne_sheets: 355, orzo: 355, vermicelli: 355, egg_noodles: 380, ramen_noodles: 360,
  rice_noodles: 360, rice_vermicelli: 360, glass_noodles: 350, soba_noodles: 340, couscous: 360, bulgur: 340,
  pearl_barley: 350, arepa_flour: 360, polenta: 360, maize_meal: 360, oats: 370, tteok: 230,
  puff_pastry: 400, filo_pastry: 300, shortcrust_pastry: 450, stale_bread: 265, lebkuchen: 380, ladyfingers: 390,
  crackers: 450, digestive_biscuits: 480, rice_paper: 35,
  baguette: 650, burger_buns: 160, pita: 220, corn_tortillas: 55, white_loaf: 1300, chapati_ready: 180,
  bread_dumplings: 1200, dumpling_wrappers: 25, spring_roll_wrappers: 30, toast_bread: 70, rye_bread: 100,
  // legumes, cans, jars, sauces
  dried_chickpeas: 360, red_lentils: 340, brown_lentils: 330, split_peas: 340,
  chickpeas_can: 300, black_beans_can: 300, kidney_beans_can: 280, white_beans_can: 280, fava_beans_can: 300,
  black_eyed_beans_can: 280, baked_beans: 350, chopped_tomatoes: 80, coconut_milk: 720, sweetcorn_can: 210,
  pineapple_can: 200, tuna_can: 140, bamboo_shoots: 40, hominy_can: 320,
  passata: 30, tomato_paste: 90, olives: 140, pickles: 20, sauerkraut: 20, capers: 25, ajvar: 80, hummus_ready: 300,
  cranberry_sauce: 180, kimchi_jar: 25, morello_cherries: 80, horseradish: 70,
  miso: 200, gochujang: 230, doubanjiang: 180, green_curry_paste: 130, red_curry_paste: 130, massaman_paste: 250,
  laksa_paste: 250, curry_roux: 510, tamarind: 240, harissa: 120, tahini: 600, peanut_butter: 600, mustard: 90,
  chili_paste: 100, sambal_oelek: 60, aji_amarillo: 60, achiote_paste: 200, wakame: 200, nori: 5,
  soy_sauce: 55, dark_soy_sauce: 80, kecap_manis: 300, fish_sauce: 35, oyster_sauce: 120, hoisin: 220, mirin: 230,
  ketchup: 100, curry_ketchup: 120, mayonnaise: 680, worcestershire: 80, hot_sauce: 10, sweet_chili_sauce: 230,
  chili_oil: 800, pomegranate_molasses: 280, date_syrup: 300, maple_syrup: 260, zurek_starter: 40,
  vegetable_stock: 10, chicken_stock: 12, beef_stock: 12, fish_stock: 10,
  // oils, vinegars, drinks
  vegetable_oil: 830, olive_oil: 820, sesame_oil: 820, white_vinegar: 20, red_wine_vinegar: 20, rice_vinegar: 20,
  apple_cider_vinegar: 20, red_wine: 70, white_wine: 70, beer: 43, dark_beer: 50, shaoxing_wine: 100, kirsch: 230,
  coconut_water: 19,
  // nuts, seeds, dried fruit
  raisins: 300, almonds: 600, peanuts: 590, pine_nuts: 670, walnuts: 650, hazelnuts: 630, pistachios: 560,
  pumpkin_seeds: 560, egusi: 560, dates: 280, dried_apricots: 240,
  // dairy & eggs
  butter: 740, milk: 64, cream: 300, sour_cream: 240, yogurt: 65, greek_yogurt: 120, buttermilk: 37, kefir: 55,
  parmesan: 400, pecorino: 390, mozzarella: 250, feta: 270, cheddar: 400, emmental: 380, mountain_cheese: 400,
  paneer: 300, mascarpone: 430, quark: 70, ricotta: 150, cream_cheese: 250, halloumi: 320, blue_cheese: 350,
  tofu: 130, eggs: 80,
  // meat
  beef_mince: 250, mixed_mince: 260, pork_mince: 250, lamb_mince: 280, beef_stew: 160, beef_strips: 140,
  beef_steak: 160, beef_roulade: 130, beef_roast: 150, veal_cutlet: 110, chicken_breast: 110, chicken_thighs: 180,
  chicken_legs: 150, chicken_wings: 200, duck_legs: 600, pork_shoulder: 210, pork_belly: 500, pork_schnitzel: 120,
  pork_ribs: 270, lamb_shoulder: 250, lamb_leg: 200, bacon: 300, bacon_rashers: 400, pancetta: 380, prosciutto: 250,
  ham: 110, salami: 400, chorizo: 450, chorizo_fresh: 300, bratwurst: 300, smoked_sausage: 300,
  toulouse_sausage: 300, blood_sausage: 380,
  // fish
  salmon: 200, smoked_salmon: 180, white_fish: 80, salt_cod: 110, shrimp: 85, mussels: 30, anchovies: 200,
  // vegetables
  onion: 40, red_onion: 40, shallots: 70, garlic: 4, ginger: 80, potatoes: 75, floury_potatoes: 75,
  sweet_potatoes: 86, carrots: 40, beetroot: 43, turnip: 30, parsnip: 75, celeriac: 40, white_radish: 18,
  fresh_chili: 40, scotch_bonnet: 40, tomatoes: 20, cherry_tomatoes: 25, kale: 50, spinach: 23, frozen_spinach: 25,
  mushrooms: 22, peas: 80, green_beans: 30, bean_sprouts: 30, okra: 33, white_asparagus: 20,
  celery: 6, lemongrass: 10, spring_onions: 25, radishes: 20, kaffir_lime_leaves: 0,
  bell_pepper: 40, zucchini: 45, eggplant: 75, cucumber: 50, lettuce: 50, white_cabbage: 250, red_cabbage: 300,
  napa_cabbage: 120, leek: 90, cauliflower: 150, pumpkin: 300, pak_choi: 20, green_papaya: 300,
  poblano_peppers: 40, corn_cobs: 220, fennel: 75,
  // herbs
  parsley: 20, coriander: 10, basil: 10, mint: 10, dill: 10, chives: 10, rosemary: 5, sage: 5,
  // fruit
  avocado: 240, lemon: 20, lime: 15, mango: 200, plantain: 300, bananas: 105, orange: 60, apples: 52, berries: 45,
  plums: 46
};
