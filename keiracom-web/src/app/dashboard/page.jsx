'use client'; // This is a client component because it uses hooks

import { useEffect, useRef, useState } from 'react';
import StrikeDistanceWidget from '../../components/StrikeDistanceWidget';
import AuthorityArchitectWidget from '../../components/AuthorityArchitectWidget';

// --- Helper Components ---

/**
 * A simple Badge component for displaying status labels.
 * The color changes based on the status prop.
 */
const Badge = ({ status }) => {
  const baseClasses = "px-2 py-1 text-xs font-bold rounded-full";
  let statusClasses = "";

  switch (status.toUpperCase()) {
    case 'BUYING':
      statusClasses = "bg-terminal-accent text-terminal-bg"; // Green
      break;
    case 'SELLING':
      statusClasses = "bg-terminal-alert text-terminal-bg"; // Red
      break;
    default:
      statusClasses = "bg-terminal-dim text-terminal-text"; // Gray
      break;
  }

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

// --- Core Components ---

/**
 * The scrolling 'Bloomberg' style ticker, rendered on an HTML5 canvas.
 */
const HighFreqTicker = () => {
  const canvasRef = useRef(null);

  // Mock data for the ticker
  const tickerData = [
    { text: "BTC/USD 71,234.56", color: "#00E054" },
    { text: "ETH/USD 3,890.12", color: "#FF2A2A" },
    { text: "SPX 5,250.00", color: "#00E054" },
    { text: "NASDAQ 18,300.75", color: "#00E054" },
    { text: "VOLATILITY 15.6%", color: "#FF2A2A" },
    { text: "OIL 85.45", color: "#00E054" },
    { text: "GOLD 2,180.50", color: "#FF2A2A" },
    { text: "DAX 17,900.00", color: "#00E054" },
  ].map(item => ({ ...item, text: item.text.toUpperCase() + " •" }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 0;
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px "JetBrains Mono", monospace';
      
      let currentX = x;
      const totalWidth = tickerData.reduce((acc, item) => acc + ctx.measureText(item.text).width + 20, 0);

      while (currentX < canvas.width) {
        tickerData.forEach(item => {
          ctx.fillStyle = item.color;
          ctx.fillText(item.text, currentX, canvas.height / 2 + 5);
          currentX += ctx.measureText(item.text).width + 20;
        });
      }

      x -= 0.75;

      if (x < -totalWidth) {
        x = 0;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return <canvas ref={canvasRef} className="w-full h-10 bg-terminal-card border-b-2 border-terminal-border" />;
};


/**
 * The main data widget displaying the Revenue Shield portfolio.
 * It's responsive, showing a card layout on mobile and a table on desktop.
 */
const RevenueShieldWidget = () => {
  // Mock data for the user's portfolio
  const portfolio = [
    { kw: "best saas for seo", rank: 3, yes_score: 9850, status: "BUYING", cpc: 15, diff: 30, vol: 5000 },
    { kw: "automated content generation", rank: 5, yes_score: 9200, status: "HOLDING", cpc: 22, diff: 45, vol: 3000 },
    { kw: "local seo services for plumbers", rank: 1, yes_score: 8750, status: "HOLDING", cpc: 25.5, diff: 25, vol: 800 },
    { kw: "enterprise crm solutions", rank: 28, yes_score: 4100, status: "SELLING", cpc: 50, diff: 80, vol: 25000 },
    { kw: "how to rank on google", rank: 19, yes_score: 3500, status: "SELLING", cpc: 5, diff: 90, vol: 150000 },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-terminal-accent mb-4">REVENUE SHIELD v1.2</h1>
      <div className="bg-terminal-card border-2 border-terminal-border rounded-lg">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 font-bold border-b border-terminal-border text-terminal-dim">
          <div>KEYWORD</div>
          <div className="text-center">RANK</div>
          <div className="text-center">YES SCORE</div>
          <div className="text-center">STATUS</div>
          <div className="text-center">CPC / DIFF</div>
          <div className="text-center">VOLUME</div>
        </div>

        {/* Portfolio Items */}
        <div>
          {portfolio.map((item, index) => (
            <div key={index} className="border-b border-terminal-border last:border-b-0">
              {/* Mobile Card View */}
              <div className="p-4 md:hidden">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-terminal-text truncate">{item.kw}</h3>
                  <Badge status={item.status} />
                </div>
                <div className="flex justify-between text-sm text-terminal-dim">
                  <div>
                    <span className="font-bold text-terminal-accent">RANK:</span> {item.rank}
                  </div>
                  <div>
                    <span className="font-bold text-terminal-accent">YES SCORE:</span> {item.yes_score}
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:grid grid-cols-6 gap-4 p-4 items-center">
                <div className="font-bold truncate">{item.kw}</div>
                <div className="text-center text-2xl font-mono">{item.rank}</div>
                <div className="text-center text-2xl font-mono text-terminal-accent">{item.yes_score}</div>
                <div className="text-center"><Badge status={item.status} /></div>
                <div className="text-center font-mono">{`$${item.cpc.toFixed(2)} / ${item.diff}`}</div>
                <div className="text-center font-mono">{item.vol.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/**
 * The main Dashboard page component.
 */
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-terminal-bg font-mono text-terminal-text flex flex-col items-center">
      <HighFreqTicker />
      <div className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <RevenueShieldWidget />
          </div>
          <div className="lg:col-span-1">
            <StrikeDistanceWidget />
          </div>
          <div className="lg:col-span-2">
            <AuthorityArchitectWidget />
          </div>
        </div>
      </div>
      <footer className="w-full p-4 text-center text-terminal-dim text-xs">
        Keiracom v3.0 Terminal | All rights reserved.
      </footer>
    </main>
  );
}
