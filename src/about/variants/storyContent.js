export const eras = [
  {
    date: '1950s–1960s',
    title: 'Room to build',
    photo: 'beginnings',
    alt: 'George Hasslein standing on a suspension bridge among trees in 1961.',
    caption: 'George Hasslein on the canyon’s suspension bridge, 1961.',
    text: 'As Cal Poly’s architecture program grew, students needed space for experiments too large for campus workshops. George Hasslein helped establish the canyon as an outdoor laboratory. In the 1960s, students built houses and bridges here, along with the water and electricity needed to support further work.',
  },
  {
    date: '1970s–1980s',
    title: 'A place to live, too',
    photo: 'village',
    alt: 'Students gathering beside a yellow bus and a Design Village sign.',
    caption: 'Students arriving for an early Design Village competition.',
    text: 'Student caretakers began living in the canyon’s houses in the early 1970s, maintaining the grounds in exchange for housing. Projects passed between generations of builders. Design Village brought another kind of construction: temporary shelters designed, built, and lived in by student teams during Cal Poly’s Open House.',
  },
  {
    date: '1990s–2000s',
    title: 'Building and rebuilding',
    photo: 'gathering',
    alt: 'A group of visitors sitting inside the open framework of the Geodesic Dome.',
    caption: 'Visitors gathered inside the Geodesic Dome.',
    text: 'New structures continued to appear as older experiments needed repair. Caretakers maintained the site, and Design Village returned each spring. Restoration became a learning opportunity of its own: students rebuilt the Blade in 2003 and the Stick Structure in 2009, testing what earlier generations had left behind.',
  },
  {
    date: '2010s–today',
    title: 'Still changing',
    photo: 'today',
    alt: 'Students relaxing in colorful hammocks suspended inside the Poly Pavilion.',
    caption:
      'Hammocks fill the Poly Pavilion, one of the canyon’s gathering places.',
    text: 'The resident caretaker program ended around 2011, changing how the site was maintained. Weathering and vandalism damaged buildings, while later students repaired structures and added new ones. Today, visitors walk and bike through the canyon, Design Village continues, and projects such as the 2024 Moment Monument extend its teaching role.',
  },
];
export const introduction = [
  'Poly Canyon is home to a nine-acre outdoor construction laboratory in the hills behind Cal Poly in San Luis Obispo. Since the 1960s, architecture and engineering students have used it to take projects from drawings to full-size buildings—working with concrete, timber, steel, and even earth.',
  'Today, it’s often called the Architecture Graveyard. The resident caretaker program ended around 2011, and many structures show years of weathering and vandalism. People still come to walk, explore, and gather here, and the annual Design Village competition brings students together to build temporary shelters and spend a weekend living in them.',
  'The permanent structures range from homes once occupied by student caretakers to open-air meeting places and engineering demonstrations. These three show some of the different ways students have used the canyon.',
];
export const transition =
  'The canyon grew over decades as students added projects, lived on site, and repaired earlier work. These four periods trace how it became the place you can visit today.';
export const discoveries = [
  {
    number: 24,
    slug: 'shellHouse',
    name: 'Shell House',
    text: 'Its thin concrete roof was an experiment in shell construction. The building later became a home for student caretakers.',
  },
  {
    number: 6,
    slug: 'tensile',
    name: 'Tensile',
    text: 'Fabric held by tensioned cables creates shade for visitors and a gathering place for Design Village.',
  },
  {
    number: 31,
    slug: 'momentMonument',
    name: 'Moment Monument',
    text: 'Built in 2024, this steel frame leaves its connections exposed so students can study how buildings resist sideways forces.',
  },
];
export const structureLinks = {
  Blade: 'blade',
  'Stick Structure': 'stickStructure',
  'Moment Monument': 'momentMonument',
  'Geodesic Dome': 'geodesicDome',
  'Poly Pavilion': 'polyPavilion',
  'suspension bridge': 'suspensionBridge',
};
export function linkedParts(text) {
  return text.split(
    /(Blade|Stick Structure|Moment Monument|Geodesic Dome|Poly Pavilion|suspension bridge)/g
  );
}
