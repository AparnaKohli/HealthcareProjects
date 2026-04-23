"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import { motion } from "framer-motion";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export default function AddMemberModal({ isOpen, onClose, onSave }: AddMemberModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="modal-content glass small"
      >
        <div className="modal-header">
          <h2>Add Family Member</h2>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label><User size={16} /> Member Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alice"
              autoFocus
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save changes</button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.6);
          -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .close-btn {
          color: hsl(var(--muted-foreground));
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        input {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          padding: 0.75rem;
          border-radius: var(--radius);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus {
          border-color: hsl(var(--primary));
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          color: hsl(var(--muted-foreground));
          font-weight: 500;
        }

        .btn-primary {
          background: hsl(var(--primary));
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
