export interface LookbookSpread {
  id: string;
  image: string;
  title: string;
  caption: string;
  season: string;
}

export const LOOKBOOK_SPREADS: LookbookSpread[] = [
  {
    id: "01",
    image: "photo-1509631179647-0177331693ae",
    title: "Urban Ease",
    caption: "Tailored silhouettes for the city rhythm — SS26",
    season: "SS26",
  },
  {
    id: "02",
    image: "photo-1483985988355-763728e1935b",
    title: "Soft Power",
    caption: "Neutral tones, commanding presence",
    season: "SS26",
  },
  {
    id: "03",
    image: "photo-1490481651871-ab68de25d43d",
    title: "Light Studies",
    caption: "Spring light on structured forms",
    season: "SS26",
  },
  {
    id: "04",
    image: "photo-1515886657613-9f3515b0c78f",
    title: "After Hours",
    caption: "Evening dressing, redefined",
    season: "SS26",
  },
  {
    id: "05",
    image: "photo-1558618666-fcd25c85f82e",
    title: "Still Life",
    caption: "Objects of daily ritual",
    season: "SS26",
  },
  {
    id: "06",
    image: "photo-1445205170230-053b83016050",
    title: "The Edit",
    caption: "Curated moments from the season",
    season: "SS26",
  },
  {
    id: "07",
    image: "photo-1469334031218-e382a71b716b",
    title: "Mercer Morning",
    caption: "Early light on SoHo streets",
    season: "SS26",
  },
  {
    id: "08",
    image: "photo-1539533018447-63fcce2678e3",
    title: "Structured Ease",
    caption: "Cashmere and wool in conversation",
    season: "SS26",
  },
  {
    id: "09",
    image: "photo-1591047139820-d91fecd50f1b",
    title: "Layered Light",
    caption: "Transitions between seasons",
    season: "SS26",
  },
];

export const LOOKBOOK_PAGE = {
  eyebrow: "Editorial",
  title: "Lookbook",
  lead: "Spring / Summer 2026 — a visual narrative of lightness, form, and intention.",
  intro:
    "Shot across three days in New York, the SS26 lookbook captures the FINY wardrobe in motion. Tailored silhouettes on city streets, neutral palettes in golden hour, and the quiet confidence of dressing with purpose.",
  credits: {
    photographer: "Amara Okonkwo",
    stylist: "Luca Ferretti",
    creativeDirection: "FINY Creative Team",
    location: "New York City",
  },
};
