import React from 'react';
import { TrendingUp, Users, FileText, Bot, Building, FileBarChart } from 'lucide-react';
import { AI_CoAnalyst } from './AI_CoAnalyst';

interface BISDashboardProps {
  config: { industry: string | null; focus: string | null };
}

// Placeholder for a widget
const DashboardWidget: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <div className="text-blue-500">{icon}</div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

// Placeholder for a report in the marketplace
const ReportCard: React.FC<{ title: string; category: string; }> = ({ title, category }) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md text-blue-600 dark:text-blue-300">
                <FileBarChart size={20} />
            </div>
            <div>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>
            </div>
        </div>
         <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-3 w-full text-left">Preview & Purchase →</button>
    </div>
);


export const BISDashboard: React.FC<BISDashboardProps> = ({ config }) => {
  // Mock data for Industry Pulse
  const industryPulse = { score: 72, trend: 'up' };

  return (
    <div className="animate-fade-in space-y-8">
        <header>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Business Intelligence Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                Industry: <span className="font-semibold text-blue-500">{config.industry}</span> | Focus: <span className="font-semibold text-blue-500">{config.focus}</span>
            </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Industry Pulse */}
                <DashboardWidget title="Industry Pulse" icon={<TrendingUp size={24} />}>
                    <div className="flex items-center justify-center h-full text-center">
                        <div>
                            <p className="text-6xl font-bold text-green-500">{industryPulse.score}</p>
                            <p className="text-gray-500 dark:text-gray-400">Sector Sentiment & Volatility</p>
                        </div>
                    </div>
                </DashboardWidget>

                {/* Personalized Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <DashboardWidget title="Emerging Trend Radar" icon={<TrendingUp size={20} />}>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Placeholder for trend visualization.</p>
                    </DashboardWidget>
                    <DashboardWidget title="Competitor Heatmap" icon={<Users size={20} />}>
                         <p className="text-sm text-gray-600 dark:text-gray-300">Placeholder for competitor analysis.</p>
                    </DashboardWidget>
                    <DashboardWidget title="Policy Tracker" icon={<Building size={20} />}>
                         <p className="text-sm text-gray-600 dark:text-gray-300">Placeholder for policy updates.</p>
                    </DashboardWidget>
                </div>
                
                {/* Report Marketplace */}
                 <DashboardWidget title="Intelligence Report Marketplace" icon={<FileText size={20} />}>
                    <div className="space-y-4">
                        <ReportCard title="EV Ecosystem 2025" category="Industry Outlook" />
                        <ReportCard title="Competitor Deep Dive: Innovate Corp" category="Competitor Analysis" />
                        <ReportCard title="Consumer Sentiment: Health Snacks" category="Consumer Study" />
                    </div>
                 </DashboardWidget>
            </div>

            {/* AI Co-Analyst */}
            <div className="lg:col-span-1 h-[calc(100vh-200px)]">
                <AI_CoAnalyst config={config} />
            </div>
        </main>
    </div>
  );
};
