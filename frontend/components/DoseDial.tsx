"use client";

import { DoseUnit } from "@/types";
import { motion } from "framer-motion";

interface DoseDialProps {
  value: DoseUnit;
  onChange: (value: DoseUnit) => void;
}

const units: DoseUnit[] = ["mg", "ml", "tsp", "tablets"];

export default function DoseDial({ value, onChange }: DoseDialProps) {
  return (
    <div className="dial-container">
      <label className="label">Unit</label>
      <div className="dial glass">
        {units.map((unit, index) => {
          const isActive = value === unit;
          return (
            <button
              key={unit}
              type="button"
              className={`unit-btn ${isActive ? "active" : ""}`}
              onClick={() => onChange(unit)}
            >
              {isActive && (
                <motion.div
                  layoutId="active-unit"
                  className="active-bg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="unit-text">{unit}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .dial-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label {
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
        }

        .dial {
          display: flex;
          padding: 0.25rem;
          border-radius: 100px;
          gap: 0.25rem;
          position: relative;
        }

        .unit-btn {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
          color: #4b5563; /* Explicit dark gray for visibility */
        }

        .unit-btn:hover {
          color: #1f2937;
        }

        .unit-btn.active {
          color: white !important;
        }

        .active-bg {
          position: absolute;
          inset: 0;
          background: hsl(var(--primary));
          border-radius: 100px;
          z-index: 0;
        }

        .unit-text {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
