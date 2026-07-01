const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const outDir = process.cwd();
const imgDir = path.join(outDir, 'images');
const galleryDir = path.join(imgDir, 'gallery');
const iconDir = path.join(outDir, 'icons');
fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });
fs.mkdirSync(iconDir, { recursive: true });
for (const file of fs.readdirSync(iconDir)) fs.unlinkSync(path.join(iconDir, file));

const ACCOMMODATION = { name: 'Apartments Lake Bohinj', lat: 46.277735, lon: 13.836426, address: 'Ukanc 78, 4265 Bohinjsko Jezero' };
const GLOBAL_GALLERY_HASHES = new Set();

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
    galleryQueries: ['Savica Waterfall Bohinj', 'Slap Savica Slovenia', 'Ukanc Lake Bohinj', 'Lake Bohinj Ukanc', 'Bohinj Savica waterfall', 'Bohinj lakeshore'],
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
    galleryQueries: ['Vogel Bohinj cable car', 'Vogel ski resort Bohinj', 'Lake Bohinj from Vogel', 'Julian Alps Vogel', 'Orlove glave Vogel', 'Vogel Slovenia'],
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
    galleryQueries: ['Mostnica Gorge Bohinj', 'Mostnica Korita Slovenia', 'Voje Valley Bohinj', 'Koča na Vojah', 'Mostnica waterfall', 'Stara Fuzina Mostnica'],
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
    galleryQueries: ['Planina pri Jezeru Bohinj', 'Koča na Planini pri Jezeru', 'Planina Blato Bohinj', 'Triglav Lakes Valley Planina pri Jezeru', 'Bohinj alpine pasture', 'Planina pri Jezeru lake'],
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
    galleryQueries: ['Planina Zajamniki', 'Zajamniki Pokljuka', 'Pokljuka alpine pasture', 'Uskovnica Slovenia', 'Planina Zajamniki shepherd huts', 'Julian Alps Pokljuka'],
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
    galleryQueries: ['Peričnik waterfall', 'Pericnik Waterfall Slovenia', 'Slap Peričnik', 'Vrata Valley Slovenia', 'Mojstrana Peričnik', 'Triglav National Park Peričnik'],
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
    ['Aquapark Bohinj', 'Indoor pools and family rainy-day backup in Bohinjska Bistrica.'],
    ['Church of St John the Baptist Bohinj', 'Short lakefront stop during rain gaps near Ribčev Laz.'],
    ['Bled Castle', 'Longer indoor/urban day if Bohinj weather is poor.'],
    ['Slovenian Alpine Museum Mojstrana', 'Good backup if paired with a Peričnik-area weather window.'],
    ['Planica Nordic Centre', 'Indoor/outdoor family option toward Kranjska Gora.']
  ],
  emergency: ['112 emergency and mountain rescue', '113 police', 'Carry insurance details and children’s ID/passport copies', 'Tell someone your route before mountain-road hikes']
};

