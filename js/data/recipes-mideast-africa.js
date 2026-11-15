/* More Middle Eastern and African recipes. Same format as recipes.js. */
Object.assign(window.COUNTRIES, {
  "376": { name: "Israel",        region: "Middle East", lat: 31.4,  lng: 35.0 },
  "760": { name: "Syria",         region: "Middle East", lat: 35.0,  lng: 38.5 },
  "368": { name: "Iraq",          region: "Middle East", lat: 33.2,  lng: 43.7 },
  "682": { name: "Saudi Arabia",  region: "Middle East", lat: 24.0,  lng: 45.0 },
  "400": { name: "Jordan",        region: "Middle East", lat: 31.2,  lng: 36.5 },
  "887": { name: "Yemen",         region: "Middle East", lat: 15.6,  lng: 48.0 },
  "788": { name: "Tunisia",       region: "Africa",      lat: 34.0,  lng: 9.5 },
  "012": { name: "Algeria",       region: "Africa",      lat: 28.0,  lng: 2.6 },
  "288": { name: "Ghana",         region: "Africa",      lat: 7.9,   lng: -1.0 },
  "384": { name: "Côte d'Ivoire", region: "Africa",      lat: 7.5,   lng: -5.5 },
  "120": { name: "Cameroon",      region: "Africa",      lat: 5.7,   lng: 12.4 },
  "404": { name: "Kenya",         region: "Africa",      lat: 0.2,   lng: 37.9 },
  "834": { name: "Tanzania",      region: "Africa",      lat: -6.4,  lng: 34.9 },
  "800": { name: "Uganda",        region: "Africa",      lat: 1.4,   lng: 32.3 },
  "706": { name: "Somalia",       region: "Africa",      lat: 5.2,   lng: 46.2 },
  "508": { name: "Mozambique",    region: "Africa",      lat: -18.7, lng: 35.5 },
  "450": { name: "Madagascar",    region: "Africa",      lat: -19.4, lng: 46.7 },
  "716": { name: "Zimbabwe",      region: "Africa",      lat: -19.0, lng: 29.2 },
  "729": { name: "Sudan",         region: "Africa",      lat: 15.6,  lng: 30.2 }
});

