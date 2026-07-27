"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Piece } from "./pieces";
import { Item } from "../lib/items";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

interface SceneProps {
  desk: Item | null;
  chair: Item | null;
  monitor: Item | null;
  activeAccessories: Item[];
  ghostId?: string | null;
}

const popIn = {
  initial: { opacity: 0, scale: 0.6, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.6, y: 10 },
};

const spring = { type: "spring" as const, stiffness: 300, damping: 18 };

const slotClass: Record<string, string> = {
  "acc-lamp": "right-[16%] top-[40%] w-14 text-ink/70",
  "acc-plant": "left-[6%] bottom-[12%] w-14 text-ink/70",
  "acc-coffee": "right-[4%] bottom-[10%] w-14 text-ink/70",
};

export default function Scene({
  desk,
  chair,
  activeAccessories,
  ghostId,
  monitor,
}: SceneProps) {
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-ink/10 bg-scene shadow-inner">
      <img
        src="/assets/background.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* soft wash so items stay readable over the photo */}
      <div className="absolute inset-0 bg-scene/50" />
      {/* ambient warm window glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brass/25 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/10 to-transparent" />
      {/* chair, sits behind the desk */}
      {chair && (
        <AnimatePresence mode="wait">
          <motion.div
            key={chair.id}
            {...popIn}
            transition={spring}
            className="absolute left-1/2 top-[50%] z-20 w-28 -translate-x-1/2 text-ink/60"
            style={{ height: 100 }}
          >
            {chair.model ? (
              <ModelViewer
                src={chair.model}
                alt={chair.name}
                width={112}
                height={160}
              />
            ) : (
              <Piece id={chair.id} image={chair.image} className="w-full" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
      {/* accessories, layered above desk */}
      <AnimatePresence>
        {activeAccessories.map((item, i) => (
          <motion.div
            key={item.id}
            {...popIn}
            transition={{ ...spring, delay: i * 0.1 }}
            className={`absolute ${slotClass[item.id]}`}
          >
            {item.model ? (
              <ModelViewer
                src={item.model}
                alt={item.name}
                width={130}
                height={185}
              />
            ) : (
              <Piece
                id={item.id}
                image={item.image}
                className="w-full drop-shadow-sm"
              />
            )}
            {item.id === "acc-lamp" && (
              <motion.div
                aria-hidden
                className="absolute -top-2 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-brass/40 blur-xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            {item.id === "acc-plant" && (
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {monitor && (
        <AnimatePresence mode="wait">
          <motion.div
            key={monitor.id}
            {...popIn}
            transition={spring}
            className="absolute left-1/2 top-[34%] -translate-x-1/2 w-28 text-ink/80"
            style={{ height: 100 }}
          >
            {monitor.model ? (
              <ModelViewer
                src={monitor.model}
                alt={monitor.name}
                width={112}
                height={160}
              />
            ) : (
              <Piece id={monitor.id} image={monitor.image} className="w-full" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
      {ghostId &&
        slotClass[ghostId] &&
        !activeAccessories.find((a) => a.id === ghostId) && (
          <div className={`absolute ${slotClass[ghostId]} opacity-30`}>
            <Piece id={ghostId} className="w-full" />
          </div>
        )}
      {desk && (
        <AnimatePresence mode="wait">
          <motion.div
            key={desk.id}
            {...popIn}
            transition={spring}
            className="absolute left-1/2 top-[54%] z-10 w-72 -translate-x-1/2 text-ink"
          >
            {desk.model ? (
              <ModelViewer
                src={desk.model}
                alt={desk.name}
                width={288}
                height={224}
                className="-translate-y-6"
              />
            ) : (
              <Piece id={desk.id} image={desk.image} className="w-full" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
