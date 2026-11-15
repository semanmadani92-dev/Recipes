/*
 * Famous dishes by country. Ingredient quantities use the unit of the matching
 * entry in prices.js (g, ml, pc, clove, bunch, can, cube, sachet, sheet, stalk).
 * Recipe format: [ingredientId, quantity, optional note]
 */
window.COUNTRIES = {
  "380": { name: "Italy",          region: "Europe",      lat: 42.8,  lng: 12.5 },
  "250": { name: "France",         region: "Europe",      lat: 46.6,  lng: 2.4 },
  "724": { name: "Spain",          region: "Europe",      lat: 40.2,  lng: -3.6 },
  "276": { name: "Germany",        region: "Europe",      lat: 51.1,  lng: 10.4 },
  "040": { name: "Austria",        region: "Europe",      lat: 47.6,  lng: 14.1 },
  "348": { name: "Hungary",        region: "Europe",      lat: 47.2,  lng: 19.4 },
  "300": { name: "Greece",         region: "Europe",      lat: 39.3,  lng: 22.0 },
  "826": { name: "United Kingdom", region: "Europe",      lat: 53.0,  lng: -1.8 },
  "616": { name: "Poland",         region: "Europe",      lat: 52.1,  lng: 19.4 },
  "804": { name: "Ukraine",        region: "Europe",      lat: 49.0,  lng: 31.4 },
  "752": { name: "Sweden",         region: "Europe",      lat: 62.0,  lng: 15.0 },
  "756": { name: "Switzerland",    region: "Europe",      lat: 46.8,  lng: 8.2 },
  "620": { name: "Portugal",       region: "Europe",      lat: 39.6,  lng: -8.0 },
  "643": { name: "Russia",         region: "Europe",      lat: 56.0,  lng: 40.0 },
  "792": { name: "Turkey",         region: "Middle East", lat: 39.0,  lng: 35.2 },
  "422": { name: "Lebanon",        region: "Middle East", lat: 33.9,  lng: 35.9 },
  "364": { name: "Iran",           region: "Middle East", lat: 32.4,  lng: 53.7 },
  "818": { name: "Egypt",          region: "Africa",      lat: 26.8,  lng: 30.8 },
  "504": { name: "Morocco",        region: "Africa",      lat: 31.8,  lng: -7.1 },
  "231": { name: "Ethiopia",       region: "Africa",      lat: 9.1,   lng: 40.5 },
  "566": { name: "Nigeria",        region: "Africa",      lat: 9.1,   lng: 8.7 },
  "686": { name: "Senegal",        region: "Africa",      lat: 14.5,  lng: -14.5 },
  "710": { name: "South Africa",   region: "Africa",      lat: -30.6, lng: 22.9 },
  "356": { name: "India",          region: "Asia",        lat: 21.0,  lng: 78.9 },
  "156": { name: "China",          region: "Asia",        lat: 34.0,  lng: 104.2 },
  "392": { name: "Japan",          region: "Asia",        lat: 36.2,  lng: 138.3 },
  "410": { name: "South Korea",    region: "Asia",        lat: 36.5,  lng: 127.9 },
  "764": { name: "Thailand",       region: "Asia",        lat: 15.9,  lng: 100.9 },
  "704": { name: "Vietnam",        region: "Asia",        lat: 16.0,  lng: 107.8 },
  "360": { name: "Indonesia",      region: "Asia",        lat: -2.5,  lng: 118.0 },
  "608": { name: "Philippines",    region: "Asia",        lat: 12.9,  lng: 121.8 },
  "484": { name: "Mexico",         region: "Americas",    lat: 23.6,  lng: -102.6 },
  "840": { name: "United States",  region: "Americas",    lat: 39.8,  lng: -98.6 },
  "124": { name: "Canada",         region: "Americas",    lat: 56.1,  lng: -106.3 },
  "076": { name: "Brazil",         region: "Americas",    lat: -10.3, lng: -51.9 },
  "032": { name: "Argentina",      region: "Americas",    lat: -36.4, lng: -63.6 },
  "604": { name: "Peru",           region: "Americas",    lat: -9.2,  lng: -75.0 },
  "170": { name: "Colombia",       region: "Americas",    lat: 4.6,   lng: -74.3 },
  "388": { name: "Jamaica",        region: "Americas",    lat: 18.1,  lng: -77.3 },
  "036": { name: "Australia",      region: "Oceania",     lat: -25.3, lng: 134.0 }
};

