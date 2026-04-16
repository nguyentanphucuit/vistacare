export const site = {
  name: "Vista Care",
  tagline: "Comfort That Heals",
  company: "Vistaar International CG Co. Ltd",
  email: "support@vistacareindia.com",
  website: "www.vistacareindia.com",
  websiteUrl: "https://www.vistacareindia.com",
  phones: {
    zalo: "+919702604473",
    whatsapp: "+919702274689",
  },
  offices: [
    { city: "Mumbai", country: "India" },
    { city: "New Delhi", country: "India" },
    { city: "Ho Chi Minh City", country: "Vietnam" },
  ],
  socials: {
    facebook: "#",
    instagram: "#",
    x: "#",
  },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "whyVistaCare", href: "/why-vista-care" },
  { key: "products", href: "/products" },
] as const;
