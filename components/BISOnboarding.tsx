import React, { useState } from 'react';
import { Building, Factory, HeartPulse, Cpu, Briefcase, Zap } from 'lucide-react';

interface BISOnboardingProps {
  onComplete: (industry: string, focus: string) => void;
}

const industries = [
  { name: 'FMCG', icon: <Factory size={24} /> },
  { name: 'BFSI', icon: <Building size={24} /> },
  { name: 'Healthcare', icon: <HeartPulse size={24} /> },
  { name: 'Technology', icon: <Cpu size={24} /> },
  { name: 'Consulting', icon: <Briefcase size={24} /> },
  { name: 'Energy', icon: <Zap size={24} /> },
];

export const BISOnboarding: React.FC<BISOnboardingProps> = ({ onComplete }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [focus, setFocus] = useState('');

  const handleStart = () => {
    if (selectedIndustry && focus.trim()) {
      onComplete(selectedIndustry, focus.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Business Intelligence Suite
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Unlock strategic insights. First, tell us about your business.
      </p>
      
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">1. Select Your Industry</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {industries.map(industry => (
            <button
              key={industry.name}
              onClick={() => setSelectedIndustry(industry.name)}
              className={`flex flex-col items-center justify-center w-32 h-24 p-4 rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                selectedIndustry === industry.name
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {industry.icon}
              <span className="mt-2 text-sm font-semibold">{industry.name}</span>
            </button>
          ))}
        </div>
      </div>

       <div className="mb-8 max-w-lg mx-auto">
        <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">2. Define Your Focus</h3>
         <input
            type="text"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="e.g., 'Health Snacks', 'EV Components', 'Retail Banking'"
            className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
      </div>
      
      <div>
        <button
          onClick={handleStart}
          disabled={!selectedIndustry || !focus.trim()}
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};
