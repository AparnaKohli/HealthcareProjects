"use client";

import { useState, useEffect } from "react";
import { Plus, Users } from "lucide-react";
import Board from "@/components/Board";
import AddMemberModal from "@/components/AddMemberModal";
import { Member } from "@/types";

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Load from localStorage on mount (MVP persistence)
  useEffect(() => {
    const saved = localStorage.getItem("medication-tracker-members");
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load members", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("medication-tracker-members", JSON.stringify(members));
    }
  }, [members, isLoaded]);

  const handleAddMember = (name: string) => {
    if (members.find(m => m.name.toLowerCase() === name.toLowerCase())) {
      alert("Name already exists. Please use a unique name.");
      return;
    }

    const newMember: Member = {
      id: crypto.randomUUID(),
      name,
      medications: []
    };

    setMembers([...members, newMember]);
  };

  const deleteMember = (id: string) => {
    if (confirm("Are you sure you want to delete this family member and all their medications?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMember = (updatedMember: Member) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  return (
    <main className="container">
      <header className="header fade-in">
        <div className="brand">
          <div className="logo glass-dark">
            <Users size={24} className="icon-primary" />
          </div>
          <h1>Family MedTracker</h1>
        </div>
        <button onClick={() => setIsAddMemberOpen(true)} className="btn-primary glass">
          <Plus size={20} />
          <span>Add Member</span>
        </button>
      </header>

      {isLoaded && (
        <Board 
          members={members} 
          onUpdateMember={updateMember}
          onDeleteMember={deleteMember}
        />
      )}

      <AddMemberModal 
        isOpen={isAddMemberOpen} 
        onClose={() => setIsAddMemberOpen(false)} 
        onSave={handleAddMember}
      />

      <style jsx>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .icon-primary {
          color: hsl(var(--primary));
        }

        h1 {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--muted-foreground)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius);
          color: hsl(var(--foreground));
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: hsla(var(--primary) / 0.2);
          border-color: hsl(var(--primary));
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
