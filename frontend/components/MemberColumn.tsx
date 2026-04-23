"use client";

import { useState } from "react";
import { Member, Medication } from "@/types";
import { Plus, Trash2, Edit2, User } from "lucide-react";
import MedicationCard from "./MedicationCard";
import AddMedicationModal from "./AddMedicationModal";
import { motion, AnimatePresence } from "framer-motion";

interface MemberColumnProps {
  member: Member;
  onUpdateMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

export default function MemberColumn({ member, onUpdateMember, onDeleteMember }: MemberColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | undefined>(undefined);

  // Simple color picker based on name hash or just a random color
  const colors = ["blue", "purple", "green", "orange", "pink"];
  const colorIndex = member.name.length % colors.length;
  const colorClass = `marker-${colors[colorIndex]}`;

  const handleAddMedication = (med: Medication) => {
    const updatedMember = {
      ...member,
      medications: [...member.medications, med]
    };
    onUpdateMember(updatedMember);
    setIsModalOpen(false);
  };

  const handleUpdateMedication = (updatedMed: Medication) => {
    const updatedMember = {
      ...member,
      medications: member.medications.map(m => m.id === updatedMed.id ? updatedMed : m)
    };
    onUpdateMember(updatedMember);
    setEditingMedication(undefined);
  };

  const handleDeleteMedication = (medId: string) => {
    const updatedMember = {
      ...member,
      medications: member.medications.filter(m => m.id !== medId)
    };
    onUpdateMember(updatedMember);
  };

  const handleToggleTaken = (medId: string) => {
    const updatedMember = {
      ...member,
      medications: member.medications.map(m => 
        m.id === medId ? { ...m, isTaken: !m.isTaken } : m
      )
    };
    onUpdateMember(updatedMember);
  };

  return (
    <div className={`column glass-dark colored-border ${colorClass}`}>
      <div className="column-header">
        <div className="member-info">
          <div className="avatar glass" style={{ color: `hsl(var(--member-color))` }}>
            <User size={18} />
          </div>
          <h3>{member.name}</h3>
        </div>
        <div className="actions">
          <button 
            onClick={() => onDeleteMember(member.id)} 
            className="btn-icon"
            title="Delete member"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="medication-list">
        <AnimatePresence mode="popLayout">
          {member.medications.map((med) => (
            <motion.div
              key={med.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <MedicationCard 
                medication={med} 
                onDelete={() => handleDeleteMedication(med.id)}
                onEdit={() => setEditingMedication(med)}
                onToggleTaken={() => handleToggleTaken(med.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <button 
          className="add-med-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span>Add Medication</span>
        </button>
      </div>

      <AddMedicationModal 
        isOpen={isModalOpen || !!editingMedication}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMedication(undefined);
        }}
        onSave={editingMedication ? handleUpdateMedication : handleAddMedication}
        initialData={editingMedication}
      />

      <style jsx>{`
        .column {
          padding: 1.5rem;
          border-radius: var(--radius);
          min-height: 400px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--primary));
        }

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .medication-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .add-med-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 1px dashed hsl(var(--border));
          border-radius: var(--radius);
          color: hsl(var(--muted-foreground));
          transition: all 0.2s ease;
          width: 100%;
          margin-top: 0.5rem;
        }

        .add-med-btn:hover {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
          background: hsla(var(--primary) / 0.05);
        }

        .btn-icon {
          padding: 0.5rem;
          border-radius: 50%;
          color: hsl(var(--muted-foreground));
          transition: all 0.2s ease;
        }

        .btn-icon:hover {
          background: hsla(var(--destructive) / 0.1);
          color: hsl(var(--destructive));
        }
      `}</style>
    </div>
  );
}
