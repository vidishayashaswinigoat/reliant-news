import React from 'react';
import { Article } from '../types';
import { ChatAssistant } from './ChatAssistant';
import { ImpactAnalysisCard } from './ImpactAnalysisCard';
import { X, BarChart2, MessageSquare, List, CheckCircle, Info, TrendingUp, TrendingDown, Minus, Copy, Scale, Check, Flame, BrainCircuit, AlertTriangle, Vote } from 'lucide-react';
import { mockArticles } from '../data/mockData';
// FIX: Corrected import. The component is named PollComponent, so it should be imported directly without aliasing from a non-existent 'Poll' export.
import { PollComponent } from './Poll';
import { Tooltip } from './Tooltip';
import { metricInfo } from '../data/metricsInfo';


const SentimentIcon: React.FC<{ score: 'Positive' | 'Neutral' | 'Negative' }> = ({ score }) => {
  switch (score) {
    case 'Positive':
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'Negative':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-yellow-500" />;
  }
};

const MiniBiasMeter: React.FC<{ value: number }> = ({ value }) => {
    const percentage = (value + 1) * 50;
    const color = value > 0.1 ? 'bg-blue-500' : value < -0.1 ? 'bg-red-500' : 'bg-gray-400';
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 my-1 relative">
             <div className="h-1 w-px bg-gray-400 absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>
             <div className={`h-1 w-1 rounded-full absolute ${color}`} style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}></div>
        </div>
    );
};

const ComparisonArticleCard: React.FC<{article: Article}> = ({ article }) => {
    const value = article.analysis.metrics.ideologicalLeaning ?? 0;
    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="font-bold text-sm text-gray-800 dark:text-gray-100">{article.source}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{article.title}</p>
            {article.analysis.primaryMetric === 'ideologicalLeaning' && <MiniBiasMeter value={value} />}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <SentimentIcon score={article.analysis.sentiment.score} />
                <span>{article.analysis.sentiment.score}</span>
            </div>
        </div>
    )
}

interface ArticleViewProps {
  article: Article;
  onClose: () => void;
  userVote?: string;
  onVote: (pollId: string, optionId: string) => void;
  bisConfig: { industry: string | null; focus: string | null };
}

const METRIC_CONFIG = {
    ideologicalLeaning: { label: 'Ideological Leaning', icon: <Scale size={16}/>, color: 'text-blue-500' },
    factualIntegrity: { label: 'Factual Integrity', icon: <Check size={16}/>, color: 'text-green-500' },
    hypeBias: { label: 'Hype / Fear Bias', icon: <BrainCircuit size={16}/>, color: 'text-indigo-500' },
    sentimentIntensity: { label: 'Sentiment Intensity', icon: <Flame size={16}/>, color: 'text-orange-500' },
    establishmentBias: { label: 'Establishment Bias', icon: <BarChart2 size={16}/>, color: 'text-purple-500' },
    opinionation: { label: 'Opinionation', icon: <MessageSquare size={16}/>, color: 'text-yellow-500' },
    sensationalism: { label: 'Sensationalism', icon: <AlertTriangle size={16}/>, color: 'text-red-500' },
};


const MetricPill: React.FC<{ metricKey: string, value: number }> = ({ metricKey, value }) => {
    const config = METRIC_CONFIG[metricKey as keyof typeof METRIC_CONFIG];
    if (!config) return null;
    
    const displayValue = metricKey === 'factualIntegrity' || metricKey === 'opinionation' || metricKey === 'sentimentIntensity' || metricKey === 'sensationalism'
        ? `${(value * 100).toFixed(0)}%`
        : value.toFixed(2);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className={`flex items-center gap-2 text-sm font-semibold ${config.color}`}>
                {config.icon}
                <Tooltip metricKey={metricKey as keyof typeof metricInfo}>{config.label}</Tooltip>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{displayValue}</p>
        </div>
    );
};

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose, userVote, onVote, bisConfig }) => {
  const relatedArticles = article.eventId 
    ? mockArticles.filter(a => a.eventId === article.eventId && a.id !== article.id)
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-30 flex justify-center items-center p-4 animate-fade-in-fast">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{article.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{article.source} &bull; {article.publicationDate}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X size={24} />
          </button>
        </header>

        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Article & Analysis */}
          <div className="w-full lg:w-3/5 p-6 overflow-y-auto">
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="w-full h-72 object-cover rounded-lg mb-6" />
            )}

            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Info size={20} className="text-blue-500"/> Article Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 prose dark:prose-invert max-w-none">{article.summary}</p>

            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart2 size={20} className="text-blue-500"/> Reliant Metric System (RMS)</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <div className="flex items-center gap-2 text-sm font-semibold text-purple-500">
                        <CheckCircle size={16}/>
                        <Tooltip metricKey="sourceCredibility">Source Score</Tooltip>
                    </div>
                    <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{article.analysis.sourceCredibility.toFixed(2)}</p>
                </div>
                 {Object.entries(article.analysis.metrics).map(([key, value]) => (
                    <MetricPill key={key} metricKey={key} value={value as number} />
                ))}
            </div>

            <div className="space-y-6">
                 <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><List size={18}/> Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                        {article.analysis.topics.map(topic => (
                            <span key={topic} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{topic}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><List size={18}/> Key Claims</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {article.analysis.claims.map((claim, i) => (
                            <li key={i}>{claim.statement}</li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><List size={18}/> Phrases Driving Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                       "{article.analysis.explainability.join('", "')}"
                    </p>
                </div>

                {article.poll && (
                     <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Vote size={20} className="text-blue-500"/> Community Poll</h3>
                         <PollComponent 
                            poll={article.poll}
                            userVote={userVote}
                            onVote={(optionId) => onVote(article.poll!.id, optionId)}
                        />
                    </div>
                )}

                {relatedArticles.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Copy size={20} className="text-blue-500"/> Compare Coverage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedArticles.map(relatedArticle => (
                                <ComparisonArticleCard key={relatedArticle.id} article={relatedArticle} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* Right: Chat Assistant & BIS Insight */}
          <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
            {bisConfig.industry && bisConfig.focus && (
                <ImpactAnalysisCard 
                    article={article} 
                    industry={bisConfig.industry} 
                    focus={bisConfig.focus} 
                />
            )}
            <ChatAssistant article={article} />
          </div>
        </div>
      </div>
    </div>
  );
};
