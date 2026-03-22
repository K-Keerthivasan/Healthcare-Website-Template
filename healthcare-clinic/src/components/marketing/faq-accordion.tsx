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
        <section key={group.topic} className="surface p-6 sm:p-8">
          <div className="mb-5">
            <h2 className="text-3xl text-teal-900">{group.topic}</h2>
          </div>
          <div className="space-y-3">
            {group.items.map((item, index) => {
              const key = `${group.topic}-${index}`;
              const open = openKey === key;

              return (
                <div key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenKey(open ? "" : key)}
                  >
                    <span className="text-base font-semibold text-slate-800">{item.question}</span>
                    <CaretDown
                      className={cn("size-5 text-teal-700 transition", open && "rotate-180")}
                      weight="bold"
                    />
                  </button>
                  {open ? <div className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.answer}</div> : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