const csHikes = {
  'savica-lakeshore': {
    title: 'Vodopád Savica + břeh Bohinjského jezera',
    difficulty: 'Lehká až střední',
    hikingTime: '2 h 30 min',
    familyTime: '3 h 30 min až 4 h 30 min',
    bestTime: 'Ráno kvůli měkčímu světlu u Savice; pozdní odpoledne, pokud chcete hlavně břeh jezera.',
    parkingFee: 'Placené sezónní parkoviště; ověřte aktuální hodinovou/denní sazbu na dopravních tabulích Bohinj.',
    drive: '5-8 min k parkovišti Savica, nebo pěšky přímo z Ukance.',
    walk: 'Možné přímo od apartmánu; přibližně 4,5 km k vyhlídce na vodopád, s návratem kolem Bohinjského jezera.',
    weather: 'Nejlepší po suchém nebo jen mírně deštivém období; kamenné schody mohou po silném dešti klouzat.',
    summary: 'Klasický rodinný den v západním Bohinji: lesní cesty, mohutná vyhlídka na vodopád Savica a pohodový návrat podél jezera.',
    family: 'Dobré pro děti 5 a 7 let, pokud jdete po schodech pomalu a nespěcháte s návratem.',
    kids: 'Hukot vodopádu, počítání kamenných schodů, kamínky u jezera a lodě v Ukanci.',
    danger: 'Strmé zabezpečené schody u vodopádu, mokrý kámen, v létě rušná cesta; děti držte uvnitř zábradlí.',
    toilets: 'U parkoviště Savica a sezónně v okolí Ukance.',
    water: 'Vezměte vlastní vodu; sezónní občerstvení u Koči pri Savici a v Ukanci.',
    huts: 'Koča pri Savici u parkoviště pod vodopádem.',
    restaurants: 'Možnosti u jezera v Ukanci a u Hotelu Zlatorog; více podniků je v Ribčev Lazu.',
    swimming: 'Bohinjské jezero u Ukance/delty Savice za teplého stabilního počasí; voda se rychle prohlubuje.',
    iceCream: 'Sezónní stánek v Ukanci nebo zmrzlina na nábřeží v Ribčev Lazu.',
    viewpoints: ['Vyhlídka na vodopád Savica', 'Pohledy na jezero ze západního břehu u Ukance', 'Delta Savice směrem na východ přes jezero'],
    photo: ['Plošina u vodopádu', 'Lesní schodiště', 'Břeh Bohinjského jezera u Ukance'],
    hidden: 'Tiché pěšiny v deltě Savice na západním konci jezera jsou klidnější než hlavní pláže.',
    pack: 'Boty s dobrou podrážkou, lehká pláštěnka, voda, svačina, v létě věci na koupání a malý ručník.',
    shorter: 'Dojeďte na parkoviště Savica a dejte jen vodopád tam a zpět, asi 1,5 km a 150 m stoupání.',
    emergency: 'Volejte 112. Uveďte nejbližší orientační bod: Slap Savica / Ukanc.'
  },
  'vogel-panorama': {
    title: 'Panorama Vogel lanovkou',
    difficulty: 'Lehká až střední alpská procházka',
    hikingTime: '1 h 45 min',
    familyTime: '2 h 30 min až 4 h včetně lanovky, fotek a zastávek',
    bestTime: 'První ranní lanovky za jasného počasí; vyhněte se bouřkám a silnému větru.',
    parkingFee: 'V hlavní sezóně placené/regulované parkování; je potřeba koupit lístky na lanovku.',
    drive: '2-4 min k dolní stanici lanovky, případně pěšky z Ukance.',
    walk: 'Ano. Dolní stanice je asi 10-15 min pěšky od ubytování.',
    weather: 'Má smysl, když je základna oblačnosti nad areálem; při tvorbě bouřek se vraťte.',
    summary: 'Krátký alpský výlet s velkou odměnou: lanovkou na Vogel, výhledy na Bohinjské jezero a Julské Alpy.',
    family: 'Výborné, pokud dětem nevadí lanovka a držíte se značených cest u areálu.',
    kids: 'Jízda lanovkou, velké horské výhledy, sedačkové lanovky, alpské květiny a v sezóně krávy.',
    danger: 'Alpské slunce, náhlé bouřky, nezajištěné okraje mimo hlavní zóny, servisní cesty; u hran držte děti za ruku.',
    toilets: 'U dolní i horní stanice lanovky a v horských restauracích v provozní době.',
    water: 'Doplňte/kupte u lanovky; na exponovanou procházku vezměte dostatek vody.',
    huts: 'Viharnik a restaurace v areálu Vogel u horní stanice; Merjasec v sezóně.',
    restaurants: 'Restaurace u horní stanice Vogelu; po návratu Ukanc nebo Ribčev Laz.',
    swimming: 'Po výletu koupání v Bohinjském jezeře u Ukance.',
    iceCream: 'Stánek v Ukanci nebo nábřeží v Ribčev Lazu.',
    viewpoints: ['Vyhlídková terasa horní stanice Vogel', 'Oblast Orlove glave', 'Za jasna výhledy směrem k Triglavu'],
    photo: ['Terasa lanovky nad jezerem', 'Cesty přes alpské pastviny', 'Panorama Julských Alp'],
    hidden: 'Popojděte kousek za nejrušnější terasu pro klidnější záběry pastvin a jezera.',
    pack: 'Větrovka, kšiltovky, opalovací krém, svačina, voda, lehká mikina i v létě.',
    shorter: 'Vyjeďte nahoru, užijte si vyhlídku u stanice a vraťte se bez prodloužení k Orlove glave.',
    emergency: 'Volejte 112. Uveďte Vogel / horní stanici lanovky nebo nejbližší název vleku.'
  },
  'mostnica-voje': {
    title: 'Soutěska Mostnica + údolí Voje',
    difficulty: 'Střední rodinná túra',
    hikingTime: '3 h',
    familyTime: '4 h až 5 h 30 min',
    bestTime: 'Ráno před ruchem v soutěsce; v teplém odpoledni je krásný piknik ve Voje.',
    parkingFee: 'Placená parkovací zóna Bohinj; soutěska Mostnica může mít v sezóně také vstupné.',
    drive: '15-20 min z Ukance podle provozu kolem jezera.',
    walk: 'Z Ukance s dětmi nedává smysl; použijte auto nebo letní shuttle, pokud jezdí.',
    weather: 'Dobré za tepla díky stínu v soutěsce; nechoďte při náledí nebo po intenzivních bouřkách.',
    summary: 'Stinná soutěska se smaragdovými tůněmi, přírodními skalními tvary, loukami ve Voje a prodloužením k vodopádu.',
    family: 'Velmi dobré pro zvídavé děti, ale hlídejte délku a držte je dál od hran soutěsky.',
    kids: 'Sloní skála, mostky, průzračné tůně, louka na piknik a vodopád na konci.',
    danger: 'Srázy do soutěsky, mokré kořeny a kameny, úzká místa; děti mějte nablízku.',
    toilets: 'V sezóně u parkoviště/vstupu a v Koči na Vojah, když je otevřená.',
    water: 'Vezměte vodu; sezónní občerstvení v Koči na Vojah.',
    huts: 'Koča na Vojah v údolí Voje.',
    restaurants: 'Koča na Vojah; po túře Stara Fužina a Ribčev Laz.',
    swimming: 'V soutěsce se nekoupejte. Lepší jsou pláže u Bohinjského jezera.',
    iceCream: 'Nábřeží v Ribčev Lazu nebo sezónní kavárny ve Staré Fužině.',
    viewpoints: ['Mosty přes soutěsku Mostnica', 'Louky údolí Voje', 'Oblast vodopádu Voje'],
    photo: ['Sloní skála v Mostnici', 'Kamenné mostky přes soutěsku', 'Louka Voje s horským pozadím'],
    hidden: 'Klidnější okraje luk za Kočou na Vojah jsou ideální na svačinu před návratem.',
    pack: 'Uzavřené boty, lehká vrstva do stínu, voda, piknik, malá lékárnička.',
    shorter: 'Jděte jen okruh soutěskou k hlavním mostům a sloní skále, pak zpět, asi 3-5 km.',
    emergency: 'Volejte 112. Uveďte Mostnica, údolí Voje nebo Koča na Vojah podle polohy.'
  },
  'planina-blato-jezeru': {
    title: 'Planina Blato → Planina pri Jezeru',
    difficulty: 'Střední horská lesní túra',
    hikingTime: '2 h 15 min',
    familyTime: '3 h 30 min až 5 h',
    bestTime: 'Ráno, hlavně v létě, kdy se parkoviště plní a odpoledne hrozí bouřky.',
    parkingFee: 'Placený režim horské silnice/parkování; ověřte aktuální denní sazbu a omezení na dopravních tabulích Bohinj.',
    drive: '35-45 min z Ukance přes Starou Fužinu po horské silnici.',
    walk: 'Pěší přístup z Ukance s dětmi není rozumný.',
    weather: 'Lesní stín pomáhá v teple; vynechte při bouřkách, cesta i horní trail jsou odlehlé.',
    summary: 'Kompaktní horský výlet od Planiny Blato lesem k jezírku a chatě na Planině pri Jezeru.',
    family: 'Dobré pro aktivní děti zvyklé na nerovný terén; stálé stoupání, ale jasná odměna u jezírka.',
    kids: 'Krávy, kořeny v lese, malé jezírko, dobroty na chatě a pozorování života u vody.',
    danger: 'Kamenitá/kořenová cesta, bláto po dešti, horská příjezdová silnice, studená voda; držte se značení.',
    toilets: 'Na chatě Koča na Planini pri Jezeru, když je otevřená; u parkoviště omezeně.',
    water: 'Vezměte vodu; občerstvení na chatě podle provozu.',
    huts: 'Koča na Planini pri Jezeru.',
    restaurants: 'Koča na Planini pri Jezeru; cestou zpět Stara Fužina nebo Ribčev Laz.',
    swimming: 'Koupání v malém alpském jezírku se nedoporučuje; později raději Bohinjské jezero.',
    iceCream: 'Nábřeží v Ribčev Lazu po návratu z horské silnice.',
    viewpoints: ['Břeh jezírka Planina pri Jezeru', 'Otevřené pastviny u Planiny Blato', 'Lesní průhledy na bohinjské hory'],
    photo: ['Jezírko a chata na Planině pri Jezeru', 'Děti na lesní cestě', 'Detaily pastvin na Planině Blato'],
    hidden: 'Krátká procházka kolem jezírka dá klidnější záběry než první místo u chaty.',
    pack: 'Turistické boty, vrstvy, pláštěnka, karta/hotovost na chatu, voda, svačina, repelent.',
    shorter: 'Otočte se u první otevřené pastviny nebo výhledu, pokud dětem dochází síly.',
    emergency: 'Volejte 112. Uveďte silnici Planina Blato nebo Koča na Planini pri Jezeru.'
  },
  'planina-zajamniki': {
    title: 'Planina Zajamniki',
    difficulty: 'Střední procházka přes louky a les',
    hikingTime: '2 h 45 min',
    familyTime: '4 h až 5 h',
    bestTime: 'Ráno nebo zlatá hodina odpoledne pro slavný výhled na řadu salaší.',
    parkingFee: 'Regulace parkování na horských cestách se sezónně mění; používejte jen značená legální parkovací místa.',
    drive: '45-60 min z Ukance přes Bohinjskou Bistricu/Pokljuku/Uskovnici podle provozu a pravidel vjezdu.',
    walk: 'Ne; jde o výlet s dojezdem autem na Pokljuku/Uskovnici.',
    weather: 'Nejlepší za stabilního počasí. Les může být chladný, pastvina je vystavená slunci i bouřkám.',
    summary: 'Scénická pokljucká procházka k jedné z nejfotogeničtějších alpských pastvin Slovinska s dlouhou řadou dřevěných salaší.',
    family: 'Dobré pro děti, které zvládnou delší zvlněnou lesní cestu; služby jsou omezené, vezměte svačinu.',
    kids: 'Dřevěné salaše, výhledy z pastvin, lesní cesty, motýli a prostor na odpočinek.',
    danger: 'Rozcestí, lesní cesty, občas kola/auta, ohradníky; respektujte soukromé salaše.',
    toilets: 'Omezené nebo žádné u trailheadu a na pastvině; využijte toalety před výjezdem.',
    water: 'Vezměte všechnu vodu; nespoléhejte na zdroje na pastvině.',
    huts: 'Na trase není garantovaná obsluhovaná chata; okolní podniky na Pokljuce mohou fungovat sezónně.',
    restaurants: 'Uskovnica/Pokljuka podle sezóny; lepší jídlo zpět v Bohinji.',
    swimming: 'Na trase není koupání; později podle času Bohinjské jezero.',
    iceCream: 'Bohinjska Bistrica nebo Ribčev Laz při návratu.',
    viewpoints: ['Klasická vyhlídka na řadu salaší Zajamniki', 'Lesní průhledy na Pokljuce', 'Okraje pastvin směrem k Julským Alpám'],
    photo: ['Konec řady salaší s pohledem zpět', 'Nízký záběr podél dřevěných salaší', 'Pastvina s horským horizontem'],
    hidden: 'Dojděte potichu na vzdálenější konec osady pro čistší kompozici bez tlačení u salaší.',
    pack: 'Voda, piknik, kšiltovky, lehká bunda, offline mapa, respekt k soukromému majetku.',
    shorter: 'Otočte se u vstupu na pastvinu a nechoďte celou řadu salaší.',
    emergency: 'Volejte 112. Uveďte Pokljuka / Uskovnica / Planina Zajamniki.'
  },
  'pericnik-waterfall': {
    title: 'Vodopád Peričnik',
    difficulty: 'Lehká, ale strmá a mokrá u vodopádů',
    hikingTime: '45 min až 1 h 15 min',
    familyTime: '1 h 30 min až 2 h 30 min',
    bestTime: 'Ráno před davy nebo teplé odpoledne, kdy je vodní tříšť příjemná.',
    parkingFee: 'V sezóně obvykle placené/regulované; přístupová cesta se může po bouřkách nebo v zimě měnit.',
    drive: '1 h 15 min až 1 h 35 min z Ukance přes Bled/Mojstranu podle provozu.',
    walk: 'Ne z Bohinje; pěšky jen od parkoviště u vodopádu.',
    weather: 'Vyhněte se mrazu a silnému dešti; cesta klouže kvůli tříšti i za slunce.',
    summary: 'Dramatická krátká procházka k ikonickému slovinskému vodopádu, včetně zážitkové cesty za spodním vodopádem, pokud jsou podmínky bezpečné.',
    family: 'Skvělý krátký výlet, ale dospělí musí velmi hlídat mokré a exponované úseky za vodopádem.',
    kids: 'Stát ve vodní tříšti, vidět vodopád zezadu, lesní mostek a mohutný hukot vody.',
    danger: 'Velmi kluzká skála, nízký strop, exponovaný průchod za vodopádem, v chladu padající led/kameny; při nejistotě vynechte horní a zadní úsek.',
    toilets: 'U Koči pri Peričniku, když je otevřená; jinak omezeně.',
    water: 'Vezměte vodu; sezónní občerstvení u chaty poblíž.',
    huts: 'Koča pri Peričniku u parkoviště.',
    restaurants: 'Koča pri Peričniku; po návštěvě restaurace v Mojstraně.',
    swimming: 'U vodopádu se nekoupejte; voda je studená a rychlá, hrozí pád kamenů.',
    iceCream: 'Mojstrana nebo Bled cestou zpět.',
    viewpoints: ['Čelní vyhlídka na spodní Peričnik', 'Cesta za vodopádem', 'Přístup k hornímu vodopádu, pokud je bezpečno'],
    photo: ['Za spodním vodopádem', 'Mostek a potok při příchodu', 'Široký vertikální záběr od paty vodopádu'],
    hidden: 'Horní vodopád bývá klidnější, ale jděte jen tehdy, když jsou děti jisté a cesta suchá.',
    pack: 'Nepromokavá bunda, boty s dobrou podrážkou, suchá vrstva pro děti, hadřík na objektiv, malý ručník.',
    shorter: 'Navštivte jen vyhlídku na spodní vodopád od parkoviště a vynechte horní/zadní trasu.',
    emergency: 'Volejte 112. Uveďte Slap Peričnik / údolí Vrata u Mojstrany.'
  }
};

const extrasCs = {
  restaurants: [
    ['Foksner', 'Burgery a pohodové rodinné jídlo v Bohinjské Bistrici.'],
    ['Gostilna Mihovc', 'Tradiční bohinjská kuchyně v oblasti Stara Fužina / Srednja vas.'],
    ['Restaurant Triglav Bohinj', 'Jídlo u jezera s místními pokrmy.'],
    ['Koča pri Savici', 'Jednoduchá zastávka po vodopádu.'],
    ['Koča na Vojah', 'Nejlepší spojit s Mostnicí a údolím Voje.']
  ],
  beaches: [
    ['Ukanc, západní konec', 'Nejblíž apartmánu, krásné horské pozadí, pozor na rychlé prohloubení.'],
    ['Ribčev Laz', 'Služby, lodě, zmrzlina a toalety blízko sebe.'],
    ['Zátoka u Fužiny / severovýchod jezera', 'Dobré spojení s procházkou ve Staré Fužině.']
  ],
  icecream: [
    ['Stánky v Ribčev Lazu', 'Nejspolehlivější rodinná zmrzlinová zastávka.'],
    ['Sezónní stánek v Ukanci', 'Nejlepší po koupání u apartmánu.'],
    ['Kavárny v Bohinjské Bistrici', 'Dobré při návratu z Pokljuky nebo Peričniku.']
  ],
  sunset: 'Ukanc a delta Savice pro zlaté světlo přes Bohinjské jezero.',
  sunrise: 'Most a kostel v Ribčev Lazu pro první světlo na jezeře, nebo klidnější Ukanc.',
  rainy: [
    ['Aquapark Bohinj', 'Vnitřní bazény a rodinná záloha do deště v Bohinjské Bistrici.'],
    ['Church of St John the Baptist Bohinj', 'Krátká zastávka u jezera během pauzy v dešti u Ribčev Lazu.'],
    ['Bled Castle', 'Delší městský/indoor den, pokud je v Bohinji špatné počasí.'],
    ['Slovenian Alpine Museum Mojstrana', 'Dobrá záloha, pokud se spojí s oknem počasí u Peričniku.'],
    ['Planica Nordic Centre', 'Rodinná možnost směrem na Kranjskou Goru.']
  ],
  emergency: ['112 tísňová linka a horská služba', '113 policie', 'Mějte údaje o pojištění a kopie dokladů dětí', 'Před horskými túrami někomu řekněte trasu']
};

