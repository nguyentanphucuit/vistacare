export const site = {
  name: "Vista Care",
  tagline: "Comfort That Heals",
  company: "Vistaar International CG Co. Ltd",
  email: "support@vistacare.com.vn",
  website: "vistacare.com.vn",
  websiteUrl: "https://vistacare.com.vn",
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
  { key: "products", href: "/products" },
  { key: "howToOrder", href: "/how-to-order" },
  { key: "measurement", href: "/measurement" },
] as const;
