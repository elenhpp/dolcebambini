// GENERATED — remote gallery manifest for the silk & communion collections.
//
// Those two categories are served from dolcebambini.gr rather than bundled locally,
// so the extra shots cannot be discovered from the filesystem. Missing files there
// answer 200 with an HTML 404 page, so they can't be probed from the browser either.
// This list was verified by content-type against the live site.
//
// To refresh after photos are added upstream, re-probe each product:
//   silk:      <dir>/<slug>-front.jpg  and  <slug>-<n>.jpg
//   communion: <code>_<nn>.jpg
// and keep only URLs whose response content-type starts with "image/".

/** Suffixes for `<slug>-<suffix>.jpg` under each silk product folder. */
export const SILK_VARIANTS: Record<string, string[]> = {
  "G432-1": ["front", "1", "2"],
  "G521-1": ["front", "1", "2", "3", "4"],
  "G525-4": ["front", "1", "2"],
  "G531-1": ["front", "1", "2", "3", "4"],
  "G541-1": ["front", "1", "2", "3"],
  "G543-1": ["front", "1"],
  "G551-1": ["front", "1", "2", "3"],
  "G545-1": ["front", "1", "2", "3", "4", "5"],
  "G551-1b": ["front", "1", "2", "3", "4", "5"],
  "G555-1": ["front", "1"],
  "G565-1": ["front", "1", "2", "3"],
  "G569-1": ["front", "1", "2", "3", "4"],
  "G567-1": ["front", "1", "2"],
};

/** Zero-padded indices for `<code>_<nn>.jpg` in the communion folder. */
export const COMMUNION_VARIANTS: Record<string, string[]> = {
  "5889": ["01", "02", "03", "04", "05"],
  "570-1": ["01", "02", "03", "04", "05", "06"],
  "6002-1": ["01", "02", "03", "04", "05"],
  "6004-1": ["01", "02", "03", "04", "05", "06"],
  "6005-1": ["01", "02", "03", "04", "05", "06"],
  "6020-1": ["01", "02", "03", "04", "05"],
  "6057-1": ["01", "02", "03", "04"],
  "6059-1": ["01", "02", "03"],
  "9601-1": ["01", "02", "03", "04"],
  "9610-8": ["01", "02", "03", "04"],
  "9703-1": ["01", "02", "03", "04"],
  "C01-1": ["01", "02", "03", "04"],
  "C02-1": ["01", "02", "03", "04"],
  "C04-1": ["01", "02", "03", "04"],
  "C05-1": ["01", "06", "07", "08", "09", "10", "11"],
  "C07-1": ["01", "02", "03", "04"],
};
