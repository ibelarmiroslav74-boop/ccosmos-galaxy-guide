export interface Planet {
  slug: string;
  name: { ru: string; en: string };
  type: { ru: string; en: string };
  color: string;         // base hex (used by 3D shader tint)
  accent: string;        // atmosphere/ring hex
  hasRings?: boolean;
  order: number;
  facts: {
    distance: { ru: string; en: string };
    radius: string;
    mass: string;
    day: { ru: string; en: string };
    year: { ru: string; en: string };
    moons: number;
    temp: { ru: string; en: string };
    gravity: string;
  };
  intro: { ru: string; en: string };
  long: { ru: string; en: string };
}

export const planets: Planet[] = [
  {
    slug: "mercury",
    name: { ru: "Меркурий", en: "Mercury" },
    type: { ru: "Планета земной группы", en: "Terrestrial planet" },
    color: "#a6866b",
    accent: "#3a2e26",
    order: 1,
    facts: {
      distance: { ru: "57.9 млн км", en: "57.9M km" },
      radius: "2 439.7 км",
      mass: "3.30 × 10²³ кг",
      day: { ru: "58.6 земных суток", en: "58.6 Earth days" },
      year: { ru: "88 земных суток", en: "88 Earth days" },
      moons: 0,
      temp: { ru: "от −173 до +427 °C", en: "−173 to +427 °C" },
      gravity: "3.7 m/s²",
    },
    intro: {
      ru: "Ближайшая к Солнцу планета и самая маленькая в Солнечной системе.",
      en: "Closest planet to the Sun and the smallest in the Solar System.",
    },
    long: {
      ru: "Меркурий лишён атмосферы, поэтому переносит колоссальные перепады температур. Поверхность покрыта кратерами, напоминая Луну. Радарные наблюдения обнаружили водяной лёд в постоянно затенённых полярных кратерах.",
      en: "Mercury lacks a real atmosphere and swings between colossal temperature extremes. Its cratered surface looks Moon-like. Radar observations revealed water ice in permanently shadowed polar craters.",
    },
  },
  {
    slug: "venus",
    name: { ru: "Венера", en: "Venus" },
    type: { ru: "Планета земной группы", en: "Terrestrial planet" },
    color: "#e6c07a",
    accent: "#a0611a",
    order: 2,
    facts: {
      distance: { ru: "108.2 млн км", en: "108.2M km" },
      radius: "6 051.8 км",
      mass: "4.87 × 10²⁴ кг",
      day: { ru: "243 земных суток", en: "243 Earth days" },
      year: { ru: "225 земных суток", en: "225 Earth days" },
      moons: 0,
      temp: { ru: "+464 °C", en: "+464 °C" },
      gravity: "8.87 m/s²",
    },
    intro: {
      ru: "Самая горячая планета Солнечной системы — из-за плотной CO₂-атмосферы.",
      en: "The hottest planet in the Solar System — thanks to its dense CO₂ atmosphere.",
    },
    long: {
      ru: "Атмосферное давление на поверхности Венеры в 92 раза выше земного. Облака из серной кислоты полностью скрывают поверхность в видимом свете. Венера вращается в обратную сторону — Солнце там встаёт на западе.",
      en: "Surface pressure on Venus is 92 times Earth's. Sulfuric acid clouds completely hide the surface in visible light. Venus rotates backwards — the Sun rises in the west.",
    },
  },
  {
    slug: "earth",
    name: { ru: "Земля", en: "Earth" },
    type: { ru: "Планета земной группы", en: "Terrestrial planet" },
    color: "#3b82f6",
    accent: "#10b981",
    order: 3,
    facts: {
      distance: { ru: "149.6 млн км (1 а. е.)", en: "149.6M km (1 AU)" },
      radius: "6 371 км",
      mass: "5.97 × 10²⁴ кг",
      day: { ru: "24 часа", en: "24 hours" },
      year: { ru: "365.25 суток", en: "365.25 days" },
      moons: 1,
      temp: { ru: "+15 °C", en: "+15 °C" },
      gravity: "9.81 m/s²",
    },
    intro: {
      ru: "Единственная известная планета с жизнью. Наш дом.",
      en: "The only known planet with life. Our home.",
    },
    long: {
      ru: "71% поверхности Земли покрыто водой. Магнитное поле защищает биосферу от солнечного ветра. Луна стабилизирует наклон оси, обеспечивая мягкий климат.",
      en: "71% of Earth's surface is covered with water. The magnetic field shields the biosphere from solar wind. The Moon stabilises the axial tilt, keeping the climate mild.",
    },
  },
  {
    slug: "mars",
    name: { ru: "Марс", en: "Mars" },
    type: { ru: "Планета земной группы", en: "Terrestrial planet" },
    color: "#c1440e",
    accent: "#7a2e0b",
    order: 4,
    facts: {
      distance: { ru: "227.9 млн км", en: "227.9M km" },
      radius: "3 389.5 км",
      mass: "6.42 × 10²³ кг",
      day: { ru: "24 ч 37 мин", en: "24h 37m" },
      year: { ru: "687 суток", en: "687 days" },
      moons: 2,
      temp: { ru: "−63 °C", en: "−63 °C" },
      gravity: "3.71 m/s²",
    },
    intro: {
      ru: "Красная планета — главный кандидат на будущую колонизацию.",
      en: "The Red Planet — top candidate for future colonisation.",
    },
    long: {
      ru: "На Марсе находится Олимп — крупнейший вулкан Солнечной системы (22 км высоты). Долина Маринер — каньон длиной 4000 км. Роверы NASA нашли следы древних рек и озёр.",
      en: "Mars hosts Olympus Mons — the Solar System's largest volcano (22 km tall). Valles Marineris is a 4000 km canyon. NASA rovers have found traces of ancient rivers and lakes.",
    },
  },
  {
    slug: "jupiter",
    name: { ru: "Юпитер", en: "Jupiter" },
    type: { ru: "Газовый гигант", en: "Gas giant" },
    color: "#d8a878",
    accent: "#a8663a",
    order: 5,
    facts: {
      distance: { ru: "778.5 млн км", en: "778.5M km" },
      radius: "69 911 км",
      mass: "1.90 × 10²⁷ кг",
      day: { ru: "9 ч 56 мин", en: "9h 56m" },
      year: { ru: "11.86 лет", en: "11.86 years" },
      moons: 95,
      temp: { ru: "−108 °C (облака)", en: "−108 °C (cloud tops)" },
      gravity: "24.79 m/s²",
    },
    intro: {
      ru: "Крупнейшая планета — в 2.5 раза массивнее всех остальных вместе взятых.",
      en: "The largest planet — 2.5× more massive than all others combined.",
    },
    long: {
      ru: "Большое Красное Пятно — шторм, бушующий минимум 350 лет. У Юпитера есть тонкие кольца и как минимум 95 спутников, четыре крупнейших открыл Галилей в 1610 году.",
      en: "The Great Red Spot is a storm raging for at least 350 years. Jupiter has faint rings and at least 95 moons — the four largest were discovered by Galileo in 1610.",
    },
  },
  {
    slug: "saturn",
    name: { ru: "Сатурн", en: "Saturn" },
    type: { ru: "Газовый гигант", en: "Gas giant" },
    color: "#e0c98b",
    accent: "#a88650",
    hasRings: true,
    order: 6,
    facts: {
      distance: { ru: "1.43 млрд км", en: "1.43B km" },
      radius: "58 232 км",
      mass: "5.68 × 10²⁶ кг",
      day: { ru: "10 ч 42 мин", en: "10h 42m" },
      year: { ru: "29.46 лет", en: "29.46 years" },
      moons: 146,
      temp: { ru: "−138 °C", en: "−138 °C" },
      gravity: "10.44 m/s²",
    },
    intro: {
      ru: "Легендарные кольца видны даже в любительский телескоп.",
      en: "Its iconic rings are visible even in an amateur telescope.",
    },
    long: {
      ru: "Кольца Сатурна состоят преимущественно из водяного льда. Средняя плотность Сатурна меньше воды — он бы плавал. Титан — единственный спутник с плотной атмосферой и жидкими метановыми озёрами.",
      en: "Saturn's rings are mostly water ice. Its average density is less than water — it would float. Titan is the only moon with a dense atmosphere and liquid methane lakes.",
    },
  },
  {
    slug: "uranus",
    name: { ru: "Уран", en: "Uranus" },
    type: { ru: "Ледяной гигант", en: "Ice giant" },
    color: "#7fd0d3",
    accent: "#3a8a8d",
    hasRings: true,
    order: 7,
    facts: {
      distance: { ru: "2.87 млрд км", en: "2.87B km" },
      radius: "25 362 км",
      mass: "8.68 × 10²⁵ кг",
      day: { ru: "17 ч 14 мин", en: "17h 14m" },
      year: { ru: "84 года", en: "84 years" },
      moons: 27,
      temp: { ru: "−197 °C", en: "−197 °C" },
      gravity: "8.87 m/s²",
    },
    intro: {
      ru: "Планета «на боку» — ось вращения наклонена на 98°.",
      en: "The tilted planet — its axis is tipped 98°.",
    },
    long: {
      ru: "Уран катится вокруг Солнца буквально на боку. Атмосфера богата метаном, который придаёт бирюзовый оттенок. Открыт Уильямом Гершелем в 1781 году — первая планета, найденная в телескоп.",
      en: "Uranus rolls around the Sun on its side. Its methane-rich atmosphere gives the turquoise tint. Discovered by William Herschel in 1781 — the first telescope-found planet.",
    },
  },
  {
    slug: "neptune",
    name: { ru: "Нептун", en: "Neptune" },
    type: { ru: "Ледяной гигант", en: "Ice giant" },
    color: "#4166f5",
    accent: "#1c2f8f",
    order: 8,
    facts: {
      distance: { ru: "4.50 млрд км", en: "4.50B km" },
      radius: "24 622 км",
      mass: "1.02 × 10²⁶ кг",
      day: { ru: "16 ч 6 мин", en: "16h 6m" },
      year: { ru: "165 лет", en: "165 years" },
      moons: 14,
      temp: { ru: "−201 °C", en: "−201 °C" },
      gravity: "11.15 m/s²",
    },
    intro: {
      ru: "Ветра до 2100 км/ч — самые быстрые в Солнечной системе.",
      en: "Winds up to 2100 km/h — fastest in the Solar System.",
    },
    long: {
      ru: "Нептун — первая планета, открытая математически: её положение вычислил Урбен Леверье до наблюдений. Крупнейший спутник Тритон вращается в обратную сторону, что указывает на его захват из пояса Койпера.",
      en: "Neptune was the first planet discovered mathematically — Urbain Le Verrier predicted its position before observation. Its largest moon Triton orbits retrograde, hinting at capture from the Kuiper Belt.",
    },
  },
];

export const planetBySlug = (slug: string) => planets.find((p) => p.slug === slug);
