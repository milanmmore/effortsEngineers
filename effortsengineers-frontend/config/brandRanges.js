const sabroeSeries = [
  "SMC 100 Series: SMC-4-100, SMC-6-100, SMC-8-100; SMC 104/106/112/116 in S, J, and E versions.",
  "SMC 65 Series: SMC-2-65, SMC-3-65, SMC-4-65, SMC-6-65, SMC-8-65.",
  "CMO Series: 14, 16, 18, 24, 26, 28.",
  "TCMO Series: 18, 28.",
  "TSMC Series: 108, 116, 16-100, 8-100.",
];

const brandRanges = [
  {
    brand: "Kirloskar",
    series: [
      "KC single-stage: KC-2, KC-3, KC-4, KC-5, KC-6, KC-9, KC-12.",
      "KC two-stage: KC-21, KC-31, KC-42, KC-51, KC-63, KC-72, KC-84, KC-93, KC-102.",
      "K110: K20 x 110, K30 x 110, K40 x 110, K60 x 110.",
      "AC70: AC-470, AC-570, AC-670, AC-770, AC-870, AC-1070, AC-1270, AC-1470, AC-1670.",
      "AC80: AC-480, AC-580, AC-680, AC-780, AC-880, AC-1080, AC-1280, AC-1480, AC-1680; PC-2.",
      "Other ranges: FK-3, FK-4, GK-25, K-70, CLS-61, CLS-81, RC-11, RC-12, RC-12E.",
    ],
  },
  { brand: "Sabroe", series: sabroeSeries },
  { brand: "Accel Sabroe", series: sabroeSeries },
  {
    brand: "Carrier & Voltas",
    series: [
      "5H: 5H-40, 5H-60, 5H-80, 5H-120, 5H-46, 5H-66, 5H-86, 5H-126.",
      "5F: 5F-20, 5F-30, 5F-40, 5F-60.",
      "06D: 06D-48, 06D-68, 06D-75, 06D-018, 06D-024, 06D-037.",
      "06E family (semi-sealed).",
    ],
  },
  {
    brand: "York",
    series: [
      "Models: 3DD50, G43, JS43, RS/W42, SS62, 3DD100, G53, JS44, RS/W44, SS63, 3DD125.",
      "Models: G83, JS53, RS/W62, SS82, G123, JS54, RS/W64, F3046, G163, JS63, RS/W82, Z 4CYL.",
      "Models: F3069, JS64, RS/W84, Z 6CYL, F3089, H92, JS73, RS/W122, F3129.",
      "Models: H459, JS83, RS/W124, JS84, RS/W162, FS32, RS/W164, FS62, FS92.",
      "Series: H, J-G, J-H, J-K, J-L, J-M, J-S, SS, Y.",
    ],
  },
  {
    brand: "Trane",
    series: [
      "E Series: 3E 5H 40, 3E 5H 50, 3E 5H 60, 3E 5H 80.",
      "F Series: 3F 5B 30, 3F 5B 40, 3F 5B 50, 3F 5B 60.",
      "H Series (semi-sealed).",
      "75 Series: 4HC 75, 6HC 75, 8HC 75, 4C 75, 6C 75.",
      "55 Series: 4C 55, 6C 55, 3HC 55, 4HC 55, 6HC 55.",
    ],
  },
  {
    brand: "Copeland",
    series: ["Share the compressor model and part reference so we can confirm the applicable range."],
  },
  {
    brand: "Ingersoll Rand",
    series: ["Share the compressor model and part reference so we can confirm the applicable range."],
  },
  {
    brand: "Atlas Copco",
    series: ["Share the compressor model and part reference so we can confirm the applicable range."],
  },
  {
    brand: "CPT",
    series: ["Share the compressor model and part reference so we can confirm the applicable range."],
  },
];

export default brandRanges;
