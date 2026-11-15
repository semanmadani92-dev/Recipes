/* More recipes from the Americas and Oceania. Same format as recipes.js. */
Object.assign(window.COUNTRIES, {
  "192": { name: "Cuba",               region: "Americas", lat: 21.7,  lng: -79.5 },
  "630": { name: "Puerto Rico",        region: "Americas", lat: 18.2,  lng: -66.5 },
  "214": { name: "Dominican Republic", region: "Americas", lat: 18.9,  lng: -70.4 },
  "332": { name: "Haiti",              region: "Americas", lat: 19.0,  lng: -72.6 },
  "780": { name: "Trinidad and Tobago",region: "Americas", lat: 10.5,  lng: -61.3 },
  "320": { name: "Guatemala",          region: "Americas", lat: 15.6,  lng: -90.4 },
  "222": { name: "El Salvador",        region: "Americas", lat: 13.8,  lng: -88.9 },
  "340": { name: "Honduras",           region: "Americas", lat: 15.2,  lng: -86.2 },
  "188": { name: "Costa Rica",         region: "Americas", lat: 9.9,   lng: -84.0 },
  "862": { name: "Venezuela",          region: "Americas", lat: 7.0,   lng: -66.0 },
  "218": { name: "Ecuador",            region: "Americas", lat: -1.6,  lng: -78.4 },
  "068": { name: "Bolivia",            region: "Americas", lat: -16.7, lng: -64.7 },
  "152": { name: "Chile",              region: "Americas", lat: -33.5, lng: -70.9 },
  "858": { name: "Uruguay",            region: "Americas", lat: -32.8, lng: -56.0 },
  "600": { name: "Paraguay",           region: "Americas", lat: -23.4, lng: -58.4 },
  "554": { name: "New Zealand",        region: "Oceania",  lat: -41.5, lng: 172.8 },
  "242": { name: "Fiji",               region: "Oceania",  lat: -17.8, lng: 178.1 }
});

