import type { ComponentType } from "react";
import { PeptideRegulationContent } from "@/components/articles/PeptideRegulationContent";

/**
 * Maps article slugs to rich content components.
 * Articles without an entry here fall back to the plain-text `content` field.
 */
export const articleContentMap: Record<string, ComponentType> = {
  "peptide-regulation-2026": PeptideRegulationContent,
};
