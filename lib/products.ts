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
  { id: "below-knee", label: "Below Knee" },
  { id: "knee-high", label: "Knee High" },
  { id: "thigh-high", label: "Thigh High" },
  { id: "full-leg", label: "Full Leg" },
  { id: "pantyhose", label: "Pantyhose" },
  { id: "armsleeve", label: "Armsleeve" },
  { id: "vest", label: "Vest" },
  { id: "body-suit", label: "Body Suit" },
  { id: "chin-support", label: "Chin Support" },
];

export const products: Product[] = [
  {
    slug: "below-knee",
    name: "Below Knee",
    category: "below-knee",
    compressionClass: "I & II",
    description:
      "Graduated compression below the knee for daily wear, travel, and varicose vein management.",
    image: "/images/products/below-knee.png",
  },
  {
    slug: "knee-high",
    name: "Knee High",
    category: "knee-high",
    compressionClass: "I & II",
    description:
      "Classic knee-high compression stocking for everyday therapeutic wear.",
    image: "/images/products/knee-high.webp",
  },
  {
    slug: "knee-high-2",
    name: "Knee High 2",
    category: "knee-high",
    compressionClass: "II",
    description:
      "Alternative knee-high design with reinforced heel for enhanced durability.",
    image: "/images/products/knee-high-2.webp",
  },
  {
    slug: "thigh-high",
    name: "Thigh High",
    category: "thigh-high",
    compressionClass: "I & II",
    description:
      "Silicone-band thigh high (also known as Above Knee) for advanced venous insufficiency and post-surgical recovery.",
    image: "/images/products/thigh-high.webp",
  },
  {
    slug: "thigh-high-2",
    name: "Thigh High 2",
    category: "thigh-high",
    compressionClass: "II",
    description:
      "Alternative thigh-high design with plain top and extended length.",
    image: "/images/products/thigh-high-2.webp",
  },
  {
    slug: "full-leg",
    name: "Full Leg",
    category: "full-leg",
    compressionClass: "I & II",
    description:
      "Full-leg compression stocking for bilateral venous disorders and complex lymphoedema.",
    image: "/images/products/full-leg.webp",
  },
  {
    slug: "full-leg-2",
    name: "Full Leg 2",
    category: "full-leg",
    compressionClass: "II",
    description:
      "Alternative full-leg design with reinforced compression zones.",
    image: "/images/products/full-leg-2.webp",
  },
  {
    slug: "full-body-pantyhose",
    name: "Full Body Pantyhose",
    category: "pantyhose",
    compressionClass: "I & II",
    description:
      "Full-body pantyhose compression suit for maternity, bilateral venous support, and comprehensive lower-body coverage.",
    image: "/images/products/full-pantyhose.webp",
  },
  {
    slug: "armsleeve",
    name: "Armsleeve",
    category: "armsleeve",
    compressionClass: "I & II",
    description:
      "Medical-grade armsleeve for upper-limb lymphoedema and post-mastectomy care.",
    image: "/images/products/arm-sleeve.png",
  },
  {
    slug: "full-body-suit",
    name: "Full Body Suit",
    category: "body-suit",
    compressionClass: "II",
    description:
      "Full-body compression suit for post-surgical recovery and burn scar management.",
    image: "/images/products/full-body-suit.webp",
  },
  {
    slug: "male-vest",
    name: "Male Vest",
    category: "vest",
    compressionClass: "I",
    description:
      "Upper-body compression vest tailored for men — chest, shoulder, and abdomen support.",
    image: "/images/products/male-vest.jpeg",
  },
  {
    slug: "women-vest",
    name: "Women Vest",
    category: "vest",
    compressionClass: "I",
    description:
      "Upper-body compression vest tailored for women with contoured fit.",
    image: "/images/products/female-vest.jpeg",
  },
  {
    slug: "sculpt-spine-support-body-suit",
    name: "Sculpt & Spine Support Body Suit",
    category: "body-suit",
    compressionClass: "II",
    description:
      "Custom-fit body suit with spine support for post-operative rehabilitation.",
    image: "/images/products/sculpt-spine-body-suit.webp",
  },
  {
    slug: "sculpt-support-body-suit",
    name: "Sculpt Support Body Suit",
    category: "body-suit",
    compressionClass: "II",
    description:
      "Body suit focused on abdominal and back support after liposuction or surgery.",
    image: "/images/products/sculpt-support-body-suit.webp",
  },
  {
    slug: "chin-support",
    name: "Chin Support",
    category: "chin-support",
    compressionClass: "I",
    description:
      "Chin and neck compression wrap for post-facial-surgery support and healing.",
    image: "/images/products/chin-support.webp",
  },
];
