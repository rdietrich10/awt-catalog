import type { ComponentType } from "react";
import { PeptideRegulationContent } from "@/components/articles/PeptideRegulationContent";
import { PhysicianDirectedModelContent } from "@/components/articles/PhysicianDirectedModelContent";
import { BiomarkerScreeningContent } from "@/components/articles/BiomarkerScreeningContent";
import { UnderstandingBiomarkersContent } from "@/components/articles/UnderstandingBiomarkersContent";
import { PrecisionBloodTestingContent } from "@/components/articles/PrecisionBloodTestingContent";
import { NutraceuticalsExclusionContent } from "@/components/articles/NutraceuticalsExclusionContent";
import { Glp1ComparisonContent } from "@/components/articles/Glp1ComparisonContent";
import { FutureOfWeightLossContent } from "@/components/articles/FutureOfWeightLossContent";
import { StartingGlp1MedicationContent } from "@/components/articles/StartingGlp1MedicationContent";

/**
 * Maps article slugs to rich content components.
 * Articles without an entry here fall back to the plain-text `content` field.
 */
export const articleContentMap: Record<string, ComponentType> = {
  "why-we-dont-sell-nutraceuticals": NutraceuticalsExclusionContent,
  "peptide-regulation-2026": PeptideRegulationContent,
  "physician-directed-model": PhysicianDirectedModelContent,
  "why-annual-biomarker-screening-matters": BiomarkerScreeningContent,
  "understanding-blood-biomarkers": UnderstandingBiomarkersContent,
  "precision-blood-testing-healthcare": PrecisionBloodTestingContent,
  "glp-1-comparison": Glp1ComparisonContent,
  "future-of-weight-loss": FutureOfWeightLossContent,
  "starting-glp-1-medication": StartingGlp1MedicationContent,
};