function xmlEscape(s) {
  return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeIcon(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#0b7a75"/><path d="M88 344l90-118 58 72 82-118 106 164H88z" fill="#fff"/><circle cx="346" cy="144" r="42" fill="#ffd166"/><path d="M126 366h260" stroke="#fff" stroke-width="24" stroke-linecap="round"/></svg>`;
  fs.writeFileSync(path.join(iconDir, `icon-${size}.svg`), svg);
}

function imageDataUrl(assetPath) {
  const full = path.join(outDir, assetPath);
  const ext = path.extname(assetPath).toLowerCase();
  const mime = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  return `data:${mime};base64,${fs.readFileSync(full).toString('base64')}`;
}

async function downloadPhoto(hike) {
  const existing = ['jpg', 'jpeg', 'png', 'webp', 'svg']
    .map(ext => ({ ext, file: path.join(imgDir, `${hike.id}.${ext}`) }))
    .find(candidate => fs.existsSync(candidate.file) && fs.statSync(candidate.file).size > 1000);
  if (existing) {
    const ext = existing.ext === 'jpeg' ? 'jpg' : existing.ext;
    hike.image = `images/${hike.id}.${ext}`;
    hike.imageCredit = hike.imageCredit || 'Local cached image';
    return;
  }
  const forcedImages = {
    'pericnik-waterfall': {
      url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/BurgerPericnikPoleti.jpg?width=900',
      credit: 'Wikimedia Commons: BurgerPericnikPoleti.jpg'
    }
  };
  if (forcedImages[hike.id]) {
    try {
      const forced = forcedImages[hike.id];
      const imageRes = await fetch(forced.url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
      const type = imageRes.headers.get('content-type') || '';
      if (!imageRes.ok || !type.startsWith('image/')) throw new Error(`bad forced image response ${imageRes.status} ${type}`);
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      const safe = `${hike.id}.${ext}`;
      fs.writeFileSync(path.join(imgDir, safe), Buffer.from(await imageRes.arrayBuffer()));
      hike.image = `images/${safe}`;
      hike.imageCredit = forced.credit;
      return;
    } catch (e) {
      console.warn(`Forced image failed for ${hike.id}: ${e.message}`);
    }
  }
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

async function downloadGallery(hike, targetCount = 7) {
{
  const curatedGalleryFiles = {
    'savica-lakeshore': [
      'Bohinj Savica-Wasserfall 1.JPG',
      'Bohinj Savica-Wasserfall 2.JPG',
      'Bohinj Savica-Wasserfall 3.JPG',
      '2025 View from Savica waterfall towards the lake.jpg',
      'An afternoon at lake Bohinj.jpg',
      'Ausblick Bohinj jezero (27169249907).jpg',
      'Ukanc - slap Savica.jpg',
      'Lake Bohinj.jpg'
    ],
    'vogel-panorama': [
      'Triglav-izVogla.jpg',
      'Vogel2.jpg',
      'Vogel3.JPG',
      'Vogel4.jpg',
      'Slovenia-41 (40113769855).jpg',
      'Berg Panorama mit Bohinjsko jezero im Hintergrund (51588899882).jpg',
      'Bergpanorama mit Bohinjsko jezero im Hintergrund (51589730876).jpg'
    ],
    'mostnica-voje': [
      'Mostnica 2.jpg',
      'Mostnica 3.jpg',
      'Mostnica river.jpg',
      'Mostnica-Voje2.JPG',
      'Mostnica.jpg',
      'Dolina Voje.jpg',
      'Tosc-Voje2.JPG',
      'Mostnica and hill.jpg'
    ],
    'planina-blato-jezeru': [
      'Planinska pot.jpg',
      'Cow on the way to the Double lake in the Valley of the seven lakes in Triglav National Park.jpg',
      'Alpine landscape panorama in the evening (52340854025).jpg',
      'Autumn scene in the Bohinj Valley 31102016-002.jpg',
      'Mountain pastures at Pokljuka plateau, Julian alps (52339467762).jpg',
      'Autumn in the valley of the seven lakes in Julian Alps.jpg',
      'Panorama of the valley of the Triglav mountain massif.jpg'
    ],
    'planina-zajamniki': [
      'Mountain pastures at Pokljuka plateau, Julian alps (52339467762).jpg',
      'Mountain pastures at Pokljuka plateau, Julian alps (52340727204).jpg',
      'Beautiful view of traditional wooden cabins in the idyllic Slovenian mountains (52340853580).jpg',
      'Long asphalt countryside road between spruce forest trees. Amazing forest landscape, Pokljuka plateau, Slovenia in summer season. Low angle, long shot (52340856850).jpg',
      'Pokljuka (12912100613).jpg',
      'Asphalt road under pokljuka in autumn (52340663173).jpg',
      'Alpine landscape panorama in the evening (52340854025).jpg'
    ],
    'pericnik-waterfall': [
      'BurgerPericnikPoleti.jpg',
      '2016 Peričnik Falls.JPG',
      'Cascate Peričnik (48681642918).jpg',
      'Cascate Peričnik (48681682878).jpg',
      'Cascate Peričnik (48681979136).jpg',
      'Morning Peričnik.jpg',
      'Pericnik falls.jpg',
      'Frozen Peričnik waterfall in the middle of the Alps.jpg'
    ]
  };
  const peoplePattern = /(couple|person|people|portrait|selfie|hiking in|tourist|woman|man|child|children|group)/i;
  const dir = path.join(galleryDir, hike.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const gallery = [];
  const seenHashes = new Set();
  let index = 1;
  for (const title of curatedGalleryFiles[hike.id] || []) {
    if (gallery.length >= targetCount) break;
    if (peoplePattern.test(title)) continue;
    try {
      await sleep(850);
      const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(title)}?width=500`;
      const res = await fetch(url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('image/')) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) continue;
      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      if (seenHashes.has(hash) || GLOBAL_GALLERY_HASHES.has(hash)) continue;
      seenHashes.add(hash);
      GLOBAL_GALLERY_HASHES.add(hash);
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      const filename = `${String(index).padStart(2, '0')}-${hike.id}.${ext}`;
      const rel = `images/gallery/${hike.id}/${filename}`;
      fs.writeFileSync(path.join(outDir, rel), buf);
      gallery.push({ asset: rel, title });
      index++;
    } catch (e) {
      console.warn(`Curated gallery image failed for ${hike.id}: ${title}: ${e.message}`);
    }
  }

  const openverseQueries = {
    'savica-lakeshore': ['Savica waterfall Bohinj', 'Lake Bohinj Ukanc'],
    'vogel-panorama': ['Vogel Bohinj', 'Lake Bohinj from Vogel'],
    'mostnica-voje': ['Mostnica', 'Korita Mostnice', 'Voje Bohinj'],
    'planina-blato-jezeru': ['Planina pri Jezeru', 'Bohinj alpine pasture', 'Triglav Lakes Valley'],
    'planina-zajamniki': ['Planina Zajamniki', 'Pokljuka alpine pasture', 'Zajamniki'],
    'pericnik-waterfall': ['Pericnik waterfall Slovenia', 'Slap Peričnik', 'Vrata Valley waterfall']
  };
  for (const query of openverseQueries[hike.id] || []) {
    if (gallery.length >= targetCount) break;
    try {
      await sleep(850);
      const api = `https://api.openverse.engineering/v1/images/?q=${encodeURIComponent(query)}&page_size=12`;
      const res = await fetch(api, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
      if (!res.ok) continue;
      const data = await res.json();
      for (const result of data.results || []) {
        if (gallery.length >= targetCount) break;
        const title = result.title || query;
        if (peoplePattern.test(title) || !result.url) continue;
        try {
          await sleep(450);
          const imageRes = await fetch(result.url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
          const type = imageRes.headers.get('content-type') || '';
          if (!imageRes.ok || !type.startsWith('image/')) continue;
          const buf = Buffer.from(await imageRes.arrayBuffer());
          if (buf.length < 1000) continue;
          const hash = crypto.createHash('sha256').update(buf).digest('hex');
          if (seenHashes.has(hash) || GLOBAL_GALLERY_HASHES.has(hash)) continue;
          seenHashes.add(hash);
          GLOBAL_GALLERY_HASHES.add(hash);
          const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
          const filename = `${String(index).padStart(2, '0')}-${hike.id}-open.${ext}`;
          const rel = `images/gallery/${hike.id}/${filename}`;
          fs.writeFileSync(path.join(outDir, rel), buf);
          gallery.push({ asset: rel, title });
          index++;
        } catch (e) {
          console.warn(`Openverse image failed for ${hike.id}: ${title}: ${e.message}`);
        }
      }
    } catch (e) {
      console.warn(`Openverse search failed for ${hike.id}: ${query}: ${e.message}`);
    }
  }

  if (gallery.length < 5 && hike.image && !hike.image.endsWith('.svg')) {
    try {
      const buf = fs.readFileSync(path.join(outDir, hike.image));
      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      if (!seenHashes.has(hash) && !GLOBAL_GALLERY_HASHES.has(hash)) {
        GLOBAL_GALLERY_HASHES.add(hash);
        const ext = path.extname(hike.image) || '.jpg';
        const rel = `images/gallery/${hike.id}/${String(index).padStart(2, '0')}-${hike.id}-main${ext}`;
        fs.writeFileSync(path.join(outDir, rel), buf);
        gallery.push({ asset: rel, title: hike.title });
      }
    } catch (e) {
      console.warn(`Main image fallback failed for ${hike.id}: ${e.message}`);
    }
  }
  hike.gallery = gallery.slice(0, 10);
  return;
}

  const forcedGalleryFiles = {
    'savica-lakeshore': [
      'Bohinj Savica-Wasserfall 1.JPG',
      'Bohinj Savica-Wasserfall 2.JPG',
      'Bohinj Savica-Wasserfall 3.JPG',
      '2025 View from Savica waterfall towards the lake.jpg',
      'An afternoon at lake Bohinj.jpg',
      'Lake Bohinj.jpg',
      'Ukanc - slap Savica.jpg'
    ],
    'vogel-panorama': [
      'Triglav-izVogla.jpg',
      'Vogel2.jpg',
      'Vogel3.JPG',
      'Vogel4.jpg',
      'Slovenia-41 (40113769855).jpg',
      'Cows at Merjasec - panoramio.jpg',
      'Berg Panorama mit Bohinjsko jezero im Hintergrund (51588899882).jpg'
    ],
    'mostnica-voje': [
      'Mostnica 2.jpg',
      'Mostnica 3.jpg',
      'Mostnica river.jpg',
      'Mostnica-Voje2.JPG',
      'Mostnica.jpg',
      'Dolina Voje.jpg',
      'Tosc-Voje2.JPG'
    ],
    'planina-blato-jezeru': [
      'Planinska pot.jpg',
      'Cow on the way to the Double lake in the Valley of the seven lakes in Triglav National Park.jpg',
      'Alpine landscape panorama in the evening (52340854025).jpg',
      'Autumn scene in the Bohinj Valley 31102016-002.jpg',
      'Mountain pastures at Pokljuka plateau, Julian alps (52339467762).jpg',
      'Autumn in the valley of the seven lakes in Julian Alps.jpg',
      'Panorama of the valley of the Triglav mountain massif.jpg',
      'Bergpanorama mit Bohinjsko jezero im Hintergrund (51589730876).jpg',
      'Autumn scene in the Bohinj Valley.jpg'
    ],
    'planina-zajamniki': [
      'Mountain pastures at Pokljuka plateau, Julian alps (52339467762).jpg',
      'Alpine landscape panorama in the evening (52340854025).jpg',
      'Autumn scene in the Bohinj Valley 31102016-002.jpg',
      'Beautiful view of traditional wooden cabins in the idyllic Slovenian mountains (52340853580).jpg',
      'Mountain pastures at Pokljuka plateau, Julian alps (52340727204).jpg',
      'Couple observes the rural mountain landscape (52340724674).jpg',
      'Long asphalt countryside road between spruce forest trees. Amazing forest landscape, Pokljuka plateau, Slovenia in summer season. Low angle, long shot (52340856850).jpg',
      'Pokljuka (12912100613).jpg',
      'Asphalt road under pokljuka in autumn (52340663173).jpg'
    ],
    'pericnik-waterfall': [
      'BurgerPericnikPoleti.jpg',
      '2016 Peričnik Falls.JPG',
      'Cascate Peričnik (48681642918).jpg',
      'Cascate Peričnik (48681682878).jpg',
      'Cascate Peričnik (48681979136).jpg',
      'Morning Peričnik.jpg',
      'Pericnik falls.jpg'
    ]
  };
  const dir = path.join(galleryDir, hike.id);
  fs.mkdirSync(dir, { recursive: true });
  const existing = fs.readdirSync(dir)
    .filter(file => /\.(jpe?g|png|webp|svg)$/i.test(file))
    .map(file => ({ asset: `images/gallery/${hike.id}/${file}`, title: file.replace(/\.[^.]+$/, '').replace(/^\d+-/, '').replaceAll('-', ' ') }));
  if (existing.length >= 5) {
    hike.gallery = existing.slice(0, 10);
    return;
  }

  const gallery = [...existing];
  let index = gallery.length + 1;
  for (const title of forcedGalleryFiles[hike.id] || []) {
    if (gallery.length >= targetCount) break;
    try {
      await sleep(700);
      const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(title)}?width=500`;
      const res = await fetch(url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('image/')) continue;
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      const filename = `${String(index).padStart(2, '0')}-${hike.id}.${ext}`;
      const rel = `images/gallery/${hike.id}/${filename}`;
      const full = path.join(outDir, rel);
      if (!fs.existsSync(full)) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 1000) continue;
        fs.writeFileSync(full, buf);
      }
      gallery.push({ asset: rel, title });
      index++;
    } catch (e) {
      console.warn(`Forced gallery image failed for ${hike.id}: ${title}: ${e.message}`);
    }
  }
  if (gallery.length >= targetCount) {
    hike.gallery = gallery.slice(0, 10);
    return;
  }

  const seenTitles = new Set();
  const candidates = [];
  for (const query of hike.galleryQueries || [hike.imageQuery]) {
    if (candidates.length >= targetCount * 2) break;
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*`;
    try {
      const data = await (await fetch(api, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } })).json();
      const pages = Object.values(data.query?.pages || {});
      for (const page of pages) {
        const info = page.imageinfo?.[0];
        if (!info || seenTitles.has(page.title)) continue;
        const url = info.thumburl || info.url;
        if (!url) continue;
        seenTitles.add(page.title);
        candidates.push({ url, title: page.title.replace(/^File:/, '') });
      }
    } catch (e) {
      console.warn(`Gallery search failed for ${hike.id}: ${query}: ${e.message}`);
    }
  }

  for (const candidate of candidates) {
    if (gallery.length >= targetCount) break;
    try {
      await sleep(700);
      const res = await fetch(candidate.url, { headers: { 'User-Agent': 'SloveniaHikesFamilyApp/1.0' } });
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('image/')) continue;
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      const filename = `${String(index).padStart(2, '0')}-${hike.id}.${ext}`;
      const rel = `images/gallery/${hike.id}/${filename}`;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) continue;
      fs.writeFileSync(path.join(outDir, rel), buf);
      gallery.push({ asset: rel, title: candidate.title });
      index++;
    } catch (e) {
      console.warn(`Gallery image failed for ${hike.id}: ${e.message}`);
    }
  }

  if (gallery.length < 5 && hike.image) gallery.unshift({ asset: hike.image, title: hike.title });
  const unique = [];
  const seen = new Set();
  for (const item of gallery) {
    if (seen.has(item.asset)) continue;
    seen.add(item.asset);
    unique.push(item);
  }
  const fallbackGalleryAssets = {
    'planina-blato-jezeru': ['images/planina-blato-jezeru.jpg', 'images/planina-zajamniki.jpg', 'images/vogel-panorama.jpg', 'images/gallery/planina-zajamniki/01-planina-zajamniki.jpg'],
    'planina-zajamniki': ['images/planina-zajamniki.jpg', 'images/planina-blato-jezeru.jpg', 'images/vogel-panorama.jpg', 'images/gallery/planina-blato-jezeru/01-planina-blato-jezeru.jpg', 'images/gallery/planina-blato-jezeru/02-planina-blato-jezeru.jpg'],
    'mostnica-voje': ['images/mostnica-voje.jpg', 'images/savica-lakeshore.jpg'],
    'pericnik-waterfall': ['images/pericnik-waterfall.jpg'],
    'vogel-panorama': ['images/vogel-panorama.jpg', 'images/planina-zajamniki.jpg'],
    'savica-lakeshore': ['images/savica-lakeshore.jpg', 'images/mostnica-voje.jpg']
  };
  let fallbackIndex = unique.length + 1;
  for (const asset of fallbackGalleryAssets[hike.id] || []) {
    if (unique.length >= 5) break;
    const source = path.join(outDir, asset);
    if (!fs.existsSync(source) || seen.has(asset)) continue;
    const ext = path.extname(asset) || '.jpg';
    const rel = `images/gallery/${hike.id}/${String(fallbackIndex).padStart(2, '0')}-fallback-${hike.id}${ext}`;
    fs.copyFileSync(source, path.join(outDir, rel));
    unique.push({ asset: rel, title: path.basename(asset, ext) });
    seen.add(asset);
    seen.add(rel);
    fallbackIndex++;
  }
  hike.gallery = unique.slice(0, 10);
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
  const embeddedHikes = hikes.map(hike => ({
    ...hike,
    cs: csHikes[hike.id],
    image: imageDataUrl(hike.image),
    imageAsset: hike.image,
    gallery: (hike.gallery || []).map(item => ({ src: imageDataUrl(item.asset), asset: item.asset, title: item.title }))
  }));
  const appData = JSON.stringify({ accommodation: ACCOMMODATION, hikes: embeddedHikes, extras, extrasCs }, null, 2).replace(/</g, '\\u003c');
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
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Arial,sans-serif;line-height:1.45;-webkit-font-smoothing:antialiased}button,a{touch-action:manipulation}a{color:inherit}.app{min-height:100vh;padding-bottom:calc(86px + var(--safe-bottom))}.topbar{position:sticky;top:0;z-index:30;padding:calc(10px + var(--safe-top)) 16px 10px;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:center}.brand{min-width:0;flex:1}.brand strong{display:block;font-size:18px;letter-spacing:0}.brand span{display:block;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pill{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:10px 12px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.05)}.lang-toggle{display:flex;border:1px solid var(--line);background:var(--card);border-radius:999px;padding:3px;box-shadow:0 8px 24px rgba(0,0,0,.05)}.lang-toggle button{border:0;background:transparent;color:var(--muted);border-radius:999px;padding:8px 9px;font-weight:800;font-size:12px}.lang-toggle button.active{background:var(--brand);color:white}main{max-width:1100px;margin:0 auto}.hero{padding:18px 16px 6px}.hero h1{font-size:34px;line-height:1.02;margin:6px 0 10px;letter-spacing:0}.hero p{margin:0;color:var(--muted);font-size:16px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}.stat{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:12px;min-width:0}.stat b{display:block;font-size:18px}.stat span{font-size:12px;color:var(--muted)}.cards{display:grid;gap:16px;padding:16px}.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow)}.hike-card{cursor:pointer}.hike-card img{width:100%;height:210px;object-fit:cover;display:block;background:#dfe7e3}.card-body{padding:16px}.card h2,.card h3{margin:0 0 8px;letter-spacing:0}.card h2{font-size:23px}.meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.chip{font-size:12px;border:1px solid var(--line);background:color-mix(in srgb,var(--card) 88%,var(--brand) 12%);padding:7px 9px;border-radius:999px;color:var(--ink);display:inline-flex;gap:6px;align-items:center}.weather{color:var(--muted);font-size:14px}.view{display:none}.view.active{display:block}.detail-hero{position:relative;min-height:420px;display:flex;align-items:flex-end;background:#26322f;overflow:hidden}.detail-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05)}.detail-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.74))}.detail-hero-content{position:relative;z-index:1;padding:70px 16px 22px;color:white;width:100%;max-width:1100px;margin:0 auto}.back{position:absolute;top:calc(14px + var(--safe-top));left:16px;z-index:3;background:rgba(255,255,255,.9);color:#17201d;border:0;border-radius:999px;padding:11px 13px;font-weight:700}.detail-hero h1{font-size:34px;line-height:1.02;margin:0 0 10px}.detail-hero p{margin:0;color:rgba(255,255,255,.86)}.section{padding:16px}.panel{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:16px;box-shadow:0 10px 30px rgba(0,0,0,.06);margin-bottom:16px}.grid{display:grid;grid-template-columns:1fr;gap:12px}.info{border-bottom:1px solid var(--line);padding:10px 0}.info:last-child{border-bottom:0}.info span{display:block;color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.04em}.info b{display:block;margin-top:3px}.map{height:390px;border-radius:20px;overflow:hidden;border:1px solid var(--line);background:#dbe4df}.actions{display:grid;grid-template-columns:1fr;gap:10px}.btn{border:0;border-radius:16px;padding:14px 15px;background:var(--brand);color:white;font-weight:750;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:10px;min-height:50px}.btn.secondary{background:var(--card);color:var(--ink);border:1px solid var(--line)}.btn.blue{background:var(--brand2)}.list{display:grid;gap:10px;margin:10px 0 0}.list div{padding:11px 12px;border:1px solid var(--line);border-radius:16px;background:color-mix(in srgb,var(--card) 92%,var(--brand) 8%)}.two{display:grid;gap:16px}.credit{font-size:11px;color:rgba(255,255,255,.72);margin-top:10px}.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:40;padding:9px 12px calc(9px + var(--safe-bottom));background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(18px);border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.tabbar button{border:0;border-radius:16px;background:transparent;color:var(--muted);padding:9px 6px;font-size:12px;font-weight:700}.tabbar button.active{background:var(--card);color:var(--brand);box-shadow:0 8px 24px rgba(0,0,0,.08)}.tabbar i{display:block;font-size:18px;margin-bottom:3px}.leaflet-popup-content{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.marker-dot{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:white;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,.3);font-size:12px}.m-home{background:#0b7a75}.m-park{background:#334155}.m-start{background:#2d6cdf}.m-finish{background:#7c3aed}.m-hut{background:#b45309}.m-food{background:#dc2626}.m-water{background:#0284c7}.m-view{background:#16a34a}.m-swim{background:#0891b2}.m-toilet{background:#64748b}.m-photo{background:#db2777}
.gallery{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 2px 12px;margin:8px -2px 0;-webkit-overflow-scrolling:touch}.gallery figure{margin:0;min-width:78%;scroll-snap-align:start;border-radius:20px;overflow:hidden;border:1px solid var(--line);background:var(--card);box-shadow:0 10px 26px rgba(0,0,0,.08)}.gallery img{width:100%;height:240px;display:block;object-fit:cover;background:#dfe7e3}.gallery figcaption{padding:9px 11px;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dashboard-wrap{padding:16px 16px 4px}.dash-card{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:18px;box-shadow:var(--shadow);margin-bottom:14px}.dash-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.dash-kicker{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-weight:800}.dash-date{font-size:14px;color:var(--muted);margin-top:3px}.dash-weather{display:flex;gap:14px;align-items:center;margin:16px 0}.dash-weather i{font-size:42px;color:var(--brand2)}.dash-temp{font-size:42px;line-height:1;font-weight:850}.dash-summary{color:var(--muted);font-size:14px}.status-pill{border-radius:999px;padding:8px 10px;font-weight:850;font-size:12px;white-space:nowrap}.status-green{background:#dcfce7;color:#166534}.status-yellow{background:#fef3c7;color:#92400e}.status-red{background:#fee2e2;color:#991b1b}.dash-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.dash-metric{border:1px solid var(--line);border-radius:18px;padding:10px;background:color-mix(in srgb,var(--card) 90%,var(--brand) 10%)}.dash-metric span{display:block;color:var(--muted);font-size:11px}.dash-metric b{display:block;margin-top:2px;font-size:15px}.energy{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.energy button{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:15px;padding:11px 8px;font-weight:800}.energy button.active{background:var(--brand);border-color:var(--brand);color:white}.recommend h2{font-size:28px;line-height:1.05;margin:8px 0}.recommend p{color:var(--muted);margin:8px 0}.dash-actions{display:grid;gap:10px;margin-top:14px}.btn.danger{background:#dc2626}.checklist{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}.checklist label{display:flex;gap:10px;align-items:center;border:1px solid var(--line);border-radius:14px;padding:10px 11px;background:color-mix(in srgb,var(--card) 94%,var(--brand) 6%);font-weight:700}.checklist input{width:20px;height:20px;accent-color:var(--brand)}.timeline{display:grid;gap:8px;margin-top:10px}.timeline-row{display:grid;grid-template-columns:62px 1fr;gap:10px;align-items:start}.timeline-time{font-weight:850;color:var(--brand)}.timeline-text{border-bottom:1px solid var(--line);padding-bottom:8px}.modal-backdrop{position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.52);display:none;align-items:flex-end}.modal-backdrop.active{display:flex}.modal{width:100%;max-width:720px;margin:0 auto;background:var(--card);color:var(--ink);border-radius:28px 28px 0 0;padding:18px 16px calc(20px + var(--safe-bottom));box-shadow:0 -20px 60px rgba(0,0,0,.35)}.modal h2{margin:0 0 8px;font-size:28px}.modal .emergency-number{font-size:44px;font-weight:900;color:#dc2626}.modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.place-list{display:grid;gap:12px;margin-top:10px}.place-card{border:1px solid var(--line);border-radius:18px;padding:13px;background:color-mix(in srgb,var(--card) 94%,var(--brand) 6%)}.place-card h4{margin:0 0 5px;font-size:17px}.place-card p{margin:0;color:var(--muted);font-size:14px}.place-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.place-actions a{border:1px solid var(--line);border-radius:13px;padding:10px 8px;text-decoration:none;text-align:center;font-size:12px;font-weight:850;background:var(--card);color:var(--ink)}.place-actions a.primary{background:var(--brand);color:white;border-color:var(--brand)}
@media (min-width:720px){.cards{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:repeat(2,1fr)}.actions{grid-template-columns:repeat(4,1fr)}.two{grid-template-columns:1fr 1fr}.hero h1,.detail-hero h1{font-size:48px}.detail-hero{min-height:520px}.map{height:500px}.gallery figure{min-width:42%}}
</style>
</head>
<body>
<div class="app">
<header class="topbar"><div class="brand"><strong id="brandTitle">Bohinj Family Hikes</strong><span id="brandSub">Ukanc base: Apartments Lake Bohinj</span></div><div class="lang-toggle" aria-label="Language"><button data-lang="en" class="active">EN</button><button data-lang="cs">CZ</button></div><a class="pill" href="#extras" data-tab="extras"><i class="fa-solid fa-circle-info"></i> <span id="extrasTop">Extras</span></a></header>
<main>
<section id="home" class="view active">
<div class="dashboard-wrap" id="dashboard"></div>
<div class="hero"><h1 id="homeTitle">Six verified family hikes from Bohinj.</h1><p id="homeIntro">Mobile-first guide for two adults with children aged 5 and 7. Tracks use BRouter hiking over OpenStreetMap and stay within the 12 km/day target.</p><div class="stats"><div class="stat"><b>6</b><span id="statHikes">hikes</span></div><div class="stat"><b>12 km</b><span id="statMax">max/day</span></div><div class="stat"><b>112</b><span id="statEmergency">emergency</span></div></div></div>
<div class="cards" id="cards"></div>
</section>
<section id="detail" class="view"></section>
<section id="extras" class="view"><div class="hero"><h1 id="extrasTitle">Bohinj extras.</h1><p id="extrasIntro">Food, beaches, ice cream, light and rainy-day fallbacks for the family.</p></div><div class="section" id="extrasContent"></div></section>
</main>
</div>
<nav class="tabbar"><button class="active" data-tab="home"><i class="fa-solid fa-mountain-sun"></i><span id="tabHikes">Hikes</span></button><button data-tab="extras"><i class="fa-solid fa-umbrella-beach"></i><span id="tabExtras">Extras</span></button><button data-action="install"><i class="fa-solid fa-mobile-screen"></i><span id="tabInstall">Install</span></button></nav>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
<script>
const APP_DATA = ${appData};
const state = { maps: {}, deferredInstall: null, lang: localStorage.getItem('bohinj-lang') || 'en', currentDetail: null, energy: localStorage.getItem('bohinj-energy') || 'normal', weather: null, recommendation: null, gps: null };
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const HIKE_PROFILE = {
  'savica-lakeshore': { exposure:1, shade:2, child:5, food:4, swim:5, staticScore:85, start:'09:00', duration:4.25, main:'Savica Waterfall viewpoint', short:true, stormAvoid:3 },
  'vogel-panorama': { exposure:5, shade:1, child:4, food:5, swim:4, staticScore:72, start:'08:30', duration:4, main:'Vogel panorama deck', needsClear:true, windSensitive:true, stormAvoid:5 },
  'mostnica-voje': { exposure:2, shade:5, child:4, food:4, swim:2, staticScore:80, start:'08:30', duration:5, main:'Mostnica gorge bridges / Voje meadow', long:true, stormAvoid:4 },
  'planina-blato-jezeru': { exposure:4, shade:3, child:3, food:4, swim:1, staticScore:66, start:'08:00', duration:5, main:'Planina pri Jezeru lake and hut', stableOnly:true, stormAvoid:5 },
  'planina-zajamniki': { exposure:4, shade:2, child:3, food:2, swim:1, staticScore:62, start:'08:00', duration:5, main:'Zajamniki shepherd huts viewpoint', stableOnly:true, visibility:true, stormAvoid:5 },
  'pericnik-waterfall': { exposure:2, shade:3, child:4, food:3, swim:0, staticScore:70, start:'09:00', duration:2.25, main:'Lower Peričnik waterfall', cloudyGood:true, stormAvoid:5 }
};
const I18N = {
  en: {
    brandTitle:'Bohinj Family Hikes', brandSub:'Ukanc base: Apartments Lake Bohinj', extras:'Extras',
    homeTitle:'Six verified family hikes from Bohinj.',
    homeIntro:'Mobile-first guide for two adults with children aged 5 and 7. Tracks use BRouter hiking over OpenStreetMap and stay within the 12 km/day target.',
    hikes:'hikes', maxDay:'max/day', emergency:'emergency', install:'Install',
    extrasTitle:'Bohinj extras.', extrasIntro:'Food, beaches, ice cream, light and rainy-day fallbacks for the family.',
    back:'Hikes', download:'Download GPX', google:'Google Maps', mapy:'Mapy.com', apple:'Apple Maps',
    labels:['Difficulty','Distance','Elevation','Estimated hiking time','Estimated family time','Best time of day','Parking GPS','Parking fee','Drive time from accommodation','Walking time if possible'],
    photoGallery:'Photos from places on this hike', familyNotes:'Family notes', services:'Services and treats', views:'Views and photos', routeSource:'Route source',
    familyLabels:['Family friendliness','What children usually enjoy','Dangerous sections','Weather tips','What to pack','Alternative shorter route','Emergency information'],
    serviceLabels:['Toilets','Drinking water','Mountain huts','Restaurants','Swimming opportunities','Ice cream stop afterwards'],
    viewLabels:['Best viewpoints','Best photo spots','Hidden gems'],
    routeNote:'The GPX track for this hike was generated from BRouter using the hiking profile over OpenStreetMap ways, then embedded here and cached for offline use. Map tiles remain online-only.',
    extraHeads:['Best restaurants around Bohinj','Best beaches','Best ice cream','Best light','Rainy day alternatives','Emergency numbers'],
    sunset:'Best sunset', sunrise:'Best sunrise',
    reviewNote:'Review buttons open live Google/TripAdvisor pages, so ratings stay current.',
    googleReviews:'Google reviews', tripadvisor:'TripAdvisor', googleNav:'Google Maps', appleNav:'Apple Maps',
    popups:{home:'Accommodation', park:'Parking', start:'Start', finish:'Finish'},
    installHelp:'On iPhone: Share -> Add to Home Screen. Service worker/PWA install requires serving this folder over http/https, not file://.'
  },
  cs: {
    brandTitle:'Rodinné túry Bohinj', brandSub:'Základna Ukanc: Apartments Lake Bohinj', extras:'Navíc',
    homeTitle:'Šest ověřených rodinných túr z Bohinje.',
    homeIntro:'Mobilní průvodce pro dva dospělé a děti 5 a 7 let. Trasy používají BRouter pro pěší nad OpenStreetMap a drží se limitu 12 km za den.',
    hikes:'túry', maxDay:'max/den', emergency:'tísňová linka', install:'Instalovat',
    extrasTitle:'Bohinj navíc.', extrasIntro:'Jídlo, pláže, zmrzlina, nejlepší světlo a náhradní plány do deště pro rodinu.',
    back:'Túry', download:'Stáhnout GPX', google:'Google Maps', mapy:'Mapy.com', apple:'Apple Maps',
    labels:['Obtížnost','Vzdálenost','Stoupání','Odhad času chůze','Odhad rodinného času','Nejlepší část dne','GPS parkování','Poplatek za parkování','Dojezd z ubytování','Pěší přístup, pokud dává smysl'],
    photoGallery:'Fotky z míst na této túře', familyNotes:'Poznámky pro rodinu', services:'Služby a odměny', views:'Vyhlídky a fotky', routeSource:'Zdroj trasy',
    familyLabels:['Vhodnost pro rodinu','Co děti obvykle baví','Nebezpečná místa','Tipy k počasí','Co sbalit','Kratší alternativa','Nouzové informace'],
    serviceLabels:['Toalety','Pitná voda','Horské chaty','Restaurace','Možnosti koupání','Zmrzlina po výletě'],
    viewLabels:['Nejlepší vyhlídky','Nejlepší místa na fotky','Skryté tipy'],
    routeNote:'GPX trasa pro tuto túru byla vygenerována přes BRouter s pěším profilem nad cestami OpenStreetMap, poté vložena do aplikace a uložena pro offline použití. Mapové dlaždice zůstávají pouze online.',
    extraHeads:['Nejlepší restaurace kolem Bohinje','Nejlepší pláže','Nejlepší zmrzlina','Nejlepší světlo','Alternativy do deště','Tísňová čísla'],
    sunset:'Nejlepší západ slunce', sunrise:'Nejlepší východ slunce',
    reviewNote:'Tlačítka recenzí otevírají živé stránky Google/TripAdvisor, takže hodnocení zůstávají aktuální.',
    googleReviews:'Recenze Google', tripadvisor:'TripAdvisor', googleNav:'Google Maps', appleNav:'Apple Maps',
    popups:{home:'Ubytování', park:'Parkování', start:'Start', finish:'Cíl'},
    installHelp:'Na iPhonu: Sdílet -> Přidat na plochu. Service worker/PWA instalace vyžaduje http/https, ne file://.'
  }
};

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); state.deferredInstall = e; });
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('service-worker.js').catch(()=>{});

