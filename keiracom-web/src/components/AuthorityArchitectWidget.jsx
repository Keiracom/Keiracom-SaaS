'use client'; // This is a client component due to useState and onClick handlers

import { useState } from 'react';

// --- Iconography ---
/**
 * Inlined Lucide 'Network' icon as an SVG component.
 * This avoids needing to install a separate library.
 */
const NetworkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M6 16v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M12 8.5v5" />
  </svg>
);


/**
 * Helper component for displaying status badges, specifically for this widget.
 */
const StatusBadge = ({ status }) => {
  const baseClasses = "px-2 py-1 text-xs font-bold rounded-full";
  let statusClasses = "";

  switch (status.toUpperCase()) {
    case 'CRITICAL_GAP':
      statusClasses = "bg-[#D946EF]/70 text-white"; // Neon Purple
      break;
    case 'COVERED':
      statusClasses = "bg-terminal-dim/50 text-terminal-text"; // Dim gray
      break;
    case 'GENERATING':
      statusClasses = "bg-terminal-accent animate-pulse text-terminal-bg"; // Green pulse
      break;
    default:
      statusClasses = "bg-terminal-border text-terminal-dim";
      break;
  }
  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};


/**
 * AuthorityArchitectWidget component to display Engine 4's semantic map analysis.
 */
export default function AuthorityArchitectWidget() {
  // Mock data for the Integrity Score and Pillar Blueprints
  const integrityScore = 45; // Represents 45% cluster coverage
  const mockBlueprints = [
    { id: 1, pillar_title: 'Complete Guide to Invisalign', status: 'CRITICAL_GAP', support_count: 3 },
    { id: 2, pillar_title: 'Dental Implants: Your Permanent Solution', status: 'CRITICAL_GAP', support_count: 4 },
    { id: 3, pillar_title: 'Family Dentistry Explained', status: 'COVERED', support_count: 5 },
    { id: 4, pillar_title: 'Emergency Dental Care', status: 'COVERED', support_count: 2 },
    { id: 5, pillar_title: 'Cosmetic Veneers & Whitening', status: 'CRITICAL_GAP', support_count: 3 },
  ];

  const [generatingStates, setGeneratingStates] = useState({});

  const handleGenerateDraft = (id) => {
    setGeneratingStates(prev => ({ ...prev, [id]: true }));
    console.log(`Generating draft for blueprint ID: ${id}`);
    // Simulate API call
    setTimeout(() => {
      setGeneratingStates(prev => ({ ...prev, [id]: false }));
      alert(`Draft generated for Blueprint ID: ${id}. Check CMS drafts.`);
    }, 2000);
  };

  const gapColor = 'text-[#D946EF]'; // Neon Purple

  return (
    <div className="w-full max-w-3xl p-4 md:p-6 font-mono">
      <div className="bg-terminal-card border-2 border-terminal-border rounded-lg shadow-lg">
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b-2 border-terminal-border ${gapColor}`}>
          <h2 className="text-xl font-bold">AUTHORITY ARCHITECT</h2>
          <NetworkIcon className="animate-pulse" />
        </div>

        {/* Integrity Score */}
        <div className="p-6 text-center border-b border-terminal-border">
          <p className="text-sm text-terminal-dim mb-1">CLUSTER INTEGRITY</p>
          <p className={`text-6xl font-bold ${gapColor}`}>{integrityScore}%</p>
          <p className="text-sm text-terminal-text mt-2">Coverage of Strategic Semantic Map</p>
        </div>

        {/* Pillar Blueprints List */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-terminal-dim mb-4">ACTIONABLE BLUEPRINTS</p>
          {mockBlueprints.map((blueprint) => (
            <div key={blueprint.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-terminal-bg rounded-md border border-terminal-border">
              <div className="mb-2 md:mb-0">
                <h3 className={`text-lg font-bold ${blueprint.status === 'CRITICAL_GAP' ? gapColor : 'text-terminal-text'}`}>
                  {blueprint.pillar_title}
                </h3>
                <p className="text-sm text-terminal-dim">
                  {blueprint.support_count} Supporting Articles
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <StatusBadge status={generatingStates[blueprint.id] ? 'GENERATING' : blueprint.status} />
                <button
                  onClick={() => handleGenerateDraft(blueprint.id)}
                  disabled={generatingStates[blueprint.id] || blueprint.status !== 'CRITICAL_GAP'}
                  className={`px-4 py-2 text-sm font-bold rounded-md transition-colors duration-200
                    ${blueprint.status === 'CRITICAL_GAP' && !generatingStates[blueprint.id]
                      ? 'bg-[#D946EF]/70 hover:bg-[#D946EF] text-white'
                      : 'bg-terminal-border text-terminal-dim cursor-not-allowed'
                    }
                  `}
                >
                  {generatingStates[blueprint.id] ? 'GENERATING...' : 'GENERATE DRAFT'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
