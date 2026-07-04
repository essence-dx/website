import React from 'react';
import { CheckCircle2, XCircle, Asterisk, Server } from 'lucide-react';

interface ComparisonRow {
  id: string;
  feature: string;
  perplexity: {
    value: string;
    isPositive?: boolean;
  };
  descript: {
    value: string;
    isNegative?: boolean;
  };
}

const rows: ComparisonRow[] = [
  {
    id: 'onboarding',
    feature: 'Onboarding',
    perplexity: { value: '1-2 days' },
    descript: { value: '30 days' },
  },
  {
    id: 'price',
    feature: 'Price Range',
    perplexity: { value: '10%' },
    descript: { value: '50-60%' },
  },
  {
    id: 'quality',
    feature: 'Quality Score',
    perplexity: { value: 'Top 3%' },
    descript: { value: 'Varies' },
  },
  {
    id: 'verification',
    feature: 'Verification',
    perplexity: { value: 'Multi-step verification process', isPositive: true },
    descript: { value: 'Basic check', isNegative: true },
  },
  {
    id: 'adaptability',
    feature: 'Adaptability',
    perplexity: { value: 'Fully flexible', isPositive: true },
    descript: { value: 'Limited', isNegative: true },
  },
  {
    id: 'support',
    feature: 'Support',
    perplexity: { value: '24/7 dedicated team', isPositive: true },
    descript: { value: 'Limited hours', isNegative: true },
  },
];

export default function CompetitorComparison() {
  return (
    <div className="w-full py-16 md:py-24 bg-background font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-12 text-center lg:text-left">Compare</h2>

        <div className="w-full relative max-w-5xl mx-auto lg:mx-0">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-2">
            <div className="flex items-center px-6 py-4 text-muted-foreground font-medium">
              Feature
            </div>
            
            {/* Perplexity Header */}
            <div className="bg-green-500/10 dark:bg-green-500/20 rounded-t-lg flex items-center px-6 py-4 border-b border-green-500/20">
              <div className="flex items-center gap-2">
                <Asterisk className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                <span className="text-xl font-medium tracking-tight text-foreground">perplexity</span>
              </div>
            </div>

            {/* Descript Header */}
            <div className="bg-red-500/10 dark:bg-red-500/20 rounded-t-lg flex items-center px-6 py-4 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <Server className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                <span className="text-xl font-bold tracking-tight text-foreground">descript</span>
              </div>
            </div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col">
            {rows.map((row, index) => {
              const isLast = index === rows.length - 1;
              
              return (
                <div key={row.id} className="grid grid-cols-1 md:grid-cols-3">
                  {/* Feature Name Column */}
                  <div className="px-6 py-5 border-b border-border flex items-center text-foreground font-medium bg-background">
                    {row.feature}
                  </div>

                  {/* Perplexity Column */}
                  <div className={`px-6 py-5 bg-green-500/5 dark:bg-green-500/10 flex items-center gap-2 text-foreground ${!isLast ? 'border-b border-green-500/10' : 'rounded-b-lg'}`}>
                    {row.perplexity.isPositive && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" strokeWidth={2} />
                    )}
                    <span>{row.perplexity.value}</span>
                  </div>

                  {/* Descript Column */}
                  <div className={`px-6 py-5 bg-red-500/5 dark:bg-red-500/10 flex items-center gap-2 text-foreground ${!isLast ? 'border-b border-red-500/10' : 'rounded-b-lg'}`}>
                    {row.descript.isNegative && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" strokeWidth={2} />
                    )}
                    <span>{row.descript.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}