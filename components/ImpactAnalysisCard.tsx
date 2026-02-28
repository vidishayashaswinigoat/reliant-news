import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { generateImpactAnalysis } from '../services/geminiService';
import { Target, Loader2, AlertTriangle } from 'lucide-react';

interface ImpactAnalysisCardProps {
    article: Article;
    industry: string;
    focus: string;
}

export const ImpactAnalysisCard: React.FC<ImpactAnalysisCardProps> = ({ article, industry, focus }) => {
    const [insight, setInsight] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInsight = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await generateImpactAnalysis(article, industry, focus);
                setInsight(result);
            } catch (e) {
                setError('Failed to generate business impact analysis.');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        getInsight();
    }, [article, industry, focus]);

    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-gray-900/30 flex-shrink-0">
            <h3 className="text-lg font-bold flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                <Target /> Impact on Your Business
            </h3>
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {isLoading && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Loader2 className="animate-spin" />
                        <span>Analyzing impact...</span>
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle />
                        <span>{error}</span>
                    </div>
                )}
                {insight && (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
                )}
            </div>
        </div>
    );
};
