const fs = require('fs');
const path = require('path');

const outDir = process.cwd();
const imgDir = path.join(outDir, 'images');
const iconDir = path.join(outDir, 'icons');
fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(iconDir, { recursive: true });
for (const file of fs.readdirSync(imgDir)) fs.unlinkSync(path.join(imgDir, file));
for (const file of fs.readdirSync(iconDir)) fs.unlinkSync(path.join(iconDir, file));

const ACCOMMODATION = { name: 'Apartments Lake Bohinj', lat: 46.277735, lon: 13.836426, address: 'Ukanc 78, 4265 Bohinjsko Jezero' };

const hikes = [
  {
    id: 'savica-lakeshore',
    title: 'Savica Waterfall + Bohinj Lakeshore',
    slug: 'savica-waterfall-bohinj-lakeshore',
    difficulty: 'Easy to moderate',
    route: [[13.836426,46.277735],[13.80174,46.28878],[13.79417,46.29298],[13.80174,46.28878],[13.81952,46.28278],[13.836426,46.277735]],
    parking: { name: 'Savica Waterfall / Koča pri Savici parking', lat: 46.28878, lon: 13.80174, fee: 'Paid seasonal car park; verify current hourly/day rate on Bohinj mobility boards.' },
    start: { name: 'Apartments Lake Bohinj / Ukanc', lat: 46.277735, lon: 13.836426 },
    finish: { name: 'Apartments Lake Bohinj / Ukanc', lat: 46.277735, lon: 13.836426 },
    elevation: 'about 250 m up',
    hikingTime: '2 h 30 min',
    familyTime: '3 h 30 min to 4 h 30 min',
    bestTime: 'Morning for softer light at Savica; late afternoon if you mainly want the lakeshore.',
    drive: '5-8 min to Savica parking, or start on foot from Ukanc.',
    walk: 'Possible directly from the apartment; roughly 4.5 km to the waterfall viewpoint and return options along Lake Bohinj.',
    weather: 'Best after a dry or lightly showery spell; stone steps can be slick after heavy rain.',
    summary: 'A classic western-Bohinj family day: forest paths, the powerful Savica Waterfall viewpoint and a gentle Lake Bohinj shoreline return.',
    family: 'Good with 5- and 7-year-olds if you take the stairs slowly and avoid rushing the return.',
    kids: 'The waterfall roar, counting the stone steps, lake stones and boats at Ukanc.',
    danger: 'Steep fenced steps near the waterfall, wet stone, busy path in summer; keep children inside railings.',
    toilets: 'At/near Savica parking and seasonal facilities around Ukanc.',
    water: 'Carry water; seasonal service near Koča pri Savici and Ukanc.',
    huts: 'Koča pri Savici near the waterfall car park.',
    restaurants: 'Ukanc lakeside options and Hotel Zlatorog area; Ribčev Laz has more choices after the walk.',
    swimming: 'Lake Bohinj at Ukanc/Savica delta in warm settled weather; supervise closely because water deepens quickly.',
    iceCream: 'Ukanc kiosk in season or Ribčev Laz lakefront stands.',
    viewpoints: ['Savica Waterfall viewpoint', 'Ukanc west-shore lake views', 'Savica delta looking east over Lake Bohinj'],
    photo: ['Waterfall platform', 'Woodland stair sections', 'Lake Bohinj shoreline near Ukanc'],
    hidden: 'The quiet Savica delta paths near the western end of the lake are calmer than the central beach areas.',
    pack: 'Grippy shoes, light rain shell, water, snacks, swim things in summer, small towel.',
    shorter: 'Drive to Savica parking and do only the waterfall out-and-back, about 1.5 km and 150 m up.',
    emergency: 'Call 112. For mountain rescue ask for GRS; note your nearest landmark: Slap Savica / Ukanc.',
    imageQuery: 'Savica Waterfall Slovenia Bohinj',
    pois: {
      waterfalls: [{name:'Savica Waterfall', lat:46.29298, lon:13.79417}],
      viewpoints: [{name:'Savica viewpoint', lat:46.29267, lon:13.79455},{name:'Ukanc lake view', lat:46.28065, lon:13.82787}],
      huts: [{name:'Koča pri Savici', lat:46.28882, lon:13.80264}],
      restaurants: [{name:'Koča pri Savici', lat:46.28882, lon:13.80264},{name:'Picerija Ukanc', lat:46.27687, lon:13.83688}],
      swimming: [{name:'Ukanc beach / Savica delta', lat:46.28043, lon:13.82745}],
      toilets: [{name:'Savica parking toilets', lat:46.28862, lon:13.80213},{name:'Ukanc public area', lat:46.27744, lon:13.83612}],
      photos: [{name:'Waterfall photo spot', lat:46.29267, lon:13.79455},{name:'Lake Bohinj west end', lat:46.28043, lon:13.82745}]
    }
  },
  {
    id: 'vogel-panorama',
    title: 'Vogel Panorama via Cable Car',
    slug: 'vogel-panorama-via-cable-car',
    difficulty: 'Easy to moderate alpine walk',
    route: [[13.84258,46.26072],[13.84025,46.25726],[13.83289,46.25392],[13.84025,46.25726],[13.84258,46.26072]],
    parking: { name: 'Vogel cable car valley station parking', lat: 46.27548, lon: 13.83564, fee: 'Paid/regulated in high season; cable car tickets required.' },
    start: { name: 'Vogel upper cable car station', lat: 46.26072, lon: 13.84258 },
    finish: { name: 'Vogel upper cable car station', lat: 46.26072, lon: 13.84258 },
    elevation: 'about 220 m up on the upper mountain walk',
    hikingTime: '1 h 45 min',
    familyTime: '2 h 30 min to 4 h with cable car, photos and stops',
    bestTime: 'First cable cars on clear mornings; avoid thunderstorms and strong wind.',
    drive: '2-4 min to the lower cable car station, or walk from Ukanc.',
    walk: 'Yes. The lower station is roughly 10-15 min on foot from the accommodation.',
    weather: 'Only worth it with cloud base above the ski area; turn back immediately if thunder builds.',
    summary: 'A high-reward, low-distance alpine panorama day using the Vogel cable car, with views over Lake Bohinj and the Julian Alps.',
    family: 'Excellent if children are comfortable with cable cars and you stay on signed paths near the ski area.',
    kids: 'Cable car ride, big mountain views, chairlifts, alpine flowers and cow pastures in season.',
    danger: 'Alpine sun, sudden storms, unfenced drops away from main areas, ski service roads; hold hands near edges.',
    toilets: 'At lower and upper cable car stations and mountain restaurants during operating hours.',
    water: 'Buy/fill at cable car facilities; carry enough for exposed walking.',
    huts: 'Viharnik and Vogel ski-area restaurants around the upper station; Merjasec area in season.',
    restaurants: 'Vogel upper station restaurants; Ukanc/Ribčev Laz after descending.',
    swimming: 'Lake Bohinj at Ukanc after the cable car day.',
    iceCream: 'Ukanc kiosk or Ribčev Laz lakefront.',
    viewpoints: ['Vogel upper station balcony', 'Orlove glave area', 'Views toward Triglav on clear days'],
    photo: ['Cable car balcony over Lake Bohinj', 'Alpine pasture paths', 'Julian Alps skyline'],
    hidden: 'Walk a little beyond the busiest balcony for quieter pasture-and-lake compositions.',
    pack: 'Wind layer, sun hats, sunscreen, snacks, water, light fleece even in summer.',
    shorter: 'Ride up, enjoy the upper-station viewpoint and return without the Orlove glave extension.',
    emergency: 'Call 112. Give location as Vogel ski area / upper cable car station or nearest lift name.',
    imageQuery: 'Vogel Bohinj cable car Lake Bohinj',
    pois: {
      viewpoints: [{name:'Vogel upper viewpoint', lat:46.26058, lon:13.84259},{name:'Orlove glave viewpoint', lat:46.25392, lon:13.83289}],
      huts: [{name:'Viharnik / Vogel upper station', lat:46.26083, lon:13.84287},{name:'Merjasec mountain restaurant', lat:46.25763, lon:13.83895}],
      restaurants: [{name:'Vogel upper station restaurant', lat:46.26083, lon:13.84287},{name:'Restaurant Merjasec', lat:46.25763, lon:13.83895}],
      swimming: [{name:'Ukanc beach after hike', lat:46.27756, lon:13.83525}],
      toilets: [{name:'Vogel lower station toilets', lat:46.27548, lon:13.83564},{name:'Vogel upper station toilets', lat:46.26072, lon:13.84258}],
      photos: [{name:'Lake Bohinj panorama deck', lat:46.26058, lon:13.84259},{name:'Orlove glave ridge view', lat:46.25392, lon:13.83289}]
    }
  },
  {
    id: 'mostnica-voje',
    title: 'Mostnica Gorge + Voje Valley',
    slug: 'mostnica-gorge-voje-valley',
    difficulty: 'Moderate family hike',
    route: [[13.88773,46.28981],[13.88958,46.29930],[13.89433,46.31251],[13.89630,46.32091],[13.88773,46.28981]],
    parking: { name: 'Stara Fužina / Vorančkojca parking for Mostnica', lat: 46.28981, lon: 13.88773, fee: 'Paid Bohinj parking zone; Mostnica gorge may also charge seasonal entry.' },
    start: { name: 'Mostnica gorge entrance path', lat: 46.28981, lon: 13.88773 },
    finish: { name: 'Mostnica gorge entrance path', lat: 46.28981, lon: 13.88773 },
    elevation: 'about 250-300 m up',
    hikingTime: '3 h',
    familyTime: '4 h to 5 h 30 min',
    bestTime: 'Morning before the gorge path becomes busy; beautiful on warm afternoons if you picnic in Voje.',
    drive: '15-20 min from Ukanc, depending on lake traffic.',
    walk: 'Not realistic from Ukanc with children; use the car or summer shuttle if operating.',
    weather: 'Good in warm weather because the gorge is shaded; avoid during icy conditions or after intense storms.',
    summary: 'A shaded gorge walk with emerald pools, natural rock shapes, meadows in Voje Valley and a waterfall extension.',
    family: 'Very good for curious children, but manage distance and keep them away from gorge edges.',
    kids: 'The elephant-shaped rock, bridges, clear pools, meadow picnic space and waterfall finish.',
    danger: 'Drop-offs into the gorge, wet roots/rocks, narrow passing points; use close supervision.',
    toilets: 'Near parking/entry in season and at Voje hut/restaurant when open.',
    water: 'Carry water; seasonal service at Koča na Vojah.',
    huts: 'Koča na Vojah in Voje Valley.',
    restaurants: 'Koča na Vojah; Stara Fužina and Ribčev Laz after the hike.',
    swimming: 'Do not swim in the gorge. Lake Bohinj beaches are better afterwards.',
    iceCream: 'Ribčev Laz lakefront or Stara Fužina seasonal cafés.',
    viewpoints: ['Mostnica gorge bridges', 'Voje Valley meadow views', 'Voje waterfall area'],
    photo: ['Elephant rock in Mostnica', 'Stone bridges over the gorge', 'Voje meadow with mountain backdrop'],
    hidden: 'The quieter meadow edges beyond Koča na Vojah are lovely for a snack stop before turning back.',
    pack: 'Closed shoes, light layer for shade, water, picnic, small first-aid kit.',
    shorter: 'Walk only the gorge loop to the main bridges and elephant rock, then return, about 3-5 km.',
    emergency: 'Call 112. State Mostnica gorge, Voje Valley or Koča na Vojah depending on location.',
    imageQuery: 'Mostnica Gorge Bohinj Slovenia',
    pois: {
      waterfalls: [{name:'Mostnica / Voje waterfall', lat:46.32091, lon:13.89630}],
      viewpoints: [{name:'Mostnica gorge bridge', lat:46.29930, lon:13.88958},{name:'Voje meadow view', lat:46.31251, lon:13.89433}],
      huts: [{name:'Koča na Vojah', lat:46.31463, lon:13.89475}],
      restaurants: [{name:'Koča na Vojah', lat:46.31463, lon:13.89475}],
      swimming: [{name:'Lake Bohinj after hike', lat:46.28043, lon:13.82745}],
      toilets: [{name:'Mostnica parking/entry', lat:46.28981, lon:13.88773},{name:'Koča na Vojah toilets', lat:46.31463, lon:13.89475}],
      photos: [{name:'Elephant rock area', lat:46.29930, lon:13.88958},{name:'Voje waterfall photo spot', lat:46.32091, lon:13.89630}]
    }
  },
  {
    id: 'planina-blato-jezeru',
    title: 'Planina Blato → Planina pri Jezeru',
    slug: 'planina-blato-planina-pri-jezeru',
    difficulty: 'Moderate mountain forest hike',
    route: [[13.84990,46.30015],[13.84180,46.31592],[13.83767,46.32054],[13.84180,46.31592],[13.84990,46.30015]],
    parking: { name: 'Planina Blato parking', lat: 46.30015, lon: 13.84990, fee: 'Paid mountain-road/parking regime; check Bohinj traffic board for the current day rate and restrictions.' },
    start: { name: 'Planina Blato parking', lat: 46.30015, lon: 13.84990 },
    finish: { name: 'Planina Blato parking', lat: 46.30015, lon: 13.84990 },
    elevation: 'about 320-380 m up',
    hikingTime: '2 h 15 min',
    familyTime: '3 h 30 min to 5 h',
    bestTime: 'Morning, especially in summer when parking fills and afternoon storms are possible.',
    drive: '35-45 min from Ukanc via Stara Fužina mountain road.',
    walk: 'Not a sensible walking approach from Ukanc with children.',
    weather: 'Forest shade helps on warm days; skip if storms are forecast because the road and upper trail are remote.',
    summary: 'A compact mountain-hut walk from Planina Blato through forest to the lake and hut at Planina pri Jezeru.',
    family: 'Good for active children used to uneven paths; steady climb but a clear reward at the lake.',
    kids: 'Mountain cows, forest roots, the small lake, hut treats and watching fish/insects near the water.',
    danger: 'Rocky/rooty path, slippery mud after rain, mountain road access, cold water; stay on marked trails.',
    toilets: 'At Planina pri Jezeru hut when open; limited at parking.',
    water: 'Carry water; hut service when open.',
    huts: 'Koča na Planini pri Jezeru.',
    restaurants: 'Koča na Planini pri Jezeru for hut food; Stara Fužina/Ribčev Laz on the drive back.',
    swimming: 'No swimming recommended in the small alpine lake; use Lake Bohinj later.',
    iceCream: 'Ribčev Laz lakefront after returning from the mountain road.',
    viewpoints: ['Planina pri Jezeru lake shore', 'Open pasture sections near Planina Blato', 'Forest openings toward Bohinj mountains'],
    photo: ['Lake and hut at Planina pri Jezeru', 'Children on forest trail', 'Pasture details at Planina Blato'],
    hidden: 'The short wander around the lake gives calmer angles than the first arrival point by the hut.',
    pack: 'Hiking shoes, layers, rain jacket, cash/card for hut, water, snacks, bug spray.',
    shorter: 'Turn around at the first open pasture/lake viewpoint if energy drops; the same route returns to the car.',
    emergency: 'Call 112. Give Planina Blato road or Koča na Planini pri Jezeru as location.',
    imageQuery: 'Planina pri Jezeru Bohinj',
    pois: {
      viewpoints: [{name:'Planina pri Jezeru lake view', lat:46.32054, lon:13.83767},{name:'Planina Blato pasture', lat:46.30015, lon:13.84990}],
      huts: [{name:'Koča na Planini pri Jezeru', lat:46.32092, lon:13.83720}],
      restaurants: [{name:'Koča na Planini pri Jezeru', lat:46.32092, lon:13.83720}],
      swimming: [{name:'Lake Bohinj after hike', lat:46.28043, lon:13.82745}],
      toilets: [{name:'Planina pri Jezeru hut toilets', lat:46.32092, lon:13.83720}],
      photos: [{name:'Lake and hut photo spot', lat:46.32054, lon:13.83767},{name:'Planina Blato pasture photo', lat:46.30015, lon:13.84990}]
    }
  },
  {
    id: 'planina-zajamniki',
    title: 'Planina Zajamniki',
    slug: 'planina-zajamniki',
    difficulty: 'Moderate meadow-and-forest hike',
    route: [[13.94000,46.33250],[13.95336,46.33708],[13.94000,46.33250]],
    parking: { name: 'Uskovnica / Pokljuka legal roadside parking area', lat: 46.33250, lon: 13.94000, fee: 'Regulated mountain-road parking can change seasonally; use only signed legal parking and check posted Bohinj/Pokljuka restrictions.' },
    start: { name: 'Uskovnica side trailhead', lat: 46.33250, lon: 13.94000 },
    finish: { name: 'Uskovnica side trailhead', lat: 46.33250, lon: 13.94000 },
    elevation: 'about 220-280 m up',
    hikingTime: '2 h 45 min',
    familyTime: '4 h to 5 h',
    bestTime: 'Morning or golden-hour afternoon for the famous hut-line view.',
    drive: '45-60 min from Ukanc via Bohinjska Bistrica/Pokljuka/Uskovnica roads, traffic and access-rule dependent.',
    walk: 'No; this is a drive-up Pokljuka hike.',
    weather: 'Best in stable weather. Forest can be cool; open pasture is exposed to sun and storms.',
    summary: 'A scenic Pokljuka walk to one of Slovenia’s most photogenic alpine pastures, famous for its long line of wooden shepherd huts.',
    family: 'Good for children who can handle a longer rolling forest walk; bring snacks because services are limited.',
    kids: 'Wooden huts, pasture views, forest paths, butterflies and wide spaces to rest.',
    danger: 'Navigation junctions, forestry tracks, occasional bikes/cars, cattle fences; respect private pasture huts.',
    toilets: 'Limited or none at the trailhead/pasture; use facilities before driving up where possible.',
    water: 'Carry all water; do not rely on pasture sources.',
    huts: 'No guaranteed serviced mountain hut on the route; nearby Pokljuka venues may operate seasonally.',
    restaurants: 'Uskovnica/Pokljuka venues when open; better meal options back in Bohinj.',
    swimming: 'None on route; Lake Bohinj later if time allows.',
    iceCream: 'Bohinjska Bistrica or Ribčev Laz on the return.',
    viewpoints: ['Classic Zajamniki hut-line viewpoint', 'Pokljuka forest openings', 'Pasture edges toward Julian Alps'],
    photo: ['End of the hut-line looking back', 'Low angle along wooden huts', 'Pasture with mountain skyline'],
    hidden: 'Move quietly to the far end of the settlement for the cleanest composition without crowding the huts.',
    pack: 'Water, picnic, sun hats, light jacket, offline map, respect-private-property mindset.',
    shorter: 'Turn around at the pasture entrance viewpoint and skip walking the full hut-line.',
    emergency: 'Call 112. State Pokljuka / Uskovnica / Planina Zajamniki.',
    imageQuery: 'Planina Zajamniki Pokljuka Slovenia',
    pois: {
      viewpoints: [{name:'Zajamniki classic viewpoint', lat:46.33708, lon:13.95336},{name:'Pasture entrance view', lat:46.34145, lon:13.93874}],
      huts: [{name:'Planina Zajamniki shepherd huts', lat:46.33708, lon:13.95336}],
      restaurants: [{name:'Uskovnica / Pokljuka seasonal services', lat:46.33250, lon:13.94000}],
      swimming: [{name:'Lake Bohinj after hike', lat:46.28043, lon:13.82745}],
      toilets: [{name:'Use facilities before the mountain road', lat:46.33250, lon:13.94000}],
      photos: [{name:'Hut-line photo spot', lat:46.33708, lon:13.95336},{name:'Pasture skyline photo', lat:46.33840, lon:13.95020}]
    }
  },
  {
    id: 'pericnik-waterfall',
    title: 'Peričnik Waterfall',
    slug: 'pericnik-waterfall',
    difficulty: 'Easy but steep and wet near falls',
    route: [[13.89435,46.43890],[13.89505,46.43984],[13.89553,46.44050],[13.89505,46.43984],[13.89435,46.43890]],
    parking: { name: 'Koča pri Peričniku / Peričnik waterfall parking', lat: 46.43890, lon: 13.89435, fee: 'Usually paid/regulated in season; road access can change after storms or winter.' },
    start: { name: 'Peričnik parking', lat: 46.43890, lon: 13.89435 },
    finish: { name: 'Peričnik parking', lat: 46.43890, lon: 13.89435 },
    elevation: 'about 120-160 m up',
    hikingTime: '45 min to 1 h 15 min',
    familyTime: '1 h 30 min to 2 h 30 min',
    bestTime: 'Morning before crowds or warm afternoon when spray feels good.',
    drive: '1 h 15 min to 1 h 35 min from Ukanc via Bled/Mojstrana, traffic dependent.',
    walk: 'No from Bohinj; walk only from the waterfall parking area.',
    weather: 'Avoid freezing conditions and heavy rain; spray makes the path slippery even on sunny days.',
    summary: 'A dramatic short walk to one of Slovenia’s iconic waterfalls, including the memorable path behind the lower fall when conditions are safe.',
    family: 'Great short outing, but adults should closely manage the wet, exposed ledges behind the waterfall.',
    kids: 'Standing in the spray, seeing the waterfall from behind, forest bridge and big water noise.',
    danger: 'Very slippery rock, low headroom, exposed traverse behind the fall, falling ice/rocks in cold seasons; skip upper/behind section if unsure.',
    toilets: 'At/near Koča pri Peričniku when open; otherwise limited.',
    water: 'Carry water; seasonal hut service nearby.',
    huts: 'Koča pri Peričniku near the parking area.',
    restaurants: 'Koča pri Peričniku; Mojstrana restaurants after the visit.',
    swimming: 'No swimming at the waterfall; cold fast water and rockfall risk.',
    iceCream: 'Mojstrana or Bled on the drive back.',
    viewpoints: ['Lower Peričnik front viewpoint', 'Behind-the-waterfall path', 'Upper waterfall approach if safe'],
    photo: ['Behind the lower waterfall', 'Bridge/stream approach', 'Wide vertical shot from the base'],
    hidden: 'The upper fall is quieter, but only go if the children are steady and conditions are dry.',
    pack: 'Waterproof shell, grippy shoes, dry layer for kids, lens cloth, small towel.',
    shorter: 'Visit only the lower waterfall viewpoint from the parking area and skip the upper/behind route.',
    emergency: 'Call 112. State Slap Peričnik / Vrata Valley near Mojstrana.',
    imageQuery: 'Pericnik Waterfall Slovenia',
    pois: {
      waterfalls: [{name:'Lower Peričnik Waterfall', lat:46.43984, lon:13.89505},{name:'Upper Peričnik Waterfall', lat:46.44050, lon:13.89553}],
      viewpoints: [{name:'Lower fall front viewpoint', lat:46.43984, lon:13.89505},{name:'Behind waterfall path', lat:46.43998, lon:13.89522}],
      huts: [{name:'Koča pri Peričniku', lat:46.43890, lon:13.89435}],
      restaurants: [{name:'Koča pri Peričniku', lat:46.43890, lon:13.89435}],
      swimming: [],
      toilets: [{name:'Koča pri Peričniku toilets', lat:46.43890, lon:13.89435}],
      photos: [{name:'Behind-the-fall photo spot', lat:46.43998, lon:13.89522},{name:'Lower waterfall wide shot', lat:46.43955, lon:13.89478}]
    }
  }
];

