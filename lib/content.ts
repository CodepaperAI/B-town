import {
  BadgeCheck,
  Camera,
  Drum,
  Flame,
  Headphones,
  Lightbulb,
  Mic2,
  Sparkles,
  TentTree,
  Video
} from "lucide-react";

export const brand = {
  name: "B-Town Entertainment",
  city: "Brampton",
  region: "Greater Toronto Area",
  phoneLabel: "+1 (647) 915-5327",
  phoneHref: "+16479155327",
  whatsappHref:
    "https://wa.me/16479155327?text=Hi%20B-Town%20Entertainment%2C%20I%27d%20like%20a%20quote%20for%20my%20event.",
  email: "hello@btownent.ca",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "/packages" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const images = {
  hero: "/images/hero-reception.webp",
  dj: "/images/dj-booth.webp",
  djAlt: "/images/dance-floor.webp",
  decor: "/images/luxury-decor.webp",
  decorAlt: "/images/luxury-decor.webp",
  dhol: "/images/dhol-entry.webp",
  dholAlt: "/images/maiyan-color.webp",
  reception: "/images/hero-reception.webp",
  sparklers: "/images/clouds-sparklers.webp",
  weddingStage: "/images/wedding-stage.webp",
  corporate: "/images/corporate-av.webp",
  media: "/images/media-camera.webp",
  birthday: "/images/birthday.webp",
  backyard: "/images/private-party.webp"
};

export const serviceHighlights = [
  "Punjabi, Bollywood, Hip-Hop, Top 40, Afrobeat, Soca, and multicultural mixing",
  "One team for DJ, sound, lighting, décor, photo, video, dhol, and special effects",
  "Modern setups, clean cable management, reliable equipment, and event-day coordination",
  "Custom packages for weddings, receptions, Rokas, Maiyans, birthdays, and corporate events"
];

export const services = [
  {
    title: "Professional DJ Services",
    slug: "dj-services",
    icon: Headphones,
    image: images.dj,
    summary:
      "High-energy DJs for weddings, receptions, engagements, birthdays, corporate events, and private parties.",
    points: ["Wedding and reception DJ", "Plug & play DJ setup", "Punjabi, Bollywood, Hip-Hop mixing", "Timeline-aware music cues"]
  },
  {
    title: "MC & Event Hosting",
    slug: "mc-hosting",
    icon: Mic2,
    image: images.reception,
    summary:
      "Professional hosting that keeps introductions, speeches, games, performances, and dance floor moments moving.",
    points: ["Reception flow support", "Family-friendly crowd engagement", "Grand entrances", "Performance coordination"]
  },
  {
    title: "Sound & Lighting",
    slug: "sound-lighting",
    icon: Lightbulb,
    image: images.djAlt,
    summary:
      "Clean audio, wireless microphones, dance floor lighting, laser lights, uplighting, and PA support.",
    points: ["PA mixer and audio setup", "Wireless microphones", "Uplighting and lasers", "Dance floor lighting"]
  },
  {
    title: "Luxury Décor & Stage",
    slug: "decor-stage",
    icon: Sparkles,
    image: images.decor,
    summary:
      "Stage setups, backdrops, florals, entrances, table décor, and event styling with a premium finish.",
    points: ["Wedding and reception décor", "Roka and engagement décor", "Floral arrangements", "Entrance styling"]
  },
  {
    title: "Photo & Cinematic Video",
    slug: "photo-video",
    icon: Camera,
    image: images.media,
    summary:
      "Photography, cinematic videography, highlight films, drone coverage, reels, and social media clips.",
    points: ["Wedding highlight films", "Event reels", "Drone options", "Photo and video bundles"]
  },
  {
    title: "Live Dhol Performances",
    slug: "dhol-services",
    icon: Drum,
    image: images.dhol,
    summary:
      "Live dhol for baraat, wedding entrances, reception entrances, cultural moments, and dance floor energy.",
    points: ["Baraat entries", "Wedding entrances", "Reception hype moments", "Traditional attire options"]
  },
  {
    title: "Special Effects",
    slug: "special-effects",
    icon: Flame,
    image: images.sparklers,
    summary:
      "Cold sparklers, dry ice dancing-on-clouds, smoke machine effects, and premium first dance visuals.",
    points: ["Cold sparklers", "Dry ice clouds", "Smoke effects", "First dance moments"]
  },
  {
    title: "Corporate & Backyard Events",
    slug: "corporate-backyard",
    icon: TentTree,
    image: images.corporate,
    summary:
      "Professional entertainment and production for corporate events, community events, backyard parties, and private celebrations.",
    points: ["Corporate DJ", "Community events", "Backyard parties", "Private celebrations"]
  }
];

export const packages = [
  {
    name: "Essential DJ",
    eyebrow: "Clean, compact, ready",
    starting: "Custom quote",
    description: "A polished DJ setup for birthdays, private parties, backyard events, and smaller receptions.",
    features: ["Professional DJ", "Compact sound system", "Basic dance lighting", "Planning call", "WhatsApp support"],
    ideal: "Birthdays, backyard events, private parties"
  },
  {
    name: "Wedding Experience",
    eyebrow: "Most requested",
    starting: "Custom quote",
    description: "The core wedding package for ceremonies, receptions, engagements, Rokas, Maiyans, and Jaggo nights.",
    features: ["Wedding DJ", "MC coordination option", "Sound and microphones", "Dance floor lighting", "Entrance music cues"],
    ideal: "Weddings, receptions, Rokas, Maiyans"
  },
  {
    name: "Luxury Production",
    eyebrow: "High-impact room reveal",
    starting: "Custom quote",
    description: "Adds visual production, décor coordination, special effects, and a more premium room presence.",
    features: ["DJ and sound", "Uplighting", "Cold sparklers", "Dry ice clouds", "Stage or backdrop styling"],
    ideal: "Receptions, engagement parties, luxury birthdays"
  },
  {
    name: "Full-Service Wedding",
    eyebrow: "One-stop event team",
    starting: "Custom quote",
    description: "Entertainment, décor, media, dhol, and effects under one brand for a smoother planning experience.",
    features: ["DJ, MC, and dhol", "Décor and stage setup", "Photo and cinematic video", "Special effects", "Planning timeline support"],
    ideal: "Multi-event weddings and premium receptions"
  }
];

export const galleryItems = [
  { title: "Reception Dance Floor", category: "Wedding", image: images.hero },
  { title: "Luxury Outdoor Décor", category: "Décor", image: images.decor },
  { title: "Live Dhol Entry", category: "Dhol", image: images.dhol },
  { title: "Wedding Stage Moment", category: "Reception", image: images.weddingStage },
  { title: "DJ Lighting Setup", category: "DJ", image: images.dj },
  { title: "Corporate Production", category: "Corporate", image: images.corporate },
  { title: "Birthday Celebration", category: "Birthday", image: images.birthday },
  { title: "Backyard Party Energy", category: "Backyard", image: images.backyard },
  { title: "Cold Sparkler Entrance", category: "Special Effects", image: images.sparklers },
  { title: "Roka Décor Inspiration", category: "Roka", image: images.decorAlt },
  { title: "Maiyan Celebration Color", category: "Maiyan", image: images.dholAlt },
  { title: "Media Coverage", category: "Media", image: images.media }
];

export const eventTypes = [
  "Weddings",
  "Receptions",
  "Engagements / Rokas",
  "Maiyan & Jaggo",
  "Birthdays",
  "Anniversaries",
  "Baby Showers",
  "Graduations",
  "Corporate Events",
  "Community Events",
  "Backyard Events",
  "Private Celebrations"
];

export const testimonials = [
  {
    quote:
      "The dance floor never slowed down. B-Town understood both families, mixed Punjabi and Bollywood perfectly, and kept the reception flowing.",
    name: "Simran & Arjun",
    event: "Wedding Reception"
  },
  {
    quote:
      "We wanted one team for DJ, lighting, dhol, and décor. Everything felt coordinated, professional, and stress-free from setup to last song.",
    name: "Kiran S.",
    event: "Roka + Reception"
  },
  {
    quote:
      "The cold sparkler entrance and dancing-on-clouds moment looked incredible in our video. Guests are still asking who we booked.",
    name: "Nav & Priya",
    event: "Luxury Wedding"
  }
];

export const faqs = [
  {
    question: "How do we book B-Town Entertainment?",
    answer:
      "Submit the quote form with your event date, venue or city, guest count, and services. A coordinator will confirm availability and recommend the right package."
  },
  {
    question: "Do you handle Punjabi, Bollywood, and multicultural weddings?",
    answer:
      "Yes. The site is designed around South Asian and multicultural GTA events, including Punjabi, Bollywood, Hip-Hop, Top 40, fusion, and family-requested music."
  },
  {
    question: "Can we book DJ only?",
    answer:
      "Yes. You can book DJ-only, plug & play, or add sound, lighting, MC, dhol, décor, photo/video, and special effects as needed."
  },
  {
    question: "Do you offer dry ice and cold sparklers?",
    answer:
      "Yes. Special effects can be added to wedding entrances, first dances, reception highlights, and premium package builds where venue rules allow."
  },
  {
    question: "Do you serve outside Brampton?",
    answer:
      "Yes. B-Town Entertainment serves Brampton and the GTA, including Mississauga, Toronto, Vaughan, Etobicoke, Caledon, Milton, and surrounding areas."
  },
  {
    question: "Can packages be customized?",
    answer:
      "Yes. Every event has different venue rules, guest counts, timelines, and cultural moments, so packages are built around your event plan."
  }
];

export const stats = [
  { value: "12+", label: "event types covered" },
  { value: "GTA", label: "Brampton-based service" },
  { value: "1", label: "team for music, décor, media" },
  { value: "100%", label: "custom package planning" }
];

export const venues = [
  "Brampton",
  "Mississauga",
  "Toronto",
  "Vaughan",
  "Etobicoke",
  "Caledon",
  "Milton",
  "Oakville"
];

export const blogPosts = [
  {
    title: "How to Build a Reception Timeline That Keeps the Dance Floor Full",
    tag: "Wedding planning",
    excerpt:
      "A practical flow for entrances, speeches, dinner, games, first dance, open dance, and late-night music."
  },
  {
    title: "Cold Sparklers vs. Dancing on Clouds: Which Effect Fits Your Moment?",
    tag: "Special effects",
    excerpt:
      "How to choose visual effects for entrances, cake cuts, first dances, and room reveals."
  },
  {
    title: "Punjabi + Bollywood Wedding Music: What to Prepare Before Your DJ Call",
    tag: "Music planning",
    excerpt:
      "Must-play lists, family favorites, entrance tracks, do-not-play notes, and fusion crowd strategy."
  }
];

export const trustBadges = [
  { icon: BadgeCheck, label: "Professional equipment" },
  { icon: BadgeCheck, label: "Custom packages" },
  { icon: BadgeCheck, label: "GTA event experience" },
  { icon: BadgeCheck, label: "One-stop planning" }
];
