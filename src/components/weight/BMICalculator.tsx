"use client";

import { useState, useCallback } from "react";

const NHLBI_CALCULATOR_URL = "https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm";
const NHLBI_OBESITY_URL = "https://www.nhlbi.nih.gov/health/overweight-and-obesity";

function calculateBMI(lbs: number, inches: number): number | null {
  if (lbs <= 0 || inches <= 0) return null;
  return (lbs / (inches * inches)) * 703;
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

export function BMICalculator() {
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = useCallback(() => {
    const ft = parseInt(heightFt, 10) || 0;
    const inVal = parseInt(heightIn, 10) || 0;
    const lbs = parseFloat(weightLbs) || 0;
    const totalInches = ft * 12 + inVal;
    const bmi = calculateBMI(lbs, totalInches);
    if (bmi !== null) {
      setResult({ bmi: Math.round(bmi * 10) / 10, category: getBMICategory(bmi) });
    } else {
      setResult(null);
    }
  }, [heightFt, heightIn, weightLbs]);

  const inputBase =
    "w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none focus:border-brand-silver-dark transition-colors";

  return (
    <div className="border border-brand-border p-6 md:p-8 mb-12">
      <h2 className="font-display text-lg uppercase tracking-wider text-brand-white mb-2">
        Calculate Your BMI
      </h2>
      <p className="text-body-sm text-brand-silver mb-4">
        Body mass index (BMI) is a measure of body fat based on height and weight. Higher BMI is linked to increased risk of chronic conditions including heart disease, type 2 diabetes, and certain cancers.{" "}
        <a
          href={NHLBI_OBESITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-silver-dark hover:text-brand-white underline transition-colors"
        >
          Learn more about obesity and health
        </a>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="height-ft" className="block text-label font-display tracking-wider uppercase text-brand-silver-dark mb-1">
            Height (ft)
          </label>
          <input
            id="height-ft"
            type="number"
            min={3}
            max={8}
            value={heightFt}
            onChange={(e) => setHeightFt(e.target.value)}
            placeholder="5"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="height-in" className="block text-label font-display tracking-wider uppercase text-brand-silver-dark mb-1">
            Height (in)
          </label>
          <input
            id="height-in"
            type="number"
            min={0}
            max={11}
            value={heightIn}
            onChange={(e) => setHeightIn(e.target.value)}
            placeholder="10"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-label font-display tracking-wider uppercase text-brand-silver-dark mb-1">
            Weight (lbs)
          </label>
          <input
            id="weight"
            type="number"
            min={50}
            max={500}
            value={weightLbs}
            onChange={(e) => setWeightLbs(e.target.value)}
            placeholder="150"
            className={inputBase}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <button
          type="button"
          onClick={handleCalculate}
          aria-label="Calculate your BMI"
          className="px-6 py-2 border border-brand-gold text-brand-gold font-display text-body-sm tracking-wider uppercase hover:bg-brand-gold hover:text-brand-black transition-colors"
        >
          Calculate BMI
        </button>
        <div aria-live="polite" aria-atomic="true">
          {result && (
            <p className="text-body-sm text-brand-silver">
              Your BMI: <span className="text-brand-white font-display">{result.bmi}</span> — {result.category}
            </p>
          )}
        </div>
      </div>
      <p className="mt-4 text-body-sm text-brand-silver-dark">
        For the official NHLBI calculator and educational resources:{" "}
        <a
          href={NHLBI_CALCULATOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-silver-dark hover:text-brand-silver underline transition-colors"
        >
          Calculate Your BMI | NHLBI, NIH
        </a>
      </p>
    </div>
  );
}
