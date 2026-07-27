"use client";

import { useMemo, useState } from "react";
import { desks, chairs, accessories, monitors } from "./lib/items";
import Ticket from "./components/Ticket";
import Scene from "./components/Scene";
import Picker from "./components/Picker";

export default function Home() {
  const [deskId, setDeskId] = useState<string | null>(null);
  const [chairId, setChairId] = useState<string | null>(null);
  const [monitorId, setMonitorId] = useState<string | null>(null);
  const [accessoryIds, setAccessoryIds] = useState<Set<string>>(new Set());
  const [ghostId, setGhostId] = useState<string | null>(null);
  const [rented, setRented] = useState(false);

  const desk = useMemo(
    () => desks.find((d) => d.id === deskId) || null,
    [deskId],
  );
  const chair = useMemo(
    () => chairs.find((c) => c.id === chairId) || null,
    [chairId],
  );
  const selectedMonitor = useMemo(
    () => monitors.find((m) => m.id === monitorId) || null,
    [monitorId],
  );
  const activeAccessories = useMemo(
    () => accessories.filter((a) => accessoryIds.has(a.id)),
    [accessoryIds],
  );

  function toggleAccessory(id: string) {
    if (rented) return;
    setAccessoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 lg:px-12">
      <header className="mx-auto mb-8 max-w-5xl text-center">
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Design Your Workspace
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
          Mix and match desks, chairs, and accessories to build your ideal
          setup. Preview everything in real-time and explore pieces in 3D.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[320px_1fr_300px]">
        <div className="order-2 lg:order-1 lg:h-[460px]">
          <Picker
            deskId={deskId!}
            chairId={chairId!}
            monitorId={monitorId!}
            accessoryIds={accessoryIds}
            onSelectDesk={rented ? () => {} : setDeskId}
            onSelectChair={rented ? () => {} : setChairId}
            onSelectMonitor={rented ? () => {} : setMonitorId}
            onToggleAccessory={toggleAccessory}
            onHoverAccessory={setGhostId}
          />
        </div>

        <div className="order-1 lg:order-2">
          <Scene
            desk={desk}
            monitor={selectedMonitor}
            chair={chair}
            activeAccessories={activeAccessories}
            ghostId={ghostId}
          />
        </div>

        <div className="order-3 lg:h-[460px]">
          <Ticket
            desk={desk}
            chair={chair}
            activeAccessories={activeAccessories}
            rented={rented}
            onRent={() => setRented(true)}
            onReset={() => setRented(false)}
          />
        </div>
      </div>
    </main>
  );
}