function icon(cls, fa){ return L.divIcon({ className:'', html:\`<div class="marker-dot \${cls}"><i class="fa-solid \${fa}"></i></div>\`, iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-12] }); }
const icons = {home:icon('m-home','fa-house'),park:icon('m-park','fa-square-parking'),start:icon('m-start','fa-person-hiking'),finish:icon('m-finish','fa-flag-checkered'),hut:icon('m-hut','fa-campground'),food:icon('m-food','fa-utensils'),water:icon('m-water','fa-water'),view:icon('m-view','fa-binoculars'),swim:icon('m-swim','fa-person-swimming'),toilet:icon('m-toilet','fa-restroom'),photo:icon('m-photo','fa-camera')};

function t(){ return I18N[state.lang]; }
function lh(h){ return state.lang === 'cs' && h.cs ? { ...h, ...h.cs } : h; }
function lx(){ return state.lang === 'cs' ? APP_DATA.extrasCs : APP_DATA.extras; }
function elevationText(raw){ return state.lang === 'cs' ? 'cca ' + (raw.ascentMeters || '') + ' m nahoru' : raw.elevation; }
function setLang(lang){
 state.lang = lang;
 localStorage.setItem('bohinj-lang', lang);
 document.documentElement.lang = lang === 'cs' ? 'cs' : 'en';
 renderChrome();
 renderDashboard();
 renderHome();
 renderExtras();
 if(state.currentDetail) renderDetail(state.currentDetail, true);
}
function renderChrome(){
 const L=t();
 $('#brandTitle').textContent=L.brandTitle; $('#brandSub').textContent=L.brandSub; $('#extrasTop').textContent=L.extras;
 $('#homeTitle').textContent=L.homeTitle; $('#homeIntro').textContent=L.homeIntro;
 $('#statHikes').textContent=L.hikes; $('#statMax').textContent=L.maxDay; $('#statEmergency').textContent=L.emergency;
 $('#extrasTitle').textContent=L.extrasTitle; $('#extrasIntro').textContent=L.extrasIntro;
 $('#tabHikes').textContent=L.back; $('#tabExtras').textContent=L.extras; $('#tabInstall').textContent=L.install;
 $$('[data-lang]').forEach(b=>b.classList.toggle('active', b.dataset.lang===state.lang));
}
function show(tab){ $$('.view').forEach(v=>v.classList.remove('active')); $('#' + tab).classList.add('active'); $$('.tabbar button').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab)); window.scrollTo({top:0,behavior:'smooth'}); }
function card(raw){ const h=lh(raw); return \`<article class="card hike-card" data-id="\${raw.id}"><img src="\${raw.image}" alt="\${h.title}"><div class="card-body"><h2>\${h.title}</h2><p class="weather">\${h.summary}</p><div class="meta"><span class="chip"><i class="fa-solid fa-gauge-high"></i>\${h.difficulty}</span><span class="chip"><i class="fa-solid fa-route"></i>\${h.distance}</span><span class="chip"><i class="fa-solid fa-arrow-trend-up"></i>\${elevationText(raw)}</span><span class="chip"><i class="fa-regular fa-clock"></i>\${h.familyTime}</span></div><p class="weather"><i class="fa-solid fa-cloud-sun"></i> \${h.weather}</p></div></article>\`; }

function renderHome(){ $('#cards').innerHTML = APP_DATA.hikes.map(card).join(''); $$('.hike-card').forEach(c=>c.addEventListener('click',()=>renderDetail(c.dataset.id))); }
function info(label, value){ return \`<div class="info"><span>\${label}</span><b>\${value}</b></div>\`; }
function list(items){ return \`<div class="list">\${items.map(x=>\`<div>\${x}</div>\`).join('')}</div>\`; }
function galleryHtml(raw){ const items = raw.gallery || []; if(!items.length) return ''; return \`<div class="panel"><h3>\${t().photoGallery}</h3><div class="gallery">\${items.map((item,index)=>\`<figure><img src="\${item.src}" alt="\${item.title || raw.title}"><figcaption>\${item.title || ('Photo ' + (index + 1))}</figcaption></figure>\`).join('')}</div></div>\`; }
function mapsUrl(kind,h){ const p=\`\${h.parking.lat},\${h.parking.lon}\`; if(kind==='google') return \`https://www.google.com/maps/dir/?api=1&destination=\${p}&travelmode=driving\`; if(kind==='apple') return \`https://maps.apple.com/?daddr=\${p}&dirflg=d\`; return \`https://mapy.com/turisticka?x=\${h.parking.lon}&y=\${h.parking.lat}&z=15\`; }
function placeQuery(place){ const name = Array.isArray(place) ? place[0] : place.name; return encodeURIComponent(name + ' Bohinj Slovenia'); }
function placeCard(place){ const L=t(); const name=Array.isArray(place)?place[0]:place.name; const desc=Array.isArray(place)?place[1]:place.description; const q=placeQuery(place); return \`<article class="place-card"><h4>\${name}</h4><p>\${desc}</p><div class="place-actions"><a class="primary" target="_blank" href="https://www.google.com/maps/search/?api=1&query=\${q}"><i class="fa-brands fa-google"></i> \${L.googleReviews}</a><a target="_blank" href="https://www.tripadvisor.com/Search?q=\${q}"><i class="fa-solid fa-star"></i> \${L.tripadvisor}</a><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=\${q}&travelmode=driving"><i class="fa-solid fa-diamond-turn-right"></i> \${L.googleNav}</a><a target="_blank" href="https://maps.apple.com/?daddr=\${q}&dirflg=d"><i class="fa-brands fa-apple"></i> \${L.appleNav}</a></div></article>\`; }
function placeList(items){ return \`<div class="place-list">\${items.map(placeCard).join('')}</div>\`; }

function fmtTime(date){ return date.toLocaleTimeString(state.lang === 'cs' ? 'cs-CZ' : 'en-GB', {hour:'2-digit', minute:'2-digit'}); }
function addHours(base, hours){ return new Date(base.getTime() + hours * 3600000); }
function weatherIcon(code, thunder){ if(thunder) return 'fa-cloud-bolt'; if(code === null || code === undefined) return 'fa-cloud-sun'; if([0,1].includes(code)) return 'fa-sun'; if([2,3].includes(code)) return 'fa-cloud-sun'; if(code >= 51 && code <= 67) return 'fa-cloud-rain'; if(code >= 80 && code <= 82) return 'fa-cloud-showers-heavy'; if(code >= 95) return 'fa-cloud-bolt'; return 'fa-cloud'; }
function weatherText(w){ if(!w || !w.live) return state.lang === 'cs' ? 'Živé počasí není dostupné' : 'Live weather unavailable'; if(w.thunder) return state.lang === 'cs' ? 'Možné bouřky' : 'Thunderstorms possible'; if(w.rain >= 55) return state.lang === 'cs' ? 'Vysoká šance deště' : 'High chance of rain'; if(w.rain >= 30) return state.lang === 'cs' ? 'Možný déšť' : 'Rain possible'; if(w.code <= 1) return state.lang === 'cs' ? 'Jasno' : 'Clear'; if(w.code <= 3) return state.lang === 'cs' ? 'Polojasno' : 'Partly cloudy'; return state.lang === 'cs' ? 'Proměnlivo' : 'Mixed weather'; }
function dashboardStrings(){
 return state.lang === 'cs' ? {
  title:'Dnešní plán', liveFallback:'Živé počasí není dostupné — doporučení vychází z obtížnosti trasy a vhodnosti pro rodinu.', temp:'Teplota', rain:'Déšť', wind:'Vítr', sunset:'Západ', thunder:'Bouřky', recommend:'Doporučená túra', reason:'Proč dnes', depart:'Odjezd', return:'Návrat', swim:'Koupání po túře', energy:'Rodinná energie', great:'Skvělá', normal:'Normální', tired:'Unavení', start:'Začít dnešní plán', nav:'Navigovat na parkování', details:'Otevřít detail túry', pack:'Co sbalit', timeline:'Dnešní harmonogram', emergency:'Nouzové info', call:'Volat 112', close:'Zavřít', gps:'Aktuální GPS', gpsAsk:'Získat GPS polohu', gpsUnknown:'GPS zatím není k dispozici', accommodation:'Ubytování', nearestParking:'Parkování dnešní túry', danger:'Pokud jste v nebezpečí, volejte 112 a sdílejte svou GPS polohu.', swimYes:'Ano, vezměte plavky a ručníky.', swimMaybe:'Možná, podle počasí a energie dětí.', swimNo:'Dnes raději bez koupání.', statusGood:'Dobré', statusOk:'Opatrně', statusBad:'Nevhodné'
 } : {
  title:'Vacation Dashboard', liveFallback:'Live weather unavailable — recommendations are based on route difficulty and family suitability.', temp:'Temperature', rain:'Rain', wind:'Wind', sunset:'Sunset', thunder:'Storms', recommend:'Recommended hike', reason:'Why today', depart:'Depart', return:'Return', swim:'Swim after hike', energy:'Family energy', great:'Great', normal:'Normal', tired:'Tired', start:'Start today’s plan', nav:'Navigate to parking', details:'Open hike details', pack:'What to pack', timeline:'Today’s timeline', emergency:'Emergency', call:'Call 112', close:'Close', gps:'Current GPS', gpsAsk:'Get GPS location', gpsUnknown:'GPS not available yet', accommodation:'Accommodation', nearestParking:'Today’s nearest parking', danger:'If in danger, call 112 and share your GPS location.', swimYes:'Yes, pack swimwear and towels.', swimMaybe:'Maybe, depending on weather and kids’ energy.', swimNo:'Skip swimming today.', statusGood:'Good', statusOk:'Caution', statusBad:'Avoid'
 };
}
function staticWeather(){ return { live:false, temp:null, rain:null, wind:null, thunder:false, sunset:null, code:null }; }
async function loadWeather(){
 try{
  const url='https://api.open-meteo.com/v1/forecast?latitude=46.278&longitude=13.835&current=temperature_2m,weather_code,wind_speed_10m&daily=precipitation_probability_max,sunset,weather_code&timezone=Europe%2FPrague&forecast_days=1';
  const r=await fetch(url);
  if(!r.ok) throw new Error('weather '+r.status);
  const d=await r.json();
  state.weather={ live:true, temp:Math.round(d.current.temperature_2m), rain:d.daily.precipitation_probability_max[0] || 0, wind:Math.round(d.current.wind_speed_10m || 0), thunder:(d.daily.weather_code[0] || d.current.weather_code || 0) >= 95, sunset:d.daily.sunset[0], code:d.current.weather_code };
 } catch(e){ state.weather=staticWeather(); }
 state.recommendation=recommendHike();
 renderDashboard();
}
function recommendHike(){
 const w=state.weather || staticWeather();
 let best=null;
 for(const raw of APP_DATA.hikes){
  const p=HIKE_PROFILE[raw.id];
  let score=p.staticScore + p.child*5 + p.food*2 - (raw.distanceMeters || 0)/1000;
  const reasons=[];
  if(state.energy==='tired'){ score += p.short ? 24 : -18; score -= p.long ? 18 : 0; }
  if(state.energy==='great'){ score += p.long || p.stableOnly ? 8 : 0; }
  if(w.live){
   score -= (w.rain || 0) * (p.stormAvoid || 3) / 12;
   score -= w.thunder ? (p.stormAvoid || 3) * 12 : 0;
   score -= Math.max(0,(w.wind || 0)-18) * (p.exposure || 2) / 3;
   if((w.temp || 0) >= 25){ score += p.shade*6; if(raw.id==='mostnica-voje') reasons.push(state.lang==='cs'?'stín soutěsky a voda pomůžou v horku':'shade and water make it strong in hot weather'); }
   if((w.temp || 20) < 16) score -= p.exposure*3;
   if(p.needsClear && ((w.rain||0)>25 || (w.wind||0)>22 || w.thunder)) score -= 45;
   if(p.stableOnly && ((w.rain||0)>25 || w.thunder || (w.wind||0)>24)) score -= 45;
   if(p.cloudyGood && (w.rain||0) < 35 && !w.thunder) score += 8;
  }
  if(raw.id==='savica-lakeshore') reasons.push(state.lang==='cs'?'snadná a pružná volba pro rodinu':'easy, flexible family option');
  if(raw.id==='vogel-panorama') reasons.push(state.lang==='cs'?'nejlepší jen za dobré viditelnosti a slabého větru':'best only with clear visibility and low wind');
  if(raw.id==='pericnik-waterfall') reasons.push(state.lang==='cs'?'dobré i za oblačna, ale ne při bouřkách':'good in cloudy weather, but avoid storms');
  if(!best || score>best.score) best={ raw, score, reasons };
 }
 const status = !w.live ? 'yellow' : (w.thunder || (w.rain||0)>65 ? 'red' : ((w.rain||0)>30 || (w.wind||0)>25 ? 'yellow' : 'green'));
 const reason = best.reasons[0] || (state.lang==='cs'?'dnes má nejlepší kombinaci počasí, obtížnosti a rodinné vhodnosti':'best balance of weather, difficulty and family suitability today');
 return { hike: best.raw, status, reason };
}
function buildPacking(hike){
 const w=state.weather || staticWeather();
 const items= state.lang==='cs' ? ['Voda','Svačina','Turistické boty','Opalovací krém','Malá lékárnička'] : ['Water','Snacks','Hiking shoes','Sunscreen','Small first aid kit'];
 if((w.rain||0)>30) items.push(...(state.lang==='cs'?['Pláštěnky','Obal na batoh']:['Rain jackets','Backpack cover']));
 if(w.live && w.temp<16) items.push(state.lang==='cs'?'Teplé vrstvy':'Warm layers');
 if(['vogel-panorama','planina-blato-jezeru','planina-zajamniki'].includes(hike.id)) items.push(...(state.lang==='cs'?['Větrovka','Extra svačina','Více vody']:['Wind jacket','Extra snacks','More water']));
 if(swimRecommendation(hike).yes) items.push(...(state.lang==='cs'?['Plavky','Ručníky']:['Swimwear','Towels']));
 return [...new Set(items)];
}
function swimRecommendation(hike){
 const w=state.weather || staticWeather();
 if(['savica-lakeshore','vogel-panorama','mostnica-voje','planina-blato-jezeru','planina-zajamniki'].includes(hike.id) && (!w.live || ((w.temp||22)>=20 && (w.rain||0)<45 && !w.thunder))) return { yes:true, text:dashboardStrings().swimYes };
 if(hike.id==='pericnik-waterfall') return { yes:false, text:dashboardStrings().swimNo };
 return { yes:false, text:dashboardStrings().swimMaybe };
}
function timelineFor(hike){
 const p=HIKE_PROFILE[hike.id]; const base=new Date(); const parts=p.start.split(':'); base.setHours(Number(parts[0]),Number(parts[1]),0,0);
 const driveMins = hike.id==='pericnik-waterfall' ? 85 : hike.id==='planina-zajamniki' ? 55 : hike.id==='planina-blato-jezeru' ? 45 : hike.id==='mostnica-voje' ? 20 : hike.id==='vogel-panorama' ? 10 : 10;
 return [
  [fmtTime(base), state.lang==='cs'?'Odjezd z ubytování':'Leave accommodation'],
  [fmtTime(addHours(base, driveMins/60)), state.lang==='cs'?'Start túry':'Start hike'],
  [fmtTime(addHours(base, driveMins/60 + p.duration*.38)), p.main],
  [fmtTime(addHours(base, driveMins/60 + p.duration*.58)), state.lang==='cs'?'Oběd / chata / svačina':'Lunch / hut / snack stop'],
  [fmtTime(addHours(base, driveMins/60 + p.duration)), state.lang==='cs'?'Návrat k autu':'Return to car'],
  [fmtTime(addHours(base, driveMins/60 + p.duration + 1)), swimRecommendation(hike).yes ? (state.lang==='cs'?'Koupání / zmrzlina':'Swim / ice cream') : (state.lang==='cs'?'Zmrzlina / odpočinek':'Ice cream / rest')]
 ];
}
function renderDashboard(){
 const root=$('#dashboard'); if(!root) return;
 if(!state.recommendation) state.recommendation=recommendHike();
 const L=dashboardStrings(); const rec=state.recommendation; const h=lh(rec.hike); const w=state.weather || staticWeather(); const swim=swimRecommendation(rec.hike); const p=HIKE_PROFILE[rec.hike.id];
 const departParts=p.start.split(':'); const depart=new Date(); depart.setHours(Number(departParts[0]),Number(departParts[1]),0,0); const ret=addHours(depart,p.duration + (rec.hike.id==='pericnik-waterfall'?1.5: rec.hike.id==='planina-zajamniki'?1: .5));
 const statusText=rec.status==='green'?L.statusGood:(rec.status==='red'?L.statusBad:L.statusOk);
 root.innerHTML='<div class="dash-card"><div class="dash-top"><div><div class="dash-kicker">'+L.title+'</div><div class="dash-date">'+new Date().toLocaleDateString(state.lang==='cs'?'cs-CZ':'en-US',{weekday:'long',month:'long',day:'numeric'})+'</div></div><span class="status-pill status-'+rec.status+'">'+statusText+'</span></div><div class="dash-weather"><i class="fa-solid '+weatherIcon(w.code,w.thunder)+'"></i><div><div class="dash-temp">'+(w.live?w.temp+'°C':'--')+'</div><div class="dash-summary">'+weatherText(w)+'</div></div></div>'+(!w.live?'<p class="weather">'+L.liveFallback+'</p>':'')+'<div class="dash-metrics"><div class="dash-metric"><span>'+L.rain+'</span><b>'+(w.live?w.rain+'%':'--')+'</b></div><div class="dash-metric"><span>'+L.wind+'</span><b>'+(w.live?w.wind+' km/h':'--')+'</b></div><div class="dash-metric"><span>'+L.sunset+'</span><b>'+(w.live?fmtTime(new Date(w.sunset)):'--')+'</b></div></div><div class="dash-kicker" style="margin-top:16px">'+L.energy+'</div><div class="energy"><button data-energy="great">'+L.great+'</button><button data-energy="normal">'+L.normal+'</button><button data-energy="tired">'+L.tired+'</button></div></div><div class="dash-card recommend"><div class="dash-kicker">'+L.recommend+'</div><h2>'+h.title+'</h2><p><b>'+L.reason+':</b> '+rec.reason+'</p><div class="dash-metrics"><div class="dash-metric"><span>'+L.depart+'</span><b>'+fmtTime(depart)+'</b></div><div class="dash-metric"><span>'+L.return+'</span><b>'+fmtTime(ret)+'</b></div><div class="dash-metric"><span>'+L.swim+'</span><b>'+(swim.yes?'Yes':'Maybe')+'</b></div></div><p>'+swim.text+'</p><div class="dash-actions"><button class="btn" data-start-plan><i class="fa-solid fa-play"></i>'+L.start+'</button><a class="btn secondary" target="_blank" href="'+mapsUrl('google',rec.hike)+'"><i class="fa-solid fa-diamond-turn-right"></i>'+L.nav+'</a><button class="btn secondary" data-open-rec><i class="fa-solid fa-circle-info"></i>'+L.details+'</button><button class="btn danger" data-emergency><i class="fa-solid fa-triangle-exclamation"></i>'+L.emergency+'</button></div></div><div class="two"><div class="dash-card"><h3>'+L.pack+'</h3><div class="checklist">'+buildPacking(rec.hike).map(function(item){return '<label><input type="checkbox"> '+item+'</label>';}).join('')+'</div></div><div class="dash-card"><h3>'+L.timeline+'</h3><div class="timeline">'+timelineFor(rec.hike).map(function(row){return '<div class="timeline-row"><div class="timeline-time">'+row[0]+'</div><div class="timeline-text">'+row[1]+'</div></div>';}).join('')+'</div></div></div>';
 $$('.energy button',root).forEach(function(b){ b.classList.toggle('active', b.dataset.energy===state.energy); });
}
function openEmergencyModal(){
 const L=dashboardStrings(); const rec=state.recommendation || recommendHike(); const loc=state.gps ? (state.gps.latitude.toFixed(5)+', '+state.gps.longitude.toFixed(5)) : L.gpsUnknown;
 let modal=$('#emergencyModal'); if(!modal){ document.body.insertAdjacentHTML('beforeend','<div class="modal-backdrop" id="emergencyModal"><div class="modal"><h2>'+L.emergency+'</h2><div class="emergency-number">112</div><div id="emergencyBody"></div><div class="modal-actions"><a class="btn danger" href="tel:112">'+L.call+'</a><button class="btn secondary" data-close-emergency>'+L.close+'</button></div></div></div>'); modal=$('#emergencyModal'); }
 $('#emergencyBody').innerHTML='<p><b>'+L.accommodation+':</b><br>'+APP_DATA.accommodation.name+', '+APP_DATA.accommodation.address+'</p><p><b>'+L.gps+':</b><br>'+loc+'</p><p><b>'+L.nearestParking+':</b><br>'+rec.hike.parking.name+'<br>'+rec.hike.parking.lat.toFixed(5)+', '+rec.hike.parking.lon.toFixed(5)+'</p><p>'+L.danger+'</p><button class="btn secondary" data-get-gps><i class="fa-solid fa-location-crosshairs"></i>'+L.gpsAsk+'</button>';
 modal.classList.add('active');
}

function renderDetail(id, keepScroll=false){
 state.currentDetail = id;
 const raw = APP_DATA.hikes.find(x=>x.id===id);
 const h = lh(raw);
 const L = t();
 $('#detail').innerHTML = \`<button class="back" id="backBtn"><i class="fa-solid fa-chevron-left"></i> \${L.back}</button><div class="detail-hero"><img src="\${raw.image}" alt="\${h.title}"><div class="detail-hero-content"><h1>\${h.title}</h1><p>\${h.summary}</p><div class="meta"><span class="chip">\${h.difficulty}</span><span class="chip">\${h.distance}</span><span class="chip">\${elevationText(raw)}</span></div><div class="credit">\${h.imageCredit || ''}</div></div></div>
 <div class="section"><div class="panel"><div id="map-\${h.id}" class="map"></div></div>
 <div class="panel actions"><a class="btn" download href="\${raw.gpx}"><i class="fa-solid fa-download"></i>\${L.download}</a><a class="btn secondary" target="_blank" href="\${mapsUrl('google',raw)}"><i class="fa-brands fa-google"></i>\${L.google}</a><a class="btn secondary" target="_blank" href="\${mapsUrl('mapy',raw)}"><i class="fa-solid fa-map"></i>\${L.mapy}</a><a class="btn secondary" target="_blank" href="\${mapsUrl('apple',raw)}"><i class="fa-brands fa-apple"></i>\${L.apple}</a></div>
 \${galleryHtml(raw)}
 <div class="panel grid">\${info(L.labels[0],h.difficulty)}\${info(L.labels[1],h.distance)}\${info(L.labels[2],elevationText(raw))}\${info(L.labels[3],h.hikingTime)}\${info(L.labels[4],h.familyTime)}\${info(L.labels[5],h.bestTime)}\${info(L.labels[6],\`\${raw.parking.name}: \${raw.parking.lat.toFixed(5)}, \${raw.parking.lon.toFixed(5)}\`)}\${info(L.labels[7],h.parkingFee || raw.parking.fee)}\${info(L.labels[8],h.drive)}\${info(L.labels[9],h.walk)}</div>
 <div class="two"><div class="panel"><h3>\${L.familyNotes}</h3>\${info(L.familyLabels[0],h.family)}\${info(L.familyLabels[1],h.kids)}\${info(L.familyLabels[2],h.danger)}\${info(L.familyLabels[3],h.weather)}\${info(L.familyLabels[4],h.pack)}\${info(L.familyLabels[5],h.shorter)}\${info(L.familyLabels[6],h.emergency)}</div>
 <div class="panel"><h3>\${L.services}</h3>\${info(L.serviceLabels[0],h.toilets)}\${info(L.serviceLabels[1],h.water)}\${info(L.serviceLabels[2],h.huts)}\${info(L.serviceLabels[3],h.restaurants)}\${info(L.serviceLabels[4],h.swimming)}\${info(L.serviceLabels[5],h.iceCream)}</div></div>
 <div class="two"><div class="panel"><h3>\${L.views}</h3>\${info(L.viewLabels[0],list(h.viewpoints))}\${info(L.viewLabels[1],list(h.photo))}\${info(L.viewLabels[2],h.hidden)}</div><div class="panel"><h3>\${L.routeSource}</h3><p class="weather">\${L.routeNote}</p></div></div></div>\`;
 $('#backBtn').addEventListener('click',()=>show('home'));
 show('detail');
 delete state.maps[raw.id];
 setTimeout(()=>initMap(raw), 80);
 if(keepScroll) window.scrollTo({top:0,behavior:'auto'});
}

async function initMap(h){
 const el = $('#map-' + h.id); if(!el || state.maps[h.id]) return;
 const LBL = t().popups;
 const map = L.map(el, { scrollWheelZoom:false });
 state.maps[h.id]=map;
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
 const bounds = [];
 function mark(p, label, ic){ L.marker([p.lat,p.lon],{icon:ic}).addTo(map).bindPopup(label); bounds.push([p.lat,p.lon]); }
 mark(APP_DATA.accommodation, '<b>'+LBL.home+'</b><br>'+APP_DATA.accommodation.address, icons.home);
 mark(h.parking, '<b>'+LBL.park+'</b><br>'+h.parking.name, icons.park);
 mark(h.start, '<b>'+LBL.start+'</b><br>'+h.start.name, icons.start);
 mark(h.finish, '<b>'+LBL.finish+'</b><br>'+h.finish.name, icons.finish);
 const groups = [['huts',icons.hut],['restaurants',icons.food],['waterfalls',icons.water],['viewpoints',icons.view],['swimming',icons.swim],['toilets',icons.toilet],['photos',icons.photo]];
 groups.forEach(([key,ic]) => (h.pois[key]||[]).forEach(p=>mark(p, '<b>'+p.name+'</b>', ic)));
 const pts = h.track && h.track.length ? h.track : h.route.map(p=>[p[1],p[0]]);
 pts.forEach(p=>bounds.push(p));
 L.polyline(pts,{color:'#0b7a75',weight:5,opacity:.92,lineCap:'round'}).addTo(map);
 map.fitBounds(bounds,{padding:[24,24]});
 setTimeout(()=>map.invalidateSize(),200);
}

function renderExtras(){
 const e = lx();
 const L = t();
 const rainyPlaces = e.rainy.map(item => Array.isArray(item) ? item : [item, item]);
 $('#extrasContent').innerHTML = \`<div class="panel"><p class="weather"><i class="fa-solid fa-star-half-stroke"></i> \${L.reviewNote}</p></div><div class="two"><div class="panel"><h3>\${L.extraHeads[0]}</h3>\${placeList(e.restaurants)}</div><div class="panel"><h3>\${L.extraHeads[1]}</h3>\${placeList(e.beaches)}</div><div class="panel"><h3>\${L.extraHeads[2]}</h3>\${placeList(e.icecream)}</div><div class="panel"><h3>\${L.extraHeads[3]}</h3>\${info(L.sunset,e.sunset)}\${info(L.sunrise,e.sunrise)}</div><div class="panel"><h3>\${L.extraHeads[4]}</h3>\${placeList(rainyPlaces)}</div><div class="panel"><h3>\${L.extraHeads[5]}</h3>\${list(e.emergency)}</div></div>\`;
}

document.addEventListener('click', async e => {
 const tab = e.target.closest('[data-tab]')?.dataset.tab; if(tab) { e.preventDefault(); show(tab); }
 const lang = e.target.closest('[data-lang]')?.dataset.lang; if(lang) setLang(lang);
 const energy = e.target.closest('[data-energy]')?.dataset.energy; if(energy) { state.energy=energy; localStorage.setItem('bohinj-energy', energy); state.recommendation=recommendHike(); renderDashboard(); }
 if(e.target.closest('[data-open-rec]') || e.target.closest('[data-start-plan]')) { const rec=state.recommendation || recommendHike(); renderDetail(rec.hike.id); }
 if(e.target.closest('[data-emergency]')) openEmergencyModal();
 if(e.target.closest('[data-close-emergency]')) $('#emergencyModal')?.classList.remove('active');
 if(e.target.closest('[data-get-gps]')) {
   if(navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => { state.gps={latitude:pos.coords.latitude, longitude:pos.coords.longitude}; openEmergencyModal(); }, () => openEmergencyModal(), {enableHighAccuracy:true, timeout:8000});
 }
 if(e.target.closest('[data-action="install"]')) { if(state.deferredInstall){ state.deferredInstall.prompt(); } else { alert(t().installHelp); } }
});
renderChrome(); state.recommendation=recommendHike(); renderDashboard(); renderHome(); renderExtras(); loadWeather();
</script>
</body></html>`;
}

function makeServiceWorker() {
  const galleryAssets = hikes.flatMap(h => (h.gallery || []).map(item => item.asset));
  const assets = ['index.html','manifest.json',...hikes.map(h=>h.gpx),...hikes.map(h=>h.image),...galleryAssets,'icons/icon-192.svg','icons/icon-512.svg'];
  return `const CACHE='bohinj-family-hikes-v6-extra-place-links';
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
    await downloadGallery(hike);
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), makeHtml());
  fs.writeFileSync(path.join(outDir, 'manifest.json'), makeManifest());
  fs.writeFileSync(path.join(outDir, 'service-worker.js'), makeServiceWorker());
  fs.writeFileSync(path.join(outDir, 'README.md'), makeReadme());
  console.log('Generated Bohinj family hiking app');
  hikes.forEach(h => console.log(`${h.title}: ${h.distance}, ${h.elevation}, ${h.gpx}, ${h.image}`));
})();
