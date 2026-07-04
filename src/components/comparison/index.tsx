import { groups } from "@/data/comparison";
import { GroupTable } from "./group-table";

export default function ComparisonSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="mb-14 text-center space-y-3">
          <span className="inline-block text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em] bg-muted/50 px-3 py-1 rounded-full">
            Ecosystem Comparison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            DX vs. Industry
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            27 DX tools compared head-to-head against top alternatives.
            Every row shows where DX wins or ties.
          </p>
        </div>

        <div className="space-y-6">
          {groups.map((group, i) => (
            <GroupTable key={group.id} group={group} variant={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
