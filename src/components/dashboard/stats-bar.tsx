import * as React from "react";
import {
  FolderKanban,
  ServerCog,
  FlaskConical,
  Layers,
  Award,
} from "lucide-react";
import type { DashboardStats } from "@/lib/projects-index";

export function StatsBar({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "Production", value: stats.production, icon: ServerCog },
    { label: "Home Lab", value: stats.homeLab, icon: FlaskConical },
    { label: "Technologies", value: stats.technologies, icon: Layers },
    { label: "Certifications", value: stats.certifications, icon: Award },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <item.icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-2xl font-bold leading-none tabular-nums">
              {item.value}
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