window.RECIPES.push(
  // ================= TURKEY =================
  { id: "lahmacun", name: "Lahmacun", country: "792", serves: 4, time: 90, level: "Medium",
    desc: "Thin crisp flatbreads spread with spiced minced lamb, rolled up with salad and lemon.",
    ing: [["flour", 400], ["dry_yeast", 0.5], ["salt", 7], ["lamb_mince", 300], ["onion", 100], ["bell_pepper", 1], ["tomatoes", 200], ["tomato_paste", 30], ["parsley", 1], ["paprika", 3], ["chili_flakes", 2], ["cumin", 2], ["lemon", 1], ["lettuce", 0.5]],
    steps: ["Knead flour, yeast, salt and 250 ml water. Rest 45 minutes.", "Blitz onion, pepper, tomato and half the parsley, then mix with lamb, tomato paste and spices.", "Roll the dough very thin, spread with a thin layer of topping.", "Bake on a hot tray at 250 °C for 6–8 minutes.", "Serve with parsley, lettuce and lemon, rolled up."] },
  { id: "imam-bayildi", name: "İmam Bayıldı", country: "792", serves: 4, time: 70, level: "Easy",
    desc: "'The imam fainted': eggplants stuffed with onion, garlic and tomato, braised in olive oil.",
    ing: [["eggplant", 4], ["onion", 300], ["garlic", 5], ["tomatoes", 400], ["olive_oil", 100], ["parsley", 1], ["sugar", 5], ["salt", 6]],
    steps: ["Peel the eggplants in stripes, salt them for 20 minutes, rinse and fry until soft. Slit lengthwise.", "Cook onions and garlic slowly in olive oil, add tomatoes, sugar and parsley.", "Stuff the eggplants with the mixture.", "Add a little water and bake covered at 180 °C for 30 minutes. Serve at room temperature."] },
  { id: "baklava", name: "Baklava", country: "792", serves: 16, time: 90, level: "Medium",
    desc: "Many layers of buttered filo and pistachios soaked in lemon syrup.",
    ing: [["filo_pastry", 500], ["butter", 250], ["pistachios", 250], ["walnuts", 100], ["sugar", 400], ["lemon", 0.5], ["cinnamon", 1]],
    steps: ["Chop the nuts with cinnamon.", "Layer half the filo in a buttered tin, brushing each sheet with butter. Add the nuts, then the rest of the filo.", "Cut into diamonds and bake at 170 °C for 50 minutes.", "Boil sugar, 250 ml water and lemon juice 10 minutes. Pour the cool syrup over the hot baklava."] },
  { id: "kofte", name: "Izgara Köfte", country: "792", serves: 4, time: 40, level: "Easy",
    desc: "Grilled Turkish meatballs with cumin and parsley, served with piyaz bean salad.",
    ing: [["beef_mince", 600], ["onion", 100], ["breadcrumbs", 40], ["parsley", 1], ["cumin", 3], ["paprika", 3], ["garlic", 2], ["salt", 6], ["kidney_beans_can", 1, "white beans for piyaz"], ["red_onion", 80], ["sumac", 2], ["lemon", 1], ["olive_oil", 30]],
    steps: ["Mix mince, grated onion, breadcrumbs, half the parsley, spices and salt. Knead and chill.", "Shape into flat oval patties and grill 4 minutes per side.", "For piyaz, mix beans, sliced red onion, parsley, sumac, lemon and oil.", "Serve the köfte with the salad and flatbread."] },

  // ================= LEBANON =================
  { id: "falafel", name: "Falafel", country: "422", serves: 4, time: 40, level: "Medium",
    desc: "Crisp fritters of soaked chickpeas and herbs, stuffed into pita with tahini sauce.",
    ing: [["dried_chickpeas", 250, "soaked overnight"], ["onion", 100], ["garlic", 3], ["parsley", 1], ["coriander", 1], ["cumin", 3], ["ground_coriander", 2], ["baking_powder", 0.25], ["vegetable_oil", 500, "for frying"], ["tahini", 80], ["lemon", 1], ["pita", 4], ["tomatoes", 200], ["salt", 6]],
    steps: ["Blitz the soaked (not cooked) chickpeas with onion, garlic, herbs, spices and salt to a coarse paste.", "Stir in baking powder and shape into small balls.", "Fry at 175 °C for 3–4 minutes until deep golden.", "Whisk tahini with lemon, water and salt. Serve in pita with tomatoes and the sauce."] },
  { id: "fattoush", name: "Fattoush", country: "422", serves: 4, time: 20, level: "Easy",
    desc: "Bread salad of crunchy toasted pita, vegetables, herbs and sumac dressing.",
    ing: [["pita", 2], ["tomatoes", 300], ["cucumber", 1], ["lettuce", 1], ["radishes", 1], ["spring_onions", 1], ["mint", 0.5], ["parsley", 0.5], ["sumac", 4], ["lemon", 1], ["olive_oil", 60], ["salt", 2]],
    steps: ["Tear the pita and toast with a little oil until crisp.", "Chop tomatoes, cucumber, lettuce, radishes and spring onions.", "Whisk lemon juice, oil, sumac and salt.", "Toss everything together just before serving."] },
  { id: "baba-ganoush", name: "Baba Ganoush", country: "422", serves: 4, time: 50, level: "Easy",
    desc: "Smoky charred eggplant dip with tahini, garlic and lemon.",
    ing: [["eggplant", 2], ["tahini", 50], ["garlic", 1], ["lemon", 1], ["olive_oil", 20], ["parsley", 0.25], ["salt", 2], ["pita", 4]],
    steps: ["Char the eggplants over a flame or under the grill until collapsed, then roast at 200 °C for 20 minutes.", "Scoop out the flesh and drain.", "Mash with tahini, crushed garlic, lemon and salt.", "Drizzle with oil, add parsley and serve with pita."] },
  { id: "shish-taouk", name: "Shish Taouk", country: "422", serves: 4, time: 40, level: "Easy",
    desc: "Garlicky yogurt-marinated chicken skewers with toum and flatbread.",
    ing: [["chicken_breast", 700], ["yogurt", 150], ["lemon", 1], ["garlic", 6], ["paprika", 3], ["tomato_paste", 15], ["olive_oil", 40], ["vegetable_oil", 100, "for toum"], ["pita", 4], ["salt", 6]],
    steps: ["Marinate cubed chicken in yogurt, lemon, 2 garlic cloves, paprika, tomato paste, oil and salt for 2 hours.", "For toum, blend 4 garlic cloves with salt and lemon, then very slowly blend in the oil until fluffy.", "Thread on skewers and grill 10–12 minutes.", "Serve with toum, flatbread and pickles."] },

  // ================= IRAN =================
  { id: "ghormeh-sabzi", name: "Ghormeh Sabzi", country: "364", serves: 6, time: 180, level: "Medium",
    desc: "Iran's beloved herb stew of lamb, kidney beans and slow-fried greens with dried lime.",
    ing: [["lamb_shoulder", 600], ["parsley", 3], ["coriander", 2], ["spring_onions", 1], ["frozen_spinach", 200], ["kidney_beans_can", 1], ["onion", 150], ["turmeric", 3], ["lemon", 1, "instead of dried limes"], ["vegetable_oil", 60], ["basmati_rice", 400], ["salt", 6]],
    steps: ["Fry the onion with turmeric, add lamb and brown lightly. Add 1 l water and simmer 1 hour.", "Fry the finely chopped herbs and spinach in oil for 20 minutes until dark green.", "Add herbs and beans to the lamb and simmer 1 hour more.", "Season with lemon juice and salt. Serve with saffron rice."] },
  { id: "joojeh-kabab", name: "Joojeh Kabab", country: "364", serves: 4, time: 40, level: "Easy",
    desc: "Saffron and lemon marinated chicken skewers with buttery rice.",
    ing: [["chicken_thighs", 700], ["saffron", 0.1], ["lemon", 2], ["onion", 150], ["yogurt", 100], ["butter", 40], ["tomatoes", 300], ["basmati_rice", 400], ["salt", 6]],
    steps: ["Bloom the saffron in 3 tbsp hot water.", "Marinate the chicken with grated onion, lemon juice, yogurt, half the saffron and salt overnight.", "Grill on skewers with tomatoes, basting with butter and remaining saffron.", "Serve with rice."] },
  { id: "fesenjan", name: "Fesenjan", country: "364", serves: 4, time: 120, level: "Easy",
    desc: "Chicken simmered in a dark, sweet-sour sauce of ground walnuts and pomegranate molasses.",
    ing: [["chicken_thighs", 700], ["walnuts", 250], ["pomegranate_molasses", 120], ["onion", 150], ["sugar", 15], ["cinnamon", 1], ["turmeric", 1], ["vegetable_oil", 20], ["basmati_rice", 300], ["salt", 4]],
    steps: ["Toast the walnuts and grind them finely.", "Simmer them in 750 ml water for 45 minutes, stirring, until the oil separates.", "Brown the onion and chicken, add to the walnuts with molasses, sugar and spices.", "Simmer 45 minutes until thick and dark. Serve with rice."] },

  // ================= ISRAEL =================
  { id: "sabich", name: "Sabich", country: "376", serves: 4, time: 40, level: "Easy",
    desc: "Tel Aviv street sandwich of fried eggplant, boiled egg, hummus and salad in pita.",
    ing: [["eggplant", 2], ["eggs", 4], ["pita", 4], ["hummus_ready", 200], ["tahini", 60], ["tomatoes", 200], ["cucumber", 1], ["parsley", 0.5], ["lemon", 1], ["vegetable_oil", 100], ["salt", 3]],
    steps: ["Slice and fry the eggplant until golden. Drain and salt.", "Boil the eggs 9 minutes and slice.", "Dice tomato and cucumber with parsley and lemon.", "Fill warm pita with hummus, eggplant, egg, salad and tahini."] },

  // ================= SYRIA =================
  { id: "muhammara", name: "Muhammara", country: "760", serves: 6, time: 40, level: "Easy",
    desc: "Aleppo's roasted red pepper and walnut dip with pomegranate molasses.",
    ing: [["bell_pepper", 3, "red"], ["walnuts", 100], ["breadcrumbs", 30], ["pomegranate_molasses", 30], ["garlic", 1], ["chili_flakes", 2], ["cumin", 1], ["olive_oil", 40], ["lemon", 0.5], ["salt", 2]],
    steps: ["Roast the peppers at 220 °C until blackened, peel and seed.", "Blend with walnuts, breadcrumbs, molasses, garlic, spices and lemon.", "Stir in olive oil and season.", "Serve with flatbread."] },
  { id: "fatteh", name: "Fatteh", country: "760", serves: 4, time: 25, level: "Easy",
    desc: "Layers of crisp pita, warm chickpeas and garlicky yogurt, topped with pine nuts in butter.",
    ing: [["pita", 3], ["chickpeas_can", 2], ["greek_yogurt", 400], ["tahini", 40], ["garlic", 2], ["lemon", 1], ["pine_nuts", 30], ["butter", 30], ["cumin", 1], ["paprika", 1], ["salt", 3]],
    steps: ["Toast pita pieces until crisp and spread on a platter.", "Warm the chickpeas with cumin and spoon over the bread with some liquid.", "Whisk yogurt, tahini, garlic, lemon and salt; pour over.", "Fry pine nuts in butter and pour on top with paprika."] },

  // ================= IRAQ =================
  { id: "iraqi-bamia", name: "Iraqi Bamia", country: "368", serves: 4, time: 90, level: "Easy",
    desc: "Lamb and okra stewed in tomato with garlic and lemon, served over rice.",
    ing: [["lamb_shoulder", 500], ["okra", 400], ["onion", 150], ["garlic", 6], ["tomato_paste", 60], ["chopped_tomatoes", 1], ["lemon", 1], ["allspice", 1], ["vegetable_oil", 30], ["basmati_rice", 300], ["salt", 6]],
    steps: ["Brown the lamb with onion, add 800 ml water and simmer 45 minutes.", "Add tomato paste, tomatoes, allspice and the okra.", "Simmer 25 minutes, then stir in crushed garlic and lemon juice.", "Serve with rice."] },

  // ================= SAUDI ARABIA =================
  { id: "kabsa", name: "Chicken Kabsa", country: "682", serves: 6, time: 90, level: "Medium",
    desc: "Saudi Arabia's national dish of spiced rice cooked with chicken, tomato and dried fruit.",
    ing: [["chicken_legs", 1200], ["basmati_rice", 500], ["onion", 200], ["garlic", 4], ["tomatoes", 300], ["tomato_paste", 30], ["cardamom", 2], ["cinnamon", 2], ["cumin", 3], ["cloves", 1], ["black_pepper", 2], ["raisins", 50], ["almonds", 50], ["vegetable_oil", 50], ["salt", 8]],
    steps: ["Brown the chicken in oil, then fry onions and garlic.", "Add tomatoes, paste, spices and 900 ml water. Simmer 30 minutes.", "Remove the chicken and roast it at 200 °C until crisp.", "Add the washed rice to the broth, cover and cook 20 minutes.", "Serve the rice topped with chicken, raisins and toasted almonds."] },

  // ================= JORDAN =================
  { id: "mansaf", name: "Mansaf", country: "400", serves: 6, time: 150, level: "Medium",
    desc: "Jordan's festive lamb cooked in fermented yogurt sauce, over rice with almonds.",
    ing: [["lamb_shoulder", 1200], ["greek_yogurt", 750, "instead of jameed"], ["cornstarch", 15], ["onion", 100], ["cardamom", 1], ["bay_leaves", 2], ["turmeric", 2], ["basmati_rice", 500], ["butter", 50], ["almonds", 60], ["pine_nuts", 30], ["pita", 3], ["salt", 8]],
    steps: ["Simmer the lamb with onion, bay, cardamom and salt in water for 1.5 hours.", "Whisk yogurt with cornstarch and some broth, then heat slowly, stirring, and add the lamb. Simmer 30 minutes.", "Cook the rice with turmeric and butter.", "Lay bread on a platter, then rice, lamb and sauce. Scatter with toasted nuts."] },

  // ================= YEMEN =================
  { id: "fahsa", name: "Fahsa", country: "887", serves: 4, time: 90, level: "Easy",
    desc: "Bubbling lamb stew served in a stone pot and topped with frothy fenugreek hilbeh.",
    ing: [["lamb_shoulder", 600], ["onion", 150], ["tomatoes", 300], ["garlic", 4], ["cumin", 3], ["turmeric", 2], ["fenugreek", 10], ["fresh_chili", 10], ["coriander", 0.5], ["vegetable_oil", 30], ["pita", 4], ["salt", 6]],
    steps: ["Simmer the lamb in salted water for 1 hour, then shred it.", "Fry onion, garlic, tomatoes and spices, add the lamb and some broth and cook until thick.", "Soak ground fenugreek, then whisk with chili, coriander and water until frothy.", "Serve the stew sizzling with hilbeh on top and flatbread."] },

  // ================= EGYPT =================
  { id: "ful-medames", name: "Ful Medames", country: "818", serves: 4, time: 20, level: "Easy",
    desc: "Egypt's breakfast of stewed fava beans with cumin, lemon, garlic and olive oil.",
    ing: [["fava_beans_can", 2], ["garlic", 2], ["cumin", 2], ["lemon", 1], ["olive_oil", 40], ["tomatoes", 150], ["parsley", 0.5], ["eggs", 4, "boiled, to serve"], ["pita", 4], ["salt", 3]],
    steps: ["Warm the beans with their liquid and mash roughly.", "Stir in garlic, cumin, lemon juice and salt.", "Top with olive oil, diced tomato and parsley.", "Serve with boiled eggs and bread."] },
  { id: "om-ali", name: "Om Ali", country: "818", serves: 6, time: 40, level: "Easy",
    desc: "Egypt's bread pudding of baked puff pastry, nuts and raisins in sweet milk.",
    ing: [["puff_pastry", 275], ["milk", 750], ["cream", 200], ["sugar", 80], ["vanilla_sugar", 1], ["raisins", 50], ["almonds", 50], ["pistachios", 40], ["desiccated_coconut", 30]],
    steps: ["Bake the puff pastry until golden and break into pieces.", "Layer pastry with nuts, raisins and coconut in a dish.", "Heat milk with sugar and vanilla sugar and pour over.", "Top with whipped cream and grill until golden."] },

  // ================= MOROCCO =================
  { id: "harira", name: "Harira", country: "504", serves: 6, time: 80, level: "Easy",
    desc: "The Ramadan soup: tomato broth with lentils, chickpeas, lamb, herbs and lemon.",
    ing: [["lamb_shoulder", 250], ["red_lentils", 100], ["chickpeas_can", 1], ["onion", 150], ["celery", 2], ["chopped_tomatoes", 1], ["tomato_paste", 30], ["parsley", 1], ["coriander", 1], ["ginger", 10], ["turmeric", 2], ["cinnamon", 1], ["flour", 30], ["lemon", 1], ["vermicelli", 50], ["salt", 6]],
    steps: ["Brown the diced lamb with onion, celery and spices.", "Add lentils, tomatoes, paste, half the herbs and 1.8 l water. Simmer 45 minutes.", "Add chickpeas and vermicelli and cook 10 minutes.", "Whisk flour with water and stir in to thicken. Finish with herbs and lemon."] },
  { id: "kefta-tagine", name: "Kefta Tagine with Eggs", country: "504", serves: 4, time: 45, level: "Easy",
    desc: "Spiced meatballs simmered in tomato sauce with eggs poached on top.",
    ing: [["beef_mince", 500], ["onion", 100], ["parsley", 1], ["coriander", 0.5], ["cumin", 3], ["paprika", 3], ["chopped_tomatoes", 2], ["garlic", 3], ["eggs", 4], ["olive_oil", 30], ["baguette", 1], ["salt", 5]],
    steps: ["Mix mince with grated onion, herbs, half the spices and salt. Roll small balls.", "Simmer tomatoes, garlic, oil and remaining spices for 10 minutes.", "Add the meatballs, cover and cook 15 minutes.", "Crack in the eggs, cover until set and serve with bread."] },

  // ================= TUNISIA =================
  { id: "shakshuka", name: "Shakshuka", country: "788", serves: 4, time: 30, level: "Easy",
    desc: "Eggs poached in a spicy pepper and tomato sauce with cumin and harissa.",
    ing: [["eggs", 6], ["bell_pepper", 2], ["onion", 150], ["garlic", 3], ["chopped_tomatoes", 2], ["harissa", 20], ["cumin", 2], ["paprika", 2], ["olive_oil", 30], ["parsley", 0.5], ["baguette", 1], ["salt", 3]],
    steps: ["Soften onion and peppers in oil, add garlic and spices.", "Add tomatoes and harissa and simmer 10 minutes.", "Make wells and crack in the eggs. Cover and cook until the whites set.", "Scatter with parsley and serve with bread."] },
  { id: "lablabi", name: "Lablabi", country: "788", serves: 4, time: 25, level: "Easy",
    desc: "Tunis street breakfast of garlicky chickpea broth over stale bread with harissa and egg.",
    ing: [["chickpeas_can", 3], ["garlic", 4], ["cumin", 4], ["harissa", 30], ["vegetable_stock", 1, "in 1 l water"], ["baguette", 1], ["eggs", 4], ["olive_oil", 40], ["lemon", 1], ["capers", 20]],
    steps: ["Simmer chickpeas in the stock with garlic and half the cumin for 15 minutes.", "Tear stale bread into bowls.", "Ladle over the broth and chickpeas, then add a soft-boiled or raw egg to cook in the heat.", "Top with harissa, cumin, oil, lemon and capers."] },

  // ================= ALGERIA =================
  { id: "chorba-frik", name: "Chorba Frik", country: "012", serves: 6, time: 75, level: "Easy",
    desc: "Algerian lamb and tomato soup thickened with cracked green wheat, made for Ramadan.",
    ing: [["lamb_shoulder", 400], ["bulgur", 120, "instead of frik"], ["onion", 150], ["tomato_paste", 40], ["chickpeas_can", 1], ["coriander", 1], ["mint", 0.5], ["cinnamon", 1], ["paprika", 3], ["olive_oil", 30], ["lemon", 1], ["salt", 6]],
    steps: ["Brown the lamb with onion, spices and tomato paste.", "Add 1.8 l water and simmer 40 minutes.", "Add bulgur and chickpeas and cook 20 minutes.", "Finish with chopped herbs and lemon."] },

  // ================= ETHIOPIA =================
  { id: "doro-wat", name: "Doro Wat", country: "231", serves: 6, time: 120, level: "Medium",
    desc: "Ethiopia's festive chicken stew of slow-cooked onions, berbere and spiced butter, with eggs.",
    ing: [["chicken_legs", 1200], ["onion", 800], ["berbere", 30], ["butter", 100], ["garlic", 5], ["ginger", 20], ["cardamom", 1], ["tomato_paste", 30], ["lemon", 1], ["eggs", 6], ["salt", 6]],
    steps: ["Cook the finely chopped onions in a dry pot for 20 minutes, stirring, then add butter.", "Add garlic, ginger, berbere, cardamom and tomato paste and cook 10 minutes.", "Add the chicken (rubbed with lemon) and 400 ml water. Simmer 45 minutes.", "Add peeled hard-boiled eggs, scored, and simmer 10 minutes. Serve with injera."] },
  { id: "shiro", name: "Shiro", country: "231", serves: 4, time: 30, level: "Easy",
    desc: "Smooth spiced chickpea flour stew, an everyday Ethiopian fasting dish.",
    ing: [["chickpea_flour", 120], ["berbere", 10], ["onion", 200], ["garlic", 3], ["tomatoes", 150], ["vegetable_oil", 50], ["salt", 3]],
    steps: ["Cook the chopped onions in oil until soft, add garlic and tomato.", "Whisk chickpea flour and berbere into 800 ml water.", "Pour into the pot and whisk over medium heat for 15 minutes until smooth and thick.", "Season and serve with injera or flatbread."] },

  // ================= NIGERIA =================
  { id: "suya", name: "Suya", country: "566", serves: 4, time: 40, level: "Easy",
    desc: "Northern Nigerian grilled beef skewers coated in fiery peanut spice, with onion and tomato.",
    ing: [["beef_steak", 600], ["peanuts", 100], ["chili_flakes", 5], ["paprika", 5], ["ginger", 10], ["garlic", 2], ["vegetable_stock", 0.5], ["vegetable_oil", 30], ["red_onion", 100], ["tomatoes", 200], ["salt", 4]],
    steps: ["Grind the peanuts finely and mix with the spices and crumbled stock cube.", "Slice the beef thinly, thread onto skewers, brush with oil and coat in the spice.", "Grill 6–8 minutes, turning.", "Serve with sliced onion, tomato and extra spice."] },
  { id: "puff-puff", name: "Puff-Puff", country: "566", serves: 6, time: 75, level: "Easy",
    desc: "West African fried dough balls, slightly sweet and fluffy inside.",
    ing: [["flour", 350], ["sugar", 70], ["dry_yeast", 1], ["nutmeg", 0.5], ["salt", 2], ["vegetable_oil", 750, "for frying"]],
    steps: ["Mix flour, sugar, yeast, nutmeg, salt and 300 ml warm water into a sticky batter.", "Cover and rise 1 hour until bubbly.", "Drop balls of batter into oil at 170 °C and fry until golden all over.", "Drain and dust with sugar if you like."] },

  // ================= GHANA =================
  { id: "red-red", name: "Red-Red", country: "288", serves: 4, time: 40, level: "Easy",
    desc: "Black-eyed bean stew in red palm-style oil with fried sweet plantains.",
    ing: [["black_eyed_beans_can", 2], ["onion", 150], ["chopped_tomatoes", 1], ["scotch_bonnet", 5], ["ginger", 10], ["paprika", 4], ["vegetable_oil", 80, "or red palm oil"], ["plantain", 3], ["salt", 4]],
    steps: ["Fry onion, ginger and chili in oil with the paprika.", "Add tomatoes and cook 10 minutes.", "Add the drained beans and simmer 10 minutes.", "Fry slices of ripe plantain until caramelized and serve alongside."] },
  { id: "groundnut-soup", name: "Groundnut Soup", country: "288", serves: 6, time: 75, level: "Easy",
    desc: "Rich peanut and tomato soup with chicken, eaten with rice balls.",
    ing: [["chicken_legs", 1000], ["peanut_butter", 200], ["onion", 200], ["chopped_tomatoes", 1], ["ginger", 15], ["garlic", 3], ["scotch_bonnet", 5], ["chicken_stock", 2, "in 1.5 l water"], ["rice", 400], ["salt", 4]],
    steps: ["Simmer chicken with onion, ginger, garlic and stock for 20 minutes.", "Blend the tomatoes and chili and add.", "Whisk peanut butter with some hot broth and stir in.", "Simmer 30 minutes until the oil rises. Serve with rice."] },
  { id: "kelewele", name: "Kelewele", country: "288", serves: 4, time: 20, level: "Easy",
    desc: "Spicy fried plantain cubes with ginger and chili, a favorite Accra street snack.",
    ing: [["plantain", 4], ["ginger", 15], ["fresh_chili", 5], ["nutmeg", 0.3], ["salt", 2], ["vegetable_oil", 300], ["peanuts", 60]],
    steps: ["Cube ripe plantains.", "Toss with grated ginger, chili, nutmeg and salt.", "Fry until caramelized at the edges.", "Serve with roasted peanuts."] },

  // ================= SENEGAL =================
  { id: "thieboudienne", name: "Thieboudienne", country: "686", serves: 6, time: 120, level: "Hard",
    desc: "Senegal's national dish of fish stuffed with parsley and chili, cooked with rice and vegetables.",
    ing: [["white_fish", 800], ["rice", 500], ["parsley", 1], ["garlic", 5], ["scotch_bonnet", 5], ["onion", 200], ["tomato_paste", 100], ["carrots", 200], ["eggplant", 1], ["white_cabbage", 0.5], ["sweet_potatoes", 300], ["vegetable_oil", 100], ["fish_stock", 2, "in 1.5 l water"], ["lime", 1], ["salt", 8]],
    steps: ["Pound parsley, garlic, chili and salt; stuff into slits in the fish pieces. Fry briefly.", "Fry onion and tomato paste in oil, add stock and the vegetables. Simmer 30 minutes.", "Return the fish for 10 minutes, then lift out fish and vegetables.", "Cook the rice in the broth until tender and slightly crusty.", "Serve the rice with fish, vegetables and lime."] },

  // ================= CÔTE D'IVOIRE =================
  { id: "kedjenou", name: "Kedjenou", country: "384", serves: 4, time: 80, level: "Easy",
    desc: "Chicken and vegetables slowly steamed in their own juices in a sealed pot.",
    ing: [["chicken_legs", 1000], ["onion", 200], ["tomatoes", 300], ["eggplant", 1], ["bell_pepper", 1], ["garlic", 3], ["ginger", 15], ["scotch_bonnet", 5], ["thyme", 1], ["bay_leaves", 1], ["rice", 300], ["salt", 5]],
    steps: ["Put chicken, chopped vegetables, garlic, ginger, chili, herbs and salt in a heavy pot. No water.", "Seal tightly and cook on low heat 1 hour, shaking the pot every 10 minutes instead of opening it.", "Serve with rice or attiéké."] },

  // ================= CAMEROON =================
  { id: "ndole", name: "Ndolé", country: "120", serves: 6, time: 90, level: "Medium",
    desc: "Cameroon's national dish of bitter greens in peanut sauce with beef and prawns.",
    ing: [["frozen_spinach", 900, "instead of bitter leaf"], ["peanuts", 300, "raw, unsalted"], ["beef_stew", 500], ["shrimp", 250], ["onion", 200], ["garlic", 3], ["ginger", 15], ["vegetable_oil", 80], ["beef_stock", 1, "in 500 ml water"], ["plantain", 3], ["salt", 6]],
    steps: ["Simmer the beef in the stock for 1 hour.", "Boil the peanuts 15 minutes, then blend with garlic and ginger to a paste.", "Add the paste to the beef and simmer 20 minutes, stirring.", "Add the spinach and fried onions, then the prawns for 5 minutes.", "Serve with boiled plantain."] },

  // ================= KENYA =================
  { id: "kenyan-pilau", name: "Kenyan Pilau", country: "404", serves: 6, time: 75, level: "Easy",
    desc: "Coastal Swahili rice cooked with beef and whole spices until fragrant and brown.",
    ing: [["basmati_rice", 500], ["beef_stew", 500], ["onion", 200], ["garlic", 4], ["ginger", 15], ["cumin", 3], ["cardamom", 1], ["cinnamon", 1], ["cloves", 1], ["black_pepper", 1], ["tomatoes", 200], ["vegetable_oil", 50], ["salt", 7]],
    steps: ["Simmer the beef in 1 l salted water for 40 minutes. Keep the broth.", "Fry onions until dark golden, add garlic, ginger and spices.", "Add tomatoes, beef and rice and stir to coat.", "Add 800 ml broth, cover and cook on low 20 minutes."] },
  { id: "sukuma-wiki", name: "Sukuma Wiki", country: "404", serves: 4, time: 20, level: "Easy",
    desc: "Collard greens sautéed with onion and tomato, the Kenyan side that 'stretches the week'.",
    ing: [["kale", 500], ["onion", 100], ["tomatoes", 200], ["garlic", 2], ["vegetable_oil", 30], ["vegetable_stock", 0.5], ["salt", 2]],
    steps: ["Fry onion and garlic until soft, add chopped tomatoes.", "Add the finely shredded greens and crumbled stock.", "Cook 8–10 minutes until tender. Serve with ugali or chapati."] },
  { id: "chapati", name: "Chapati", country: "404", serves: 8, time: 60, level: "Medium",
    desc: "Flaky East African layered flatbreads, pan-fried with oil.",
    ing: [["flour", 500], ["salt", 5], ["sugar", 10], ["vegetable_oil", 80]],
    steps: ["Mix flour, salt, sugar, 3 tbsp oil and 300 ml warm water into a soft dough. Rest 30 minutes.", "Roll each piece thin, brush with oil, roll up into a coil and rest again.", "Roll out flat and cook in a dry pan, brushing with oil, until golden spots appear."] },

  // ================= TANZANIA =================
  { id: "chipsi-mayai", name: "Chipsi Mayai", country: "834", serves: 2, time: 30, level: "Easy",
    desc: "Dar es Salaam's chips omelette: fries set in beaten egg, with kachumbari salad.",
    ing: [["floury_potatoes", 500], ["vegetable_oil", 500, "for frying"], ["eggs", 4], ["tomatoes", 150], ["red_onion", 50], ["coriander", 0.25], ["lime", 0.5], ["ketchup", 30], ["salt", 3]],
    steps: ["Fry the potato chips until golden.", "Put them in a hot oiled pan and pour beaten seasoned eggs over.", "Cook until set, flip and brown the other side.", "Serve with a tomato, onion, coriander and lime salad and ketchup."] },
  { id: "mchuzi-samaki", name: "Mchuzi wa Samaki", country: "834", serves: 4, time: 40, level: "Easy",
    desc: "Zanzibar fish curry in coconut milk with tamarind, turmeric and curry spices.",
    ing: [["white_fish", 600], ["coconut_milk", 1], ["onion", 150], ["tomatoes", 200], ["garlic", 3], ["ginger", 10], ["curry_powder", 6], ["turmeric", 2], ["tamarind", 20], ["lime", 1], ["vegetable_oil", 30], ["rice", 300], ["salt", 4]],
    steps: ["Rub the fish with turmeric, lime and salt.", "Fry onion, garlic and ginger, add curry powder and tomatoes.", "Add coconut milk and tamarind and simmer 10 minutes.", "Add the fish and cook gently 8 minutes. Serve with rice."] },

  // ================= UGANDA =================
  { id: "rolex", name: "Rolex", country: "800", serves: 2, time: 30, level: "Easy",
    desc: "Uganda's 'rolled eggs': a vegetable omelette wrapped in a chapati.",
    ing: [["eggs", 4], ["white_cabbage", 0.1], ["tomatoes", 100], ["onion", 50], ["bell_pepper", 0.5], ["vegetable_oil", 20], ["chapati_ready", 2], ["salt", 1]],
    steps: ["Beat the eggs with shredded cabbage, diced tomato, onion, pepper and salt.", "Cook as a thin omelette in oil.", "Lay a warm chapati on top, flip and roll up together."] },

  // ================= SOMALIA =================
  { id: "bariis-iskukaris", name: "Bariis Iskukaris", country: "706", serves: 6, time: 75, level: "Easy",
    desc: "Somali spiced rice with goat or lamb, raisins and xawaash spice, served with banana.",
    ing: [["basmati_rice", 500], ["lamb_shoulder", 600], ["onion", 200], ["garlic", 4], ["tomato_paste", 30], ["cumin", 3], ["cardamom", 1], ["cinnamon", 1], ["cloves", 1], ["black_pepper", 1], ["raisins", 50], ["vegetable_oil", 50], ["bananas", 3], ["salt", 7]],
    steps: ["Brown the lamb with onion and garlic, add spices and tomato paste.", "Add 1 l water and simmer 45 minutes.", "Add the rice and cook covered until the liquid is absorbed.", "Top with fried onions and raisins. Serve with sliced banana."] },

  // ================= SUDAN =================
  { id: "sudanese-ful", name: "Sudanese Ful with Salata", country: "729", serves: 4, time: 20, level: "Easy",
    desc: "Mashed fava beans with sesame oil, cumin, feta and a fresh tomato salad.",
    ing: [["fava_beans_can", 2], ["sesame_oil", 20], ["cumin", 2], ["feta", 100], ["tomatoes", 200], ["red_onion", 50], ["lime", 1], ["fresh_chili", 5], ["pita", 4], ["salt", 3]],
    steps: ["Warm and mash the beans with cumin, salt and sesame oil.", "Top with crumbled feta.", "Dice tomato, onion and chili with lime juice for the salata.", "Serve with bread."] },

  // ================= SOUTH AFRICA =================
  { id: "bunny-chow", name: "Bunny Chow", country: "710", serves: 4, time: 75, level: "Easy",
    desc: "Durban's hollowed-out loaf filled with spicy curry, born in the Indian community.",
    ing: [["lamb_shoulder", 600], ["potatoes", 400], ["onion", 150], ["tomatoes", 200], ["garlic", 3], ["ginger", 10], ["curry_powder", 15], ["garam_masala", 3], ["cinnamon", 1], ["vegetable_oil", 40], ["white_loaf", 2], ["coriander", 0.5], ["salt", 5]],
    steps: ["Fry onion, garlic, ginger and spices, add the lamb and brown.", "Add tomatoes and 500 ml water, simmer 40 minutes.", "Add potato cubes and cook 20 minutes until thick.", "Cut each loaf in half, hollow out and fill with curry, using the bread 'lid' to scoop."] },
  { id: "chakalaka", name: "Chakalaka", country: "710", serves: 6, time: 30, level: "Easy",
    desc: "Spicy township relish of beans, peppers, carrots and curry, served at every braai.",
    ing: [["baked_beans", 1], ["carrots", 200], ["bell_pepper", 2], ["onion", 150], ["garlic", 3], ["fresh_chili", 10], ["curry_powder", 6], ["chopped_tomatoes", 1], ["vegetable_oil", 30], ["salt", 3]],
    steps: ["Fry onion, garlic, chili and curry powder.", "Add diced peppers and grated carrots and cook 5 minutes.", "Add tomatoes and simmer 10 minutes, then stir in the baked beans.", "Serve warm or cold with grilled meat or pap."] },
  { id: "malva-pudding", name: "Malva Pudding", country: "710", serves: 8, time: 60, level: "Easy",
    desc: "Spongy apricot-jam pudding soaked in hot buttery cream sauce.",
    ing: [["sugar", 300], ["eggs", 2], ["jam", 30, "apricot"], ["flour", 150], ["baking_soda", 1], ["milk", 250], ["butter", 130], ["white_vinegar", 15], ["cream", 200], ["salt", 1]],
    steps: ["Beat 200 g sugar with eggs and jam, then add flour, baking soda, salt, milk, 30 g melted butter and vinegar.", "Bake in a greased dish at 180 °C for 40 minutes.", "Heat cream, remaining butter, 100 g sugar and 100 ml water until melted.", "Pour over the hot pudding as it comes out of the oven."] },

  // ================= MOZAMBIQUE =================
  { id: "piri-piri", name: "Piri-Piri Chicken", country: "508", serves: 4, time: 60, level: "Easy",
    desc: "Chicken marinated in fiery bird's-eye chili, garlic and lemon, grilled over coals.",
    ing: [["chicken_legs", 1200], ["fresh_chili", 20], ["garlic", 5], ["lemon", 2], ["paprika", 4], ["oregano", 1], ["red_wine_vinegar", 20], ["olive_oil", 60], ["salt", 6], ["rice", 300]],
    steps: ["Blend chili, garlic, lemon juice, paprika, oregano, vinegar, oil and salt.", "Marinate the chicken at least 4 hours.", "Grill or roast at 220 °C for 40 minutes, basting with the marinade.", "Serve with rice or fries."] },

  // ================= MADAGASCAR =================
  { id: "romazava", name: "Romazava", country: "450", serves: 4, time: 90, level: "Easy",
    desc: "Madagascar's national dish: a light beef broth with mixed greens, tomato and ginger.",
    ing: [["beef_stew", 600], ["frozen_spinach", 450], ["kale", 200], ["onion", 150], ["tomatoes", 300], ["garlic", 3], ["ginger", 15], ["vegetable_oil", 20], ["rice", 300], ["salt", 6]],
    steps: ["Brown the beef with onion, garlic and ginger.", "Add tomatoes and 1 l water and simmer 1 hour.", "Add the greens and cook 15 minutes.", "Serve the broth and meat over rice."] },

  // ================= ZIMBABWE =================
  { id: "sadza-nyama", name: "Sadza ne Nyama", country: "716", serves: 4, time: 90, level: "Easy",
    desc: "Stiff white maize porridge with a tomato beef stew and greens.",
    ing: [["maize_meal", 400], ["beef_stew", 600], ["onion", 150], ["tomatoes", 300], ["vegetable_stock", 1, "in 500 ml water"], ["kale", 250], ["vegetable_oil", 30], ["curry_powder", 3], ["salt", 6]],
    steps: ["Brown the beef with onion and curry powder, add tomatoes and stock, simmer 1 hour.", "Sauté the greens with a little onion.", "For sadza, whisk a third of the maize meal into 1 l cold water, bring to the boil, then beat in the rest until very thick. Cook 5 minutes.", "Shape into mounds and serve with stew and greens."] }
);
