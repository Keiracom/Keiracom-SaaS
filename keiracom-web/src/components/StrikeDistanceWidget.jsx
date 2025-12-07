'use client'; // This is a client component due to useState and onClick handlers

import { useState } from 'react';

// --- Iconography ---
/**
 * Inlined Lucide 'Crosshair' icon as an SVG component.
 * This avoids needing to install a separate library.
 */
const CrosshairIcon = ({ className }) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="22" x2="18" y1="12" y2="12" />
    <line x1="6" x2="2" y1="12" y2="12" />
    <line x1="12" x2="12" y1="6" y2="2" />
    <line x1="12" x2="12" y1="22" y2="18" />
  </svg>
);


/**
 * StrikeDistanceWidget component to display Engine 3's targeting data.
 */
export default function StrikeDistanceWidget() {
  // Mock data simulating the output from Engine 3
  const mockTarget = {
    keyword: 'best saas pricing models',
    rank: 12,
    diagnosis: 'MISSING_FAQ_SCHEMA',
    action_asset: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What are the most common SaaS pricing models?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The most common SaaS pricing models include Flat-Rate, Usage-Based, Tiered, Per-User, and Freemium. Each has distinct advantages depending on the product and target market."
    }
  },{
    "@type": "Question",
    "name": "How do I choose the right pricing model?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Choosing the right model involves analyzing your target customer, understanding the value you provide, and considering your business goals. Tiered pricing is often a good start for its flexibility."
    }
  }]
}`
  };

  const [copyStatus, setCopyStatus] = useState('COPY CODE');

  const handleCopy = () => {
    navigator.clipboard.writeText(mockTarget.action_asset).then(() => {
      setCopyStatus('COPIED!');
      setTimeout(() => setCopyStatus('COPY CODE'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyStatus('FAILED!');
      setTimeout(() => setCopyStatus('COPY CODE'), 2000);
    });
  };

  // Define accent color for this widget - a gold/amber for the 'targeting' feel
  const accentColor = 'text-amber-400';

  return (
    <div className="w-full max-w-2xl p-4 md:p-6 font-mono">
      <div className="bg-terminal-card border-2 border-terminal-border rounded-lg shadow-lg">
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b-2 border-terminal-border ${accentColor}`}>
          <h2 className="text-xl font-bold">STRIKE DISTANCE SNIPER</h2>
          <CrosshairIcon className="animate-pulse" />
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          
          {/* Target Info */}
          <div>
            <p className="text-sm text-terminal-dim">TARGET KEYWORD</p>
            <h3 className="text-2xl text-terminal-text font-bold tracking-wider">{mockTarget.keyword}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Current Rank */}
            <div>
              <p className="text-sm text-terminal-dim">CURRENT RANK</p>
              <p className={`text-5xl font-bold ${accentColor}`}>{mockTarget.rank}</p>
            </div>
            
            {/* Diagnosis */}
            <div>
              <p className="text-sm text-terminal-dim">DIAGNOSIS</p>
              <div className="mt-1 bg-amber-900/50 border border-amber-500/50 rounded-md p-3">
                <p className={`text-lg font-bold ${accentColor}`}>{mockTarget.diagnosis}</p>
              </div>
            </div>
          </div>
          
          {/* Actionable Asset */}
          <div>
            <p className="text-sm text-terminal-dim mb-2">ACTIONABLE ASSET</p>
            <div className="relative bg-terminal-bg p-4 rounded-md border border-terminal-border">
              <pre className="text-sm text-terminal-text overflow-x-auto">
                <code>
                  {mockTarget.action_asset}
                </code>
              </pre>
              <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-md transition-colors duration-200
                  ${copyStatus === 'COPIED!' ? 'bg-terminal-accent text-terminal-bg' : `bg-terminal-border hover:${accentColor} hover:text-terminal-bg`}
                `}
              >
                {copyStatus}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
