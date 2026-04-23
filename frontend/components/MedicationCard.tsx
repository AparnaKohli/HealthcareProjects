"use client";

import { Medication } from "@/types";
import { Trash2, Edit2, Calendar, Bell, Clock, CheckCircle2 } from "lucide-react";
import { generateCalendarLink } from "@/lib/scheduler";

interface MedicationCardProps {
  medication: Medication;
  onDelete: () => void;
  onEdit: () => void;
  onToggleTaken: () => void;
}

export default function MedicationCard({ medication, onDelete, onEdit, onToggleTaken }: MedicationCardProps) {
  const handleCalendar = (time: string) => {
    const link = generateCalendarLink(
      medication.name, 
      time, 
      `${medication.doseValue} ${medication.doseUnit}`
    );
    window.open(link, "_blank");
  };

  return (
    <div className={`card glass ${medication.isTaken ? "taken" : ""}`}>
      <div className="card-header">
        <div className="info">
          <button onClick={onToggleTaken} className={`check-btn ${medication.isTaken ? "active" : ""}`}>
            <CheckCircle2 size={18} />
          </button>
          <div>
            <h4 className={medication.isTaken ? "strikethrough" : ""}>{medication.name}</h4>
            <p className="dose">{medication.doseValue} {medication.doseUnit} • {medication.days} days</p>
          </div>
        </div>
        <div className="actions">
          <button onClick={onEdit} className="action-btn" title="Edit"><Edit2 size={14} /></button>
          <button onClick={onDelete} className="action-btn delete" title="Delete"><Trash2 size={14} /></button>
        </div>
      </div>

      <div className="schedule-section">
        <div className="section-title">
          <Clock size={12} />
          <span>Schedule</span>
        </div>
        <div className="times-grid">
          {medication.frequency === "as_needed" ? (
            <span className="as-needed">As and when required</span>
          ) : (
            medication.schedule.map((s, i) => (
              <button 
                key={i} 
                className="time-chip glass-dark"
                onClick={() => handleCalendar(s.time)}
                title="Add to Calendar"
              >
                <Bell size={10} />
                <span>{s.time}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .card {
          padding: 1rem;
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-2px);
          border-color: hsla(var(--primary) / 0.3);
        }

        .card.taken {
          opacity: 0.7;
          border-color: hsla(var(--primary) / 0.5);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .info {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .check-btn {
          margin-top: 0.15rem;
          color: hsl(var(--muted-foreground));
          transition: all 0.2s;
        }

        .check-btn:hover {
          color: hsl(var(--primary));
        }

        .check-btn.active {
          color: hsl(var(--primary));
        }

        .strikethrough {
          text-decoration: line-through;
          color: hsl(var(--muted-foreground));
        }

        h4 {
          font-size: 1rem;
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .dose {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          margin-top: 0.25rem;
        }

        .actions {
          display: flex;
          gap: 0.25rem;
        }

        .action-btn {
          padding: 0.4rem;
          border-radius: 6px;
          color: hsl(var(--muted-foreground));
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: hsla(var(--muted) / 0.5);
          color: hsl(var(--foreground));
        }

        .action-btn.delete:hover {
          color: hsl(var(--destructive));
          background: hsla(var(--destructive) / 0.1);
        }

        .schedule-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: hsl(var(--muted-foreground));
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .times-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .time-chip {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: hsl(var(--primary));
          transition: all 0.2s;
        }

        .time-chip:hover {
          background: hsla(var(--primary) / 0.1);
          transform: scale(1.05);
        }

        .as-needed {
          font-size: 0.8rem;
          color: hsl(var(--accent));
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
