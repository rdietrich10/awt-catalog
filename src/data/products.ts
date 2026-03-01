import type { Product } from "@/types";
import { peptideProducts } from "@/data/products/peptides";
import { healingProducts } from "@/data/products/healing";
import { reproductiveProducts } from "@/data/products/reproductive";
import { longevityProducts } from "@/data/products/longevity";
import { moodSleepProducts } from "@/data/products/mood-sleep";
import { suppliesProducts } from "@/data/products/supplies";
import { bloodTestingProducts } from "@/data/products/blood-testing";
import { servicesProducts } from "@/data/products/services";

export const products: Product[] = [
  ...peptideProducts,
  ...healingProducts,
  ...reproductiveProducts,
  ...longevityProducts,
  ...moodSleepProducts,
  ...suppliesProducts,
  ...bloodTestingProducts,
  ...servicesProducts,
];
