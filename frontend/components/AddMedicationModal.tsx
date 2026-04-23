"use client";

import { useState, useEffect } from "react";
import { Medication, Frequency, DoseUnit } from "@/types";
import { X, Calendar, Clock, Hash, Activity } from "lucide-react";
import DoseDial from "./DoseDial";
import { calculateSchedule } from "@/lib/scheduler";
import { motion, AnimatePresence } from "framer-motion";

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medication: Medication) => void;
  initialData?: Medication;
}

export default function AddMedicationModal({ isOpen, onClose, onSave, initialData }: AddMedicationModalProps) {
  const [name, setName] = useState("");
  const [doseValue, setDoseValue] = useState(1);
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg");
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [days, setDays] = useState(7);
  const [startTime, setStartTime] = useState("09:00");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDoseValue(initialData.doseValue);
      setDoseUnit(initialData.doseUnit);
      setFrequency(initialData.frequency);
      setDays(initialData.days);
      setStartTime(initialData.startTime);
    } else {
      setName("");
      setDoseValue(1);
      setDoseUnit("mg");
      setFrequency("once");
      setDays(7);
      setStartTime("09:00");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Alphanumeric only for name
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      alert("Medication name can only contain letters and numbers.");
      return;
    }

    const schedule = calculateSchedule(startTime, frequency);
    
    const medication: Medication = {
      id: initialData?.id || crypto.randomUUID(),
      name,
      doseValue: Number(doseValue) || 0,
      doseUnit,
      frequency,
      days: Number(days) || 0,
      startTime,
      schedule
    };

    onSave(medication);
  };

  const schedulePreview = calculateSchedule(startTime, frequency);

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="modal-content glass"
      >
        <div className="modal-header">
          <h2>{initialData ? "Edit Medication" : "Add Medication"}</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group full">
              <label><Activity size={16} /> Medication Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Paracetamol 500"
                required
              />
            </div>

            <div className="input-group">
              <label><Hash size={16} /> Dose Amount</label>
              <input 
                type="number" 
                value={doseValue || ""} 
                onChange={(e) => setDoseValue(e.target.value === "" ? 0 : Number(e.target.value))}
                onFocus={(e) => e.target.value === "0" && setDoseValue(0)}
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <div className="input-group">
              <DoseDial value={doseUnit} onChange={setDoseUnit} />
            </div>

            <div className="input-group">
              <label><Clock size={16} /> Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
                <option value="once">Once a day</option>
                <option value="twice">Twice a day</option>
                <option value="thrice">Thrice a day</option>
                <option value="four">Four times a day</option>
                <option value="as_needed">As and when required</option>
              </select>
            </div>

            <div className="input-group">
              <label><Calendar size={16} /> Duration (Days)</label>
              <input 
                type="number" 
                value={days || ""} 
                onChange={(e) => setDays(e.target.value === "" ? 0 : Number(e.target.value))}
                min="1"
                required
              />
            </div>

            {frequency !== "as_needed" && (
              <div className="input-group full">
                <label><Clock size={16} /> First Dose Time</label>
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <div className="schedule-preview">
                  <p className="preview-label">Calculated Schedule:</p>
                  <div className="schedule-chips">
                    {schedulePreview.map((s, i) => (
                      <span key={i} className="chip glass-dark">{s.time}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .close-btn {
          color: hsl(var(--muted-foreground));
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: hsl(var(--muted));
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .input-group.full {
          grid-column: span 2;
        }

        label {
          font-size: 0.875rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        input, select {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          padding: 0.875rem 1rem;
          border-radius: var(--radius);
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
        }

        input:focus, select:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsla(var(--primary) / 0.1);
        }

        .schedule-preview {
          margin-top: 1.5rem;
          padding: 1.25rem;
          background: hsla(var(--primary) / 0.05);
          border: 1px solid hsla(var(--primary) / 0.1);
          border-radius: var(--radius);
        }

        .preview-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: hsl(var(--primary));
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .schedule-chips {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .chip {
          padding: 0.35rem 0.875rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 700;
          background: white;
          border: 1px solid hsl(var(--border));
          color: hsl(var(--primary));
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1.25rem;
          margin-top: 3rem;
        }

        .btn-secondary {
          padding: 0.875rem 1.75rem;
          border-radius: var(--radius);
          color: hsl(var(--muted-foreground));
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
        }

        .btn-primary {
          background: hsl(var(--primary));
          color: white;
          padding: 0.875rem 2rem;
          border-radius: var(--radius);
          font-weight: 700;
          box-shadow: 0 4px 12px hsla(var(--primary) / 0.3);
          transition: all 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px hsla(var(--primary) / 0.4);
        }
      `}</style>
    </div>
  );
}