const extras = {
  restaurants: [
    ['Foksner', 'Bohinjska Bistrica burgers and relaxed family meals.'],
    ['Gostilna Mihovc', 'Traditional Bohinj food in Stara Fužina/Srednja vas area.'],
    ['Restaurant Triglav Bohinj', 'Lake-area dining with local dishes.'],
    ['Koča pri Savici', 'Simple post-waterfall hut stop.'],
    ['Koča na Vojah', 'Best paired with Mostnica and Voje Valley.']
  ],
  beaches: [
    ['Ukanc west end', 'Closest to the apartment, beautiful mountain backdrop, watch depth changes.'],
    ['Ribčev Laz lakeshore', 'Easy services, boats, ice cream and toilets nearby.'],
    ['Fużina Bay / north-east lake', 'Good for combining with Stara Fužina walks.']
  ],
  icecream: [
    ['Ribčev Laz lakefront kiosks', 'Most reliable family ice-cream stop.'],
    ['Ukanc seasonal kiosk', 'Best after swimming near the apartment.'],
    ['Bohinjska Bistrica cafés', 'Good on the return from Pokljuka or Peričnik.']
  ],
  sunset: 'Ukanc west shore and the Savica delta for glowing light across Lake Bohinj.',
  sunrise: 'Ribčev Laz bridge/church area for first light on the lake, or Ukanc if you want quiet.',
  rainy: [
    'Aquapark Bohinj in Bohinjska Bistrica.',
    'Short lakefront cafés and the Church of St John the Baptist area during rain gaps.',
    'Bled Castle or Radovljica old town if you want a longer indoor/urban day.',
    'Planica Nordic Centre / Slovenian Alpine Museum in Mojstrana if paired with a Peričnik-area weather window.'
  ],
  emergency: ['112 emergency and mountain rescue', '113 police', 'Carry insurance details and children’s ID/passport copies', 'Tell someone your route before mountain-road hikes']
};

