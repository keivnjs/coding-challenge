"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatUSD, Item } from "../lib/items";

interface TicketProps {
  desk: Item | null;
  chair: Item | null;
  activeAccessories: Item[];
  rented: boolean;
  onRent: () => void;
  onReset: () => void;
}

export default function Ticket({
  desk,
  chair,
  activeAccessories,
  rented,
  onRent,
  onReset,
}: TicketProps) {
  const items = [desk, chair, ...activeAccessories].filter(
    (i): i is Item => i !== null,
  );
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const isEmpty = items.length === 0;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-ink px-5 py-4 text-ivory">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60">
            Rental Ticket
          </p>
          <p className="font-display text-lg leading-tight">Your Workspace</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-ink/40">
            No items selected yet
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center justify-between border-b border-dashed border-ink/10 pb-2 text-sm"
              >
                <span className="text-ink/80">{item.name}</span>
                <span className="font-mono text-xs text-ink/50">
                  {formatUSD(item.price)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* perforated divider */}
      <div className="relative border-t border-dashed border-ink/20">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-bg" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-bg" />
      </div>

      <div className="px-5 py-4">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wide text-ink/50">
            Total / week
          </span>
          <span className="font-mono text-xl font-semibold text-ink">
            {formatUSD(total)}
          </span>
        </div>

        {!rented ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onRent}
            disabled={isEmpty}
            className={`w-full rounded-full py-3 text-sm font-semibold text-white shadow-md transition-transform
    ${
      isEmpty
        ? "bg-ink/20 cursor-not-allowed"
        : "bg-coral shadow-coral/30 hover:-translate-y-0.5"
    }`}
          >
            {isEmpty ? "Select items first" : "Rent This Setup →"}
          </motion.button>
        ) : (
          <button
            onClick={onReset}
            className="w-full rounded-full border border-ink/15 py-3 text-sm font-medium text-ink/70 hover:bg-ink/5"
          >
            Build another setup
          </button>
        )}
      </div>

      <AnimatePresence>
        {rented && (
          <motion.div
            initial={{ opacity: 0, scale: 2.2, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -18 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="pointer-events-none absolute right-6 top-24 select-none rounded-lg border-4 border-teal px-4 py-1 font-display text-xl font-bold uppercase tracking-wider text-teal"
          >
            Checked In
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
