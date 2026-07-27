export type Category = "desk" | "chair" | "monitor" | "accessory";

export interface Item {
  id: string;
  name: string;
  category: Category;
  price: number;
  blurb: string;
  image?: string;
  model?: string;
}

export const desks: Item[] = [
  {
    id: "desk-oakline",
    name: "Oakline Desk",
    category: "desk",
    price: 20,
    blurb: "Clean oak desk with a minimalist profile and durable steel frame.",
    model: "/assets/computer_desk_2.glb",
  },
  {
    id: "desk-adjustable",
    name: "Mechanical Adjustable Desk",
    category: "desk",
    price: 22,
    blurb:
      "Height-adjustable desk designed for flexibility, comfort, and better posture throughout the day.",
    model: "/assets/computer_desk.glb",
  },
];

export const chairs: Item[] = [
  {
    id: "chair-ergoweave",
    name: "Ergoweave Chair",
    category: "chair",
    price: 12,
    blurb: "Ergonomic mesh chair with breathable support and all-day comfort.",
    model: "/assets/gaming_chair.glb",
  },
  {
    id: "chair-gaming",
    name: "Gaming Chair",
    category: "chair",
    price: 14,
    blurb:
      "High-back gaming chair with plush cushioning and immersive support.",
    model: "/assets/gaming_chair_1.glb",
  },
];

export const monitors: Item[] = [
  {
    id: "ultrawide-monitor",
    name: "Ultrawide Monitor",
    category: "monitor",
    price: 10,
    blurb:
      "27-inch ultrawide display with sharp 1440p clarity for multitasking.",
    model: "/assets/ultrawide_monitor.glb",
  },
  {
    id: "acer-monitor",
    name: "Acer Monitor",
    category: "monitor",
    price: 14,
    blurb: "Premium high-resolution display with a sleek, minimalist design.",
    model: "/assets/acer_monitor.glb",
  },
  {
    id: "curved-monitor",
    name: "Curved Monitor",
    category: "monitor",
    price: 12,
    blurb:
      "Curved display designed for immersive focus and reduced eye strain.",
    model: "/assets/curved_monitor.glb",
  },
];

export const accessories: Item[] = [
  {
    id: "acc-plant",
    name: "Desk Plant",
    category: "accessory",
    price: 2,
    blurb: "A touch of greenery to bring life and balance to your workspace.",
    model: "/assets/plant_1.glb",
  },
  {
    id: "acc-lamp",
    name: "Standing Lamp",
    category: "accessory",
    price: 1,
    blurb: "Soft ambient lighting to enhance focus and atmosphere.",
    model: "/assets/standing_lamp.glb",
  },
];

export const allItems = [...desks, ...chairs, ...monitors, ...accessories];

export function formatUSD(value: number) {
  const rounded = Math.round(value);
  return `$${rounded}`;
}
