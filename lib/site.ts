export const site = {
  name: "Vista Care",
  tagline: "Comfort That Heals",
  company: "Vistaar International CG Co. Ltd",
  email: "support@vistacare.com.vn",
  website: "vistacare.com.vn",
  websiteUrl: "https://vistacare.com.vn",
  phones: {
    zalo: "+91 9702404473",
    whatsapp: "+91 9702274489",
    phone: "+84 938 981 039",
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
  { key: "products", href: "/products" },
  { key: "howToOrder", href: "/how-to-choose" },
  { key: "measurement", href: "/measurement" },
] as const;
