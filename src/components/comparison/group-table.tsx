import type { ComparisonGroup } from "@/data/comparison";
import { getLogoFile } from "@/data/comparison/logos";

interface Props {
  group: ComparisonGroup;
  variant: number;
}

const headerStyles = [
  "from-primary/10 to-accent/10",
  "from-accent/10 to-secondary/10",
  "from-secondary/10 to-muted/20",
  "from-muted/20 to-primary/5",
  "from-foreground/5 to-accent/10",
  "from-card/80 to-secondary/10",
  "from-primary/5 to-muted/20",
  "from-accent/5 to-foreground/5",
  "from-secondary/5 to-primary/10",
  "from-muted/10 to-accent/5",
  "from-foreground/5 to-card/80",
  "from-card/50 to-muted/30",
  "from-primary/8 to-secondary/10",
  "from-accent/8 to-foreground/5",
  "from-secondary/8 to-muted/20",
  "from-muted/30 to-accent/10",
];

const keyframesStyle = `
@keyframes rainbow-shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.rainbow-dx {
  background: linear-gradient(90deg,
    hsl(0,70%,55%), hsl(30,70%,55%), hsl(60,70%,55%),
    hsl(120,70%,55%), hsl(180,70%,55%), hsl(210,70%,55%),
    hsl(240,70%,55%), hsl(270,70%,55%), hsl(300,70%,55%),
    hsl(330,70%,55%), hsl(0,70%,55%)
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: rainbow-shift 3s linear infinite;
}
`;

export function GroupTable({ group, variant }: Props) {
  const maxCompetitors = Math.max(
    ...group.items.map((r) => r.competitors.length),
  );
  const hs = headerStyles[variant % headerStyles.length];
  const [grad] = hs.split(" ");

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-sm">
      <style>{keyframesStyle}</style>
      <div
        className={`px-6 py-4 bg-gradient-to-r ${grad} flex items-center border-b border-border`}
      >
        <span className="text-lg font-bold tracking-tight text-foreground">
          {group.group}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/20">
              <th className="text-left font-sans text-[11px] text-muted-foreground font-semibold py-2.5 px-6 uppercase tracking-widest border-b border-border">
                Area
              </th>
              <th className="text-left font-sans text-[11px] text-foreground font-semibold py-2.5 px-4 uppercase tracking-widest border-b border-border">
                DX
              </th>
              <th
                colSpan={maxCompetitors}
                className="text-left font-sans text-[11px] text-muted-foreground font-semibold py-2.5 px-3 uppercase tracking-widest border-b border-border"
              >
                Competitors
              </th>
            </tr>
          </thead>
          <tbody>
            {group.items.map((row, ri) => (
              <tr
                key={ri}
                className="transition-colors hover:bg-primary-foreground/20 border-b last:border-0"
              >
                <td className="font-sans text-sm text-foreground py-3 px-6 font-medium whitespace-nowrap">
                  {row.area}
                </td>
                <td className="py-3 px-4">
                  <code className="rainbow-dx font-mono text-sm text-transparent px-1.5 py-0.5 rounded text-[13px] font-semibold whitespace-nowrap">
                    {row.dx}
                  </code>
                </td>
                {Array.from({ length: maxCompetitors }).map((_, ci) => {
                  const comp = row.competitors[ci];
                  const logo = comp ? getLogoFile(comp.name) : undefined;
                  return (
                    <td key={ci} className="py-3 px-3">
                      {comp && (
                        <span className="hover:bg-primary-foreground/60 inline-flex items-center gap-1.5 font-sans text-[12px] text-muted-foreground bg-muted/40 px-2 py-1 rounded-md border whitespace-nowrap">
                          {logo && (
                            <img
                              src={`/svgl/svgl_${logo}.svg`}
                              alt=""
                              className="w-4 h-4 shrink-0"
                            />
                          )}
                          <span
                            className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${
                              comp.dxWins ? "bg-primary" : "bg-muted-foreground"
                            }`}
                          />
                          <span>{comp.name}</span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
