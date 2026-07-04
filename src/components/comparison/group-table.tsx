import { CheckCircle2, Minus } from "lucide-react";
import type { ComparisonGroup } from "@/data/comparison";

interface Props {
  group: ComparisonGroup;
  variant: number;
}

const headerStyles = [
  "from-primary/10 to-accent/10 text-primary",
  "from-accent/10 to-secondary/10 text-accent-foreground",
  "from-secondary/10 to-muted/20 text-secondary-foreground",
  "from-muted/20 to-primary/5 text-foreground",
  "from-foreground/5 to-accent/10 text-card-foreground",
  "from-card/80 to-secondary/10 text-primary",
  "from-primary/5 to-muted/20 text-accent-foreground",
  "from-accent/5 to-foreground/5 text-secondary-foreground",
  "from-secondary/5 to-primary/10 text-foreground",
  "from-muted/10 to-accent/5 text-primary",
  "from-foreground/5 to-card/80 text-accent-foreground",
  "from-card/50 to-muted/30 text-secondary-foreground",
  "from-primary/8 to-secondary/10 text-foreground",
  "from-accent/8 to-foreground/5 text-primary",
  "from-secondary/8 to-muted/20 text-accent-foreground",
  "from-muted/30 to-accent/10 text-secondary-foreground",
];

const badgeStyles = [
  "bg-primary/10 text-primary",
  "bg-accent/20 text-accent-foreground",
  "bg-secondary/20 text-secondary-foreground",
  "bg-muted/20 text-foreground",
  "bg-foreground/5 text-card-foreground",
  "bg-card/80 text-primary",
];

function rainbowGradient(index: number): string {
  const hues = [0, 30, 60, 120, 180, 210, 240, 270, 300, 330, 360];
  const h1 = hues[index % hues.length];
  const h2 = hues[(index + 3) % hues.length];
  return `linear-gradient(90deg, hsl(${h1}, 70%, 55%), hsl(${h2}, 70%, 55%))`;
}

export function GroupTable({ group, variant }: Props) {
  const wins = group.items.filter((r) => r.dxWins).length;
  const total = group.items.length;
  const hs = headerStyles[variant % headerStyles.length];
  const bs = badgeStyles[variant % badgeStyles.length];
  const [grad, ...txt] = hs.split(" ");
  const textColor = txt.join(" ");

  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-sm">
      <div className={`px-6 py-4 bg-gradient-to-r ${grad} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold tracking-tight ${textColor}`}>
            {group.group}
          </span>
        </div>
        <div className={`flex items-center gap-2 text-xs font-semibold px-2 py-0.5 rounded ${bs}`}>
          <span>{wins}/{total} wins</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/20">
              <th className="text-left font-sans text-[11px] text-muted-foreground font-semibold py-2.5 px-6 uppercase tracking-widest">
                Area
              </th>
              <th className="text-left font-sans text-[11px] text-foreground font-semibold py-2.5 px-4 uppercase tracking-widest">
                DX
              </th>
              <th className="text-center font-sans text-[11px] text-muted-foreground font-semibold py-2.5 px-3 uppercase tracking-widest w-[60px]">
                Verdict
              </th>
              <th className="text-left font-sans text-[11px] text-muted-foreground font-semibold py-2.5 px-4 uppercase tracking-widest">
                Competitors
              </th>
            </tr>
          </thead>
          <tbody>
            {group.items.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border/30 last:border-b-0 transition-colors hover:bg-accent/30"
              >
                <td className="font-sans text-sm text-foreground py-3 px-6 font-medium">
                  {row.area}
                </td>
                <td className="py-3 px-4">
                  <code
                    className="font-mono text-sm bg-clip-text text-transparent px-1.5 py-0.5 rounded text-[13px] font-semibold"
                    style={{ background: rainbowGradient(variant + i), WebkitBackgroundClip: "text" }}
                  >
                    {row.dx}
                  </code>
                </td>
                <td className="py-3 px-3 text-center">
                  {row.dxWins ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-foreground bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                      WIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                      <Minus className="w-3 h-3" strokeWidth={2.5} />
                      TIE
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {row.competitors.map((comp, ci) => (
                      <span
                        key={ci}
                        className="inline-block font-sans text-[12px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/30"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
