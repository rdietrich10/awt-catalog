import type { GlossaryTerm } from "@/types";
import { slugify } from "@/lib/utils";

const terms: Omit<GlossaryTerm, "slug">[] = [
  { term: "Bacteriostatic Water", definition: "Sterile water with a preservative used to reconstitute lyophilized compounds. Each product specifies the correct volume." },
  { term: "BPC-157", definition: "Body Protection Compound 157; supports wound healing, tendon repair, GI protection, and musculoskeletal protection." },
  { term: "GHRH", definition: "Growth hormone-releasing hormone; stimulates endogenous GH release (e.g., Sermorelin, Tesamorelin)." },
  { term: "GHK-Cu", definition: "Copper compound complex; tightens loose skin, reduces fine lines, fights hair loss, wound healing." },
  { term: "GIP", definition: "Glucose-dependent insulinotropic polypeptide; works with GLP-1 in dual agonists like Tirzepatide." },
  { term: "GLP-1", definition: "Glucagon-like peptide-1; supports appetite regulation and weight management (e.g., Semaglutide)." },
  { term: "IGF-1", definition: "Insulin-like growth factor 1; supports muscle growth, fat burn, metabolism, recovery." },
  { term: "Reconstitution", definition: "Mixing Bacteriostatic Water with lyophilized (powder) medication to prepare for injection." },
  { term: "Subcutaneous", definition: "Administered under the skin, typically in abdomen, thigh, or upper arm. Rotate injection sites." },
  { term: "TB-500", definition: "Thymosin Beta-4; accelerates wound, joint, and muscle repair." },
];

export const glossaryTerms: GlossaryTerm[] = terms.map((t) => ({
  ...t,
  slug: slugify(t.term),
}));
