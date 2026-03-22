"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { FaqGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [openKey, setOpenKey] = useState<string>(`${groups[0]?.topic}-0`);

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.topic} className="surface p-6 sm:p-8 dark:border-slate-700/60 dark:bg-slate-900/80" aria-labelledby={`faq-${group.topic}`}>
          <div className="mb-5">
            <h2 id={`faq-${group.topic}`} className="text-3xl text-teal-900 dark:text-teal-100">{group.topic}</h2>
          </div>
          <div className="space-y-3">
            {group.items.map((item, index) => {
              const key = `${group.topic}-${index}`;
              const open = openKey === key;
              const panelId = `panel-${key.replace(/\s/g, "-")}`;
              const triggerId = `trigger-${key.replace(/\s/g, "-")}`;

              return (
                <div key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenKey(open ? "" : key)}
                  >
                    <span className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.question}</span>
                    <CaretDown
                      className={cn("size-5 shrink-0 text-teal-700 transition dark:text-teal-400", open && "rotate-180")}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </button>
                  {open ? (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="px-5 pb-5 text-sm leading-7 text-slate-600 dark:text-slate-400"
                    >
                      {item.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