function xmlEscape(s) {
  return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}

function makeIcon(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#0b7a75"/><path d="M88 344l90-118 58 72 82-118 106 164H88z" fill="#fff"/><circle cx="346" cy="144" r="42" fill="#ffd166"/><path d="M126 366h260" stroke="#fff" stroke-width="24" stroke-linecap="round"/></svg>`;
  fs.writeFileSync(path.join(iconDir, `icon-${size}.svg`), svg);
}

async function downloadPhoto(hike) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(hike.imageQuery + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json&origin=*`;
  try {
    const data = await (await fetch(api, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } })).json();
    const pages = Object.values(data.query?.pages || {});
    const image = pages.find(p => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url);
    if (!image) throw new Error('no commons image');
    const url = image.imageinfo[0].thumburl || image.imageinfo[0].url;
    const imageRes = await fetch(url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
    const type = imageRes.headers.get('content-type') || '';
    if (!imageRes.ok || !type.startsWith('image/')) throw new Error(`bad image response ${imageRes.status} ${type}`);
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
    const safe = `${hike.id}.${ext}`;
    const dest = path.join(imgDir, safe);
    const buf = Buffer.from(await imageRes.arrayBuffer());
    fs.writeFileSync(dest, buf);
    hike.image = `images/${safe}`;
    hike.imageCredit = `Wikimedia Commons: ${image.title.replace(/^File:/,'')}`;
  } catch (e) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0b7a75"/><stop offset="1" stop-color="#3a86ff"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><path d="M0 650l250-250 190 170 170-260 230 300 140-170 220 210v150H0z" fill="#eaf7f4"/><text x="70" y="120" font-family="Arial" font-size="54" fill="white">${xmlEscape(hike.title)}</text></svg>`;
    fs.writeFileSync(path.join(imgDir, hike.id + '.svg'), svg);
    hike.image = `images/${hike.id}.svg`;
    hike.imageCredit = 'Generated local fallback illustration';
  }
}

