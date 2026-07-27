"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Piece } from "./pieces";
import {
  desks,
  chairs,
  accessories,
  formatUSD,
  Item,
  monitors,
} from "../lib/items";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

type Tab = "desk" | "chair" | "monitor" | "accessory";

interface PickerProps {
  deskId: string;
  chairId: string;
  monitorId: string;
  accessoryIds: Set<string>;
  onSelectDesk: (id: string) => void;
  onSelectChair: (id: string) => void;
  onSelectMonitor: (id: string) => void;
  onToggleAccessory: (id: string) => void;
  onHoverAccessory: (id: string | null) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "desk", label: "Desks" },
  { id: "chair", label: "Chairs" },
  { id: "monitor", label: "Monitor" },
  { id: "accessory", label: "Accessories" },
];

export default function Picker({
  deskId,
  chairId,
  monitorId,
  accessoryIds,
  onSelectDesk,
  onSelectChair,
  onSelectMonitor,
  onToggleAccessory,
  onHoverAccessory,
}: PickerProps) {
  const [tab, setTab] = useState<Tab>("desk");

  const list: Item[] =
    tab === "desk"
      ? desks
      : tab === "chair"
        ? chairs
        : tab === "monitor"
          ? monitors
          : accessories;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white/70 p-2">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-ink/5 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-ink shadow-sm"
                : "text-ink/50 hover:text-ink/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-3 grid grid-cols-2 gap-3 overflow-y-auto p-1 content-start">
        {list.map((item) => {
          const isSelected =
            tab === "desk"
              ? deskId === item.id
              : tab === "chair"
                ? chairId === item.id
                : tab === "monitor"
                  ? monitorId === item.id
                  : accessoryIds.has(item.id);

          const onClick = () => {
            if (tab === "desk") onSelectDesk(item.id);
            else if (tab === "chair") onSelectChair(item.id);
            else if (tab === "monitor") onSelectMonitor(item.id);
            else onToggleAccessory(item.id);
          };

          return (
            <motion.button
              key={item.id}
              onClick={onClick}
              onMouseEnter={() =>
                tab === "accessory" && onHoverAccessory(item.id)
              }
              onMouseLeave={() => tab === "accessory" && onHoverAccessory(null)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col items-start rounded-2xl border p-3 transition-colors
                ${
                  isSelected
                    ? "border-teal bg-teal/10"
                    : "border-ink/10 bg-white hover:border-ink/25"
                }`}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-teal text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}

              <div className="flex h-20 w-full items-center justify-center text-ink/70">
                {item.model ? (
                  <ModelViewer
                    src={item.model}
                    alt={item.name}
                    width={110}
                    height={110}
                    arEnabled={false}
                    cameraControls={false}
                  />
                ) : (
                  <Piece id={item.id} image={item.image} className="h-full" />
                )}
              </div>

              {/* Text */}
              <div className="mt-3 w-full">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-ink/50">
                  {item.blurb}
                </p>
                <p className="mt-2 font-mono font-black text-xs text-ink">
                  {formatUSD(item.price)}/week
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
