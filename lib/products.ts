export type ProductCategory = {
  id: string;
  label: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  compressionClass: "I" | "II" | "I & II";
  description: string;
  image: string;
};

export const categories: ProductCategory[] = [
  { id: "below-knee", label: "Below Knee Stockings" },
  { id: "thigh-high", label: "Thigh High Stockings" },
  { id: "full-leg", label: "Full Leg & Waist-High" },
  { id: "arm-sleeves", label: "Arm Sleeves & Gauntlets" },
  { id: "body-garments", label: "Body Garments" },
  { id: "accessories", label: "Accessories" },
];

export const products: Product[] = [
  {
    slug: "below-knee-class-i-open-toe",
    name: "Below Knee — Class I, Open Toe",
    category: "below-knee",
    compressionClass: "I",
    description:
      "Graduated 15–20 mmHg compression for daily wear, travel, and mild venous symptoms.",
    image: "/placeholder.svg",
  },
  {
    slug: "below-knee-class-i-closed-toe",
    name: "Below Knee — Class I, Closed Toe",
    category: "below-knee",
    compressionClass: "I",
    description:
      "Closed-toe Class I stocking with reinforced heel for everyday prevention.",
    image: "/placeholder.svg",
  },
  {
    slug: "below-knee-class-ii-open-toe",
    name: "Below Knee — Class II, Open Toe",
    category: "below-knee",
    compressionClass: "II",
    description:
      "20–30 mmHg medical compression prescribed for varicose veins and oedema.",
    image: "/placeholder.svg",
  },
  {
    slug: "below-knee-class-ii-closed-toe",
    name: "Below Knee — Class II, Closed Toe",
    category: "below-knee",
    compressionClass: "II",
    description:
      "Therapeutic closed-toe stocking for post-surgical recovery and DVT prevention.",
    image: "/placeholder.svg",
  },
  {
    slug: "athletic-below-knee",
    name: "Athletic Below Knee Sleeve",
    category: "below-knee",
    compressionClass: "I",
    description:
      "Breathable performance sleeve for runners, travellers, and long-shift professionals.",
    image: "/placeholder.svg",
  },

  {
    slug: "thigh-high-class-i-open-toe",
    name: "Thigh High — Class I, Open Toe",
    category: "thigh-high",
    compressionClass: "I",
    description:
      "Silicone-band thigh high with light graduated compression for preventive use.",
    image: "/placeholder.svg",
  },
  {
    slug: "thigh-high-class-i-closed-toe",
    name: "Thigh High — Class I, Closed Toe",
    category: "thigh-high",
    compressionClass: "I",
    description:
      "Closed-toe thigh high with anti-slip band for all-day comfort.",
    image: "/placeholder.svg",
  },
  {
    slug: "thigh-high-class-ii-open-toe",
    name: "Thigh High — Class II, Open Toe",
    category: "thigh-high",
    compressionClass: "II",
    description:
      "Medical-grade thigh high for advanced venous insufficiency and lymphoedema.",
    image: "/placeholder.svg",
  },
  {
    slug: "thigh-high-class-ii-closed-toe",
    name: "Thigh High — Class II, Closed Toe",
    category: "thigh-high",
    compressionClass: "II",
    description:
      "Therapeutic closed-toe for recovery programs and chronic venous disease.",
    image: "/placeholder.svg",
  },
  {
    slug: "anti-embolism-thigh-high",
    name: "Anti-Embolism Thigh High",
    category: "thigh-high",
    compressionClass: "I",
    description:
      "Inspection-window design, 18 mmHg, for hospitalised and bedridden patients.",
    image: "/placeholder.svg",
  },

  {
    slug: "maternity-pantyhose-class-i",
    name: "Maternity Pantyhose — Class I",
    category: "full-leg",
    compressionClass: "I",
    description:
      "Expandable abdominal panel to support pregnancy-related swelling and fatigue.",
    image: "/placeholder.svg",
  },
  {
    slug: "waist-high-class-ii",
    name: "Waist High — Class II",
    category: "full-leg",
    compressionClass: "II",
    description:
      "Full-leg 20–30 mmHg stocking for bilateral venous disorders.",
    image: "/placeholder.svg",
  },
  {
    slug: "custom-full-leg",
    name: "Custom Full Leg Stocking",
    category: "full-leg",
    compressionClass: "I & II",
    description:
      "Made-to-measure full-leg garment for complex lymphoedema and vascular cases.",
    image: "/placeholder.svg",
  },

  {
    slug: "arm-sleeve-class-i",
    name: "Arm Sleeve — Class I",
    category: "arm-sleeves",
    compressionClass: "I",
    description:
      "Light compression arm sleeve for lymphoedema maintenance and upper-limb recovery.",
    image: "/placeholder.svg",
  },
  {
    slug: "arm-sleeve-class-ii",
    name: "Arm Sleeve — Class II",
    category: "arm-sleeves",
    compressionClass: "II",
    description:
      "Firm medical-grade sleeve for post-mastectomy and advanced lymphoedema care.",
    image: "/placeholder.svg",
  },
  {
    slug: "compression-gauntlet",
    name: "Compression Gauntlet",
    category: "arm-sleeves",
    compressionClass: "I & II",
    description:
      "Hand & wrist gauntlet to pair with an arm sleeve for full upper-limb compression.",
    image: "/placeholder.svg",
  },

  {
    slug: "post-burn-keloid-vest",
    name: "Post-Burn Keloid Vest",
    category: "body-garments",
    compressionClass: "II",
    description:
      "Custom-fit vest to manage post-burn scarring and keloid formation.",
    image: "/placeholder.svg",
  },
  {
    slug: "abdominal-binder",
    name: "Post-Surgical Abdominal Binder",
    category: "body-garments",
    compressionClass: "I",
    description:
      "Adjustable binder to support the abdomen after surgery or liposuction.",
    image: "/placeholder.svg",
  },
  {
    slug: "lymphoedema-bra",
    name: "Lymphoedema Compression Bra",
    category: "body-garments",
    compressionClass: "I",
    description:
      "Clinically designed bra for post-mastectomy and truncal lymphoedema management.",
    image: "/placeholder.svg",
  },

  {
    slug: "donning-glove",
    name: "Donning Glove",
    category: "accessories",
    compressionClass: "I",
    description:
      "Grip-enhanced glove that makes putting on compression stockings easier.",
    image: "/placeholder.svg",
  },
];