async function downloadGpx(hike) {
  const lonlats = hike.route.map(p => p.join(',')).join('|');
  const url = `https://brouter.de/brouter?lonlats=${encodeURIComponent(lonlats)}&profile=hiking-beta&alternativeidx=0&format=gpx`;
  const res = await fetch(url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
  if (!res.ok) throw new Error(`${hike.id} BRouter ${res.status}`);
  let gpx = await res.text();
  gpx = gpx.replace('<name>brouter_hiking-beta_0</name>', `<name>${xmlEscape(hike.title)}</name>`);
  gpx = gpx.replace('<gpx ', `<gpx `);
  const m = gpx.match(/track-length = ([0-9]+).*?filtered ascend = ([0-9]+).*?time=([^<]+?) -->/);
  if (m) {
    hike.distanceMeters = Number(m[1]);
    hike.distance = `${(Number(m[1]) / 1000).toFixed(1)} km`;
    hike.ascentMeters = Number(m[2]);
    hike.elevation = `about ${m[2]} m up`;
    hike.brouterTime = m[3].trim();
  }
  hike.track = [...gpx.matchAll(/<trkpt lon="([^"]+)" lat="([^"]+)"/g)]
    .map(match => [Number(match[2]), Number(match[1])]);
  const gpxName = `${hike.slug}.gpx`;
  fs.writeFileSync(path.join(outDir, gpxName), gpx);
  hike.gpx = gpxName;
}

function makeHtml() {
  const appData = JSON.stringify({ accommodation: ACCOMMODATION, hikes, extras }, null, 2).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f7f2">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Bohinj Hikes">
<title>Bohinj Family Hikes</title>
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/icon-192.svg">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<style>
:root{--bg:#f7f7f2;--ink:#17201d;--muted:#64706b;--card:#ffffff;--line:rgba(23,32,29,.12);--brand:#0b7a75;--brand2:#2d6cdf;--warn:#b45309;--shadow:0 18px 50px rgba(12,30,25,.13);--radius:24px;--safe-top:env(safe-area-inset-top);--safe-bottom:env(safe-area-inset-bottom)}
@media (prefers-color-scheme:dark){:root{--bg:#101412;--ink:#f2f5f1;--muted:#a8b3ad;--card:#1b211e;--line:rgba(242,245,241,.14);--brand:#37c3b6;--brand2:#8ab4ff;--warn:#f4b66f;--shadow:0 18px 50px rgba(0,0,0,.45)}}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Arial,sans-serif;line-height:1.45;-webkit-font-smoothing:antialiased}button,a{touch-action:manipulation}a{color:inherit}.app{min-height:100vh;padding-bottom:calc(86px + var(--safe-bottom))}.topbar{position:sticky;top:0;z-index:30;padding:calc(10px + var(--safe-top)) 16px 10px;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:center}.brand{min-width:0;flex:1}.brand strong{display:block;font-size:18px;letter-spacing:0}.brand span{display:block;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pill{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:10px 12px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.05)}main{max-width:1100px;margin:0 auto}.hero{padding:18px 16px 6px}.hero h1{font-size:34px;line-height:1.02;margin:6px 0 10px;letter-spacing:0}.hero p{margin:0;color:var(--muted);font-size:16px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}.stat{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:12px;min-width:0}.stat b{display:block;font-size:18px}.stat span{font-size:12px;color:var(--muted)}.cards{display:grid;gap:16px;padding:16px}.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}.hike-card{cursor:pointer}.hike-card img{width:100%;height:210px;object-fit:cover;display:block;background:#dfe7e3}.card-body{padding:16px}.card h2,.card h3{margin:0 0 8px;letter-spacing:0}.card h2{font-size:23px}.meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.chip{font-size:12px;border:1px solid var(--line);background:color-mix(in srgb,var(--card) 88%,var(--brand) 12%);padding:7px 9px;border-radius:999px;color:var(--ink);display:inline-flex;gap:6px;align-items:center}.weather{color:var(--muted);font-size:14px}.view{display:none}.view.active{display:block}.detail-hero{position:relative;min-height:420px;display:flex;align-items:flex-end;background:#26322f;overflow:hidden}.detail-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05)}.detail-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.74))}.detail-hero-content{position:relative;z-index:1;padding:70px 16px 22px;color:white;width:100%;max-width:1100px;margin:0 auto}.back{position:absolute;top:calc(14px + var(--safe-top));left:16px;z-index:3;background:rgba(255,255,255,.9);color:#17201d;border:0;border-radius:999px;padding:11px 13px;font-weight:700}.detail-hero h1{font-size:34px;line-height:1.02;margin:0 0 10px}.detail-hero p{margin:0;color:rgba(255,255,255,.86)}.section{padding:16px}.panel{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:16px;box-shadow:0 10px 30px rgba(0,0,0,.06);margin-bottom:16px}.grid{display:grid;grid-template-columns:1fr;gap:12px}.info{border-bottom:1px solid var(--line);padding:10px 0}.info:last-child{border-bottom:0}.info span{display:block;color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.04em}.info b{display:block;margin-top:3px}.map{height:390px;border-radius:20px;overflow:hidden;border:1px solid var(--line);background:#dbe4df}.actions{display:grid;grid-template-columns:1fr;gap:10px}.btn{border:0;border-radius:16px;padding:14px 15px;background:var(--brand);color:white;font-weight:750;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:10px;min-height:50px}.btn.secondary{background:var(--card);color:var(--ink);border:1px solid var(--line)}.btn.blue{background:var(--brand2)}.list{display:grid;gap:10px;margin:10px 0 0}.list div{padding:11px 12px;border:1px solid var(--line);border-radius:16px;background:color-mix(in srgb,var(--card) 92%,var(--brand) 8%)}.two{display:grid;gap:16px}.credit{font-size:11px;color:rgba(255,255,255,.72);margin-top:10px}.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:40;padding:9px 12px calc(9px + var(--safe-bottom));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.tabbar button{border:0;border-radius:16px;background:transparent;color:var(--muted);padding:9px 6px;font-size:12px;font-weight:700}.tabbar button.active{background:var(--card);color:var(--brand);box-shadow:0 8px 24px rgba(0,0,0,.08)}.tabbar i{display:block;font-size:18px;margin-bottom:3px}.leaflet-popup-content{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.marker-dot{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:white;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,.3);font-size:12px}.m-home{background:#0b7a75}.m-park{background:#334155}.m-start{background:#2d6cdf}.m-finish{background:#7c3aed}.m-hut{background:#b45309}.m-food{background:#dc2626}.m-water{background:#0284c7}.m-view{background:#16a34a}.m-swim{background:#0891b2}.m-toilet{background:#64748b}.m-photo{background:#db2777}
@media (min-width:720px){.cards{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:repeat(2,1fr)}.actions{grid-template-columns:repeat(4,1fr)}.two{grid-template-columns:1fr 1fr}.hero h1,.detail-hero h1{font-size:48px}.detail-hero{min-height:520px}.map{height:500px}}
</style>
</head>
<body>
<div class="app">
<header class="topbar"><div class="brand"><strong>Bohinj Family Hikes</strong><span>Ukanc base: Apartments Lake Bohinj</span></div><a class="pill" href="#extras" data-tab="extras"><i class="fa-solid fa-circle-info"></i> Extras</a></header>
<main>
<section id="home" class="view active">
<div class="hero"><h1>Six verified family hikes from Bohinj.</h1><p>Mobile-first guide for two adults with children aged 5 and 7. Tracks use BRouter hiking over OpenStreetMap and stay within the 12 km/day target.</p><div class="stats"><div class="stat"><b>6</b><span>hikes</span></div><div class="stat"><b>12 km</b><span>max/day</span></div><div class="stat"><b>112</b><span>emergency</span></div></div></div>
<div class="cards" id="cards"></div>
</section>
<section id="detail" class="view"></section>
<section id="extras" class="view"><div class="hero"><h1>Bohinj extras.</h1><p>Food, beaches, ice cream, light and rainy-day fallbacks for the family.</p></div><div class="section" id="extrasContent"></div></section>
</main>
</div>
<nav class="tabbar"><button class="active" data-tab="home"><i class="fa-solid fa-mountain-sun"></i>Hikes</button><button data-tab="extras"><i class="fa-solid fa-umbrella-beach"></i>Extras</button><button data-action="install"><i class="fa-solid fa-mobile-screen"></i>Install</button></nav>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
<script>
const APP_DATA = ${appData};
const state = { maps: {}, deferredInstall: null };
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); state.deferredInstall = e; });
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('service-worker.js').catch(()=>{});

function icon(cls, fa){ return L.divIcon({ className:'', html:\`<div class="marker-dot \${cls}"><i class="fa-solid \${fa}"></i></div>\`, iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-12] }); }
const icons = {home:icon('m-home','fa-house'),park:icon('m-park','fa-square-parking'),start:icon('m-start','fa-person-hiking'),finish:icon('m-finish','fa-flag-checkered'),hut:icon('m-hut','fa-campground'),food:icon('m-food','fa-utensils'),water:icon('m-water','fa-water'),view:icon('m-view','fa-binoculars'),swim:icon('m-swim','fa-person-swimming'),toilet:icon('m-toilet','fa-restroom'),photo:icon('m-photo','fa-camera')};

function show(tab){ $$('.view').forEach(v=>v.classList.remove('active')); $('#' + tab).classList.add('active'); $$('.tabbar button').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab)); window.scrollTo({top:0,behavior:'smooth'}); }
function card(h){ return \`<article class="card hike-card" data-id="\${h.id}"><img src="\${h.image}" alt="\${h.title}"><div class="card-body"><h2>\${h.title}</h2><p class="weather">\${h.summary}</p><div class="meta"><span class="chip"><i class="fa-solid fa-gauge-high"></i>\${h.difficulty}</span><span class="chip"><i class="fa-solid fa-route"></i>\${h.distance}</span><span class="chip"><i class="fa-solid fa-arrow-trend-up"></i>\${h.elevation}</span><span class="chip"><i class="fa-regular fa-clock"></i>\${h.familyTime}</span></div><p class="weather"><i class="fa-solid fa-cloud-sun"></i> \${h.weather}</p></div></article>\`; }

function renderHome(){ $('#cards').innerHTML = APP_DATA.hikes.map(card).join(''); $$('.hike-card').forEach(c=>c.addEventListener('click',()=>renderDetail(c.dataset.id))); }
function info(label, value){ return \`<div class="info"><span>\${label}</span><b>\${value}</b></div>\`; }
function list(items){ return \`<div class="list">\${items.map(x=>\`<div>\${x}</div>\`).join('')}</div>\`; }
function mapsUrl(kind,h){ const p=\`\${h.parking.lat},\${h.parking.lon}\`; if(kind==='google') return \`https://www.google.com/maps/dir/?api=1&destination=\${p}&travelmode=driving\`; if(kind==='apple') return \`https://maps.apple.com/?daddr=\${p}&dirflg=d\`; return \`https://mapy.com/turisticka?x=\${h.parking.lon}&y=\${h.parking.lat}&z=15\`; }

function renderDetail(id){
 const h = APP_DATA.hikes.find(x=>x.id===id);
 $('#detail').innerHTML = \`<button class="back" id="backBtn"><i class="fa-solid fa-chevron-left"></i> Hikes</button><div class="detail-hero"><img src="\${h.image}" alt="\${h.title}"><div class="detail-hero-content"><h1>\${h.title}</h1><p>\${h.summary}</p><div class="meta"><span class="chip">\${h.difficulty}</span><span class="chip">\${h.distance}</span><span class="chip">\${h.elevation}</span></div><div class="credit">\${h.imageCredit || ''}</div></div></div>
 <div class="section"><div class="panel"><div id="map-\${h.id}" class="map"></div></div>
 <div class="panel actions"><a class="btn" download href="\${h.gpx}"><i class="fa-solid fa-download"></i>Download GPX</a><a class="btn secondary" target="_blank" href="\${mapsUrl('google',h)}"><i class="fa-brands fa-google"></i>Google Maps</a><a class="btn secondary" target="_blank" href="\${mapsUrl('mapy',h)}"><i class="fa-solid fa-map"></i>Mapy.com</a><a class="btn secondary" target="_blank" href="\${mapsUrl('apple',h)}"><i class="fa-brands fa-apple"></i>Apple Maps</a></div>
 <div class="panel grid">\${info('Difficulty',h.difficulty)}\${info('Distance',h.distance)}\${info('Elevation',h.elevation)}\${info('Estimated hiking time',h.hikingTime)}\${info('Estimated family time',h.familyTime)}\${info('Best time of day',h.bestTime)}\${info('Parking GPS',\`\${h.parking.name}: \${h.parking.lat.toFixed(5)}, \${h.parking.lon.toFixed(5)}\`)}\${info('Parking fee',h.parking.fee)}\${info('Drive time from accommodation',h.drive)}\${info('Walking time if possible',h.walk)}</div>
 <div class="two"><div class="panel"><h3>Family notes</h3>\${info('Family friendliness',h.family)}\${info('What children usually enjoy',h.kids)}\${info('Dangerous sections',h.danger)}\${info('Weather tips',h.weather)}\${info('What to pack',h.pack)}\${info('Alternative shorter route',h.shorter)}\${info('Emergency information',h.emergency)}</div>
 <div class="panel"><h3>Services and treats</h3>\${info('Toilets',h.toilets)}\${info('Drinking water',h.water)}\${info('Mountain huts',h.huts)}\${info('Restaurants',h.restaurants)}\${info('Swimming opportunities',h.swimming)}\${info('Ice cream stop afterwards',h.iceCream)}</div></div>
 <div class="two"><div class="panel"><h3>Views and photos</h3>\${info('Best viewpoints',list(h.viewpoints))}\${info('Best photo spots',list(h.photo))}\${info('Hidden gems',h.hidden)}</div><div class="panel"><h3>Route source</h3><p class="weather">The GPX track for this hike was generated from BRouter using the hiking profile over OpenStreetMap ways, then embedded here and cached for offline use. Map tiles remain online-only.</p></div></div></div>\`;
 $('#backBtn').addEventListener('click',()=>show('home'));
 show('detail');
 setTimeout(()=>initMap(h), 80);
}

async function initMap(h){
 const el = $('#map-' + h.id); if(!el || state.maps[h.id]) return;
 const map = L.map(el, { scrollWheelZoom:false });
 state.maps[h.id]=map;
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
 const bounds = [];
 function mark(p, label, ic){ L.marker([p.lat,p.lon],{icon:ic}).addTo(map).bindPopup(label); bounds.push([p.lat,p.lon]); }
 mark(APP_DATA.accommodation, '<b>Accommodation</b><br>'+APP_DATA.accommodation.address, icons.home);
 mark(h.parking, '<b>Parking</b><br>'+h.parking.name, icons.park);
 mark(h.start, '<b>Start</b><br>'+h.start.name, icons.start);
 mark(h.finish, '<b>Finish</b><br>'+h.finish.name, icons.finish);
 const groups = [['huts',icons.hut],['restaurants',icons.food],['waterfalls',icons.water],['viewpoints',icons.view],['swimming',icons.swim],['toilets',icons.toilet],['photos',icons.photo]];
 groups.forEach(([key,ic]) => (h.pois[key]||[]).forEach(p=>mark(p, '<b>'+p.name+'</b>', ic)));
 const pts = h.track && h.track.length ? h.track : h.route.map(p=>[p[1],p[0]]);
 pts.forEach(p=>bounds.push(p));
 L.polyline(pts,{color:'#0b7a75',weight:5,opacity:.92,lineCap:'round'}).addTo(map);
 map.fitBounds(bounds,{padding:[24,24]});
 setTimeout(()=>map.invalidateSize(),200);
}

function renderExtras(){
 const e = APP_DATA.extras;
 $('#extrasContent').innerHTML = \`<div class="two"><div class="panel"><h3>Best restaurants around Bohinj</h3>\${list(e.restaurants.map(r=>\`<b>\${r[0]}</b><br>\${r[1]}\`))}</div><div class="panel"><h3>Best beaches</h3>\${list(e.beaches.map(r=>\`<b>\${r[0]}</b><br>\${r[1]}\`))}</div><div class="panel"><h3>Best ice cream</h3>\${list(e.icecream.map(r=>\`<b>\${r[0]}</b><br>\${r[1]}\`))}</div><div class="panel"><h3>Best light</h3>\${info('Best sunset',e.sunset)}\${info('Best sunrise',e.sunrise)}</div><div class="panel"><h3>Rainy day alternatives</h3>\${list(e.rainy)}</div><div class="panel"><h3>Emergency numbers</h3>\${list(e.emergency)}</div></div>\`;
}

document.addEventListener('click', async e => {
 const tab = e.target.closest('[data-tab]')?.dataset.tab; if(tab) { e.preventDefault(); show(tab); }
 if(e.target.closest('[data-action="install"]')) { if(state.deferredInstall){ state.deferredInstall.prompt(); } else { alert('On iPhone: Share → Add to Home Screen. Service worker/PWA install requires serving this folder over http/https, not file://.'); } }
});
renderHome(); renderExtras();
</script>
</body></html>`;
}

function makeServiceWorker() {
  const assets = ['index.html','manifest.json',...hikes.map(h=>h.gpx),...hikes.map(h=>h.image),'icons/icon-192.svg','icons/icon-512.svg'];
  return `const CACHE='bohinj-family-hikes-v1';
const ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.url.includes('tile.openstreetmap.org')) return; event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone(); if(req.method==='GET' && (new URL(req.url)).origin===location.origin) caches.open(CACHE).then(c=>c.put(req,copy)); return res;})).catch(()=>caches.match('index.html')));});`;
}

function makeManifest() {
  return JSON.stringify({
    name: 'Bohinj Family Hikes',
    short_name: 'Bohinj Hikes',
    start_url: 'index.html',
    display: 'standalone',
    background_color: '#f7f7f2',
    theme_color: '#0b7a75',
    icons: [
      { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
    ]
  }, null, 2);
}

function makeReadme() {
  return `# Bohinj Family Hikes PWA

Open \`index.html\` directly for the guide. For the best iPhone experience, publish this folder with GitHub Pages so Safari loads it over HTTPS; then use Share -> Add to Home Screen.

## Included

- \`index.html\` with embedded vanilla HTML/CSS/JavaScript.
- Six GPX files generated by BRouter hiking profile over OpenStreetMap ways.
- Local hike images from Wikimedia Commons where available.
- \`manifest.json\`, \`service-worker.js\`, and SVG app icons.

## Data notes

Route geometry is generated from BRouter 1.7.9 using OpenStreetMap data and the \`hiking-beta\` profile. Practical details such as fees and opening/services can change seasonally in Bohinj and Triglav National Park, so check posted signs and official local boards before starting. Emergency number in Slovenia: 112.

## Local testing

From this folder you can run a static server, for example:

\`\`\`
python -m http.server 8080
\`\`\`

or any other local web server, then visit \`http://localhost:8080\`.

## GitHub Pages

1. Create a GitHub repository, for example \`bohinj-family-hikes\`.
2. Upload the complete contents of this folder to the repository root.
3. In GitHub, open Settings -> Pages.
4. Set Source to \`Deploy from a branch\`.
5. Choose branch \`main\` and folder \`/ (root)\`, then Save.
6. Open the Pages URL on your iPhone. It will look like:

\`\`\`
https://YOUR-GITHUB-USERNAME.github.io/bohinj-family-hikes/
\`\`\`

On iPhone, tap Share -> Add to Home Screen. GitHub Pages is HTTPS, so the service worker can cache the app after the first load.
`;
}

(async () => {
  for (const size of [192, 512]) makeIcon(size);
  for (const hike of hikes) {
    await downloadGpx(hike);
    await downloadPhoto(hike);
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), makeHtml());
  fs.writeFileSync(path.join(outDir, 'manifest.json'), makeManifest());
  fs.writeFileSync(path.join(outDir, 'service-worker.js'), makeServiceWorker());
  fs.writeFileSync(path.join(outDir, 'README.md'), makeReadme());
  console.log('Generated Bohinj family hiking app');
  hikes.forEach(h => console.log(`${h.title}: ${h.distance}, ${h.elevation}, ${h.gpx}, ${h.image}`));
})();
