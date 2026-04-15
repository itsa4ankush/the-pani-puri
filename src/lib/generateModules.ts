import type { ModuleRecommendation, ParsedRequirements } from "@/types/wizard";

export function generateModules(parsed: ParsedRequirements): ModuleRecommendation[] {
  const city = parsed.location || "Rotterdam";
  const isKids = parsed.ageGroup?.toLowerCase().includes("kid") || parsed.ageGroup?.toLowerCase().includes("child");
  const budget = parsed.budget ?? { min: 750, max: 1500 };
  const perModule = Math.round((budget.min + budget.max) / 2 / 5);

  return [
    {
      id: "venue",
      category: "Venue",
      icon: "📍",
      description: "Where your event will take place",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "v1", name: `${city} Central Hall`, description: `Modern event space in ${city} Centre with flexible layouts, AV equipment, and on-site parking.`,
          location: `${city} Centre`, price: Math.round(perModule * 1.2), rating: 4.8, tags: ["Indoor", "Central", "Parking"],
        },
        {
          id: "v2", name: `Het Park Paviljoen`, description: `Charming pavilion in a scenic park setting. Perfect for both indoor and outdoor events.`,
          location: `${city} South`, price: Math.round(perModule * 0.9), rating: 4.6, tags: ["Indoor/Outdoor", "Scenic", "Accessible"],
        },
        {
          id: "v3", name: `Studio ${city}`, description: `Creative loft space with exposed brick and natural light. Ideal for intimate gatherings.`,
          location: `${city} East`, price: Math.round(perModule * 0.75), rating: 4.7, tags: ["Indoor", "Creative", "Intimate"],
        },
      ],
    },
    {
      id: "food",
      category: "Food & Catering",
      icon: "🍽️",
      description: "Menus and catering packages for your guests",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "f1", name: "Bites & Delights Catering", description: `Full-service catering with ${isKids ? "kid-friendly menus" : "gourmet buffet options"}. Includes setup and cleanup.`,
          location: city, price: Math.round(perModule * 1.1), rating: 4.9, tags: parsed.foodDrink.length ? parsed.foodDrink.slice(0, 3) : ["Buffet", "Flexible Menu"],
        },
        {
          id: "f2", name: "Green Table Co.", description: "Sustainable, locally-sourced catering. Specializes in vegetarian and dietary-friendly menus.",
          location: city, price: Math.round(perModule * 0.95), rating: 4.7, tags: ["Vegetarian", "Sustainable", "Organic"],
        },
        {
          id: "f3", name: `${city} Street Eats`, description: "Food truck-style catering with interactive food stations. Great for casual, fun events.",
          location: city, price: Math.round(perModule * 0.7), rating: 4.5, tags: ["Casual", "Interactive", "Street Food"],
        },
      ],
    },
    {
      id: "drinks",
      category: "Drinks & Bar",
      icon: "🍹",
      description: "Beverage packages and bar service",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "d1", name: "The Mobile Bar Co.", description: "Full mobile bar with professional bartenders. Cocktails, wine, beer, and non-alcoholic options.",
          location: city, price: Math.round(perModule * 0.8), rating: 4.8, tags: ["Full Bar", "Cocktails", "Professional"],
        },
        {
          id: "d2", name: "Bubble & Pour", description: isKids ? "Juice bar with mocktails, smoothies, and fun kid-friendly drinks." : "Prosecco and wine bar with curated selections from local vineyards.",
          location: city, price: Math.round(perModule * 0.6), rating: 4.6, tags: isKids ? ["Kid-Friendly", "Mocktails"] : ["Wine", "Prosecco", "Curated"],
        },
        {
          id: "d3", name: "Craft & Tap", description: "Craft beer and artisan drinks station. Local breweries and unique flavors.",
          location: city, price: Math.round(perModule * 0.5), rating: 4.5, tags: ["Craft Beer", "Local", "Casual"],
        },
      ],
    },
    {
      id: "entertainment",
      category: "Entertainment",
      icon: "🎭",
      description: "Activities, music, and fun for your guests",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "e1", name: "Fun Factory NL",
          description: parsed.entertainment.length > 0
            ? `Specializes in ${parsed.entertainment.join(", ")}. Professional setup with all equipment included.`
            : isKids ? "Kids entertainment package with games, face painting, and balloon art." : "DJ + interactive games package with professional sound system.",
          location: city, price: Math.round(perModule * 0.9), rating: 4.8,
          tags: parsed.entertainment.length > 0 ? parsed.entertainment.slice(0, 3) : isKids ? ["Kids Games", "Face Painting"] : ["DJ", "Games"],
        },
        {
          id: "e2", name: "Live & Loud Events", description: "Live music acts, bands, and acoustic performers for any vibe.",
          location: city, price: Math.round(perModule * 1.1), rating: 4.7, tags: ["Live Music", "Band", "Acoustic"],
        },
        {
          id: "e3", name: "Party Pro NL", description: "Photo booth, karaoke, and interactive party games. All-in-one entertainment package.",
          location: city, price: Math.round(perModule * 0.65), rating: 4.6, tags: ["Photo Booth", "Karaoke", "Interactive"],
        },
      ],
    },
    {
      id: "decor",
      category: "Decor & Styling",
      icon: "🎨",
      description: "Theme decoration, flowers, and styling",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "dc1", name: "Styled by Sophia", description: `Full event styling with ${parsed.theme ? `a ${parsed.theme} theme` : "custom themes"}. Includes setup and teardown.`,
          location: city, price: Math.round(perModule * 0.8), rating: 4.9, tags: [parsed.theme || "Custom Theme", "Full Setup"],
        },
        {
          id: "dc2", name: "Bloom & Gather", description: "Floral arrangements and natural decor. Sustainable, seasonal flowers.",
          location: city, price: Math.round(perModule * 0.6), rating: 4.7, tags: ["Floral", "Natural", "Sustainable"],
        },
        {
          id: "dc3", name: "Minimal & Modern Decor", description: "Clean, modern styling with geometric accents and subtle lighting.",
          location: city, price: Math.round(perModule * 0.5), rating: 4.5, tags: ["Minimalist", "Modern", "Lighting"],
        },
      ],
    },
    {
      id: "photography",
      category: "Photography & Video",
      icon: "📸",
      description: "Capture every moment of your event",
      status: "pending",
      selectedOptionId: null,
      options: [
        {
          id: "p1", name: "Capture Studios", description: "Professional photographer + videographer combo. 4-hour coverage, edited highlights within 48hrs.",
          location: city, price: Math.round(perModule * 0.9), rating: 4.9, tags: ["Photo + Video", "Fast Delivery"],
        },
        {
          id: "p2", name: "SnapHappy Events", description: "Event photographer with candid style. Includes online gallery and high-res downloads.",
          location: city, price: Math.round(perModule * 0.6), rating: 4.7, tags: ["Candid", "Online Gallery"],
        },
        {
          id: "p3", name: "Reel Moments", description: "Short-form video specialist. Instagram-ready event reels and stories.",
          location: city, price: Math.round(perModule * 0.5), rating: 4.5, tags: ["Video Only", "Social Media", "Reels"],
        },
      ],
    },
  ];
}
