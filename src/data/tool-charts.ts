/** Maps DX tool slugs to benchmark chart indices in performance-section charts array */
export const toolChartSlugMap: Record<string, number> = {
  check: 0,
  dcp: 1,
  driven: 3,
  flow: 4,
  forge: 5,
  i18n: 6,
  icon: 7,
  js: 8,
  media: 9,
  metasearch: 10,
  native: 11,
  providers: 12,
  py: 13,
  serializer: 14,
  style: 15,
  www: 17,
  agent: 18,
  build: 19,
  cli: 20,
  code: 21,
};

export function getChartIndexForTool(slug: string): number | undefined {
  return toolChartSlugMap[slug];
}