window.RECIPES = [
  // ================= ITALY =================
  { id: "carbonara", name: "Spaghetti Carbonara", country: "380", serves: 4, time: 25, level: "Easy",
    desc: "Rome's famous pasta: crisp pork cheek, egg yolks and Pecorino-style cheese, no cream.",
    ing: [["spaghetti", 400], ["pancetta", 150], ["eggs", 4, "2 whole + 2 yolks"], ["parmesan", 80, "finely grated"], ["black_pepper", 3], ["salt", 10, "for the pasta water"]],
    steps: ["Cook the spaghetti in well-salted boiling water until al dente.", "Fry the pancetta in a dry pan until crisp, then take the pan off the heat.", "Whisk eggs, yolks, cheese and plenty of black pepper in a bowl.", "Toss the drained pasta with the pancetta, then stir in the egg mix off the heat with a splash of pasta water until glossy and creamy.", "Serve straight away with more cheese and pepper."] },
  { id: "margherita", name: "Pizza Margherita", country: "380", serves: 2, time: 120, level: "Medium",
    desc: "The Naples classic in the colors of the Italian flag: tomato, mozzarella and basil.",
    ing: [["flour", 300], ["dry_yeast", 0.5, "half a sachet"], ["salt", 6], ["olive_oil", 20], ["passata", 200], ["mozzarella", 250], ["basil", 0.5], ["oregano", 1]],
    steps: ["Mix flour, yeast, salt, 190 ml lukewarm water and half the oil into a smooth dough. Knead 10 minutes.", "Cover and let it rise for at least 1 hour, until doubled.", "Heat the oven as hot as it goes (250 °C+) with a tray inside.", "Season the passata with salt and oregano. Stretch the dough into two thin rounds.", "Spread with sauce, add torn mozzarella and bake 8–10 minutes on the hot tray.", "Finish with fresh basil and a drizzle of olive oil."] },
  { id: "risotto-funghi", name: "Mushroom Risotto", country: "380", serves: 4, time: 40, level: "Medium",
    desc: "Creamy northern Italian rice slowly cooked with stock, mushrooms, butter and Parmesan.",
    ing: [["risotto_rice", 320], ["mushrooms", 400], ["onion", 100], ["garlic", 2], ["white_wine", 120], ["vegetable_stock", 2, "in 1.2 l hot water"], ["butter", 40], ["parmesan", 60], ["olive_oil", 20], ["parsley", 0.5]],
    steps: ["Dissolve the stock cubes in 1.2 l hot water and keep it simmering.", "Fry the sliced mushrooms in oil until golden. Set aside.", "Soften the chopped onion and garlic in half the butter, add the rice and toast 2 minutes.", "Pour in the wine and let it bubble away.", "Add the stock a ladle at a time, stirring, for about 18 minutes until creamy and al dente.", "Stir in mushrooms, remaining butter, Parmesan and parsley. Rest 2 minutes and serve."] },

  // ================= FRANCE =================
  { id: "ratatouille", name: "Ratatouille", country: "250", serves: 4, time: 60, level: "Easy",
    desc: "Provençal summer vegetable stew of eggplant, zucchini, peppers and tomato.",
    ing: [["eggplant", 1], ["zucchini", 2], ["bell_pepper", 2], ["onion", 150], ["garlic", 3], ["tomatoes", 500], ["olive_oil", 60], ["thyme", 1], ["basil", 0.5], ["salt", 4], ["black_pepper", 1]],
    steps: ["Dice eggplant, zucchini, peppers and onion into 2 cm pieces; chop the tomatoes.", "Brown the eggplant in olive oil, then the zucchini, separately. Set aside.", "Soften the onion, peppers and garlic in the same pot.", "Add tomatoes and thyme, simmer 10 minutes.", "Return all vegetables, cover and cook gently 25 minutes. Season and finish with basil."] },
  { id: "quiche-lorraine", name: "Quiche Lorraine", country: "250", serves: 6, time: 60, level: "Medium",
    desc: "Buttery tart from Lorraine filled with smoky bacon and a silky egg custard.",
    ing: [["puff_pastry", 275, "or shortcrust"], ["bacon", 200], ["eggs", 4], ["cream", 200], ["milk", 100], ["emmental", 100], ["nutmeg", 0.5], ["salt", 2], ["black_pepper", 1]],
    steps: ["Heat the oven to 190 °C. Line a tart tin with the pastry and prick the base.", "Fry the bacon until lightly crisp and scatter it over the pastry.", "Whisk eggs, cream, milk, cheese, nutmeg, salt and pepper.", "Pour over the bacon and bake 35–40 minutes until set and golden.", "Rest 10 minutes before slicing."] },
  { id: "crepes", name: "Crêpes", country: "250", serves: 4, time: 30, level: "Easy",
    desc: "Thin Breton pancakes, eaten with sugar and lemon, jam or chocolate.",
    ing: [["flour", 250], ["eggs", 3], ["milk", 500], ["butter", 40], ["sugar", 25], ["vanilla_sugar", 1], ["salt", 1], ["lemon", 1, "to serve"]],
    steps: ["Whisk flour, sugars and salt, then beat in the eggs and gradually the milk.", "Stir in half the melted butter and rest the batter 15 minutes.", "Heat a non-stick pan, brush with butter and pour in a thin layer of batter, swirling to coat.", "Cook about 1 minute per side.", "Serve with sugar and a squeeze of lemon."] },

  // ================= SPAIN =================
  { id: "paella", name: "Paella Mixta", country: "724", serves: 4, time: 55, level: "Medium",
    desc: "Valencian saffron rice with chicken, prawns, peppers and peas, cooked in one wide pan.",
    ing: [["risotto_rice", 350, "or bomba rice"], ["chicken_thighs", 400], ["shrimp", 250], ["bell_pepper", 1], ["onion", 100], ["garlic", 3], ["chopped_tomatoes", 1], ["peas", 100], ["saffron", 0.1], ["smoked_paprika", 3], ["chicken_stock", 2, "in 1 l water"], ["olive_oil", 50], ["lemon", 1], ["salt", 4]],
    steps: ["Dissolve the stock in 1 l hot water and steep the saffron in it.", "Brown seasoned chicken pieces in oil in a wide pan; push to the sides.", "Fry onion, pepper and garlic, then add paprika and tomatoes and cook 5 minutes.", "Stir in the rice, pour over the stock and spread evenly. Do not stir again.", "Simmer 15 minutes, add prawns and peas, cook 5 more until the rice is tender and a crust forms underneath.", "Rest 5 minutes under a towel, serve with lemon wedges."] },
  { id: "tortilla", name: "Tortilla Española", country: "724", serves: 4, time: 45, level: "Medium",
    desc: "Thick Spanish omelette of slow-fried potatoes and onion.",
    ing: [["potatoes", 600], ["onion", 200], ["eggs", 6], ["olive_oil", 200, "most is reused"], ["salt", 4]],
    steps: ["Peel and thinly slice potatoes and onion.", "Cook them gently in the olive oil for 20 minutes until soft but not brown. Drain, keeping the oil.", "Beat the eggs with salt and fold in the potatoes. Rest 10 minutes.", "Cook in a pan with a little oil over medium-low heat until almost set.", "Flip with a plate and cook 2–3 minutes more. Serve warm or at room temperature."] },
  { id: "gazpacho", name: "Gazpacho", country: "724", serves: 4, time: 15, level: "Easy",
    desc: "Chilled Andalusian soup of ripe tomatoes, pepper, cucumber and olive oil.",
    ing: [["tomatoes", 1000], ["cucumber", 0.5], ["bell_pepper", 1], ["garlic", 1], ["stale_bread", 50], ["olive_oil", 60], ["red_wine_vinegar", 25], ["salt", 4]],
    steps: ["Roughly chop tomatoes, cucumber, pepper and garlic.", "Soak the bread briefly in water and squeeze out.", "Blend everything with oil, vinegar and salt until very smooth.", "Chill at least 1 hour. Serve with diced cucumber and a drizzle of oil."] },

  // ================= GERMANY =================
  { id: "kaesespaetzle", name: "Käsespätzle", country: "276", serves: 4, time: 40, level: "Medium",
    desc: "Swabian egg noodles layered with mountain cheese and crispy fried onions.",
    ing: [["flour", 400], ["eggs", 4], ["mountain_cheese", 200], ["emmental", 100], ["onion", 300], ["butter", 40], ["nutmeg", 0.5], ["salt", 12], ["chives", 0.5]],
    steps: ["Beat flour, eggs, a pinch of salt and nutmeg with about 150 ml water to a thick, bubbly dough.", "Press the dough through a spätzle maker (or scrape off a board) into salted boiling water. Lift out once they float.", "Slice the onions into rings and fry slowly in butter until deep golden.", "Layer hot spätzle and grated cheese in a dish and bake 10 minutes at 180 °C.", "Top with fried onions and chives."] },
  { id: "currywurst", name: "Currywurst with Fries", country: "276", serves: 4, time: 40, level: "Easy",
    desc: "Berlin street food since 1949: fried sausage in curry-spiced tomato sauce, with fries.",
    ing: [["bratwurst", 4], ["curry_ketchup", 250], ["curry_powder", 6], ["onion", 50], ["floury_potatoes", 1000], ["vegetable_oil", 60], ["salt", 4], ["paprika", 2]],
    steps: ["Cut potatoes into fries, toss with oil and salt and bake at 220 °C for 30 minutes, turning once.", "Fry the bratwurst until browned all over.", "Soften the grated onion in a little oil, add curry ketchup and half the curry powder and warm through.", "Slice the sausages, pour over the sauce and dust with remaining curry powder and paprika.", "Serve with the fries."] },
  { id: "kartoffelsuppe", name: "German Potato Soup", country: "276", serves: 4, time: 45, level: "Easy",
    desc: "Hearty Kartoffelsuppe with root vegetables, marjoram-style herbs and sliced sausage.",
    ing: [["floury_potatoes", 800], ["carrots", 200], ["celery", 2], ["leek", 1], ["onion", 100], ["vegetable_stock", 2, "in 1.2 l water"], ["smoked_sausage", 200], ["butter", 20], ["thyme", 1], ["sour_cream", 100], ["parsley", 0.5], ["salt", 3], ["nutmeg", 0.3]],
    steps: ["Dice potatoes, carrots, celery and onion; slice the leek.", "Sweat the onion and leek in butter, add the other vegetables.", "Pour in the stock, add thyme and simmer 25 minutes.", "Mash or blend part of the soup to thicken it.", "Add sliced sausage and warm through. Season with salt and nutmeg, serve with sour cream and parsley."] },

  // ================= AUSTRIA =================
  { id: "wiener-schnitzel", name: "Wiener Schnitzel", country: "040", serves: 4, time: 30, level: "Medium",
    desc: "Vienna's pride: thin veal cutlets in a puffy golden crumb, served with lemon.",
    ing: [["veal_cutlet", 600], ["flour", 60], ["eggs", 2], ["breadcrumbs", 120], ["vegetable_oil", 250], ["butter", 30], ["lemon", 1], ["salt", 4]],
    steps: ["Pound the cutlets thin (about 4 mm) and season with salt.", "Dip each in flour, then beaten egg, then breadcrumbs. Do not press the crumbs on.", "Heat oil and butter about 1 cm deep in a large pan.", "Fry the schnitzels 2–3 minutes per side, swirling the pan so the crumb puffs up.", "Drain briefly and serve with lemon wedges and potato salad."] },

  // ================= HUNGARY =================
  { id: "goulash", name: "Beef Goulash", country: "348", serves: 4, time: 150, level: "Easy",
    desc: "Hungary's national dish: beef slowly braised with mountains of onion and sweet paprika.",
    ing: [["beef_stew", 800], ["onion", 600], ["paprika", 20], ["caraway", 2], ["tomato_paste", 40], ["garlic", 3], ["bell_pepper", 1], ["beef_stock", 1, "in 500 ml water"], ["vegetable_oil", 30], ["salt", 5], ["bay_leaves", 1]],
    steps: ["Cut the beef into 3 cm cubes. Slice the onions.", "Fry the onions slowly in oil until golden, about 15 minutes.", "Take off the heat, stir in paprika and caraway, then add the beef and tomato paste.", "Add garlic, pepper, bay leaf and stock. Cover and braise gently 2 hours, until the meat is tender.", "Season and serve with bread, potatoes or noodles."] },

  // ================= GREECE =================
  { id: "greek-salad", name: "Greek Salad (Horiatiki)", country: "300", serves: 4, time: 15, level: "Easy",
    desc: "Village salad of tomatoes, cucumber, red onion, olives and a slab of feta.",
    ing: [["tomatoes", 600], ["cucumber", 1], ["red_onion", 100], ["bell_pepper", 1], ["olives", 100], ["feta", 200], ["olive_oil", 50], ["red_wine_vinegar", 10], ["oregano", 1], ["salt", 2]],
    steps: ["Cut tomatoes into wedges and the cucumber into thick half-moons.", "Slice the onion and pepper into thin rings.", "Combine in a bowl with olives, salt, vinegar and oil.", "Top with the feta block, sprinkle with oregano and drizzle with more oil."] },
  { id: "souvlaki", name: "Pork Souvlaki with Tzatziki", country: "300", serves: 4, time: 45, level: "Easy",
    desc: "Lemony grilled pork skewers wrapped in warm pita with garlicky yogurt sauce.",
    ing: [["pork_shoulder", 600], ["lemon", 1], ["olive_oil", 50], ["oregano", 3], ["garlic", 4], ["greek_yogurt", 250], ["cucumber", 0.5], ["pita", 4], ["tomatoes", 200], ["red_onion", 80], ["salt", 4]],
    steps: ["Cube the pork and marinate with lemon juice, oil, oregano, 2 garlic cloves and salt for 30 minutes.", "For tzatziki, grate the cucumber, squeeze dry and mix with yogurt, remaining garlic and a pinch of salt.", "Thread the pork on skewers and grill or pan-fry 10–12 minutes, turning.", "Warm the pitas and fill with pork, tomato, onion and tzatziki."] },

  // ================= UNITED KINGDOM =================
  { id: "fish-chips", name: "Fish and Chips", country: "826", serves: 4, time: 50, level: "Medium",
    desc: "Beer-battered white fish and thick chips, the classic British takeaway.",
    ing: [["white_fish", 600], ["flour", 200], ["beer", 300], ["baking_powder", 1], ["floury_potatoes", 1000], ["vegetable_oil", 1000, "for deep frying"], ["peas", 300, "for mushy peas"], ["lemon", 1], ["salt", 6], ["white_vinegar", 30]],
    steps: ["Cut potatoes into thick chips, rinse and dry. Fry at 140 °C for 6 minutes, drain.", "Whisk flour, baking powder, salt and cold beer to a smooth batter.", "Raise the oil to 180 °C. Dip fish in flour, then batter, and fry 5–6 minutes until golden.", "Fry the chips again until crisp.", "Simmer peas and roughly mash with salt. Serve everything with lemon and malt vinegar."] },
  { id: "shepherds-pie", name: "Shepherd's Pie", country: "826", serves: 6, time: 90, level: "Easy",
    desc: "Minced lamb in rich gravy under a golden layer of mashed potato.",
    ing: [["lamb_mince", 800], ["onion", 150], ["carrots", 200], ["tomato_paste", 30], ["worcestershire", 20], ["beef_stock", 1, "in 300 ml water"], ["peas", 150], ["floury_potatoes", 1200], ["butter", 50], ["milk", 100], ["thyme", 1], ["salt", 5], ["black_pepper", 1]],
    steps: ["Brown the lamb in a hot pan, then add chopped onion and carrot and cook 5 minutes.", "Stir in tomato paste, Worcestershire, thyme and stock. Simmer 20 minutes, add peas.", "Boil potatoes until soft, mash with butter, milk, salt and pepper.", "Spoon the filling into a dish, spread the mash on top and rough it up with a fork.", "Bake at 200 °C for 25 minutes until golden."] },

  // ================= POLAND =================
  { id: "pierogi", name: "Pierogi Ruskie", country: "616", serves: 4, time: 90, level: "Hard",
    desc: "Polish dumplings stuffed with potato, quark and onion, topped with buttery onions.",
    ing: [["flour", 500], ["eggs", 1], ["floury_potatoes", 500], ["quark", 250], ["onion", 250], ["butter", 60], ["sour_cream", 200], ["salt", 6], ["black_pepper", 1]],
    steps: ["Knead flour, egg, a pinch of salt and about 220 ml warm water into a soft dough. Rest 30 minutes.", "Boil and mash the potatoes, mix with quark, half the onion (fried in butter), salt and pepper.", "Roll the dough thin, cut 8 cm rounds and fill each with a spoon of filling. Pinch to seal.", "Cook in simmering salted water until they float, plus 2 minutes.", "Serve with the remaining fried onions in butter and sour cream."] },

  // ================= UKRAINE =================
  { id: "borscht", name: "Borscht", country: "804", serves: 6, time: 90, level: "Medium",
    desc: "Deep red beetroot soup with cabbage, potato and beef, served with sour cream and dill.",
    ing: [["beef_stew", 400], ["beetroot", 500], ["white_cabbage", 0.5], ["potatoes", 300], ["carrots", 150], ["onion", 150], ["tomato_paste", 40], ["garlic", 3], ["white_vinegar", 15], ["bay_leaves", 1], ["sour_cream", 200], ["dill", 1], ["salt", 6], ["sugar", 5]],
    steps: ["Simmer the beef in 2 l salted water with a bay leaf for 1 hour. Skim as needed.", "Grate beetroot and carrot, chop the onion. Fry with tomato paste, vinegar and sugar for 10 minutes.", "Add diced potatoes and shredded cabbage to the broth and cook 15 minutes.", "Stir in the beetroot mixture and garlic and simmer 10 minutes.", "Rest 15 minutes. Serve with sour cream and lots of dill."] },

  // ================= SWEDEN =================
  { id: "kottbullar", name: "Swedish Meatballs", country: "752", serves: 4, time: 50, level: "Easy",
    desc: "Köttbullar in creamy gravy, traditionally with mashed potatoes and lingonberries.",
    ing: [["mixed_mince", 500], ["breadcrumbs", 40], ["milk", 80], ["onion", 80], ["eggs", 1], ["allspice", 1], ["butter", 40], ["flour", 20], ["beef_stock", 1, "in 300 ml water"], ["cream", 150], ["soy_sauce", 10], ["floury_potatoes", 800], ["salt", 5]],
    steps: ["Soak breadcrumbs in milk. Mix with mince, grated onion, egg, allspice and salt.", "Roll into small balls and brown in butter in batches. Set aside.", "Stir flour into the pan fat, then whisk in stock, cream and soy sauce. Simmer to a smooth gravy.", "Return the meatballs and cook gently 10 minutes.", "Serve with mashed potatoes and lingonberry jam if you have it."] },

  // ================= SWITZERLAND =================
  { id: "roesti", name: "Rösti", country: "756", serves: 2, time: 40, level: "Easy",
    desc: "Crisp Swiss potato cake, once a farmer's breakfast, now a national side dish.",
    ing: [["potatoes", 700, "boiled the day before"], ["butter", 40], ["salt", 4], ["black_pepper", 1], ["eggs", 2, "fried, to serve"]],
    steps: ["Boil the potatoes in their skins until just tender. Chill overnight.", "Peel and coarsely grate them, then season with salt and pepper.", "Melt butter in a pan, add the potatoes and press into a flat cake.", "Cook 12–15 minutes on medium heat until golden underneath, flip with a plate and cook the other side.", "Serve with fried eggs."] },

  // ================= PORTUGAL =================
  { id: "caldo-verde", name: "Caldo Verde", country: "620", serves: 4, time: 40, level: "Easy",
    desc: "Portugal's comforting green soup of potato, finely shredded kale and chorizo.",
    ing: [["floury_potatoes", 600], ["kale", 250], ["onion", 100], ["garlic", 2], ["chorizo", 120], ["olive_oil", 40], ["salt", 5]],
    steps: ["Soften the onion and garlic in half the olive oil.", "Add the diced potatoes and 1.2 l water with salt. Simmer 20 minutes.", "Blend the soup until smooth.", "Add very finely shredded kale and cook 5 minutes.", "Serve with slices of fried chorizo and a drizzle of olive oil."] },

  // ================= RUSSIA =================
  { id: "stroganoff", name: "Beef Stroganoff", country: "643", serves: 4, time: 35, level: "Easy",
    desc: "19th-century St. Petersburg dish of seared beef strips in a mushroom and sour cream sauce.",
    ing: [["beef_strips", 500], ["mushrooms", 250], ["onion", 150], ["butter", 30], ["flour", 10], ["beef_stock", 1, "in 250 ml water"], ["sour_cream", 200], ["mustard", 10], ["paprika", 2], ["pasta", 300, "or rice"], ["parsley", 0.5], ["salt", 4]],
    steps: ["Sear the beef strips in batches in a very hot pan with a little butter. Set aside.", "Cook the onion and sliced mushrooms in the remaining butter until golden.", "Dust with flour and paprika, then add stock and mustard and simmer 5 minutes.", "Stir in sour cream, return the beef and warm through without boiling.", "Serve over pasta or rice with parsley."] },

  // ================= TURKEY =================
  { id: "menemen", name: "Menemen", country: "792", serves: 2, time: 20, level: "Easy",
    desc: "Turkish breakfast of soft scrambled eggs cooked into peppers and tomatoes.",
    ing: [["eggs", 4], ["tomatoes", 400], ["bell_pepper", 1], ["onion", 50], ["butter", 20], ["olive_oil", 15], ["chili_flakes", 1], ["salt", 2], ["baguette", 1, "or any bread"]],
    steps: ["Gently fry the chopped onion and pepper in butter and oil until soft.", "Add chopped tomatoes and chili flakes and cook until saucy, about 8 minutes.", "Crack in the eggs and stir slowly until just set.", "Season and serve in the pan with fresh bread."] },
  { id: "mercimek", name: "Red Lentil Soup", country: "792", serves: 4, time: 35, level: "Easy",
    desc: "Mercimek çorbası, a velvety lentil soup with cumin, mint butter and lemon.",
    ing: [["red_lentils", 250], ["onion", 100], ["carrots", 100], ["potatoes", 100], ["tomato_paste", 20], ["cumin", 3], ["vegetable_stock", 2, "in 1.4 l water"], ["butter", 30], ["chili_flakes", 1], ["lemon", 1], ["salt", 3]],
    steps: ["Soften the onion in half the butter, add tomato paste and cumin.", "Add rinsed lentils, diced carrot, potato and stock. Simmer 25 minutes.", "Blend until smooth and season.", "Melt the remaining butter with chili flakes and drizzle on top. Serve with lemon wedges."] },

  // ================= LEBANON =================
  { id: "hummus", name: "Hummus", country: "422", serves: 4, time: 15, level: "Easy",
    desc: "Silky chickpea and tahini dip with lemon and garlic, eaten across the Levant.",
    ing: [["chickpeas_can", 2], ["tahini", 120], ["lemon", 1.5], ["garlic", 1], ["olive_oil", 30], ["cumin", 1], ["paprika", 1], ["salt", 3], ["pita", 4, "to serve"]],
    steps: ["Drain the chickpeas, keeping some of the liquid.", "Blend tahini with lemon juice and garlic until pale.", "Add chickpeas, cumin, salt and a few spoons of ice-cold water. Blend 3–4 minutes until very smooth.", "Spread in a bowl, drizzle with olive oil and dust with paprika. Serve with warm pita."] },
  { id: "tabbouleh", name: "Tabbouleh", country: "422", serves: 4, time: 20, level: "Easy",
    desc: "A herb salad more than a grain salad: masses of parsley, mint, tomato and a little bulgur.",
    ing: [["parsley", 3], ["mint", 1], ["bulgur", 50], ["tomatoes", 300], ["spring_onions", 1], ["lemon", 2], ["olive_oil", 50], ["salt", 3]],
    steps: ["Soak the bulgur in lemon juice and a splash of water for 15 minutes.", "Very finely chop parsley and mint, discarding thick stems.", "Dice the tomatoes small and slice the spring onions.", "Mix everything with olive oil and salt. Serve right away."] },

  // ================= IRAN =================
  { id: "kuku-sabzi", name: "Kuku Sabzi", country: "364", serves: 4, time: 45, level: "Easy",
    desc: "Persian New Year herb frittata, bright green with parsley, coriander and dill.",
    ing: [["eggs", 6], ["parsley", 2], ["coriander", 2], ["dill", 1], ["spring_onions", 1], ["turmeric", 2], ["baking_powder", 0.25], ["almonds", 30, "chopped (instead of walnuts)"], ["vegetable_oil", 40], ["salt", 4], ["yogurt", 250, "to serve"]],
    steps: ["Very finely chop all the herbs and spring onions.", "Beat the eggs with turmeric, baking powder and salt, then fold in herbs and nuts.", "Heat the oil in an ovenproof pan, pour in the mixture and cook on low heat 10 minutes.", "Finish in the oven at 180 °C for 15 minutes until set.", "Cut into wedges and serve with yogurt and flatbread."] },

  // ================= EGYPT =================
  { id: "koshari", name: "Koshari", country: "818", serves: 6, time: 60, level: "Medium",
    desc: "Cairo's beloved street food: rice, lentils and pasta with spiced tomato sauce and crispy onions.",
    ing: [["rice", 250], ["brown_lentils", 200], ["pasta", 200], ["chickpeas_can", 1], ["onion", 400], ["passata", 500], ["garlic", 4], ["cumin", 4], ["chili_flakes", 1], ["white_vinegar", 30], ["vegetable_oil", 100], ["salt", 8]],
    steps: ["Slice onions thinly and fry in oil until deep brown and crisp. Drain on paper.", "Cook the lentils 15 minutes, add the rice with a spoon of onion oil and water, and cook until tender.", "Boil the pasta separately.", "Simmer passata with garlic, cumin, chili, vinegar and salt for 15 minutes.", "Layer rice-lentils, pasta and chickpeas, top with sauce and crispy onions."] },

  // ================= MOROCCO =================
  { id: "tagine", name: "Chicken Tagine with Lemon & Olives", country: "504", serves: 4, time: 75, level: "Medium",
    desc: "Slow-cooked chicken with ginger, saffron, preserved-lemon tang and green olives.",
    ing: [["chicken_legs", 1200], ["onion", 300], ["garlic", 4], ["ginger", 15], ["ras_el_hanout", 8], ["turmeric", 2], ["saffron", 0.05], ["olives", 120], ["lemon", 1.5], ["coriander", 1], ["olive_oil", 40], ["chicken_stock", 1, "in 300 ml water"], ["couscous", 300], ["salt", 5]],
    steps: ["Rub the chicken with garlic, ginger, spices, salt and oil.", "Brown it in a heavy pot or tagine, then add the sliced onions.", "Pour in the stock with the saffron, cover and simmer 45 minutes.", "Add olives, lemon slices and chopped coriander and cook 10 minutes more.", "Prepare the couscous with boiling water and serve alongside."] },

  // ================= ETHIOPIA =================
  { id: "misir-wat", name: "Misir Wat", country: "231", serves: 4, time: 50, level: "Easy",
    desc: "Spicy red lentil stew with berbere, the heart of Ethiopian fasting-day meals.",
    ing: [["red_lentils", 300], ["onion", 300], ["garlic", 4], ["ginger", 15], ["berbere", 15], ["tomato_paste", 30], ["vegetable_oil", 50], ["vegetable_stock", 1, "in 900 ml water"], ["salt", 4]],
    steps: ["Cook the finely chopped onions in a dry pot for 5 minutes, then add oil and cook until soft.", "Add garlic, ginger, berbere and tomato paste and fry 2 minutes.", "Add rinsed lentils and stock. Simmer 25–30 minutes, stirring, until thick.", "Season and serve with injera or flatbread."] },

  // ================= NIGERIA =================
  { id: "jollof", name: "Jollof Rice", country: "566", serves: 6, time: 70, level: "Medium",
    desc: "West Africa's party rice, cooked in a smoky blend of tomatoes, peppers and scotch bonnet.",
    ing: [["rice", 500], ["chopped_tomatoes", 2], ["bell_pepper", 2], ["onion", 250], ["scotch_bonnet", 10], ["tomato_paste", 70], ["vegetable_oil", 80], ["chicken_stock", 2, "in 700 ml water"], ["curry_powder", 4], ["thyme", 2], ["bay_leaves", 2], ["chicken_legs", 1000], ["salt", 6]],
    steps: ["Season the chicken with salt, curry and thyme and roast at 200 °C for 40 minutes.", "Blend tomatoes, peppers, half the onion and the scotch bonnet.", "Fry the remaining sliced onion in oil, add tomato paste and fry 5 minutes, then the blended mix. Cook 15 minutes until reduced.", "Add stock, spices and bay leaves, then the washed rice. Cover tightly and cook on low 30 minutes.", "Let it catch slightly at the bottom for the smoky flavor. Serve with the chicken."] },

  // ================= SENEGAL =================
  { id: "yassa", name: "Chicken Yassa", country: "686", serves: 4, time: 90, level: "Easy",
    desc: "Chicken marinated in lemon and mustard, braised with heaps of caramelized onion.",
    ing: [["chicken_legs", 1000], ["onion", 800], ["lemon", 3], ["mustard", 40], ["garlic", 4], ["scotch_bonnet", 5], ["chicken_stock", 1, "in 300 ml water"], ["olives", 60], ["vegetable_oil", 50], ["rice", 300], ["salt", 5]],
    steps: ["Marinate chicken with lemon juice, mustard, garlic, sliced onions, chili and salt for at least 1 hour.", "Remove the chicken and grill or pan-fry it until browned.", "Cook the onions from the marinade in oil until soft and golden, 20 minutes.", "Add the marinade, stock and chicken, cover and simmer 25 minutes. Add olives.", "Serve over white rice."] },

  // ================= SOUTH AFRICA =================
  { id: "bobotie", name: "Bobotie", country: "710", serves: 6, time: 75, level: "Easy",
    desc: "Curried mince baked with fruit under a golden egg custard, a Cape Malay classic.",
    ing: [["beef_mince", 750], ["onion", 200], ["garlic", 2], ["curry_powder", 12], ["turmeric", 2], ["stale_bread", 60], ["milk", 300], ["eggs", 2], ["raisins", 50], ["apples", 150], ["lemon", 0.5], ["bay_leaves", 1], ["vegetable_oil", 20], ["rice", 300], ["salt", 5]],
    steps: ["Soak the bread in half the milk.", "Fry onion and garlic, add curry and turmeric, then brown the mince.", "Mix in the squeezed bread, raisins, grated apple, lemon juice and salt. Spread in a baking dish.", "Beat the eggs with remaining milk, pour over and top with a bay leaf.", "Bake at 180 °C for 35 minutes until set. Serve with yellow rice."] },

  // ================= INDIA =================
  { id: "butter-chicken", name: "Butter Chicken", country: "356", serves: 4, time: 60, level: "Medium",
    desc: "Delhi's murgh makhani: tandoori-spiced chicken in a silky tomato, butter and cream sauce.",
    ing: [["chicken_thighs", 700], ["yogurt", 150], ["garam_masala", 8], ["chili_flakes", 2], ["ginger", 20], ["garlic", 5], ["passata", 400], ["butter", 60], ["cream", 150], ["sugar", 5], ["cumin", 2], ["basmati_rice", 300], ["coriander", 0.5], ["salt", 5]],
    steps: ["Marinate the chicken in yogurt, half the garam masala, chili, ginger, garlic and salt for 30 minutes.", "Grill or pan-sear the chicken until charred in spots.", "Melt butter, add cumin and remaining garam masala, then passata and sugar. Simmer 15 minutes.", "Stir in cream and the chicken. Simmer 10 minutes.", "Serve with basmati rice and coriander."] },
  { id: "chana-masala", name: "Chana Masala", country: "356", serves: 4, time: 35, level: "Easy",
    desc: "Punjabi chickpea curry in a tangy, spicy onion-tomato gravy.",
    ing: [["chickpeas_can", 2], ["onion", 200], ["chopped_tomatoes", 1], ["garlic", 4], ["ginger", 15], ["fresh_chili", 10], ["garam_masala", 6], ["cumin", 3], ["turmeric", 2], ["ground_coriander", 3], ["vegetable_oil", 40], ["lemon", 0.5], ["coriander", 0.5], ["basmati_rice", 300], ["salt", 4]],
    steps: ["Fry the chopped onion in oil until golden.", "Add garlic, ginger, chili and the ground spices and cook 1 minute.", "Add tomatoes and cook down 8 minutes.", "Add drained chickpeas with a splash of water and simmer 15 minutes, mashing a few.", "Finish with lemon juice and coriander. Serve with rice."] },
  { id: "dal-tadka", name: "Dal Tadka", country: "356", serves: 4, time: 40, level: "Easy",
    desc: "Everyday comfort food: soft yellow lentils finished with sizzling spiced butter.",
    ing: [["red_lentils", 250], ["turmeric", 2], ["onion", 100], ["tomatoes", 150], ["garlic", 4], ["ginger", 10], ["cumin", 3], ["chili_flakes", 1], ["butter", 30, "or ghee"], ["coriander", 0.5], ["basmati_rice", 300], ["salt", 4]],
    steps: ["Simmer the lentils with turmeric and 900 ml water for 20 minutes until soft.", "Fry onion, garlic and ginger in half the butter, add tomatoes and cook to a paste. Stir into the dal.", "For the tadka, heat remaining butter, add cumin and chili flakes until they sizzle.", "Pour over the dal, top with coriander and serve with rice."] },

  // ================= CHINA =================
  { id: "kung-pao", name: "Kung Pao Chicken", country: "156", serves: 4, time: 30, level: "Medium",
    desc: "Sichuan stir-fry of chicken, peanuts and dried chilies with numbing Sichuan pepper.",
    ing: [["chicken_breast", 500], ["peanuts", 80], ["chili_flakes", 3], ["sichuan_pepper", 2], ["spring_onions", 1], ["garlic", 3], ["ginger", 10], ["soy_sauce", 40], ["rice_vinegar", 20], ["sugar", 15], ["cornstarch", 15], ["vegetable_oil", 40], ["jasmine_rice", 300]],
    steps: ["Cube the chicken and toss with 1 tbsp soy sauce and half the cornstarch.", "Mix remaining soy, vinegar, sugar, cornstarch and 3 tbsp water for the sauce.", "Fry chili and Sichuan pepper in hot oil for a few seconds, then add the chicken and stir-fry until cooked.", "Add garlic, ginger and spring onions, then the sauce and peanuts. Toss until glossy.", "Serve with jasmine rice."] },
  { id: "mapo-tofu", name: "Mapo Tofu", country: "156", serves: 4, time: 25, level: "Medium",
    desc: "Fiery, numbing Chengdu dish of soft tofu and minced beef in chili bean sauce.",
    ing: [["tofu", 400], ["beef_mince", 150], ["doubanjiang", 40], ["sichuan_pepper", 2], ["garlic", 3], ["ginger", 10], ["soy_sauce", 15], ["chicken_stock", 1, "in 250 ml water"], ["cornstarch", 10], ["vegetable_oil", 30], ["spring_onions", 0.5], ["jasmine_rice", 300]],
    steps: ["Cut the tofu into cubes and blanch in salted water for 2 minutes.", "Brown the mince in oil, add doubanjiang, garlic and ginger and fry until the oil turns red.", "Add stock and soy sauce, then slide in the tofu. Simmer 5 minutes.", "Thicken with cornstarch mixed with water.", "Sprinkle with ground toasted Sichuan pepper and spring onion. Serve with rice."] },
  { id: "egg-fried-rice", name: "Egg Fried Rice", country: "156", serves: 2, time: 15, level: "Easy",
    desc: "Day-old rice tossed in a blazing wok with egg, peas and spring onion.",
    ing: [["jasmine_rice", 200, "cooked the day before"], ["eggs", 3], ["peas", 100], ["carrots", 60], ["spring_onions", 0.5], ["soy_sauce", 20], ["sesame_oil", 5], ["vegetable_oil", 30], ["salt", 1]],
    steps: ["Cook and chill the rice a day ahead, then break up any clumps.", "Scramble the eggs in hot oil and set aside.", "Stir-fry diced carrot and peas 2 minutes, add the rice and fry until hot and slightly toasted.", "Add soy sauce, egg, spring onions and sesame oil. Toss and serve."] },

  // ================= JAPAN =================
  { id: "teriyaki", name: "Chicken Teriyaki", country: "392", serves: 4, time: 30, level: "Easy",
    desc: "Pan-fried chicken thighs glazed in a sweet and salty soy-mirin sauce.",
    ing: [["chicken_thighs", 600], ["soy_sauce", 60], ["mirin", 60], ["sugar", 20], ["ginger", 10], ["vegetable_oil", 15], ["sesame_seeds", 5], ["spring_onions", 0.5], ["sushi_rice", 300]],
    steps: ["Cook the rice.", "Fry the chicken skin-side down until crisp, then turn and cook through.", "Wipe out excess fat, add soy, mirin, sugar and grated ginger.", "Simmer, turning the chicken, until the sauce is thick and glossy.", "Slice and serve over rice with sesame and spring onion."] },
  { id: "miso-soup", name: "Miso Soup", country: "392", serves: 4, time: 15, level: "Easy",
    desc: "Everyday Japanese soup of miso, silken tofu, wakame and spring onion.",
    ing: [["miso", 60], ["tofu", 200], ["wakame", 5], ["spring_onions", 0.5], ["vegetable_stock", 1, "or dashi, in 1 l water"]],
    steps: ["Soak the wakame in water for 5 minutes and drain.", "Heat the stock until just below simmering.", "Dissolve the miso in a ladle of stock and stir it back in. Do not boil.", "Add cubed tofu and wakame, warm 2 minutes and top with spring onion."] },
  { id: "salmon-maki", name: "Salmon Maki Rolls", country: "392", serves: 4, time: 60, level: "Hard",
    desc: "Seasoned sushi rice and fresh salmon rolled in nori.",
    ing: [["sushi_rice", 400], ["rice_vinegar", 60], ["sugar", 20], ["salt", 6], ["nori", 6], ["salmon", 250, "very fresh"], ["cucumber", 0.5], ["avocado", 1], ["soy_sauce", 50, "to serve"], ["sesame_seeds", 5]],
    steps: ["Rinse the rice until the water runs clear, then cook it.", "Season with vinegar, sugar and salt while warm and let it cool.", "Cut salmon, cucumber and avocado into thin strips.", "Spread rice over a nori sheet on a bamboo mat, lay fillings across and roll tightly.", "Slice each roll into 8 pieces with a wet knife. Serve with soy sauce."] },

  // ================= SOUTH KOREA =================
  { id: "bibimbap", name: "Bibimbap", country: "410", serves: 4, time: 50, level: "Medium",
    desc: "A bowl of rice topped with seasoned vegetables, beef, a fried egg and gochujang.",
    ing: [["sushi_rice", 400], ["beef_mince", 250], ["spinach", 250], ["carrots", 150], ["bean_sprouts", 200], ["zucchini", 1], ["mushrooms", 150], ["eggs", 4], ["gochujang", 60], ["soy_sauce", 30], ["sesame_oil", 20], ["garlic", 3], ["sesame_seeds", 5], ["vegetable_oil", 30]],
    steps: ["Cook the rice.", "Brown the mince with soy sauce, garlic and a little sugar.", "Blanch spinach and sprouts; stir-fry carrot, zucchini and mushrooms separately. Season each with sesame oil and salt.", "Fry the eggs sunny-side up.", "Arrange vegetables and beef over the rice, top with an egg and gochujang. Mix before eating."] },
  { id: "bulgogi", name: "Beef Bulgogi", country: "410", serves: 4, time: 40, level: "Easy",
    desc: "Thin slices of beef in a sweet soy, pear-like and garlic marinade, quickly grilled.",
    ing: [["beef_strips", 600], ["soy_sauce", 60], ["brown_sugar", 25], ["apples", 100, "grated, instead of Asian pear"], ["garlic", 4], ["ginger", 10], ["sesame_oil", 20], ["onion", 100], ["spring_onions", 1], ["sesame_seeds", 5], ["lettuce", 1], ["sushi_rice", 300]],
    steps: ["Mix soy, sugar, grated apple, garlic, ginger and sesame oil.", "Marinate the beef and sliced onion for at least 30 minutes.", "Cook in a very hot pan in batches until caramelized.", "Scatter with spring onion and sesame. Serve with rice and lettuce leaves for wrapping."] },

  // ================= THAILAND =================
  { id: "pad-thai", name: "Pad Thai", country: "764", serves: 4, time: 35, level: "Medium",
    desc: "Stir-fried rice noodles with prawns, egg, tamarind, peanuts and lime.",
    ing: [["rice_noodles", 250], ["shrimp", 250], ["eggs", 2], ["tofu", 150], ["bean_sprouts", 150], ["spring_onions", 1], ["garlic", 3], ["tamarind", 40], ["fish_sauce", 40], ["brown_sugar", 30], ["peanuts", 50], ["lime", 2], ["chili_flakes", 1], ["vegetable_oil", 40]],
    steps: ["Soak the noodles in warm water 20 minutes until pliable. Drain.", "Mix tamarind, fish sauce and sugar into a sauce.", "Stir-fry garlic, diced tofu and prawns in hot oil. Push aside and scramble the eggs.", "Add noodles and sauce and toss until absorbed.", "Add sprouts and spring onions. Serve with crushed peanuts, chili and lime."] },
  { id: "green-curry", name: "Thai Green Curry", country: "764", serves: 4, time: 30, level: "Easy",
    desc: "Fragrant coconut curry with chicken, green chili paste, basil and lime.",
    ing: [["chicken_thighs", 500], ["green_curry_paste", 50], ["coconut_milk", 2], ["eggplant", 1], ["green_beans", 150], ["fish_sauce", 20], ["brown_sugar", 10], ["lime", 1], ["basil", 0.5], ["vegetable_oil", 15], ["jasmine_rice", 300]],
    steps: ["Fry the curry paste in oil with a few spoons of the thick coconut cream until fragrant.", "Add sliced chicken and cook 3 minutes.", "Pour in remaining coconut milk, add eggplant and beans. Simmer 12 minutes.", "Season with fish sauce, sugar and lime juice. Stir in basil.", "Serve with jasmine rice."] },

  // ================= VIETNAM =================
  { id: "pho", name: "Pho Bo", country: "704", serves: 4, time: 120, level: "Medium",
    desc: "Hanoi's beef noodle soup with a clear spiced broth, rice noodles and fresh herbs.",
    ing: [["beef_stew", 500, "for the broth"], ["beef_steak", 200, "sliced paper-thin"], ["beef_stock", 2, "in 2 l water"], ["onion", 200], ["ginger", 40], ["star_anise", 4], ["cinnamon", 1], ["cloves", 1], ["fish_sauce", 40], ["sugar", 10], ["rice_noodles", 400], ["bean_sprouts", 150], ["basil", 0.5], ["coriander", 0.5], ["lime", 2], ["fresh_chili", 10]],
    steps: ["Char the halved onion and ginger in a dry pan or under the grill.", "Toast star anise, cinnamon and cloves, then add with the beef, onion and ginger to the stock. Simmer 1.5 hours.", "Strain, season with fish sauce and sugar. Slice the cooked beef.", "Cook the noodles and divide into bowls with cooked and raw sliced beef.", "Pour over boiling broth, which cooks the raw beef. Serve with sprouts, herbs, lime and chili."] },
  { id: "goi-cuon", name: "Fresh Spring Rolls", country: "704", serves: 4, time: 40, level: "Medium",
    desc: "Gỏi cuốn: translucent rice paper rolls with prawns, herbs and noodles, with peanut dip.",
    ing: [["rice_paper", 12], ["shrimp", 250], ["rice_noodles", 100], ["lettuce", 0.5], ["mint", 1], ["coriander", 0.5], ["carrots", 100], ["cucumber", 0.5], ["peanut_butter", 60], ["soy_sauce", 20], ["lime", 1], ["honey", 10]],
    steps: ["Cook the prawns and halve them lengthwise. Cook and drain the noodles.", "Cut carrot and cucumber into thin sticks.", "Dip a rice paper sheet in warm water for a few seconds and lay it flat.", "Add prawns, lettuce, herbs, noodles and vegetables, fold in the sides and roll up tightly.", "Whisk peanut butter, soy, lime, honey and warm water into a dip."] },

  // ================= INDONESIA =================
  { id: "nasi-goreng", name: "Nasi Goreng", country: "360", serves: 4, time: 25, level: "Easy",
    desc: "Indonesia's national fried rice, sweet-savory and spicy, topped with a fried egg.",
    ing: [["rice", 300, "cooked the day before"], ["chicken_breast", 250], ["shallots", 100], ["garlic", 3], ["fresh_chili", 15], ["soy_sauce", 40], ["brown_sugar", 15], ["tomato_paste", 10], ["eggs", 4], ["cucumber", 0.5], ["vegetable_oil", 40]],
    steps: ["Pound shallots, garlic and chili into a paste.", "Fry the paste in oil until fragrant, add diced chicken and cook through.", "Add rice, soy sauce mixed with sugar (a stand-in for kecap manis) and tomato paste. Fry until hot.", "Fry the eggs separately.", "Serve the rice topped with an egg and cucumber slices."] },

  // ================= PHILIPPINES =================
  { id: "adobo", name: "Chicken Adobo", country: "608", serves: 4, time: 60, level: "Easy",
    desc: "The unofficial national dish: chicken braised in vinegar, soy, garlic and bay leaves.",
    ing: [["chicken_legs", 1000], ["white_vinegar", 120], ["soy_sauce", 100], ["garlic", 8], ["bay_leaves", 1], ["black_pepper", 2], ["brown_sugar", 10], ["vegetable_oil", 20], ["rice", 300]],
    steps: ["Combine the chicken with soy, vinegar, crushed garlic, bay leaves and peppercorns. Marinate 30 minutes.", "Brown the chicken in oil, then add the marinade and 150 ml water.", "Simmer uncovered 35 minutes, turning, until tender and the sauce has reduced.", "Stir in the sugar and serve with rice."] },

  // ================= MEXICO =================
  { id: "tacos-pastor", name: "Tacos al Pastor", country: "484", serves: 4, time: 60, level: "Medium",
    desc: "Mexico City tacos of chili-marinated pork with charred pineapple, onion and coriander.",
    ing: [["pork_shoulder", 700], ["pineapple_can", 1], ["smoked_paprika", 8], ["chili_flakes", 3], ["cumin", 3], ["oregano", 2], ["garlic", 3], ["white_vinegar", 30], ["corn_tortillas", 12], ["onion", 100], ["coriander", 1], ["lime", 2], ["vegetable_oil", 30], ["salt", 5]],
    steps: ["Blend paprika, chili, cumin, oregano, garlic, vinegar, a little pineapple juice and salt into a marinade.", "Slice the pork thinly and marinate at least 1 hour.", "Sear the pork in batches in a very hot pan, then chop it.", "Char the pineapple rings and dice them.", "Serve in warm tortillas with pineapple, chopped onion, coriander and lime."] },
  { id: "guacamole", name: "Guacamole", country: "484", serves: 4, time: 10, level: "Easy",
    desc: "Aztec-era avocado dip with lime, onion, chili and coriander.",
    ing: [["avocado", 3], ["lime", 1], ["red_onion", 50], ["fresh_chili", 5], ["tomatoes", 100], ["coriander", 0.5], ["salt", 2], ["corn_tortillas", 6, "toasted, to serve"]],
    steps: ["Mash the avocados roughly with lime juice and salt.", "Fold in finely chopped onion, chili, tomato and coriander.", "Taste and adjust. Serve with toasted tortilla wedges."] },

  // ================= USA =================
  { id: "cheeseburger", name: "Classic Cheeseburger", country: "840", serves: 4, time: 25, level: "Easy",
    desc: "Smashed beef patty, melted cheddar, pickles and sauce in a soft toasted bun.",
    ing: [["beef_mince", 600], ["burger_buns", 4], ["cheddar", 80], ["lettuce", 0.5], ["tomatoes", 150], ["red_onion", 50], ["pickles", 60], ["ketchup", 40], ["mustard", 20], ["mayonnaise", 30], ["salt", 3], ["black_pepper", 1]],
    steps: ["Divide the beef into 4 balls. Toast the cut sides of the buns.", "Press each ball flat in a very hot pan, season with salt and pepper.", "Cook 2–3 minutes, flip, add cheddar and cook 1 minute more until melted.", "Spread buns with mayo, ketchup and mustard and stack with lettuce, tomato, onion, pickles and the patty."] },
  { id: "mac-cheese", name: "Mac and Cheese", country: "840", serves: 4, time: 35, level: "Easy",
    desc: "Elbow macaroni in a rich cheddar sauce, baked with a crunchy top.",
    ing: [["pasta", 400], ["butter", 50], ["flour", 40], ["milk", 700], ["cheddar", 200], ["emmental", 100], ["mustard", 10], ["breadcrumbs", 40], ["paprika", 1], ["salt", 6]],
    steps: ["Cook the pasta 2 minutes less than the packet says.", "Melt butter, stir in flour, then whisk in the milk and simmer until thick.", "Stir in the cheeses and mustard until smooth. Season.", "Mix with the pasta, top with breadcrumbs and paprika.", "Bake at 200 °C for 15 minutes until bubbling."] },
  { id: "pancakes", name: "Buttermilk-style Pancakes", country: "840", serves: 4, time: 25, level: "Easy",
    desc: "Fluffy American diner pancakes, stacked high with butter and berries.",
    ing: [["flour", 250], ["baking_powder", 1], ["sugar", 30], ["eggs", 2], ["milk", 300], ["yogurt", 100], ["butter", 40], ["salt", 1], ["berries", 250], ["honey", 40, "or maple syrup"]],
    steps: ["Mix flour, baking powder, sugar and salt.", "Whisk eggs, milk, yogurt and melted butter, then stir into the dry ingredients until just combined.", "Cook ladlefuls in a lightly buttered pan until bubbles appear, flip and cook 1 minute more.", "Serve stacked with berries and honey."] },

  // ================= CANADA =================
  { id: "poutine", name: "Poutine", country: "124", serves: 4, time: 50, level: "Easy",
    desc: "Québec's late-night favorite: crispy fries, squeaky cheese curds and hot gravy.",
    ing: [["floury_potatoes", 1000], ["vegetable_oil", 60], ["mozzarella", 250, "torn, instead of cheese curds"], ["butter", 30], ["flour", 25], ["beef_stock", 2, "in 500 ml water"], ["worcestershire", 10], ["black_pepper", 1], ["salt", 4]],
    steps: ["Cut the potatoes into fries, toss with oil and salt and bake at 220 °C for 30 minutes.", "Melt butter, stir in flour and cook until golden.", "Whisk in the stock and Worcestershire and simmer until thick. Season with pepper.", "Top the hot fries with cheese and pour over the hot gravy."] },

  // ================= BRAZIL =================
  { id: "feijoada", name: "Feijoada", country: "076", serves: 6, time: 120, level: "Medium",
    desc: "Brazil's Saturday stew of black beans with pork and smoked sausage, served with rice.",
    ing: [["black_beans_can", 4], ["pork_belly", 400], ["smoked_sausage", 300], ["chorizo", 150], ["onion", 200], ["garlic", 5], ["bay_leaves", 2], ["beef_stock", 1, "in 500 ml water"], ["vegetable_oil", 20], ["rice", 400], ["kale", 250], ["salt", 4]],
    steps: ["Cut pork belly into cubes and brown it in a large pot.", "Add sliced sausages, onion and garlic and fry 5 minutes.", "Add beans with their liquid, bay leaves and stock. Simmer gently 1.5 hours.", "Mash a ladle of beans to thicken.", "Serve with rice and garlicky sautéed kale."] },

  // ================= ARGENTINA =================
  { id: "chimichurri-steak", name: "Steak with Chimichurri", country: "032", serves: 4, time: 30, level: "Easy",
    desc: "Asado-style grilled beef with a sharp sauce of parsley, garlic, oregano and vinegar.",
    ing: [["beef_steak", 800], ["parsley", 1], ["garlic", 3], ["oregano", 2], ["chili_flakes", 1], ["red_wine_vinegar", 30], ["olive_oil", 80], ["salt", 6], ["black_pepper", 1], ["potatoes", 600]],
    steps: ["For chimichurri, finely chop parsley and garlic and mix with oregano, chili, vinegar, oil and salt. Rest 20 minutes.", "Roast the potatoes in wedges at 220 °C for 30 minutes.", "Bring the steaks to room temperature and season well.", "Grill or sear 3–4 minutes per side for medium-rare. Rest 5 minutes.", "Slice and spoon over plenty of chimichurri."] },

  // ================= PERU =================
  { id: "ceviche", name: "Ceviche", country: "604", serves: 4, time: 30, level: "Easy",
    desc: "Peru's national dish: raw white fish 'cooked' in lime juice with chili and red onion.",
    ing: [["white_fish", 500, "very fresh"], ["lime", 8], ["red_onion", 150], ["fresh_chili", 10], ["coriander", 1], ["garlic", 1], ["salt", 5], ["sweet_potatoes", 400], ["sweetcorn_can", 1]],
    steps: ["Boil the sweet potato in slices until tender. Chill.", "Cut the fish into 2 cm cubes, salt it and leave 2 minutes.", "Add freshly squeezed lime juice, grated garlic and minced chili. Marinate 5–10 minutes.", "Mix in thinly sliced red onion and coriander.", "Serve immediately with sweet potato and corn."] },

  // ================= COLOMBIA =================
  { id: "arepas", name: "Arepas with Beans & Cheese", country: "170", serves: 4, time: 35, level: "Easy",
    desc: "Griddled corn cakes split and filled, eaten any time of day in Colombia and Venezuela.",
    ing: [["arepa_flour", 300], ["salt", 4], ["butter", 20], ["mozzarella", 125], ["black_beans_can", 1], ["avocado", 1], ["tomatoes", 150], ["red_onion", 50], ["cumin", 1]],
    steps: ["Mix the corn flour with salt and 400 ml warm water. Knead to a soft dough and rest 5 minutes.", "Shape into 8 discs about 1.5 cm thick.", "Cook in a buttered pan 6–7 minutes per side until crusty.", "Warm the beans with cumin. Dice tomato, onion and avocado.", "Split the arepas and stuff with beans, cheese and the fresh salsa."] },

  // ================= JAMAICA =================
  { id: "jerk-chicken", name: "Jerk Chicken", country: "388", serves: 4, time: 80, level: "Medium",
    desc: "Fiery chicken marinated in scotch bonnet, allspice and thyme, grilled until smoky.",
    ing: [["chicken_legs", 1200], ["scotch_bonnet", 15], ["spring_onions", 1], ["garlic", 4], ["ginger", 15], ["allspice", 6], ["thyme", 2], ["brown_sugar", 20], ["soy_sauce", 40], ["lime", 2], ["vegetable_oil", 30], ["rice", 300], ["kidney_beans_can", 1], ["coconut_milk", 1]],
    steps: ["Blend chili, spring onions, garlic, ginger, allspice, thyme, sugar, soy, lime juice and oil into a paste.", "Rub over the chicken and marinate at least 2 hours, ideally overnight.", "Roast at 200 °C for 45 minutes, then char under the grill.", "For rice and peas, cook rice with the beans, coconut milk, water and a sprig of thyme.", "Serve the chicken with the rice."] },

  // ================= AUSTRALIA =================
  { id: "pavlova", name: "Pavlova", country: "036", serves: 8, time: 120, level: "Medium",
    desc: "Crisp-shelled, marshmallow-soft meringue topped with cream and fresh fruit.",
    ing: [["eggs", 4, "whites only"], ["sugar", 220], ["cornstarch", 10], ["white_vinegar", 5], ["vanilla_sugar", 1], ["cream", 400], ["berries", 250], ["mango", 1]],
    steps: ["Heat the oven to 150 °C. Whisk the egg whites to soft peaks.", "Add the sugar a spoon at a time, whisking until thick and glossy.", "Fold in cornstarch, vinegar and vanilla sugar.", "Shape into a round on baking paper, lower the oven to 120 °C and bake 75 minutes. Cool in the oven.", "Top with whipped cream, berries and mango just before serving."] }
];
