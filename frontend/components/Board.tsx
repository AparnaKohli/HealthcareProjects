"use client";

import { Member, Medication } from "@/types";
import MemberColumn from "./MemberColumn";
import { motion, AnimatePresence } from "framer-motion";

interface BoardProps {
  members: Member[];
  onUpdateMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

export default function Board({ members, onUpdateMember, onDeleteMember }: BoardProps) {
  if (members.length === 0) {
    return (
      <div className="empty-state glass fade-in">
        <p>No family members added yet. Add someone to start tracking medications.</p>
      </div>
    );
  }

  return (
    <div className="board">
      <AnimatePresence mode="popLayout">
        {members.map((member) => (
          <motion.div
            key={member.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <MemberColumn 
              member={member} 
              onUpdateMember={onUpdateMember}
              onDeleteMember={onDeleteMember}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx>{`
        .board {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          align-items: start;
        }

        .empty-state {
          padding: 4rem;
          text-align: center;
          border-radius: var(--radius);
          color: hsl(var(--muted-foreground));
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
