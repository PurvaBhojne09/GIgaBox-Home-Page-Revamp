/* ============================================================
   Gigabox catalog + store + banner data  (window.GB)
   ============================================================ */
(function () {
  // tone = soft tile background for the product placeholder
  const P = (o) => o;

  const products = [
    // ---- Kitchen ----
    P({ id:'prestige-3l', name:'Deluxe Alpha Pressure Cooker 3L', brand:'Prestige', cat:'kitchen', sub:'Pressure Cookers',
        price:1195, mrp:1699, rating:4.6, ratings:1840, tone:'#E8E3D6', glyph:'cooker',
        blurb:'Hard-anodised, induction + gas. 5-yr warranty.',
        specs:['Hard-anodised body','Gas + induction base','Metallic safety lid','5-year warranty'] }),
    P({ id:'hawkins-2l', name:'Stainless Steel Cooker 2L', brand:'Hawkins', cat:'kitchen', sub:'Pressure Cookers',
        price:1099, mrp:1450, rating:4.7, ratings:2210, tone:'#E4E6E2', glyph:'cooker',
        blurb:'Mirror-polished steel. Long handle.',
        specs:['304 stainless steel','Inside fitting lid','Gas + induction','10-year warranty'] }),
    P({ id:'futura-tawa', name:'Futura Nonstick Tawa 28cm', brand:'Hawkins', cat:'kitchen', sub:'Cookware',
        price:899, mrp:1150, rating:4.5, ratings:980, tone:'#DEDAD0', glyph:'pan',
        blurb:'4mm thick base. Metal-spoon friendly.',
        specs:['4.06mm thick base','German nonstick','Stays-cool handle','Gas only'] }),
    P({ id:'milton-bottle', name:'Thermosteel Flask 750ml', brand:'Milton', cat:'kitchen', sub:'Bottles',
        price:699, mrp:995, rating:4.6, ratings:3120, tone:'#E1E4E6', glyph:'bottle',
        blurb:'24h cold / 12h hot. Leak-proof.',
        specs:['Double-wall steel','24h cold, 12h hot','Leak-proof lid','BPA-free'] }),
    P({ id:'spatula-set', name:'Silicone Kitchen Spatula Set', brand:'Wonderchef', cat:'kitchen', sub:'Tools',
        price:299, mrp:599, rating:4.4, ratings:610, tone:'#EDE7D6', glyph:'tools',
        blurb:'Heat-safe to 240°C. 5 pieces.',
        specs:['Food-grade silicone','Heat-safe 240°C','5-piece set','Dishwasher safe'] }),
    P({ id:'fry-pan-24', name:'Nonstick Fry Pan 24cm', brand:'Pigeon', cat:'kitchen', sub:'Cookware',
        price:549, mrp:899, rating:4.3, ratings:740, tone:'#E7DDCF', glyph:'pan',
        blurb:'Induction base. 3-layer coating.',
        specs:['3-layer nonstick','Induction + gas','Bakelite handle','1-year warranty'] }),
    P({ id:'air-fryer', name:'Digital Air Fryer 4.1L HD9252', brand:'Philips', cat:'kitchen', sub:'Appliances',
        price:6995, mrp:9995, rating:4.7, ratings:5400, tone:'#E2E3DF', glyph:'appliance',
        blurb:'Rapid Air. 7 presets. 2-yr warranty.',
        specs:['4.1L basket','Rapid Air tech','7 presets','2-year warranty'] }),
    P({ id:'mixer-grinder', name:'Zodiac Mixer Grinder 750W', brand:'Preethi', cat:'kitchen', sub:'Appliances',
        price:3299, mrp:4750, rating:4.5, ratings:2890, tone:'#E5E1D6', glyph:'appliance',
        blurb:'4 jars. Vega W5 motor. 5-yr motor warranty.',
        specs:['750W Vega motor','4 stainless jars','Overload protection','5-yr motor warranty'] }),
    // ---- Sports ----
    P({ id:'cricket-bat', name:'Sunny Tonny Cricket Bat', brand:'SG', cat:'sports', sub:'Cricket',
        price:2195, mrp:2999, rating:4.4, ratings:430, tone:'#EDE6D2', glyph:'bat',
        blurb:'Kashmir willow. Full size SH.',
        specs:['Kashmir willow','Full-size short handle','Pre-knocked','Toe guard fitted'] }),
    P({ id:'yoga-mat', name:'Yoga Mat 6mm Anti-skid', brand:'Boldfit', cat:'sports', sub:'Fitness',
        price:899, mrp:1499, rating:4.5, ratings:1980, tone:'#E6E2EC', glyph:'mat',
        blurb:'6mm cushion. Carry strap included.',
        specs:['6mm TPE cushion','Anti-skid texture','Carry strap','Sweat-resistant'] }),
    P({ id:'badminton-racket', name:'G-Force 3600 Badminton Racket', brand:'Li-Ning', cat:'sports', sub:'Racket',
        price:1099, mrp:1699, rating:4.4, ratings:870, tone:'#E2E4E5', glyph:'racket',
        blurb:'Aluminium frame. Strung, with cover.',
        specs:['Aluminium frame','Pre-strung','Full cover','Lightweight 95g'] }),
    P({ id:'shaker', name:'Shaker Bottle 700ml', brand:'Boldfit', cat:'sports', sub:'Fitness',
        price:299, mrp:499, rating:4.3, ratings:2340, tone:'#DDE0DC', glyph:'bottle',
        blurb:'Leak-proof. With blender ball.',
        specs:['BPA-free','Leak-proof','Blender ball','700ml + scale'] }),
    P({ id:'skipping-rope', name:'Adjustable Skipping Rope', brand:'Boldfit', cat:'sports', sub:'Fitness',
        price:199, mrp:399, rating:4.2, ratings:1510, tone:'#E8E3D4', glyph:'mat',
        blurb:'Steel wire. Foam grip.',
        specs:['Adjustable length','Steel ball-bearing','Anti-slip foam grip','Tangle-free'] }),
    P({ id:'running-shoes', name:'Lightweight Running Shoes', brand:'Nivia', cat:'sports', sub:'Footwear',
        price:1299, mrp:2199, rating:4.1, ratings:640, tone:'#DEE1E3', glyph:'shoe',
        blurb:'Mesh upper. EVA sole.',
        specs:['Breathable mesh','EVA midsole','Anti-skid grip','Sizes 6–11'] }),
  ];

  const byId = Object.fromEntries(products.map(p => [p.id, p]));

  const rows = [
    { id:'kitchen-setup', title:'Kitchen Essentials', tag:null,
      items:['prestige-3l','hawkins-2l','futura-tawa','milton-bottle','mixer-grinder'] },
    { id:'play', title:'Get ready to play', tag:'Sports Essentials',
      items:['cricket-bat','yoga-mat','badminton-racket','shaker','running-shoes'] },
    { id:'under-999', title:'Handy buys under ₹999', tag:'Value',
      items:['spatula-set','fry-pan-24','skipping-rope','shaker','milton-bottle'] },
    { id:'hot', title:'Hot sellers this week', tag:'Trending in Jodhpur',
      items:['air-fryer','mixer-grinder','cricket-bat','running-shoes','prestige-3l'] },
  ];

  const categories = [
    { id:'cookers',   name:'Pressure Cookers', glyph:'cooker' },
    { id:'cookware',  name:'Cookware',         glyph:'pan' },
    { id:'dinner',    name:'Dinnerware',       glyph:'plate' },
    { id:'crockery',  name:'Crockery',         glyph:'plate' },
    { id:'cutlery',   name:'Cutlery',          glyph:'tools' },
    { id:'glassware', name:'Glassware',        glyph:'bottle' },
    { id:'appliances',name:'Appliances',       glyph:'appliance' },
    { id:'storage',   name:'Storage',          glyph:'bottle' },
    { id:'cricket',   name:'Cricket',          glyph:'bat' },
    { id:'fitness',   name:'Fitness',          glyph:'mat' },
    { id:'racket',    name:'Racket Sports',    glyph:'racket' },
    { id:'footwear',  name:'Footwear',         glyph:'shoe' },
  ];

  // The hero of the "is this a real store?" answer — two real Jodhpur storefronts
  const stores = [
    { id:'kitchen', vertical:'Kitchen', name:'Gigabox Kitchen Store',
      tagline:'Cookers · cookware · appliances', glyph:'cooker',
      area:'Sardarpura, Jodhpur', distance:'2.3 km away', distNum:2.3,
      full:'5, Sardarpura C Road, near Bombay Motor Circle, Jodhpur, Rajasthan 342003',
      rating:4.7, ratings:2317, hours:'10:00 AM – 9:30 PM', openTill:'Open till 9:30 PM',
      openDays:'Open all 7 days', since:'Serving Jodhpur since 2016', phone:'+91 0291 245 1188',
      photoSlot:'gb-store-kitchen' },
    { id:'sports', vertical:'Sports', name:'Gigabox Sports Store',
      tagline:'Cricket · fitness · footwear', glyph:'bat',
      area:'Ratanada, Jodhpur', distance:'3.1 km away', distNum:3.1,
      full:'22, Ratanada Main Road, opposite Ratanada Garden, Jodhpur, Rajasthan 342011',
      rating:4.6, ratings:1284, hours:'10:00 AM – 9:30 PM', openTill:'Open till 9:30 PM',
      openDays:'Open all 7 days', since:'New — opened 2024', phone:'+91 0291 245 1190',
      photoSlot:'gb-store-sports' },
  ];
  const store = stores[0]; // default / back-compat

  const banners = [
    { id:'omni', kind:'omni', eyebrow:'App bhi · Store bhi',
      title:'The Jodhpur kitchen store,\nnow in your pocket', sub:'No surprises. The product you explore is the product you receive.',
      cta:'How it works' },
    { id:'60min', kind:'speed', eyebrow:'60-MINUTE DELIVERY',
      title:'Complete kitchen setup,\ndelivered in 60 minutes', sub:'Order before 9:30 PM across Jodhpur city.',
      cta:'Shop kitchen' },
    { id:'sports', kind:'sports', eyebrow:'NEW · SPORTS',
      title:'Game on.\nCricket, fitness & more', sub:'Genuine SG, Li-Ning, Boldfit — now on Gigabox.',
      cta:'Explore sports' },
  ];

  const trust = [
    { id:'returns', glyph:'return', t:'7-day returns', s:'Free home pickup' },
    { id:'exact',   glyph:'shield', t:'Exact brand', s:'or full refund' },
    { id:'genuine', glyph:'verified', t:'100% genuine', s:'Brand-billed & sealed' },
    { id:'cod',     glyph:'cash', t:'Pay on delivery', s:'Cash or UPI at door' },
  ];

  window.GB = { products, byId, rows, categories, store, stores, banners, trust };
})();