window.RECIPES.push(
  // ================= UNITED STATES =================
  { id: "buffalo-wings", name: "Buffalo Wings", country: "840", serves: 4, time: 60, level: "Easy",
    desc: "Buffalo, New York's crispy wings tossed in hot sauce and butter, with blue cheese dip and celery.",
    ing: [["chicken_wings", 1000], ["baking_powder", 1], ["hot_sauce", 120], ["butter", 60], ["sour_cream", 150], ["blue_cheese", 80], ["mayonnaise", 40], ["celery", 4], ["salt", 6]],
    steps: ["Toss the wings with baking powder and salt. Rest uncovered in the fridge for an hour if you can.", "Bake on a rack at 220 °C for 45 minutes, turning once, until very crisp.", "Melt butter into the hot sauce and toss the wings in it.", "Mix sour cream, mayo and crumbled blue cheese. Serve with celery sticks."] },
  { id: "pulled-pork", name: "Pulled Pork Sandwiches", country: "840", serves: 8, time: 360, level: "Easy",
    desc: "Carolina-style pork shoulder rubbed with spices, slow-cooked until it falls apart, with slaw.",
    ing: [["pork_shoulder", 2000], ["brown_sugar", 40], ["smoked_paprika", 10], ["garlic_powder", 5], ["cumin", 3], ["salt", 15], ["apple_cider_vinegar", 100], ["ketchup", 150], ["burger_buns", 8], ["white_cabbage", 0.5], ["carrots", 100], ["mayonnaise", 80]],
    steps: ["Rub the pork with sugar, paprika, garlic powder, cumin and salt.", "Roast covered at 140 °C for 5–6 hours until it shreds easily.", "Shred and mix with juices, vinegar and ketchup.", "Toss shredded cabbage and carrot with mayo and a splash of vinegar.", "Pile pork and slaw into toasted buns."] },
  { id: "chili-con-carne", name: "Chili con Carne", country: "840", serves: 6, time: 90, level: "Easy",
    desc: "Texas-born beef and bean chili with cumin, chili and tomato, topped with cheese and sour cream.",
    ing: [["beef_mince", 750], ["onion", 200], ["garlic", 4], ["bell_pepper", 1], ["kidney_beans_can", 2], ["chopped_tomatoes", 2], ["tomato_paste", 40], ["chili_powder", 10], ["cumin", 5], ["smoked_paprika", 4], ["oregano", 2], ["beef_stock", 1, "in 300 ml water"], ["cheddar", 100], ["sour_cream", 150], ["vegetable_oil", 20], ["rice", 400], ["salt", 6]],
    steps: ["Brown the mince well in oil, then add onion, garlic and pepper.", "Stir in tomato paste and spices for a minute.", "Add tomatoes, stock and beans. Simmer 1 hour, stirring now and then.", "Serve with rice, grated cheese and sour cream."] },
  { id: "jambalaya", name: "Jambalaya", country: "840", serves: 6, time: 60, level: "Easy",
    desc: "Louisiana's one-pot rice with chicken, smoked sausage, prawns and the Cajun 'holy trinity'.",
    ing: [["chicken_thighs", 400], ["smoked_sausage", 300], ["shrimp", 250], ["onion", 150], ["bell_pepper", 1], ["celery", 3], ["garlic", 3], ["chopped_tomatoes", 1], ["rice", 400], ["chicken_stock", 2, "in 900 ml water"], ["smoked_paprika", 5], ["cayenne", 1], ["thyme", 1], ["vegetable_oil", 30], ["salt", 4]],
    steps: ["Brown the chicken and sliced sausage. Set aside.", "Cook onion, pepper and celery until soft, add garlic and spices.", "Add rice, tomatoes, stock, chicken and sausage. Cover and simmer 20 minutes.", "Add prawns on top, cover and cook 5 minutes more."] },
  { id: "fried-chicken", name: "Southern Fried Chicken", country: "840", serves: 4, time: 90, level: "Medium",
    desc: "Buttermilk-soaked chicken in a seasoned crunchy crust.",
    ing: [["chicken_legs", 1200], ["buttermilk", 500], ["flour", 300], ["paprika", 8], ["garlic_powder", 5], ["cayenne", 2], ["black_pepper", 2], ["salt", 12], ["vegetable_oil", 1000, "for frying"]],
    steps: ["Soak the chicken in buttermilk with half the salt for at least 4 hours.", "Mix flour with spices and remaining salt.", "Dredge the chicken, dip back in buttermilk and dredge again.", "Fry at 160 °C for 15–18 minutes, turning, until deep golden and cooked through."] },
  { id: "choc-chip-cookies", name: "Chocolate Chip Cookies", country: "840", serves: 20, time: 30, level: "Easy",
    desc: "Chewy brown-butter cookies invented at the Toll House Inn, Massachusetts, in 1938.",
    ing: [["butter", 170], ["brown_sugar", 150], ["sugar", 50], ["eggs", 1], ["vanilla_sugar", 1], ["flour", 250], ["baking_soda", 0.5], ["salt", 3], ["dark_chocolate", 200]],
    steps: ["Melt and lightly brown the butter, then cool slightly.", "Whisk with both sugars, egg and vanilla sugar.", "Stir in flour, baking soda and salt, then chopped chocolate.", "Scoop balls onto a tray and bake at 180 °C for 10–11 minutes. They firm up as they cool."] },
  { id: "apple-pie", name: "Apple Pie", country: "840", serves: 8, time: 120, level: "Medium",
    desc: "Double-crust pie with cinnamon apples, the symbol of American home baking.",
    ing: [["flour", 350], ["butter", 225], ["sugar", 120], ["salt", 3], ["apples", 1200], ["cinnamon", 4], ["lemon", 0.5], ["cornstarch", 25], ["eggs", 1]],
    steps: ["Rub cold butter into flour and salt, add iced water to form a dough. Chill 1 hour.", "Slice the apples and toss with sugar, cinnamon, lemon and cornstarch.", "Roll out two rounds, line a pie dish, fill and cover. Crimp and cut vents.", "Brush with egg and bake at 200 °C for 20 minutes, then 180 °C for 40 minutes."] },

  // ================= CANADA =================
  { id: "butter-tarts", name: "Butter Tarts", country: "124", serves: 12, time: 50, level: "Easy",
    desc: "Small pastry shells with a gooey filling of butter, sugar, syrup and raisins.",
    ing: [["shortcrust_pastry", 275], ["butter", 60], ["brown_sugar", 150], ["maple_syrup", 80], ["eggs", 1], ["white_vinegar", 5], ["vanilla_sugar", 1], ["raisins", 60], ["salt", 1]],
    steps: ["Cut the pastry into rounds and line a muffin tin.", "Whisk melted butter, sugar, syrup, egg, vinegar, vanilla and salt.", "Put a few raisins in each shell and fill two-thirds with the mixture.", "Bake at 200 °C for 15 minutes until bubbling. Cool in the tin."] },
  { id: "tourtiere", name: "Tourtière", country: "124", serves: 8, time: 100, level: "Medium",
    desc: "Québec's Christmas meat pie of spiced pork and beef with cinnamon, cloves and allspice.",
    ing: [["shortcrust_pastry", 550], ["pork_mince", 500], ["beef_mince", 250], ["onion", 150], ["garlic", 2], ["potatoes", 200], ["cinnamon", 1], ["cloves", 0.3], ["allspice", 1], ["thyme", 1], ["beef_stock", 1, "in 200 ml water"], ["eggs", 1], ["salt", 6]],
    steps: ["Cook the meats with onion and garlic until no longer pink.", "Add spices, stock and a grated potato and simmer 20 minutes until thick. Cool.", "Line a pie dish with pastry, fill and cover with the second sheet.", "Brush with egg and bake at 200 °C for 40 minutes."] },

  // ================= MEXICO =================
  { id: "huevos-rancheros", name: "Huevos Rancheros", country: "484", serves: 4, time: 30, level: "Easy",
    desc: "Ranch-style breakfast: fried eggs on tortillas with salsa, beans and avocado.",
    ing: [["corn_tortillas", 4], ["eggs", 4], ["chopped_tomatoes", 1], ["onion", 80], ["garlic", 1], ["fresh_chili", 10], ["black_beans_can", 1], ["avocado", 1], ["feta", 60], ["coriander", 0.5], ["vegetable_oil", 30], ["salt", 3]],
    steps: ["Simmer tomatoes, onion, garlic, chili and salt for 10 minutes, then blend to a salsa.", "Warm the beans and mash lightly.", "Fry the tortillas briefly, then the eggs.", "Layer tortilla, beans, egg and salsa. Top with avocado, cheese and coriander."] },
  { id: "enchiladas", name: "Chicken Enchiladas Rojas", country: "484", serves: 4, time: 60, level: "Medium",
    desc: "Tortillas rolled around chicken, smothered in red chili sauce and melted cheese.",
    ing: [["chicken_breast", 500], ["corn_tortillas", 12], ["passata", 500], ["chili_powder", 10], ["cumin", 3], ["oregano", 1], ["garlic", 2], ["onion", 100], ["chicken_stock", 1, "in 250 ml water"], ["mozzarella", 250], ["sour_cream", 150], ["vegetable_oil", 30], ["salt", 4]],
    steps: ["Poach and shred the chicken.", "Fry the spices in oil, add passata, stock and garlic and simmer 15 minutes.", "Dip each tortilla in sauce, fill with chicken and onion, roll and place in a dish.", "Cover with remaining sauce and cheese and bake at 200 °C for 20 minutes. Serve with sour cream."] },
  { id: "elote", name: "Elote", country: "484", serves: 4, time: 20, level: "Easy",
    desc: "Street-cart grilled corn on the cob with mayo, cheese, chili and lime.",
    ing: [["corn_cobs", 4], ["mayonnaise", 60], ["feta", 80], ["chili_powder", 2], ["lime", 1], ["coriander", 0.25]],
    steps: ["Grill the corn until charred in spots.", "Brush with mayonnaise.", "Roll in crumbled cheese and sprinkle with chili.", "Serve with lime wedges and coriander."] },
  { id: "sopa-tortilla", name: "Sopa de Tortilla", country: "484", serves: 4, time: 40, level: "Easy",
    desc: "Tomato and chili broth poured over crisp tortilla strips, avocado and cheese.",
    ing: [["corn_tortillas", 8], ["tomatoes", 500], ["onion", 100], ["garlic", 2], ["chili_powder", 5], ["chicken_stock", 2, "in 1 l water"], ["avocado", 1], ["mozzarella", 125], ["sour_cream", 100], ["lime", 1], ["vegetable_oil", 100], ["salt", 4]],
    steps: ["Cut tortillas into strips and fry until crisp.", "Blend tomatoes, onion, garlic and chili; fry the purée 5 minutes.", "Add stock and simmer 15 minutes.", "Pour over tortilla strips, cheese and avocado. Top with sour cream and lime."] },
  { id: "caesar-salad", name: "Caesar Salad", country: "484", serves: 4, time: 20, level: "Easy",
    desc: "Created in Tijuana in 1924: romaine, croutons and Parmesan in a garlicky egg dressing.",
    ing: [["lettuce", 2], ["toast_bread", 4], ["parmesan", 60], ["eggs", 1, "yolk"], ["garlic", 1], ["lemon", 1], ["mustard", 5], ["worcestershire", 10], ["olive_oil", 100], ["black_pepper", 1]],
    steps: ["Cube the bread and toast in a little oil with garlic until crisp.", "Whisk yolk, crushed garlic, lemon, mustard and Worcestershire, then slowly add the oil.", "Toss whole romaine leaves with the dressing, croutons and grated Parmesan."] },
  { id: "chiles-rellenos", name: "Chiles Rellenos", country: "484", serves: 4, time: 60, level: "Medium",
    desc: "Roasted mild chilies stuffed with cheese, dipped in fluffy egg batter and fried, with tomato sauce.",
    ing: [["poblano_peppers", 4, "or long sweet peppers"], ["mozzarella", 250], ["eggs", 4], ["flour", 50], ["vegetable_oil", 300], ["chopped_tomatoes", 1], ["onion", 80], ["garlic", 1], ["salt", 3]],
    steps: ["Char the peppers, peel, slit and seed them.", "Stuff with cheese and dust with flour.", "Whisk egg whites stiff, fold in yolks, coat the peppers and fry until golden.", "Simmer blended tomatoes, onion and garlic into a sauce and serve under the chilies."] },

  // ================= CUBA =================
  { id: "ropa-vieja", name: "Ropa Vieja", country: "192", serves: 6, time: 180, level: "Easy",
    desc: "'Old clothes': shredded beef braised with peppers, onions and tomato, with rice and black beans.",
    ing: [["beef_stew", 1000], ["onion", 200], ["bell_pepper", 2], ["garlic", 4], ["chopped_tomatoes", 1], ["tomato_paste", 30], ["cumin", 3], ["oregano", 2], ["white_wine", 150], ["olives", 60], ["olive_oil", 30], ["rice", 400], ["black_beans_can", 2], ["salt", 6]],
    steps: ["Simmer the beef in water for 2 hours until tender. Shred it.", "Fry onion, peppers and garlic, add spices, tomato paste, tomatoes and wine.", "Add the beef and some broth and simmer 20 minutes. Stir in olives.", "Serve with rice and black beans."] },
  { id: "cubano", name: "Cuban Sandwich", country: "192", serves: 4, time: 30, level: "Easy",
    desc: "Pressed sandwich of roast pork, ham, Swiss cheese, pickles and mustard.",
    ing: [["baguette", 2], ["pork_shoulder", 300, "roasted, sliced"], ["ham", 200], ["emmental", 150], ["pickles", 100], ["mustard", 30], ["butter", 30], ["lime", 1], ["garlic", 1]],
    steps: ["Marinate the pork with lime and garlic and roast or fry until cooked. Slice thinly.", "Split the bread and spread with mustard.", "Layer pork, ham, cheese and pickles.", "Butter the outside and press in a hot pan until crisp and the cheese melts."] },
  { id: "moros", name: "Moros y Cristianos", country: "192", serves: 6, time: 45, level: "Easy",
    desc: "Black beans and rice cooked together with sofrito, cumin and bay leaf.",
    ing: [["black_beans_can", 2], ["rice", 350], ["onion", 150], ["bell_pepper", 1], ["garlic", 3], ["cumin", 3], ["oregano", 1], ["bay_leaves", 1], ["olive_oil", 40], ["white_vinegar", 10], ["salt", 6]],
    steps: ["Fry onion, pepper and garlic in oil until soft.", "Add spices and rice and stir.", "Add beans with their liquid plus water to make 700 ml, bay and vinegar.", "Cover and simmer 20 minutes, then rest 10 minutes."] },

  // ================= PUERTO RICO =================
  { id: "mofongo", name: "Mofongo", country: "630", serves: 4, time: 40, level: "Medium",
    desc: "Fried green plantains mashed with garlic and crispy pork, served with broth.",
    ing: [["plantain", 4, "green"], ["garlic", 6], ["bacon", 150], ["olive_oil", 40], ["vegetable_oil", 400, "for frying"], ["chicken_stock", 1, "in 300 ml water"], ["salt", 4]],
    steps: ["Slice green plantains and fry until golden but not crisp.", "Fry the bacon until crisp.", "Mash plantains with crushed garlic, olive oil, salt and bacon in a mortar.", "Press into bowls, turn out and serve with hot broth."] },

  // ================= DOMINICAN REPUBLIC =================
  { id: "mangu", name: "Mangú con Los Tres Golpes", country: "214", serves: 4, time: 35, level: "Easy",
    desc: "Mashed green plantains with pickled red onions, fried salami, cheese and eggs.",
    ing: [["plantain", 4, "green"], ["butter", 40], ["red_onion", 150], ["white_vinegar", 50], ["salami", 200], ["halloumi", 200, "instead of queso frito"], ["eggs", 4], ["vegetable_oil", 40], ["salt", 4]],
    steps: ["Boil peeled plantains until very soft, mash with butter, salt and some cooking water.", "Cook sliced red onions with vinegar and a little oil until just soft.", "Fry the salami slices, the cheese and the eggs.", "Serve the mangú topped with onions, with the three fried 'blows' alongside."] },
  { id: "sancocho", name: "Sancocho", country: "214", serves: 8, time: 150, level: "Medium",
    desc: "Hearty stew of several meats and root vegetables, made for family celebrations.",
    ing: [["chicken_legs", 800], ["pork_shoulder", 400], ["beef_stew", 400], ["plantain", 2], ["potatoes", 400], ["sweet_potatoes", 400], ["corn_cobs", 2], ["onion", 150], ["garlic", 4], ["coriander", 1], ["oregano", 2], ["lime", 2], ["vegetable_oil", 30], ["rice", 400], ["salt", 10]],
    steps: ["Season the meats with lime, garlic, oregano and salt; brown in oil.", "Add onion and 3 l water and simmer 1 hour.", "Add root vegetables and corn pieces and cook 40 minutes until thick.", "Finish with coriander and serve with rice and avocado."] },

  // ================= HAITI =================
  { id: "griot", name: "Griot with Pikliz", country: "332", serves: 4, time: 120, level: "Medium",
    desc: "Citrus-marinated pork, simmered then fried crisp, with fiery pickled slaw.",
    ing: [["pork_shoulder", 1000], ["orange", 2], ["lime", 2], ["garlic", 5], ["thyme", 1], ["scotch_bonnet", 10], ["onion", 100], ["white_cabbage", 0.25], ["carrots", 100], ["white_vinegar", 200], ["vegetable_oil", 300], ["plantain", 2], ["salt", 8]],
    steps: ["For pikliz, mix shredded cabbage, carrot, onion and sliced chili with vinegar and salt. Rest 1 day if possible.", "Marinate pork cubes with citrus juice, garlic, thyme and salt for 2 hours.", "Simmer in the marinade with a little water for 1 hour until the liquid is gone.", "Fry the pork pieces until crisp. Serve with fried plantains and pikliz."] },

  // ================= JAMAICA =================
  { id: "curry-goat", name: "Curry Goat", country: "388", serves: 6, time: 150, level: "Easy",
    desc: "Jamaican curry of slow-braised goat with allspice, thyme and scotch bonnet.",
    ing: [["lamb_shoulder", 1200, "or goat"], ["curry_powder", 25], ["allspice", 2], ["thyme", 2], ["onion", 200], ["garlic", 5], ["ginger", 15], ["scotch_bonnet", 5], ["spring_onions", 1], ["potatoes", 400], ["vegetable_oil", 40], ["rice", 400], ["salt", 7]],
    steps: ["Marinate the meat with curry powder, garlic, ginger, thyme, onion and salt overnight.", "Burn a spoon of curry powder in hot oil, add the meat and brown.", "Add water to cover, whole chili and allspice. Simmer 2 hours.", "Add potatoes and cook 20 minutes until thick. Serve with rice."] },
  { id: "beef-patties", name: "Jamaican Beef Patties", country: "388", serves: 8, time: 90, level: "Medium",
    desc: "Golden turmeric pastry turnovers with spicy minced beef.",
    ing: [["flour", 450], ["butter", 200], ["turmeric", 5], ["curry_powder", 10], ["salt", 7], ["beef_mince", 500], ["onion", 100], ["spring_onions", 0.5], ["scotch_bonnet", 5], ["thyme", 1], ["breadcrumbs", 40], ["beef_stock", 1, "in 200 ml water"], ["eggs", 1]],
    steps: ["Rub butter into flour, turmeric, half the curry powder and salt. Add cold water to form a dough. Chill.", "Brown the beef with onion, chili, thyme and curry powder; add stock and breadcrumbs and cook until thick. Cool.", "Cut rounds of pastry, fill, fold and crimp.", "Brush with egg and bake at 200 °C for 25 minutes."] },

  // ================= TRINIDAD AND TOBAGO =================
  { id: "doubles", name: "Doubles", country: "780", serves: 6, time: 120, level: "Medium",
    desc: "Trinidad's breakfast: two fried turmeric flatbreads with curried chickpeas and chutneys.",
    ing: [["flour", 400], ["turmeric", 4], ["dry_yeast", 1], ["sugar", 5], ["chickpeas_can", 3], ["curry_powder", 10], ["cumin", 3], ["onion", 100], ["garlic", 3], ["vegetable_oil", 500, "for frying"], ["cucumber", 1], ["tamarind", 40], ["scotch_bonnet", 5], ["salt", 7]],
    steps: ["Knead flour, half the turmeric, yeast, sugar, salt and water into a soft dough. Rise 1 hour.", "Fry onion, garlic and spices, add chickpeas and water and simmer 20 minutes until soft and saucy.", "Flatten small dough rounds and fry until puffed (bara).", "Serve two bara topped with chickpeas, cucumber, tamarind sauce and pepper sauce."] },

  // ================= GUATEMALA =================
  { id: "pepian", name: "Pepián de Pollo", country: "320", serves: 6, time: 90, level: "Medium",
    desc: "Guatemala's ancient Mayan-Spanish stew of chicken in a toasted seed and chili sauce.",
    ing: [["chicken_legs", 1200], ["tomatoes", 500], ["bell_pepper", 1], ["onion", 150], ["garlic", 3], ["sesame_seeds", 30], ["pumpkin_seeds", 30], ["chili_powder", 8], ["cinnamon", 1], ["potatoes", 400], ["zucchini", 1], ["green_beans", 150], ["corn_tortillas", 2], ["rice", 300], ["salt", 6]],
    steps: ["Simmer the chicken in water for 30 minutes.", "Dry-toast tomatoes, pepper, onion, garlic, seeds and a tortilla until charred.", "Blend with chili, cinnamon and broth into a thick sauce.", "Add the sauce and vegetables to the chicken and simmer 30 minutes. Serve with rice."] },

  // ================= EL SALVADOR =================
  { id: "pupusas", name: "Pupusas", country: "222", serves: 4, time: 60, level: "Medium",
    desc: "Thick corn tortillas stuffed with cheese and beans, with curtido slaw and tomato salsa.",
    ing: [["arepa_flour", 400], ["mozzarella", 250], ["black_beans_can", 1], ["white_cabbage", 0.25], ["carrots", 80], ["onion", 50], ["white_vinegar", 60], ["oregano", 1], ["passata", 200], ["vegetable_oil", 20], ["salt", 6]],
    steps: ["Mix shredded cabbage, carrot, onion, vinegar, oregano and salt for curtido. Rest 1 hour.", "Knead corn flour with salt and 500 ml warm water.", "Mash beans and mix with grated cheese. Stuff into balls of dough and flatten.", "Cook on a hot oiled griddle 4 minutes per side. Serve with curtido and warm passata salsa."] },

  // ================= HONDURAS =================
  { id: "baleadas", name: "Baleadas", country: "340", serves: 4, time: 40, level: "Easy",
    desc: "Thick flour tortillas folded over refried beans, cheese and sour cream.",
    ing: [["flour", 400], ["vegetable_oil", 40], ["baking_powder", 0.5], ["salt", 5], ["black_beans_can", 2], ["feta", 120], ["sour_cream", 150], ["eggs", 4, "scrambled, optional"], ["avocado", 1]],
    steps: ["Knead flour, baking powder, salt, oil and warm water. Rest 20 minutes.", "Roll into thick rounds and cook on a dry pan until spotted.", "Fry and mash the beans.", "Spread tortillas with beans, cheese and sour cream, add egg and avocado, fold in half."] },

  // ================= COSTA RICA =================
  { id: "gallo-pinto", name: "Gallo Pinto", country: "188", serves: 4, time: 25, level: "Easy",
    desc: "Fried rice and black beans with onion, pepper and Worcestershire-style Lizano sauce.",
    ing: [["rice", 300, "cooked the day before"], ["black_beans_can", 1], ["onion", 100], ["bell_pepper", 1], ["garlic", 2], ["worcestershire", 30], ["coriander", 0.5], ["vegetable_oil", 30], ["eggs", 4], ["salt", 3]],
    steps: ["Fry onion, pepper and garlic in oil.", "Add beans with a little liquid and cook 3 minutes.", "Add the rice and sauce and fry, mixing well.", "Finish with coriander and serve with fried eggs."] },

  // ================= VENEZUELA =================
  { id: "pabellon", name: "Pabellón Criollo", country: "862", serves: 6, time: 180, level: "Medium",
    desc: "The national dish: shredded beef, black beans, white rice and fried sweet plantain.",
    ing: [["beef_stew", 800], ["onion", 200], ["bell_pepper", 1], ["garlic", 4], ["chopped_tomatoes", 1], ["cumin", 3], ["black_beans_can", 2], ["brown_sugar", 10], ["rice", 400], ["plantain", 3], ["vegetable_oil", 80], ["salt", 7]],
    steps: ["Boil the beef 2 hours until tender, then shred.", "Fry onion, pepper and garlic, add tomatoes, cumin and beef and simmer 20 minutes.", "Simmer the beans with a little sugar and onion.", "Fry ripe plantain slices and serve with rice, beans and beef."] },
  { id: "tequenos", name: "Tequeños", country: "862", serves: 6, time: 50, level: "Easy",
    desc: "Sticks of white cheese wrapped in dough and fried, the must-have party snack.",
    ing: [["flour", 300], ["butter", 50], ["eggs", 1], ["sugar", 10], ["salt", 4], ["halloumi", 400], ["vegetable_oil", 600, "for frying"]],
    steps: ["Knead flour, butter, egg, sugar, salt and a little water. Rest 20 minutes.", "Cut the cheese into sticks.", "Roll the dough thin, cut into strips and wind them around the cheese, sealing the ends.", "Fry at 175 °C until golden."] },

  // ================= COLOMBIA =================
  { id: "ajiaco", name: "Ajiaco Santafereño", country: "170", serves: 6, time: 90, level: "Easy",
    desc: "Bogotá's chicken and three-potato soup with corn, capers, cream and avocado.",
    ing: [["chicken_breast", 700], ["potatoes", 600], ["floury_potatoes", 500], ["sweet_potatoes", 200], ["corn_cobs", 3], ["onion", 150], ["garlic", 3], ["chicken_stock", 2, "in 2 l water"], ["oregano", 2], ["cream", 150], ["capers", 40], ["avocado", 2], ["coriander", 1], ["salt", 6]],
    steps: ["Simmer chicken, onion, garlic and corn pieces in the stock 30 minutes. Shred the chicken.", "Add the potatoes; the floury ones will dissolve and thicken the soup. Cook 40 minutes.", "Return the chicken and add oregano.", "Serve with cream, capers, avocado and coriander."] },
  { id: "patacones", name: "Patacones", country: "170", serves: 4, time: 30, level: "Easy",
    desc: "Twice-fried smashed green plantains with hogao tomato sauce.",
    ing: [["plantain", 3, "green"], ["vegetable_oil", 400], ["tomatoes", 300], ["spring_onions", 1], ["garlic", 1], ["cumin", 1], ["salt", 4]],
    steps: ["Cut plantains into 3 cm pieces and fry 4 minutes.", "Smash each piece flat with a plate.", "Fry again until golden and crisp. Salt.", "For hogao, cook chopped tomato, spring onion, garlic and cumin until saucy."] },

  // ================= ECUADOR =================
  { id: "locro-papa", name: "Locro de Papa", country: "218", serves: 4, time: 40, level: "Easy",
    desc: "Creamy Andean potato and cheese soup with avocado.",
    ing: [["floury_potatoes", 1000], ["onion", 100], ["garlic", 2], ["cumin", 2], ["paprika", 2], ["butter", 30], ["milk", 250], ["mozzarella", 150], ["avocado", 1], ["coriander", 0.5], ["salt", 6]],
    steps: ["Fry onion, garlic and spices in butter.", "Add diced potatoes and 1 l water and simmer 25 minutes.", "Mash some potatoes to thicken, add milk.", "Stir in cubes of cheese off the heat. Serve with avocado and coriander."] },

  // ================= PERU =================
  { id: "lomo-saltado", name: "Lomo Saltado", country: "604", serves: 4, time: 30, level: "Easy",
    desc: "Chifa-style beef stir-fry with soy, tomatoes and onions, served with fries and rice.",
    ing: [["beef_steak", 600], ["red_onion", 200], ["tomatoes", 300], ["fresh_chili", 10], ["garlic", 3], ["soy_sauce", 40], ["red_wine_vinegar", 20], ["cumin", 1], ["coriander", 0.5], ["floury_potatoes", 600], ["vegetable_oil", 300], ["rice", 300], ["salt", 4]],
    steps: ["Cut the potatoes into fries and fry until crisp.", "Sear the beef strips in a very hot wok in batches.", "Add onion wedges, chili and garlic, then tomatoes, soy and vinegar.", "Toss in the fries at the end and serve with rice."] },
  { id: "aji-gallina", name: "Ají de Gallina", country: "604", serves: 6, time: 60, level: "Medium",
    desc: "Shredded chicken in a creamy yellow chili, walnut and cheese sauce.",
    ing: [["chicken_breast", 700], ["aji_amarillo", 80], ["onion", 150], ["garlic", 3], ["toast_bread", 4], ["milk", 300], ["walnuts", 50], ["parmesan", 40], ["turmeric", 1], ["potatoes", 600], ["eggs", 3], ["olives", 60], ["vegetable_oil", 40], ["rice", 300], ["salt", 5]],
    steps: ["Poach and shred the chicken, keeping the broth.", "Soak bread in milk and blend with walnuts and cheese.", "Fry onion, garlic, chili paste and turmeric, add the bread mixture and broth and cook until creamy.", "Add the chicken and serve over potatoes with rice, eggs and olives."] },
  { id: "papa-huancaina", name: "Papa a la Huancaína", country: "604", serves: 4, time: 25, level: "Easy",
    desc: "Boiled potatoes under a creamy, spicy yellow chili and cheese sauce.",
    ing: [["potatoes", 800], ["aji_amarillo", 60], ["feta", 200], ["milk", 150], ["crackers", 40], ["garlic", 1], ["vegetable_oil", 30], ["eggs", 2], ["olives", 40], ["lettuce", 0.5]],
    steps: ["Boil and slice the potatoes; boil the eggs.", "Blend chili paste, cheese, milk, crackers, garlic and oil until smooth.", "Lay potatoes on lettuce, pour over the sauce.", "Garnish with egg and olives."] },

  // ================= BOLIVIA =================
  { id: "silpancho", name: "Silpancho", country: "068", serves: 4, time: 40, level: "Easy",
    desc: "Cochabamba's thin breaded beef on rice and potatoes, topped with a fried egg and salsa.",
    ing: [["beef_steak", 500], ["breadcrumbs", 100], ["eggs", 4], ["rice", 300], ["potatoes", 500], ["tomatoes", 200], ["red_onion", 100], ["fresh_chili", 5], ["vegetable_oil", 100], ["salt", 6]],
    steps: ["Pound the beef very thin and press breadcrumbs into both sides.", "Fry the steaks quickly, then fry sliced boiled potatoes.", "Dice tomato, onion and chili with salt for salsa.", "Layer rice, potatoes, beef, a fried egg and salsa on each plate."] },

  // ================= CHILE =================
  { id: "pastel-choclo", name: "Pastel de Choclo", country: "152", serves: 6, time: 90, level: "Medium",
    desc: "Beef, chicken, olives and egg baked under a sweet corn and basil crust.",
    ing: [["beef_mince", 500], ["chicken_breast", 300], ["onion", 300], ["cumin", 3], ["paprika", 3], ["sweetcorn_can", 4], ["milk", 150], ["basil", 0.5], ["butter", 40], ["eggs", 3], ["olives", 80], ["raisins", 40], ["sugar", 20], ["salt", 6]],
    steps: ["Cook mince with onion, cumin and paprika (the pino). Poach and shred the chicken.", "Blend the corn with milk and basil and cook with butter until thick.", "Layer pino, chicken, boiled egg, olives and raisins in a dish.", "Cover with the corn, sprinkle with sugar and bake at 200 °C for 30 minutes."] },
  { id: "empanadas-pino", name: "Empanadas de Pino", country: "152", serves: 8, time: 120, level: "Medium",
    desc: "Baked turnovers filled with spiced beef, onion, egg and an olive, for Fiestas Patrias.",
    ing: [["flour", 500], ["butter", 100], ["milk", 200], ["salt", 7], ["beef_mince", 500], ["onion", 300], ["paprika", 4], ["cumin", 2], ["eggs", 3], ["olives", 60], ["raisins", 40]],
    steps: ["Cook the beef with lots of onion, paprika and cumin. Cool overnight if possible.", "Make a dough with flour, melted butter, warm milk and salt.", "Roll out rounds, add filling, a slice of egg, an olive and raisins. Fold and seal.", "Brush with egg and bake at 200 °C for 25 minutes."] },

  // ================= ARGENTINA =================
  { id: "empanadas-arg", name: "Empanadas Tucumanas", country: "032", serves: 8, time: 90, level: "Medium",
    desc: "Juicy hand-cut beef empanadas with spring onion, cumin and paprika.",
    ing: [["puff_pastry", 550, "or empanada discs"], ["beef_steak", 500], ["onion", 200], ["spring_onions", 1], ["cumin", 3], ["paprika", 4], ["chili_flakes", 1], ["eggs", 3], ["vegetable_oil", 30], ["salt", 6]],
    steps: ["Finely dice the beef and fry the onions until soft.", "Add the beef and spices and cook just until no longer pink. Add spring onion and cool.", "Fill pastry rounds with beef and chopped boiled egg, fold and crimp.", "Bake at 220 °C for 15–18 minutes."] },
  { id: "milanesa-napolitana", name: "Milanesa a la Napolitana", country: "032", serves: 4, time: 40, level: "Easy",
    desc: "Breaded beef cutlet topped with ham, tomato sauce and melted mozzarella.",
    ing: [["beef_steak", 600], ["eggs", 2], ["breadcrumbs", 150], ["garlic", 2], ["parsley", 0.5], ["vegetable_oil", 200], ["passata", 200], ["ham", 100], ["mozzarella", 200], ["oregano", 1], ["potatoes", 600], ["salt", 6]],
    steps: ["Pound the beef thin, dip in egg with garlic and parsley, then breadcrumbs.", "Fry until golden.", "Top each with ham, sauce and mozzarella and grill until bubbling.", "Serve with fries or mash."] },
  { id: "alfajores", name: "Alfajores de Maicena", country: "032", serves: 20, time: 60, level: "Medium",
    desc: "Melt-in-the-mouth cornstarch cookies sandwiched with dulce de leche and rolled in coconut.",
    ing: [["cornstarch", 300], ["flour", 200], ["baking_powder", 1], ["butter", 200], ["sugar", 150], ["eggs", 3, "yolks"], ["lemon", 0.5], ["dulce_de_leche", 400], ["desiccated_coconut", 50]],
    steps: ["Beat butter and sugar, add yolks and lemon zest.", "Mix in cornstarch, flour and baking powder to a soft dough. Chill 30 minutes.", "Roll 5 mm thick, cut small rounds and bake at 170 °C for 10 minutes without browning.", "Sandwich with dulce de leche and roll the edges in coconut."] },

  // ================= URUGUAY =================
  { id: "chivito", name: "Chivito", country: "858", serves: 4, time: 30, level: "Easy",
    desc: "Uruguay's towering steak sandwich with ham, cheese, bacon, egg and salad.",
    ing: [["beef_steak", 500], ["burger_buns", 4], ["ham", 100], ["mozzarella", 125], ["bacon_rashers", 100], ["eggs", 4], ["lettuce", 0.5], ["tomatoes", 200], ["mayonnaise", 60], ["olives", 40], ["vegetable_oil", 20], ["salt", 3]],
    steps: ["Slice the steak thin and sear quickly.", "Fry the bacon and eggs.", "Melt ham and cheese on the steak in the pan.", "Build the sandwich with mayo, lettuce, tomato, steak, bacon, egg and olives."] },

  // ================= PARAGUAY =================
  { id: "sopa-paraguaya", name: "Sopa Paraguaya", country: "600", serves: 8, time: 60, level: "Easy",
    desc: "The 'solid soup': a moist cornbread with onions and cheese.",
    ing: [["polenta", 300], ["onion", 200], ["butter", 80], ["eggs", 4], ["milk", 400], ["feta", 200], ["mozzarella", 125], ["baking_powder", 1], ["salt", 6]],
    steps: ["Cook the onions slowly in butter.", "Mix eggs, milk, cheeses, onions and salt.", "Stir in polenta and baking powder.", "Bake in a greased dish at 200 °C for 40 minutes."] },

  // ================= BRAZIL =================
  { id: "moqueca", name: "Moqueca Baiana", country: "076", serves: 4, time: 45, level: "Easy",
    desc: "Bahian fish stew with coconut milk, peppers, tomato, lime and coriander.",
    ing: [["white_fish", 700], ["shrimp", 200], ["coconut_milk", 1], ["bell_pepper", 2], ["onion", 150], ["tomatoes", 300], ["garlic", 3], ["lime", 2], ["paprika", 4], ["coriander", 1], ["olive_oil", 40], ["rice", 300], ["salt", 5]],
    steps: ["Marinate the fish with lime, garlic and salt for 20 minutes.", "Layer sliced onion, peppers and tomatoes in a wide pot with the fish on top.", "Pour over coconut milk, oil and paprika; cover and simmer 15 minutes.", "Add prawns for 3 minutes, scatter coriander and serve with rice."] },
  { id: "pao-de-queijo", name: "Pão de Queijo", country: "076", serves: 20, time: 40, level: "Easy",
    desc: "Chewy, cheesy tapioca bread rolls from Minas Gerais.",
    ing: [["tapioca_starch", 250], ["milk", 125], ["vegetable_oil", 60], ["eggs", 2], ["parmesan", 100], ["mozzarella", 125], ["salt", 4]],
    steps: ["Bring milk, oil, 60 ml water and salt to the boil and pour over the tapioca starch. Mix.", "When warm, beat in the eggs, then the grated cheeses.", "Roll into small balls with oiled hands.", "Bake at 200 °C for 20 minutes until puffed and golden."] },
  { id: "brigadeiros", name: "Brigadeiros", country: "076", serves: 25, time: 30, level: "Easy",
    desc: "Fudgy chocolate truffles of condensed milk and cocoa, at every Brazilian birthday.",
    ing: [["condensed_milk", 397], ["cocoa", 25], ["butter", 15], ["chocolate_sprinkles", 80]],
    steps: ["Cook condensed milk, cocoa and butter over low heat, stirring, for 10–12 minutes until it pulls from the pan.", "Cool completely.", "Roll into small balls with buttered hands.", "Coat in sprinkles."] },

  // ================= AUSTRALIA =================
  { id: "meat-pie", name: "Aussie Meat Pie", country: "036", serves: 6, time: 120, level: "Medium",
    desc: "Flaky pie of minced beef in thick gravy, eaten at the footy with tomato sauce.",
    ing: [["shortcrust_pastry", 275], ["puff_pastry", 275], ["beef_mince", 750], ["onion", 150], ["beef_stock", 2, "in 500 ml water"], ["worcestershire", 20], ["tomato_paste", 30], ["cornstarch", 25], ["eggs", 1], ["ketchup", 100], ["salt", 4]],
    steps: ["Brown the mince with onion, add stock, Worcestershire and tomato paste. Simmer 30 minutes.", "Thicken with cornstarch and cool.", "Line a pie dish with shortcrust, fill and top with puff pastry.", "Brush with egg and bake at 200 °C for 35 minutes. Serve with tomato sauce."] },
  { id: "lamingtons", name: "Lamingtons", country: "036", serves: 16, time: 75, level: "Medium",
    desc: "Squares of sponge cake dipped in chocolate icing and rolled in coconut.",
    ing: [["butter", 125], ["sugar", 150], ["eggs", 3], ["flour", 225], ["baking_powder", 1], ["milk", 120], ["powdered_sugar", 400], ["cocoa", 40], ["desiccated_coconut", 200]],
    steps: ["Beat butter and sugar, add eggs, then flour, baking powder and milk.", "Bake in a square tin at 180 °C for 30 minutes. Cool and cut into squares.", "Mix powdered sugar, cocoa, 1 tbsp butter and 150 ml boiling water into a thin icing.", "Dip each square in icing, then roll in coconut."] },
  { id: "anzac-biscuits", name: "Anzac Biscuits", country: "036", serves: 20, time: 30, level: "Easy",
    desc: "Chewy oat and coconut biscuits made for soldiers in WWI, with golden syrup.",
    ing: [["oats", 100], ["flour", 150], ["desiccated_coconut", 80], ["brown_sugar", 100], ["butter", 125], ["golden_syrup", 60], ["baking_soda", 0.5]],
    steps: ["Mix oats, flour, coconut and sugar.", "Melt butter with the syrup, stir in baking soda dissolved in 2 tbsp boiling water.", "Mix wet into dry and roll into balls.", "Flatten on a tray and bake at 160 °C for 12–15 minutes."] },

  // ================= NEW ZEALAND =================
  { id: "roast-lamb-nz", name: "Roast Lamb with Mint Sauce", country: "554", serves: 6, time: 120, level: "Easy",
    desc: "The Kiwi Sunday roast: garlic and rosemary leg of lamb with roast vegetables.",
    ing: [["lamb_leg", 1800], ["garlic", 6], ["rosemary", 1], ["olive_oil", 40], ["potatoes", 1000], ["sweet_potatoes", 500], ["pumpkin", 0.5], ["mint", 1], ["white_vinegar", 40], ["sugar", 15], ["salt", 10]],
    steps: ["Stud the lamb with garlic and rosemary, rub with oil and salt.", "Roast at 180 °C for about 1.5 hours for medium, with vegetable chunks around it for the last hour.", "Rest the lamb 15 minutes.", "Mix chopped mint with vinegar, sugar and a little hot water for the sauce."] },
  { id: "hokey-pokey", name: "Hokey Pokey", country: "554", serves: 10, time: 20, level: "Easy",
    desc: "Crunchy honeycomb toffee, best crumbled over vanilla ice cream.",
    ing: [["sugar", 125], ["golden_syrup", 70], ["baking_soda", 1]],
    steps: ["Heat sugar and syrup gently until the sugar dissolves, then simmer until golden (about 5 minutes).", "Take off the heat and quickly whisk in the baking soda. It will foam up.", "Pour into a lined tin and leave to set without touching.", "Break into pieces."] },

  // ================= FIJI =================
  { id: "kokoda", name: "Kokoda", country: "242", serves: 4, time: 30, level: "Easy",
    desc: "Fijian raw fish cured in lime and served in coconut cream with chili and vegetables.",
    ing: [["white_fish", 500, "very fresh"], ["lime", 6], ["coconut_milk", 1], ["tomatoes", 150], ["red_onion", 80], ["cucumber", 0.5], ["bell_pepper", 1], ["fresh_chili", 5], ["coriander", 0.5], ["salt", 4]],
    steps: ["Cut the fish into cubes, cover with lime juice and salt and leave 15 minutes until opaque.", "Drain off most of the juice.", "Mix with coconut milk, diced vegetables and chili.", "Serve cold with coriander."] }
);
