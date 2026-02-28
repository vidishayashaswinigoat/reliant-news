
import React, { useMemo, useState, useCallback } from 'react';
import { Article } from '../types';
import { BookOpen, Scale, Globe, PieChart, ArrowLeft, Bot, Loader2, Sparkles, Check } from 'lucide-react';
import { getReadingHabitsInsight } from '../services/geminiService';
import { Tooltip } from './Tooltip';

interface NewsMirrorProps {
  readArticles: Article[];
  onBackToFeed: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, title: React.ReactNode, children: React.ReactNode, className?: string }> = ({ icon, title, children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col ${className}`}>
        <div className="flex items-center gap-3 mb-3">
            <div className="text-blue-500">{icon}</div>
            <h3 className="font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
        </div>
        <div className="flex-grow flex flex-col justify-center">{children}</div>
    </div>
);

const BiasMeter: React.FC<{ value: number, showLabels?: boolean }> = ({ value, showLabels = true }) => {
    const percentage = (value + 1) * 50;
    const color = value > 0.1 ? 'bg-blue-500' : value < -0.1 ? 'bg-red-500' : 'bg-gray-400';
    const positionText = value > 0.1 ? 'Right' : value < -0.1 ? 'Left' : 'Neutral';
    
    return (
        <div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 my-2 relative">
                 <div className="h-full w-px bg-gray-400 absolute left-1/2 -translate-x-1/2"></div>
                 <div className={`h-full w-1 rounded-full absolute ${color}`} style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}></div>
            </div>
            {showLabels && (
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>Left-Leaning</span>
                    <span className="font-bold text-sm text-gray-800 dark:text-white">{positionText}</span>
                    <span>Right-Leaning</span>
                </div>
            )}
        </div>
    );
};

const FactualIntegrityMeter: React.FC<{ value: number }> = ({ value }) => {
    const percentage = value * 100;
    return (
        <div>
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1"><Check size={14} /> <Tooltip metricKey="factualIntegrity">Factual Integrity</Tooltip></span>
                <span className="font-bold">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

export const NewsMirror: React.FC<NewsMirrorProps> = ({ readArticles, onBackToFeed }) => {
    const [aiInsight, setAiInsight] = useState('');
    const [isLoadingInsight, setIsLoadingInsight] = useState(false);
    const [insightError, setInsightError] = useState('');

    const handleGenerateInsight = useCallback(async () => {
        setIsLoadingInsight(true);
        setAiInsight('');
        setInsightError('');
        try {
            const insight = await getReadingHabitsInsight(readArticles);
            setAiInsight(insight);
        } catch (error) {
            setInsightError('Failed to generate insight. Please try again.');
            console.error(error);
        }
        setIsLoadingInsight(false);
    }, [readArticles]);

    const analytics = useMemo(() => {
        const totalReads = readArticles.length;
        if (totalReads === 0) return null;

        const politicalArticles = readArticles.filter(a => a.analysis.primaryMetric === 'ideologicalLeaning');
        const avgBias = politicalArticles.length > 0
            ? politicalArticles.reduce((acc, article) => acc + (article.analysis.metrics.ideologicalLeaning ?? 0), 0) / politicalArticles.length
            : 0;
        
        const factualArticles = readArticles.filter(a => a.analysis.primaryMetric === 'factualIntegrity');
        const avgFactualIntegrity = factualArticles.length > 0
            ? factualArticles.reduce((acc, article) => acc + (article.analysis.metrics.factualIntegrity ?? 0), 0) / factualArticles.length
            : null;

        const distinctGenres = new Set(readArticles.map(a => a.genre));
        const diversityScore = totalReads > 0 ? (distinctGenres.size / totalReads) * 100 : 0;

        // FIX: The increment operator (++) can cause a TypeScript error because the compiler
        // cannot guarantee the property is a number. Using a safer pattern `(value || 0) + 1`
        // ensures the operation is always on a number, resolving the type error.
        const sentimentCounts = readArticles.reduce((acc, article) => {
            acc[article.analysis.sentiment.score] = (acc[article.analysis.sentiment.score] || 0) + 1;
            return acc;
        }, { Positive: 0, Negative: 0, Neutral: 0 });

        const genreCounts = readArticles.reduce((acc, article) => {
            acc[article.genre] = (acc[article.genre] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topGenres = Object.entries(genreCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
            .map(([genre]) => genre);

        return { totalReads, avgBias, diversityScore, sentimentCounts, topGenres, avgFactualIntegrity };
    }, [readArticles]);

    if (!analytics) {
        return (
            <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your News Mirror is empty.</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Start reading articles from your feed to build your personalized analytics dashboard.</p>
                <button
                    onClick={onBackToFeed}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft size={18}/>
                    Back to Feed
                </button>
            </div>
        );
    }
    
    const { totalReads, avgBias, diversityScore, sentimentCounts, topGenres, avgFactualIntegrity } = analytics;
    
    const sentimentDistribution = [
        { label: 'Positive', value: sentimentCounts.Positive, color: 'bg-green-500' },
        { label: 'Neutral', value: sentimentCounts.Neutral, color: 'bg-yellow-500' },
        { label: 'Negative', value: sentimentCounts.Negative, color: 'bg-red-500' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">News Mirror 3.0</h2>
                <p className="text-gray-500 dark:text-gray-400">Your consciousness dashboard, powered by RMS.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Stats */}
                <StatCard icon={<BookOpen size={24} />} title="Reading Summary" className="lg:col-span-1">
                    <div className="text-center">
                        <p className="text-5xl font-bold text-gray-800 dark:text-white">{totalReads}</p>
                        <p className="text-gray-500 dark:text-gray-400">articles read</p>
                        <p className="text-2xl font-bold text-blue-500 mt-4">{diversityScore.toFixed(0)}%</p>
                        <p className="text-gray-500 dark:text-gray-400">Reading Diversity Index</p>
                    </div>
                </StatCard>
                
                <StatCard 
                    icon={<Scale size={24} />} 
                    title={<Tooltip metricKey="ideologicalLeaning">Ideological Balance (Politics)</Tooltip>} 
                    className="lg:col-span-2"
                >
                     <p className="text-5xl font-bold text-gray-800 dark:text-white mb-2">{avgBias.toFixed(2)}</p>
                     <BiasMeter value={avgBias} />
                </StatCard>

                {/* Detailed Stats */}
                <StatCard icon={<PieChart size={24} />} title="Sentiment Distribution" className="lg:col-span-2">
                    <div className="w-full flex rounded-full h-6 overflow-hidden mb-2">
                         {sentimentDistribution.map(item => item.value > 0 && (
                            <div key={item.label} className={item.color} style={{ width: `${(item.value / totalReads) * 100}%`}}></div>
                         ))}
                    </div>
                    <div className="flex justify-around text-sm">
                        {sentimentDistribution.map(item => (
                             <div key={item.label} className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                                <span>{item.label} ({(item.value / totalReads * 100).toFixed(0)}%)</span>
                            </div>
                        ))}
                    </div>
                </StatCard>

                <StatCard icon={<Globe size={24} />} title="Top Genres & Metrics">
                    <div className="space-y-3">
                        {topGenres.map(genre => (
                            <div key={genre}>
                               <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">{genre}</span>
                            </div>
                        ))}
                        {avgFactualIntegrity !== null && (
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                               <FactualIntegrityMeter value={avgFactualIntegrity} />
                           </div>
                        )}
                    </div>
                </StatCard>
                
                {/* AI Insight */}
                <div className="lg:col-span-3">
                    <StatCard icon={<Bot size={24}/>} title="Reliant AI Insight">
                        {aiInsight && !isLoadingInsight && (
                            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{aiInsight}</div>
                        )}
                        {isLoadingInsight && (
                            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                                <Loader2 size={20} className="animate-spin" />
                                <span>Analyzing your reading habits...</span>
                            </div>
                        )}
                        {insightError && <p className="text-red-500">{insightError}</p>}
                        {!aiInsight && !isLoadingInsight && (
                             <div className="text-center">
                                <p className="mb-4 text-gray-600 dark:text-gray-300">Get a personalized summary of your reading patterns and suggestions for improvement.</p>
                                <button
                                    onClick={handleGenerateInsight}
                                    className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
                                >
                                    <Sparkles size={18} />
                                    Generate AI Insight
                                </button>
                            </div>
                        )}
                    </StatCard>
                </div>
            </div>
        </div>
    );
};