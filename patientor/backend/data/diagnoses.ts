import type { Diagnosis } from "../src/types.ts";

const diagnoses: Diagnosis[] = [
  {
    code: "S62.5",
    name: "Fracture of thumb",
  },
  {
    code: "M24.9",
    name: "Joint disorder, unspecified",
  },
  {
    code: "M51.2",
    name: "Other specified intervertebral disc displacement",
  },
  {
    code: "S03.5",
    name: "Sprain and strain of joints and ligaments of other and unspecified parts of head",
    latin: "Distorsio et luxatio articulationum et ligamentorum capitis",
  },
];

export default diagnoses;
